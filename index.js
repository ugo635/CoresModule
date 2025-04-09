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

const commands = [
    {cmd: "cm", description: "Open the settings"},
    {cmd: "cm help", description: "Show this message"}
];

register("command", (args1, ...args) => {
    if (args1 == undefined ) {
        cmSettingsData.openGUI();
    } else {
        switch (args1.toLowerCase()) {
            case "help":
                ChatLib.chat("&6[SBO] &eCommands:");
                commands.forEach(({ cmd, description }) => {
                    let text = new TextComponent("&7> &a/" + cmd + " &7- &e" + description)
                    .setClick("run_command", "/" + cmd)
                    .setHover("show_text", `&7Click to run &a/${cmd}`)
                    text.chat()
                }); break;
            default:
                ChatLib.chat("&6[Cm] &eUnknown command. Use /sbo help for a list of commands")
                break;
        }
    }
}).setName("CoresModule").setAliases(["Cores", "Core", "Cm"]);

