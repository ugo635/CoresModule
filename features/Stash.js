import cmSettingsData from "../settings";

register("chat", (message, event) => {
    if (!cmSettingsData.stashMsgEdit) return;
    const msg = ChatLib.getChatMessage(event, true)
    if ((message.includes("You have") && message.includes("material stashed away!")) || 
    (message.includes("You have") && message.includes("materials stashed away!")) || 
    (message.includes("(This totals") && message.includes("type of material stashed!)")) ||
    (message.includes(">>> CLICK HERE to pick them up! <<<")) ||
    (message.includes(">>> CLICK HERE to pick it up! <<<"))
    ) {
    if (cmSettingsData.stashMsgEdit == true) {
        if (cmSettingsData.changeStashClickAction == 0) {
            new TextComponent(msg).setClick("run_command", "/viewstash material").setHover("show_text", "&eClick To View Material Stash or do /pickupstash to pickup your stash (if you need to open the stash for item rather than material, do /viewstash item)").chat();
            cancel(event);
        } else if (cmSettingsData.changeStashClickAction == 1) {
            new TextComponent(msg).setClick("run_command", "/pickupstash").setHover("show_text", "&eClick To Pickup Stash or do /viewstash material to see your stash and put them in sacks").chat();
            cancel(event);
        } else {
            cancel(event)
        }
    } 
    }
}).setCriteria("${message}")
