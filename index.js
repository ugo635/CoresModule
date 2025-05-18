// Must import other files here for them to work properly 
// OR 
// import this file in the other files

import cmSettingsData from "./settings";
import { data } from "./features/Utils.js"
import "./features/cmFunc.js";
import "./features/cmOverlays.js";
import "./features/Inv.js";
import "./features/Diana.js";
import "./features/Stash.js";
import "./features/FallingBlocks.js";
import "./features/Mining.js";
import "./features/Party.js";
import "./features/ColorReplacor.js";
import "./features/Warps.js";
import "./features/Potions.js";
import "./features/viewAuctions.js";
import "./features/Features.js";


register("gameLoad", () => {
    ChatLib.chat("&6&l[Cores Module] &r&7Module Loaded");
});

const commands = [
    {cmd: "cm", description: "Open the settings", ph: ""},
    {cmd: "cm help", description: "Show this message", ph: ""},
    {cmd: "mymf <Number>", description: "Gives your mf on inquisitors -> &cSee /mf_help for details on the input", ph: "mymf 300"},
    {cmd: "mymf <Number> <MF From Kill Combo>", description: "Gives your mf on inquisitors: &cSee /mfCombo_help for details on the input", ph: "mymf 300 6"}
    
];

const changelog = [
    {header: "+", description: "New Custom Rank Replacor"},
    {header: "+", description: "New Fonted Names (like Bold, underlined, obfuscated, etc...)"},
    {header: "+", description: "New Player Tracker (see /cm help)"}
]

const newVersion = "1.32.0"

register("command", (args1, ...args) => {
    if (args1 == undefined || args1.toLowerCase() == "settings") {
        cmSettingsData.openGUI();
    } else {
        switch (args1.toLowerCase()) {
            case "help":
                ChatLib.chat(ChatLib.getChatBreak("&b-"))
                ChatLib.chat("&6[Cm] &eCommands:");
                commands.forEach(({ cmd, description, ph }) => {
                    if (ph == "") {
                        let text = new TextComponent("&7> &a/" + cmd + " &7- &e" + description)
                        .setClick("run_command", "/" + cmd)
                        .setHover("show_text", `&7Click to run &a/${cmd}`)
                        text.chat()
                    } else {
                        ph = ph.replace("/", "")
                        let text = new TextComponent("&7> &a/" + cmd + " &7- &e" + description)
                        .setClick("suggest_command", "/" + ph)
                        .setHover("show_text", `&7Click to suggest &a/${cmd}`)
                        text.chat()
                    }
                    
                });
                ChatLib.chat(ChatLib.getChatBreak("&b-"));
                break;
            default:
                ChatLib.chat("&6[Cm] &eUnknown command. Use /cm help for a list of commands")
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
    ChatLib.chat(`&6[CoresModule] &r&bVersion &e${newVersion}&r`)
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