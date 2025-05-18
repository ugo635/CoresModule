import cmSettingsData from "../settings";
const ignoreListChest = [
    "⸕ Rough Amber Gemstone",
    "⸕ Flawed Amber Gemstone",
    "Gold Essence",
    "Diamond Essence",
    "Goblin Egg",
    "❤ Rough Ruby Gemstone",
    "❤ Flawed Ruby Gemstone",
    "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬",
    "REWARDS",
    "CHEST LOCKPICKED",
    "Ascension Rope",
    "❈ Rough Amethyst Gemstone",
    "❈ Flawed Amethyst Gemstone",
    "✎ Rough Sapphire Gemstone",
    "✎ Flawed Sapphire Gemstone"
];

register("chat", (message, event) => {
    if (cmSettingsData.hideUselessFromChest) return;
    if (ignoreListChest.some(item => message.includes(item)) && !message.includes("Party >")) cancel(event);
}).setCriteria("${message}");

register("chat", () => {
    Client.showTitle(`&6&lPickobulus is now available`, "", 0, 25, 35);
}).setCriteria("Pickobulus is now available!")

register("chat", () => {
    Client.showTitle(`&b&lDiamond Goblin`, "", 0, 25, 35);
}).setCriteria("A Diamond Goblin has spawned!")