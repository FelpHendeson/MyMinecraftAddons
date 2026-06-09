import { EquipmentSlot, ItemStack, system, world } from "@minecraft/server";

const ACTIVE_EMBLEM_TAG = "riftborn_emblema_ativo";
const WOODEN_EMBLEM_TAG = "riftborn_emblema_madeira";
const WOODEN_EMBLEM_ITEM_ID = "riftborn:emblema_de_madeira";
const ACTIVE_WOODEN_EMBLEM_ITEM_ID = "riftborn:emblema_de_madeira_ativo";
const ACTIVATION_DEBOUNCE_TICKS = 5;
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
  player.sendMessage("§dO Emblema de Madeira pulsa fracamente. A Fenda reconhece sua presença.");
  setMainhandItem(player, ACTIVE_WOODEN_EMBLEM_ITEM_ID);
}

function deactivateWoodenEmblem(player) {
  if (!canToggleEmblem(player)) {
    return;
  }

  player.removeTag(ACTIVE_EMBLEM_TAG);
  player.removeTag(WOODEN_EMBLEM_TAG);
  player.sendMessage("§7O Emblema de Madeira silencia. A Fenda se afasta por enquanto.");
  setMainhandItem(player, WOODEN_EMBLEM_ITEM_ID);
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
