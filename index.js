// Must import other files here for them to work properly 
// OR 
// import this file in the other files

import cmSettingsData from "./settings";
import { data } from "./features/Utils.js"
import "./features/cmFunctions.js";
import "./features/cmOverlays.js";
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
import "./features/Features.js";

// import "./settings.js"

register("gameLoad", () => {
    ChatLib.chat("&6&l[Cores Module] &r&7Module Loaded");
});

const commands = [
    {cmd: "cm", description: "Open the settings"},
    {cmd: "cm help", description: "Show this message"}
];

const changelog = [
    {header: "+", description: "Fixed color replacor to work with skytils"},
    {header: "=", description: "Made it more user friendly"},
    {header: "-", description: "Nothing, I just need to test changelogs"}
]

const newVersion = "1.25.0"

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

const downloadMsgReg = register("step", () => {
    if (!World.isLoaded()) return
    // if (!isDataLoaded()) return To make later
    if (data.downloadMsg) {
        downloadMsgReg.unregister()
        return
    }
    ChatLib.chat(ChatLib.getChatBreak("&b-"))
    ChatLib.chat(`&aThanks for importing &6CoresModule`)
    ChatLib.chat(`&7> &ayou can open the settings with /cm`)
    ChatLib.chat(`&7> &aa list of useful commands with /cm help`)
    ChatLib.chat(ChatLib.getChatBreak("&b-"))

    data.downloadMsg = true
    data.changelogVersion = newVersion
    data.save()
    
    downloadMsgReg.unregister()
}).setFps(1)

const changeLogReg = register("step", () => {
    if (!World.isLoaded()) return
    // if (!isDataLoaded()) return To make later
    if (!data.downloadMsg) return 
    if (data.changelogVersion === newVersion) { 
        changeLogReg.unregister()
        return
    }
    ChatLib.chat(ChatLib.getChatBreak("&b-"))
    ChatLib.chat(`&6[SBO] &r&bVersion &e${newVersion}&r`)
    ChatLib.chat(`&aChangelog:`)
    changelog.forEach(({ header, description }) => {
        if (header == "+") ChatLib.chat(`&7> &a${header} Added: &e${description}`)
        if (header == "=") ChatLib.chat(`&7> &b${header} Changed: &e${description}`)
        if (header == "-") ChatLib.chat(`&7> &c${header} Removed: &e${description}`)
        
    });
    ChatLib.chat(ChatLib.getChatBreak("&b-"))

    data.changelogVersion = newVersion
    data.save()
    changeLogReg.unregister()
}).setFps(1)