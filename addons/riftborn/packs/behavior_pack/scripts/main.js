import { EquipmentSlot, system, world } from "@minecraft/server";

const ACTIVE_EMBLEM_TAG = "riftborn_emblema_ativo";
const WOODEN_EMBLEM_TAG = "riftborn_emblema_madeira";
const WOODEN_EMBLEM_ITEM_ID = "riftborn:emblema_de_madeira";
const WOODEN_STAFF_ITEM_ID = "riftborn:cajado_de_madeira";
const ENERGY_PULSE_SCROLL_ITEM_ID = "riftborn:pergaminho_magico_pulso_de_energia_i";
const RIFTED_WOODEN_BLADE_ITEM_ID = "riftborn:lamina_de_madeira_fendida";
const UNSTABLE_SLASH_SCROLL_ITEM_ID = "riftborn:pergaminho_lamina_corte_instavel_i";
const ACTIVATION_DEBOUNCE_TICKS = 5;
const WOODEN_EMBLEM_MAX_ENERGY = 20;
const ENERGY_REGEN_AMOUNT = 1;
const ENERGY_REGEN_INTERVAL_TICKS = 40;
const ENERGY_ACTIONBAR_INTERVAL_TICKS = 20;
const ENERGY_OBJECTIVE_ID = "rb_energy";
const ENERGY_MAX_OBJECTIVE_ID = "rb_energy_max";
const ENERGY_PULSE_COST = 5;
const ENERGY_PULSE_DAMAGE = 5;
const ENERGY_PULSE_RANGE = 10;
const ENERGY_PULSE_SPEED = 0.75;
const ENERGY_PULSE_HIT_RADIUS = 1.5;
const ENERGY_PULSE_SPAWN_OFFSET = 1.5;
const ENERGY_PULSE_PATH_SAMPLES = 6;
const STAFF_MIN_CHARGE_TICKS = 4;
const STAFF_MAX_CHARGE_TICKS = 20;
const ENERGY_PULSE_KNOCKBACK = 2;
const ENERGY_PULSE_VERTICAL_KNOCKBACK = 0.15;
const ENERGY_PULSE_COOLDOWN_TICKS = 20;
const ENERGY_PULSE_PROJECTILE_PARTICLES = [
  "minecraft:electric_spark_particle",
  "minecraft:witch_spell_particle"
];
const ENERGY_PULSE_IMPACT_PARTICLES = [
  "minecraft:witch_spell_particle",
  "minecraft:electric_spark_particle"
];
const UNSTABLE_SLASH_COST = 5;
const UNSTABLE_SLASH_DAMAGE = 5;
const UNSTABLE_SLASH_RANGE = 3;
const UNSTABLE_SLASH_RADIUS = 1.5;
const UNSTABLE_SLASH_KNOCKBACK = 1;
const UNSTABLE_SLASH_VERTICAL_KNOCKBACK = 0.1;
const UNSTABLE_SLASH_COOLDOWN_TICKS = 20;
const UNSTABLE_SLASH_PARTICLES = [
  "minecraft:dragon_breath_trail",
  "minecraft:witch_spell_particle",
  "minecraft:enchanting_table_particle",
  "minecraft:basic_smoke_particle"
];
const UNSTABLE_SLASH_MIN_FORWARD_DISTANCE = 0.5;
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
const lastBladeUseTickByPlayer = new Map();
const staffChargeByPlayer = new Map();
const energyPulseCooldownTickByPlayer = new Map();
const unstableSlashCooldownTickByPlayer = new Map();
const lastFailureMessageTickByPlayer = new Map();
const activeEnergyPulseProjectiles = [];

let lastEnergyRegenTick = system.currentTick;
let nextEnergyPulseProjectileId = 1;

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

function canUseRiftedWoodenBlade(player) {
  const currentTick = system.currentTick;
  const lastUseTick = lastBladeUseTickByPlayer.get(player.id);

  if (lastUseTick !== undefined && currentTick - lastUseTick < ACTIVATION_DEBOUNCE_TICKS) {
    return false;
  }

  lastBladeUseTickByPlayer.set(player.id, currentTick);
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

function isUnstableSlashOnCooldown(player) {
  const readyTick = unstableSlashCooldownTickByPlayer.get(player.id);
  return readyTick !== undefined && system.currentTick < readyTick;
}

function startUnstableSlashCooldown(player) {
  unstableSlashCooldownTickByPlayer.set(player.id, system.currentTick + UNSTABLE_SLASH_COOLDOWN_TICKS);
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

function normalizeVector(vector) {
  const length = Math.hypot(vector.x, vector.y, vector.z);

  if (length <= 0.0001) {
    return { x: 0, y: 0, z: 1 };
  }

  return {
    x: vector.x / length,
    y: vector.y / length,
    z: vector.z / length
  };
}

function distanceSquared(a, b) {
  return (a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2;
}

function addVectors(a, b) {
  return {
    x: a.x + b.x,
    y: a.y + b.y,
    z: a.z + b.z
  };
}

function scaleVector(vector, scale) {
  return {
    x: vector.x * scale,
    y: vector.y * scale,
    z: vector.z * scale
  };
}

function isBlockingBlock(dimension, location) {
  try {
    const block = dimension.getBlock(location);
    return !!block && block.typeId !== "minecraft:air" && block.typeId !== "minecraft:cave_air" && block.typeId !== "minecraft:void_air";
  } catch {
    return false;
  }
}

function spawnParticleFromList(dimension, location, particleIds) {
  for (const particleId of particleIds) {
    try {
      dimension.spawnParticle(particleId, location);
      return true;
    } catch {
    }
  }

  return false;
}

function spawnEnergyPulseParticle(dimension, location) {
  spawnParticleFromList(dimension, location, ENERGY_PULSE_PROJECTILE_PARTICLES);
}

function spawnEnergyPulseImpactParticle(dimension, location) {
  spawnParticleFromList(dimension, location, ENERGY_PULSE_IMPACT_PARTICLES);
}

function spawnUnstableSlashParticle(dimension, location) {
  for (const particleId of UNSTABLE_SLASH_PARTICLES) {
    try {
      dimension.spawnParticle(particleId, location);
    } catch {
    }
  }
}

function getPlayerAimOrigin(player) {
  const headLocation = player.getHeadLocation();

  return {
    x: headLocation.x,
    y: player.location.y + 0.1,
    z: headLocation.z
  };
}

function getStaffChargeRatio(startTick) {
  const elapsed = system.currentTick - startTick;

  if (elapsed < STAFF_MIN_CHARGE_TICKS) {
    return 0;
  }

  return clamp(elapsed / STAFF_MAX_CHARGE_TICKS, 0, 1);
}

function getEnergyPulseCastFailure(player) {
  if (!hasActiveWoodenEmblem(player)) {
    return "\u00a77Nenhum Emblema ativo responde ao cajado.";
  }

  if (!hasItemInInventory(player, ENERGY_PULSE_SCROLL_ITEM_ID)) {
    return "\u00a77Voc\u00ea n\u00e3o conhece esta t\u00e9cnica.";
  }

  const { current } = ensureWoodenEmblemEnergy(player);

  if (current < ENERGY_PULSE_COST) {
    return "\u00a7cEnergia de Fenda insuficiente.";
  }

  if (isEnergyPulseOnCooldown(player)) {
    return "\u00a77Pulso de Energia ainda est\u00e1 se estabilizando.";
  }

  return undefined;
}

function showAbilityActionbar(player, abilityName, current, max) {
  player.onScreenDisplay.setActionBar(`\u00a7d${abilityName} \u00a77| \u00a7dEnergia de Fenda: \u00a7f${current}\u00a77/\u00a7f${max}`);
}

function showEnergyPulseCastFeedback(player, current, max) {
  showAbilityActionbar(player, "Pulso de Energia I!", current, max);

  try {
    player.dimension.playSound("random.orb", player.location, { volume: 0.8, pitch: 1.4 });
  } catch {
  }
}

function showUnstableSlashCastFeedback(player, current, max) {
  showAbilityActionbar(player, "Corte Inst\u00e1vel I!", current, max);

  try {
    player.dimension.playSound("random.pop", player.location, { volume: 0.8, pitch: 1.6 });
  } catch {
  }
}

function applyEnergyPulseImpact(projectile, target) {
  try {
    target.applyDamage(ENERGY_PULSE_DAMAGE);

    const awayFromCaster = getHorizontalDirection({
      x: target.location.x - projectile.origin.x,
      z: target.location.z - projectile.origin.z
    });

    target.applyKnockback({
      x: awayFromCaster.x * ENERGY_PULSE_KNOCKBACK,
      z: awayFromCaster.z * ENERGY_PULSE_KNOCKBACK
    }, ENERGY_PULSE_VERTICAL_KNOCKBACK);
  } catch {
    // Some entities can reject damage or knockback even with a health component.
  }

  spawnEnergyPulseImpactParticle(projectile.dimension, target.location);

  try {
    projectile.dimension.playSound("random.pop", target.location, { volume: 0.8, pitch: 1.2 });
  } catch {
  }
}

function findEnergyPulseHit(projectile, location) {
  for (const entity of projectile.dimension.getEntities({ location, maxDistance: ENERGY_PULSE_HIT_RADIUS })) {
    if (entity.id === projectile.ownerId || projectile.hitEntityIds.has(entity.id) || !entity.hasComponent("minecraft:health")) {
      continue;
    }

    return entity;
  }

  return undefined;
}

function findEnergyPulseHitAlongRay(dimension, ownerId, origin, direction, maxDistance) {
  const projectile = {
    ownerId,
    dimension,
    hitEntityIds: new Set()
  };
  const steps = Math.ceil(maxDistance / 0.5);

  for (let step = 0; step <= steps; step++) {
    const location = addVectors(origin, scaleVector(direction, step * 0.5));
    const target = findEnergyPulseHit(projectile, location);

    if (target) {
      return { target, location };
    }
  }

  return undefined;
}

function spawnEnergyPulseProjectile(player, chargeRatio = 1) {
  const direction = normalizeVector(player.getViewDirection());
  const headLocation = player.getHeadLocation();
  const origin = addVectors(headLocation, scaleVector(direction, ENERGY_PULSE_SPAWN_OFFSET));
  const speed = ENERGY_PULSE_SPEED * (0.65 + chargeRatio * 0.35);
  const projectile = {
    id: nextEnergyPulseProjectileId++,
    ownerId: player.id,
    dimension: player.dimension,
    origin,
    location: origin,
    direction,
    speed,
    age: 0,
    traveled: 0,
    hitEntityIds: new Set()
  };

  const rayHit = findEnergyPulseHitAlongRay(
    player.dimension,
    player.id,
    headLocation,
    direction,
    ENERGY_PULSE_RANGE
  );

  if (rayHit) {
    projectile.location = rayHit.location;
    projectile.hitEntityIds.add(rayHit.target.id);
    applyEnergyPulseImpact(projectile, rayHit.target);
    return;
  }

  activeEnergyPulseProjectiles.push(projectile);
  spawnEnergyPulseParticle(player.dimension, origin);
}

function updateEnergyPulseProjectiles() {
  for (let index = activeEnergyPulseProjectiles.length - 1; index >= 0; index--) {
    const projectile = activeEnergyPulseProjectiles[index];
    let shouldRemove = false;

    projectile.age++;

    const previousLocation = projectile.location;
    const nextLocation = addVectors(previousLocation, scaleVector(projectile.direction, projectile.speed));
    const samples = ENERGY_PULSE_PATH_SAMPLES;

    for (let sample = 1; sample <= samples; sample++) {
      const location = addVectors(previousLocation, scaleVector({
        x: nextLocation.x - previousLocation.x,
        y: nextLocation.y - previousLocation.y,
        z: nextLocation.z - previousLocation.z
      }, sample / samples));

      if (isBlockingBlock(projectile.dimension, location)) {
        shouldRemove = true;
        break;
      }

      const target = findEnergyPulseHit(projectile, location);

      if (target) {
        projectile.hitEntityIds.add(target.id);
        applyEnergyPulseImpact(projectile, target);
        shouldRemove = true;
        break;
      }

      spawnEnergyPulseParticle(projectile.dimension, location);
    }

    projectile.location = nextLocation;
    projectile.traveled = Math.sqrt(distanceSquared(projectile.origin, projectile.location));

    if (projectile.traveled >= ENERGY_PULSE_RANGE || projectile.age > 30) {
      shouldRemove = true;
    }

    if (shouldRemove) {
      activeEnergyPulseProjectiles.splice(index, 1);
    }
  }
}

function releaseEnergyPulse(player, chargeRatio) {
  if (chargeRatio <= 0) {
    showTemporaryActionbar(player, "\u00a77Segure o cajado para concentrar o Pulso.");
    return false;
  }

  const failure = getEnergyPulseCastFailure(player);

  if (failure) {
    showTemporaryActionbar(player, failure);
    return false;
  }

  const { current } = ensureWoodenEmblemEnergy(player);
  const energyState = setWoodenEmblemEnergy(player, current - ENERGY_PULSE_COST);
  startEnergyPulseCooldown(player);
  spawnEnergyPulseProjectile(player, chargeRatio);
  showEnergyPulseCastFeedback(player, energyState.current, energyState.max);
  return true;
}

function isHoldingWoodenStaff(player) {
  const equippable = player.getComponent("minecraft:equippable");
  const mainhand = equippable?.getEquipment(EquipmentSlot.Mainhand);
  return mainhand?.typeId === WOODEN_STAFF_ITEM_ID;
}

function beginStaffCharge(player) {
  if (!isHoldingWoodenStaff(player) || staffChargeByPlayer.has(player.id)) {
    return;
  }

  staffChargeByPlayer.set(player.id, {
    startTick: system.currentTick
  });
}

function finishStaffCharge(player) {
  const charge = staffChargeByPlayer.get(player.id);
  staffChargeByPlayer.delete(player.id);

  if (!charge) {
    return;
  }

  const chargeRatio = getStaffChargeRatio(charge.startTick);
  releaseEnergyPulse(player, chargeRatio);
}

function updateStaffCharges() {
  for (const player of world.getPlayers()) {
    const charge = staffChargeByPlayer.get(player.id);

    if (!charge) {
      continue;
    }

    const chargeRatio = getStaffChargeRatio(charge.startTick);
    const direction = normalizeVector(player.getViewDirection());
    const tipLocation = addVectors(player.getHeadLocation(), scaleVector(direction, 0.7));

    spawnEnergyPulseParticle(player.dimension, tipLocation);
    player.onScreenDisplay.setActionBar(`\u00a7dConcentrando Pulso... \u00a7f${Math.round(chargeRatio * 100)}%`);
  }
}

function findUnstableSlashTargets(player) {
  const direction = getHorizontalDirection(player.getViewDirection());
  const baseLocation = getPlayerAimOrigin(player);
  const candidates = player.dimension.getEntities({
    location: baseLocation,
    maxDistance: UNSTABLE_SLASH_RANGE + UNSTABLE_SLASH_RADIUS + 1
  });
  const targets = [];
  const targetIds = new Set();

  for (const entity of candidates) {
    if (entity.id === player.id || targetIds.has(entity.id) || !entity.hasComponent("minecraft:health")) {
      continue;
    }

    const toTarget = {
      x: entity.location.x - baseLocation.x,
      z: entity.location.z - baseLocation.z
    };
    const forwardDistance = toTarget.x * direction.x + toTarget.z * direction.z;

    if (forwardDistance < UNSTABLE_SLASH_MIN_FORWARD_DISTANCE || forwardDistance > UNSTABLE_SLASH_RANGE) {
      continue;
    }

    const horizontalDistanceSquared = toTarget.x ** 2 + toTarget.z ** 2;
    const lateralDistanceSquared = Math.max(0, horizontalDistanceSquared - forwardDistance ** 2);

    if (lateralDistanceSquared > UNSTABLE_SLASH_RADIUS ** 2) {
      continue;
    }

    targetIds.add(entity.id);
    targets.push(entity);
  }

  return targets;
}

function applyUnstableSlashImpact(player, target) {
  try {
    target.applyDamage(UNSTABLE_SLASH_DAMAGE);

    const awayFromPlayer = getHorizontalDirection({
      x: target.location.x - player.location.x,
      z: target.location.z - player.location.z
    });

    target.applyKnockback({
      x: awayFromPlayer.x * UNSTABLE_SLASH_KNOCKBACK,
      z: awayFromPlayer.z * UNSTABLE_SLASH_KNOCKBACK
    }, UNSTABLE_SLASH_VERTICAL_KNOCKBACK);
  } catch {
    // Some entities can reject damage or knockback even with a health component.
  }
}

function spawnUnstableSlashFeedback(player) {
  const direction = getHorizontalDirection(player.getViewDirection());
  const right = { x: -direction.z, z: direction.x };
  const baseLocation = getPlayerAimOrigin(player);

  for (let distance = 0.5; distance <= UNSTABLE_SLASH_RANGE; distance += 0.5) {
    const arcScale = distance / UNSTABLE_SLASH_RANGE;

    for (const offset of [-1, -0.5, 0, 0.5, 1]) {
      for (const height of [0.8, 1.2, 1.6]) {
        const location = {
          x: baseLocation.x + direction.x * distance + right.x * offset * arcScale,
          y: baseLocation.y + height,
          z: baseLocation.z + direction.z * distance + right.z * offset * arcScale
        };

        spawnUnstableSlashParticle(player.dimension, location);
      }
    }
  }

  try {
    player.dimension.playSound("random.anvil_land", player.location, { volume: 0.15, pitch: 1.8 });
  } catch {
  }
}

function tryCastUnstableSlash(player) {
  if (!canUseRiftedWoodenBlade(player)) {
    return;
  }

  if (!hasActiveWoodenEmblem(player)) {
    showTemporaryActionbar(player, "\u00a77Nenhum Emblema ativo responde \u00e0 l\u00e2mina.");
    return;
  }

  if (!hasItemInInventory(player, UNSTABLE_SLASH_SCROLL_ITEM_ID)) {
    showTemporaryActionbar(player, "\u00a77Voc\u00ea n\u00e3o conhece esta t\u00e9cnica.");
    return;
  }

  const { current } = ensureWoodenEmblemEnergy(player);

  if (current < UNSTABLE_SLASH_COST) {
    showTemporaryActionbar(player, "\u00a7cEnergia de Fenda insuficiente.");
    return;
  }

  if (isUnstableSlashOnCooldown(player)) {
    showTemporaryActionbar(player, "\u00a77Corte Inst\u00e1vel ainda est\u00e1 se estabilizando.");
    return;
  }

  const energyState = setWoodenEmblemEnergy(player, current - UNSTABLE_SLASH_COST);
  startUnstableSlashCooldown(player);

  for (const target of findUnstableSlashTargets(player)) {
    applyUnstableSlashImpact(player, target);
  }

  spawnUnstableSlashFeedback(player);
  showUnstableSlashCastFeedback(player, energyState.current, energyState.max);
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
  player.sendMessage("\u00a7dO Emblema de Madeira pulsa fracamente. A Fenda reconhece sua presen\u00e7a.");
}

function deactivateWoodenEmblem(player) {
  if (!canToggleEmblem(player)) {
    return;
  }

  player.removeTag(ACTIVE_EMBLEM_TAG);
  player.removeTag(WOODEN_EMBLEM_TAG);
  clearEnergyActionbar(player);
  player.sendMessage("\u00a77O Emblema de Madeira silencia. A Fenda se afasta por enquanto.");
}

function toggleWoodenEmblem(player) {
  if (hasActiveWoodenEmblem(player)) {
    deactivateWoodenEmblem(player);
    return;
  }

  activateWoodenEmblem(player);
}

function clearPlayerRuntimeState(playerId) {
  lastActivationTickByPlayer.delete(playerId);
  staffChargeByPlayer.delete(playerId);
  lastBladeUseTickByPlayer.delete(playerId);
  energyPulseCooldownTickByPlayer.delete(playerId);
  unstableSlashCooldownTickByPlayer.delete(playerId);
  lastFailureMessageTickByPlayer.delete(playerId);
}

function restoreActiveEmblemFeedback(player) {
  if (!hasActiveWoodenEmblem(player)) {
    return;
  }

  const { current, max } = ensureWoodenEmblemEnergy(player);
  showEnergyActionbar(player, current, max);
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

      toggleWoodenEmblem(source);
    }
  });

  event.itemComponentRegistry.registerCustomComponent("riftborn:usar_lamina_de_madeira_fendida", {
    onUse({ source }) {
      if (!source || source.typeId !== "minecraft:player") {
        return;
      }

      tryCastUnstableSlash(source);
    }
  });
});

world.afterEvents.itemUse.subscribe((event) => {
  if (!event.source || event.source.typeId !== "minecraft:player") {
    return;
  }

  if (event.itemStack?.typeId === WOODEN_EMBLEM_ITEM_ID) {
    toggleWoodenEmblem(event.source);
    return;
  }

  if (event.itemStack?.typeId === RIFTED_WOODEN_BLADE_ITEM_ID) {
    tryCastUnstableSlash(event.source);
  }
});

function handleStaffStart(event) {
  if (!event.source || event.source.typeId !== "minecraft:player" || event.itemStack?.typeId !== WOODEN_STAFF_ITEM_ID) {
    return;
  }

  beginStaffCharge(event.source);
}

function handleStaffRelease(event) {
  if (!event.source || event.source.typeId !== "minecraft:player" || event.itemStack?.typeId !== WOODEN_STAFF_ITEM_ID) {
    return;
  }

  finishStaffCharge(event.source);
}

world.beforeEvents.playerInteractWithEntity.subscribe((event) => {
  if (!event.player || !isHoldingWoodenStaff(event.player)) {
    return;
  }

  event.cancel = true;
  beginStaffCharge(event.player);
});

world.afterEvents.itemStartUse.subscribe(handleStaffStart);
world.afterEvents.itemStartUseOn.subscribe(handleStaffStart);
world.afterEvents.itemReleaseUse.subscribe(handleStaffRelease);
world.afterEvents.itemStopUse.subscribe(handleStaffRelease);

world.afterEvents.playerSpawn.subscribe((event) => {
  if (!event.player) {
    return;
  }

  restoreActiveEmblemFeedback(event.player);
});

world.afterEvents.playerLeave.subscribe((event) => {
  clearPlayerRuntimeState(event.playerId);
});

system.runInterval(updateActiveWoodenEmblemEnergy, ENERGY_ACTIONBAR_INTERVAL_TICKS);
system.runInterval(updateStaffCharges, 2);
system.runInterval(updateEnergyPulseProjectiles, 1);
