import cmSettingsData from "../settings";

register('renderEntity', (entity, pos, ticks, event) => { // Hide falling blocks (like twinclaws, f7 floor when phase 3 start)
    if (cmSettingsData.hideFallingBlocks) { 
    cancel(event)
    }
}).setFilteredClass(Java.type("net.minecraft.entity.item.EntityFallingBlock").class)
