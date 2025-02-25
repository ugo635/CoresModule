// Must import other files here for them to work properly 
// OR 
// import this file in the other files
import cmSettingsData from "./settings";
import "./features/Features.js";
import "./features/inv.js";
import "./features/Diana.js";
import "./features/Stash.js";
import "./features/FallingBlocks.js";
import "./features/Mining.js";
import "./features/Party.js";
import "./features/colorReplacor.js";

// import "./settings.js"

register("gameLoad", () => {
    ChatLib.chat("&6&l[Cores Module] &r&7Module Loaded");
});

register("command", () => {
    cmSettingsData.openGUI()
}).setName("Cm")

// register("chat", (msg, event) => {
//     if (!cmSettingsData.colorTagTrue) return
//     let message = ChatLib.getChatMessage(event, true);
//     if (msg.includes("MVP+") || msg.includes("VIP+")) {
//         if (cmSettingsData.colorTagTrue) {
//         if (combinations.some(combination => message.includes(combination))) {
//             if (cmSettingsData.colorUserTrue) {
//             const matchingCombination = combinations.find(combination => message.includes(combination));
//             playerColor = colorDict[cmSettingsData.colorUser] + player + '&r'
//             message = message.replace(matchingCombination, (message.includes("MVP") ? `[MVP${colorDict[cmSettingsData.colorTag]}+&b] ${playerColor}` : `[VIP${colorDict[cmSettingsData.colorTag]}+&a] ${playerColor}`));
//             ChatLib.chat(message)
//             cancel(event);
//             } else {
//                 const matchingCombination = combinations.find(combination => message.includes(combination));
//                 message = message.replace(matchingCombination, (message.includes("MVP") ? `[MVP${colorDict[cmSettingsData.colorTag]}+&b] ${player}&r` : `[VIP${colorDict[cmSettingsData.colorTag]}+&a] ${player}&r`));
//                 ChatLib.chat(message)
//                 cancel(event);
//             }
//         }
//     }
//     } else {
//         if (cmSettingsData.colorTagTrue && msg.includes(player)) {
//             const playerColor = colorDict[cmSettingsData.colorUser] + player + '&r'
//             message = message.replace(player, playerColor);
//             ChatLib.chat(message)
//             cancel(event);
//         }
//     }
// }).setCriteria("${msg}")