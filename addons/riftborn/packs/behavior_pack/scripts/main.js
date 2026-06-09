import { system, world } from "@minecraft/server";

const ACTIVE_EMBLEM_TAG = "riftborn_emblema_ativo";
const WOODEN_EMBLEM_TAG = "riftborn_emblema_madeira";
const WOODEN_EMBLEM_ITEM_ID = "riftborn:emblema_de_madeira";
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

function activateWoodenEmblem(player) {
  const currentTick = system.currentTick;
  const lastActivationTick = lastActivationTickByPlayer.get(player.id);

  if (lastActivationTick !== undefined && currentTick - lastActivationTick < ACTIVATION_DEBOUNCE_TICKS) {
    return;
  }

  lastActivationTickByPlayer.set(player.id, currentTick);

  for (const tag of EMBLEM_LINEAGE_TAGS) {
    player.removeTag(tag);
  }

  player.addTag(ACTIVE_EMBLEM_TAG);
  player.addTag(WOODEN_EMBLEM_TAG);
  player.sendMessage("§dO Emblema de Madeira pulsa fracamente. A Fenda reconhece sua presença.");
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
});

world.afterEvents.itemUse.subscribe((event) => {
  if (event.itemStack?.typeId !== WOODEN_EMBLEM_ITEM_ID) {
    return;
  }

  if (!event.source || event.source.typeId !== "minecraft:player") {
    return;
  }

  activateWoodenEmblem(event.source);
});
