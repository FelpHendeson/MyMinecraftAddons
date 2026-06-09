import { EquipmentSlot, ItemStack, system, world } from "@minecraft/server";

const ACTIVE_EMBLEM_TAG = "riftborn_emblema_ativo";
const WOODEN_EMBLEM_TAG = "riftborn_emblema_madeira";
const WOODEN_EMBLEM_ITEM_ID = "riftborn:emblema_de_madeira";
const ACTIVE_WOODEN_EMBLEM_ITEM_ID = "riftborn:emblema_de_madeira_ativo";
const WOODEN_STAFF_ITEM_ID = "riftborn:cajado_de_madeira";
const ENERGY_PULSE_SCROLL_ITEM_ID = "riftborn:pergaminho_magico_pulso_de_energia_i";
const ACTIVATION_DEBOUNCE_TICKS = 5;
const WOODEN_EMBLEM_MAX_ENERGY = 20;
const ENERGY_REGEN_AMOUNT = 1;
const ENERGY_REGEN_INTERVAL_TICKS = 40;
const ENERGY_ACTIONBAR_INTERVAL_TICKS = 20;
const ENERGY_OBJECTIVE_ID = "rb_energy";
const ENERGY_MAX_OBJECTIVE_ID = "rb_energy_max";
const ENERGY_PULSE_COST = 5;
const ENERGY_PULSE_DAMAGE = 5;
const ENERGY_PULSE_RANGE = 5;
const ENERGY_PULSE_RADIUS = 1.25;
const ENERGY_PULSE_KNOCKBACK = 2;
const ENERGY_PULSE_VERTICAL_KNOCKBACK = 0.15;
const ENERGY_PULSE_COOLDOWN_TICKS = 20;
const EMBLEM_LINEAGE_TAGS = [
  "riftborn_emblema_madeira",
  "riftborn_emblema_cobre",
  "riftborn_emblema_lamina",
  "riftborn_emblema_arcano",
  "riftborn_emblema_precisao",
  "riftborn_emblema_sombras",
  "riftborn_emblema_sobrevivente"
];
const lastActivationTickByPlayer = new Map();
const lastStaffUseTickByPlayer = new Map();
const energyPulseCooldownTickByPlayer = new Map();
const lastFailureMessageTickByPlayer = new Map();

let lastEnergyRegenTick = system.currentTick;

function getOrCreateObjective(objectiveId, displayName) {
  let objective = world.scoreboard.getObjective(objectiveId);

  if (!objective) {
    objective = world.scoreboard.addObjective(objectiveId, displayName);
  }

  return objective;
}

function getEnergyObjectives() {
  return {
    energy: getOrCreateObjective(ENERGY_OBJECTIVE_ID, "Energia de Fenda"),
    maxEnergy: getOrCreateObjective(ENERGY_MAX_OBJECTIVE_ID, "Energia de Fenda Max")
  };
}

function getScore(objective, player) {
  try {
    return objective.getScore(player);
  } catch {
    return undefined;
  }
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function ensureWoodenEmblemEnergy(player) {
  const { energy, maxEnergy } = getEnergyObjectives();
  const max = WOODEN_EMBLEM_MAX_ENERGY;
  const currentScore = getScore(energy, player);
  const current = currentScore === undefined ? max : clamp(currentScore, 0, max);

  maxEnergy.setScore(player, max);
  energy.setScore(player, current);

  return { current, max };
}

function regenerateWoodenEmblemEnergy(player) {
  const { energy } = getEnergyObjectives();
  const { current, max } = ensureWoodenEmblemEnergy(player);
  const regenerated = clamp(current + ENERGY_REGEN_AMOUNT, 0, max);

  energy.setScore(player, regenerated);
  return { current: regenerated, max };
}

function setWoodenEmblemEnergy(player, value) {
  const { energy } = getEnergyObjectives();
  const { max } = ensureWoodenEmblemEnergy(player);
  const current = clamp(value, 0, max);

  energy.setScore(player, current);
  showEnergyActionbar(player, current, max);

  return { current, max };
}

function hasActiveWoodenEmblem(player) {
  return player.hasTag(ACTIVE_EMBLEM_TAG) && player.hasTag(WOODEN_EMBLEM_TAG);
}

function showEnergyActionbar(player, current, max) {
  player.onScreenDisplay.setActionBar(`\u00a7dEnergia de Fenda: \u00a7f${current}\u00a77/\u00a7f${max}`);
}

function clearEnergyActionbar(player) {
  player.onScreenDisplay.setActionBar("");
}

function showTemporaryActionbar(player, message) {
  const lastTick = lastFailureMessageTickByPlayer.get(player.id);

  if (lastTick !== undefined && system.currentTick - lastTick < 10) {
    return;
  }

  lastFailureMessageTickByPlayer.set(player.id, system.currentTick);
  player.onScreenDisplay.setActionBar(message);
}

function canToggleEmblem(player) {
  const currentTick = system.currentTick;
  const lastActivationTick = lastActivationTickByPlayer.get(player.id);

  if (lastActivationTick !== undefined && currentTick - lastActivationTick < ACTIVATION_DEBOUNCE_TICKS) {
    return false;
  }

  lastActivationTickByPlayer.set(player.id, currentTick);
  return true;
}

function canUseWoodenStaff(player) {
  const currentTick = system.currentTick;
  const lastUseTick = lastStaffUseTickByPlayer.get(player.id);

  if (lastUseTick !== undefined && currentTick - lastUseTick < ACTIVATION_DEBOUNCE_TICKS) {
    return false;
  }

  lastStaffUseTickByPlayer.set(player.id, currentTick);
  return true;
}

function hasItemInInventory(player, itemId) {
  const inventory = player.getComponent("minecraft:inventory");
  const container = inventory?.container;

  if (!container) {
    return false;
  }

  for (let slot = 0; slot < container.size; slot++) {
    const item = container.getItem(slot);

    if (item?.typeId === itemId && item.amount > 0) {
      return true;
    }
  }

  return false;
}

function isEnergyPulseOnCooldown(player) {
  const readyTick = energyPulseCooldownTickByPlayer.get(player.id);
  return readyTick !== undefined && system.currentTick < readyTick;
}

function startEnergyPulseCooldown(player) {
  energyPulseCooldownTickByPlayer.set(player.id, system.currentTick + ENERGY_PULSE_COOLDOWN_TICKS);
}

function getHorizontalDirection(vector) {
  const length = Math.hypot(vector.x, vector.z);

  if (length <= 0.0001) {
    return { x: 0, z: 1 };
  }

  return {
    x: vector.x / length,
    z: vector.z / length
  };
}

function getEnergyPulseTargets(player) {
  const origin = player.getHeadLocation();
  const direction = player.getViewDirection();
  const dimension = player.dimension;
  const targets = [];
  const seenIds = new Set();

  for (const entity of dimension.getEntities({ location: player.location, maxDistance: ENERGY_PULSE_RANGE + ENERGY_PULSE_RADIUS })) {
    if (entity.id === player.id || seenIds.has(entity.id) || !entity.hasComponent("minecraft:health")) {
      continue;
    }

    const targetLocation = {
      x: entity.location.x,
      y: entity.location.y + 0.8,
      z: entity.location.z
    };
    const toTarget = {
      x: targetLocation.x - origin.x,
      y: targetLocation.y - origin.y,
      z: targetLocation.z - origin.z
    };
    const forwardDistance = toTarget.x * direction.x + toTarget.y * direction.y + toTarget.z * direction.z;

    if (forwardDistance <= 0 || forwardDistance > ENERGY_PULSE_RANGE) {
      continue;
    }

    const totalDistanceSquared = toTarget.x ** 2 + toTarget.y ** 2 + toTarget.z ** 2;
    const lateralDistanceSquared = totalDistanceSquared - forwardDistance ** 2;

    if (lateralDistanceSquared > ENERGY_PULSE_RADIUS ** 2) {
      continue;
    }

    seenIds.add(entity.id);
    targets.push(entity);
  }

  return targets;
}

function applyEnergyPulseEffects(player, targets) {
  for (const target of targets) {
    try {
      target.applyDamage(ENERGY_PULSE_DAMAGE);

      const awayFromPlayer = getHorizontalDirection({
        x: target.location.x - player.location.x,
        z: target.location.z - player.location.z
      });

      target.applyKnockback({
        x: awayFromPlayer.x * ENERGY_PULSE_KNOCKBACK,
        z: awayFromPlayer.z * ENERGY_PULSE_KNOCKBACK
      }, ENERGY_PULSE_VERTICAL_KNOCKBACK);
    } catch {
      // Some entities can reject damage or knockback even with a health component.
    }
  }
}

function showEnergyPulseFeedback(player) {
  const origin = player.getHeadLocation();
  const direction = player.getViewDirection();

  player.onScreenDisplay.setActionBar("\u00a7dPulso de Energia I!");

  try {
    player.dimension.playSound("random.orb", player.location, { volume: 0.8, pitch: 1.4 });
  } catch {
  }

  for (let step = 1; step <= ENERGY_PULSE_RANGE; step++) {
    const location = {
      x: origin.x + direction.x * step,
      y: origin.y + direction.y * step,
      z: origin.z + direction.z * step
    };

    try {
      player.dimension.spawnParticle("minecraft:enchanting_table_particle", location);
    } catch {
    }
  }
}

function tryCastEnergyPulse(player) {
  if (!canUseWoodenStaff(player)) {
    return;
  }

  if (!hasActiveWoodenEmblem(player)) {
    showTemporaryActionbar(player, "\u00a77Nenhum Emblema ativo responde ao cajado.");
    return;
  }

  if (!hasItemInInventory(player, ENERGY_PULSE_SCROLL_ITEM_ID)) {
    showTemporaryActionbar(player, "\u00a77Voc\u00ea n\u00e3o conhece esta t\u00e9cnica.");
    return;
  }

  const { current } = ensureWoodenEmblemEnergy(player);

  if (current < ENERGY_PULSE_COST) {
    showTemporaryActionbar(player, "\u00a7cEnergia de Fenda insuficiente.");
    return;
  }

  if (isEnergyPulseOnCooldown(player)) {
    showTemporaryActionbar(player, "\u00a77Pulso de Energia ainda est\u00e1 se estabilizando.");
    return;
  }

  setWoodenEmblemEnergy(player, current - ENERGY_PULSE_COST);
  startEnergyPulseCooldown(player);
  applyEnergyPulseEffects(player, getEnergyPulseTargets(player));
  showEnergyPulseFeedback(player);
}

function setMainhandItem(player, itemId) {
  system.run(() => {
    const equippable = player.getComponent("minecraft:equippable");

    if (!equippable) {
      return;
    }

    equippable.setEquipment(EquipmentSlot.Mainhand, new ItemStack(itemId, 1));
  });
}

function activateWoodenEmblem(player) {
  if (!canToggleEmblem(player)) {
    return;
  }

  for (const tag of EMBLEM_LINEAGE_TAGS) {
    player.removeTag(tag);
  }

  player.addTag(ACTIVE_EMBLEM_TAG);
  player.addTag(WOODEN_EMBLEM_TAG);
  const { current, max } = ensureWoodenEmblemEnergy(player);
  showEnergyActionbar(player, current, max);
  player.sendMessage("\u00a7dO Emblema de Madeira pulsa fracamente. A Fenda reconhece sua presenca.");
  setMainhandItem(player, ACTIVE_WOODEN_EMBLEM_ITEM_ID);
}

function deactivateWoodenEmblem(player) {
  if (!canToggleEmblem(player)) {
    return;
  }

  player.removeTag(ACTIVE_EMBLEM_TAG);
  player.removeTag(WOODEN_EMBLEM_TAG);
  clearEnergyActionbar(player);
  player.sendMessage("\u00a77O Emblema de Madeira silencia. A Fenda se afasta por enquanto.");
  setMainhandItem(player, WOODEN_EMBLEM_ITEM_ID);
}

function updateActiveWoodenEmblemEnergy() {
  const shouldRegenerate = system.currentTick - lastEnergyRegenTick >= ENERGY_REGEN_INTERVAL_TICKS;

  if (shouldRegenerate) {
    lastEnergyRegenTick = system.currentTick;
  }

  for (const player of world.getPlayers()) {
    if (!hasActiveWoodenEmblem(player)) {
      continue;
    }

    const energyState = shouldRegenerate
      ? regenerateWoodenEmblemEnergy(player)
      : ensureWoodenEmblemEnergy(player);

    showEnergyActionbar(player, energyState.current, energyState.max);
  }
}

system.beforeEvents.startup.subscribe((event) => {
  event.itemComponentRegistry.registerCustomComponent("riftborn:ativar_emblema_madeira", {
    onUse({ source }) {
      if (!source || source.typeId !== "minecraft:player") {
        return;
      }

      activateWoodenEmblem(source);
    }
  });

  event.itemComponentRegistry.registerCustomComponent("riftborn:desativar_emblema_madeira", {
    onUse({ source }) {
      if (!source || source.typeId !== "minecraft:player") {
        return;
      }

      deactivateWoodenEmblem(source);
    }
  });

  event.itemComponentRegistry.registerCustomComponent("riftborn:usar_cajado_de_madeira", {
    onUse({ source }) {
      if (!source || source.typeId !== "minecraft:player") {
        return;
      }

      tryCastEnergyPulse(source);
    }
  });
});

world.afterEvents.itemUse.subscribe((event) => {
  if (!event.source || event.source.typeId !== "minecraft:player") {
    return;
  }

  if (event.itemStack?.typeId === WOODEN_EMBLEM_ITEM_ID) {
    activateWoodenEmblem(event.source);
    return;
  }

  if (event.itemStack?.typeId === ACTIVE_WOODEN_EMBLEM_ITEM_ID) {
    deactivateWoodenEmblem(event.source);
    return;
  }

  if (event.itemStack?.typeId === WOODEN_STAFF_ITEM_ID) {
    tryCastEnergyPulse(event.source);
  }
});

system.runInterval(updateActiveWoodenEmblemEnergy, ENERGY_ACTIONBAR_INTERVAL_TICKS);
