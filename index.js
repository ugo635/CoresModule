// Must import other files here for them to work properly 
// OR 
// import this file in the other files
import cmSettingsData from "./settings";
import "./features/cmFunctions.js";
import "./features/cmOverlays.js";
import "./features/Features.js";
import "./features/Inv.js";
import "./features/Diana.js";
import "./features/Stash.js";
import "./features/FallingBlocks.js";
import "./features/Mining.js";
import "./features/Party.js";
import "./features/colorReplacor.js";
import "./features/Warps.js";
import "./features/Potions.js";
import "./features/viewAuctions.js";

// import "./settings.js"

register("gameLoad", () => {
    ChatLib.chat("&6&l[Cores Module] &r&7Module Loaded");
});

register("command", () => {
    cmSettingsData.openGUI()
}).setName("Cm")

