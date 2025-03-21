import cmSettingsData from "../settings";

register("chat", (message, event) => {
    if (cmSettingsData.hideUselessFromChest) return;
    let ignoreListChest = [
        "⸕ Rough Amber Gemstone",
        "⸕ Flawed Amber Gemstone",
        "Gold Essence",
        "Diamond Essence",
        "Goblin Egg",
        "❤ Rough Ruby Gemstone",
        "❤ Flawed Ruby Gemstone",
        "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬",
        "REWARDS",
        "CHEST LOCKPICKED"
    ];
    if (ignoreListChest.some(item => message.includes(item)) && !message.includes("Party >")) {
        cancel(event);
    }

}).setCriteria("${message}");




register("chat", (message) => {
    if (message.includes("Pickobulus is now available!")) {
    Client.Companion.showTitle(`&6&lPickobulus is now available`, "", 0, 25, 35);
    }
}).setCriteria("${message}")

register("chat", (message) => {
    if (message.includes("A Diamond Goblin has spawned!")) {
    Client.Companion.showTitle(`&b&lDiamond Goblin`, "", 0, 25, 35);
    }
}).setCriteria("${message}")

