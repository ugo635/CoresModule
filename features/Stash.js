import { registerWhen } from "../../SBO/utils/variables";
import cmSettingsData from "../settings";


// register("command", () => {
//     cmSettingsData.changeStashClickAction = cmSettingsData.changeStashClickAction ? 0 : 1;
//     cmSettingsData.save();
//     ChatLib.chat(`&6&l[Cm] Replacing Stash Messages: ${cmSettingsData.changeStashClickAction ? "&aEnabled (/viewstash)" : "&cDisabled (/pickupstash)"}`);
// }).setName("pickupOrView");

// register("command", () => {
//     if (cmSettingsData.changeStashClickAction) {
//     cmSettingsData.vsMatOrItem = cmSettingsData.vsMatOrItem == 0 ? 1 : 0;
//     cmSettingsData.save();
//     ChatLib.chat(`&6&l[Cm] Stash View: ${cmSettingsData.vsMatOrItem == 0 ? "&a Set To Material" : "&c Set To Item"}`);
//     } else {
//         ChatLib.chat(`&6&l[Cm] You're currently on /pickupstash and not /viewstash, please do /pickupOrView and run this command again`);
//     }
// }).setName("vsMatOrItem");

registerWhen(register("chat", (message, event) => {
    const msg = ChatLib.getChatMessage(event, true)

    if ((message.includes("You have") && message.includes("materials stashed away!")) || 
    (message.includes("(This totals") && message.includes("type of material stashed!)")) ||
    (message.includes(">>> CLICK HERE to pick them up! <<<"))) {
    
    if (cmSettingsData.stashMsgEdit == true) {
        if (cmSettingsData.changeStashClickAction == 0) {
        if (cmSettingsData.vsMatOrItem == 0) {
        new TextComponent(msg).setClick("run_command", "/viewstash material").setHover("show_text", "&eClick To View Material Stash or do /pickupstash to pickup your stash (you can edit whether it view or pickup your stash doing /pickupOrView, and also edit whether they open material or item stash with /vsMatOrItem)").chat();
        cancel(event);
        } else {
        new TextComponent(msg).setClick("run_command", "/viewstash item").setHover("show_text", "&eClick To View Item Stash or do /pickupstash to pickup your stash (you can edit whether it view or pickup your stash doing /pickupOrView)").chat();
        cancel(event);
        }
    } else {
        new TextComponent(msg).setClick("run_command", "/pickupstash").setHover("show_text", "&eClick To Pickup Stash or do /viewstash [item or material] to see your stash and put them in sacks (you can edit whatever it view or pickup your stash doing /pickupOrView)").chat();
        cancel(event);
        }
    } 
}

}).setCriteria("${message}"), () => cmSettingsData.stashMsg)