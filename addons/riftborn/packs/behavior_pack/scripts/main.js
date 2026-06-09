import { EquipmentSlot, ItemStack, system, world } from "@minecraft/server";

const ACTIVE_EMBLEM_TAG = "riftborn_emblema_ativo";
const WOODEN_EMBLEM_TAG = "riftborn_emblema_madeira";
const WOODEN_EMBLEM_ITEM_ID = "riftborn:emblema_de_madeira";
const ACTIVE_WOODEN_EMBLEM_ITEM_ID = "riftborn:emblema_de_madeira_ativo";
const ACTIVATION_DEBOUNCE_TICKS = 5;
const WOODEN_EMBLEM_MAX_ENERGY = 20;
const ENERGY_REGEN_AMOUNT = 1;
const ENERGY_REGEN_INTERVAL_TICKS = 40;
const ENERGY_ACTIONBAR_INTERVAL_TICKS = 20;
const ENERGY_OBJECTIVE_ID = "rb_energy";
const ENERGY_MAX_OBJECTIVE_ID = "rb_energy_max";
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

function hasActiveWoodenEmblem(player) {
  return player.hasTag(ACTIVE_EMBLEM_TAG) && player.hasTag(WOODEN_EMBLEM_TAG);
}

function showEnergyActionbar(player, current, max) {
  player.onScreenDisplay.setActionBar(`\u00a7dEnergia de Fenda: \u00a7f${current}\u00a77/\u00a7f${max}`);
}

function clearEnergyActionbar(player) {
  player.onScreenDisplay.setActionBar("");
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
  }
});

system.runInterval(updateActiveWoodenEmblemEnergy, ENERGY_ACTIONBAR_INTERVAL_TICKS);
