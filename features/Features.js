import { getplayername, formatTime, getDianaMayorTotalProfitAndOfferType, calcPercentOne, getBurrowsPerHour, getMobsPerHour, setTimeout } from "../../SBO/utils/functions";
import { data, dianaTrackerMayor } from "../../SBO/utils/variables";
import { registerWhen } from "../../SBO/utils/variables";
import cmSettingsData from "../settings";


// classes / function

class format {
    BLACK = '&0' // #000000
    DARK_BLUE = '&1' // #0000AA
    DARK_GREEN = '&2' // #00AA00
    DARK_AQUA = '&3' // #00AAAA
    DARK_RED = '&4' // #AA0000
    DARK_PURPLE = '&5' // #AA00AA
    GOLD = '&6' // #FFAA00
    GRAY = '&7' // #AAAAAA
    DARK_GRAY = '&8' // #555555
    BLUE = '&9' // #5555FF
    GREEN = '&a' // #55FF55
    AQUA = '&b' // #55FFFF
    RED = '&c' // #FF5555
    LIGHT_PURPLE = '&d' // #FF55FF
    YELLOW = '&e' // #FFFF55
    WHITE = '&f' // #FFFFFF
    OBFUSCATED = '&k'
    BOLD = '&l'
    STRIKETHROUGH = '&m'
    UNDERLINE = '&n'
    ITALIC = '&o'
    RESET = '&r'
}


// setTimeout(() => {
//     ChatLib.command(`pc ${statsMsg}`);
// }, 200)


// Commands #00ff00

register("command", () => {
    ChatLib.chat(`&0Black: &0&lBold Black : &&00`);
    ChatLib.chat(`&1Dark Blue: &1&lBold Dark Blue : &&11`);
    ChatLib.chat(`&2Dark Green: &2&lBold Dark Green : &&22`);
    ChatLib.chat(`&3Dark Aqua: &3&lBold Dark Aqua : &&33`);
    ChatLib.chat(`&4Dark Red: &4&lBold Dark Red : &&44`);
    ChatLib.chat(`&5Dark Purple: &5&lBold Dark Purple : &&55`);
    ChatLib.chat(`&6Gold: &6&lBold Gold : &&66`);
    ChatLib.chat(`&7Gray: &7&lBold Gray : &&77`);
    ChatLib.chat(`&8Dark Gray: &8&lBold Dark Gray : &&88`);
    ChatLib.chat(`&9Blue: &9&lBold Blue : &&99`);
    ChatLib.chat(`&aGreen: &a&lBold Green : &&aa`);
    ChatLib.chat(`&bAqua: &b&lBold Aqua : &&bb`);
    ChatLib.chat(`&cRed: &c&lBold Red : &&cc`);
    ChatLib.chat(`&dLight Purple: &d&lBold Light Purple : &&dd`);
    ChatLib.chat(`&eYellow: &e&lBold Yellow : &&ee`);
    ChatLib.chat(`&fWhite: &f&lBold White : &&ff`);

    ChatLib.chat(`&kObfuscated : &&kk`);
    ChatLib.chat(`&lBold : &&ll`);
    ChatLib.chat(`&mStrikethrough : &&mm`);
    ChatLib.chat(`&nUnderline : &&nn`);
    ChatLib.chat(`&oItalic : &&oo`);
    ChatLib.chat(`&rReset : &&rr`);
}).setName("color").setAliases("format");

register("command", () => {
    new TextComponent(`&6[SBO] &r&eTook &r&c${data.minotaursSinceStick} &r&eMinotaurs to get a Daedalus Stick!`).setClick("run_command", `/ct copy [SBO] Took ${data.minotaursSinceStick} Minotaurs to get a Daedalus Stick!`).setHover("show_text", "&eClick To Copy").chat();
    Client.Companion.showTitle(`&6&lBro we're showing msg on screen?`, "", 0, 25, 35);
    //ChatLib.command("pc Wut this?" + "test"); // Send message in chat -> /pc Wut this? test 
    ChatLib.chat("&6&lYipee");
    
}).setName("MyModuleTestMsg").setAliases("mmtm");


// Chat reactions #00ff00


register("chat", (message) => {
        if (message == "SPOOKY! A Trick or Treat Chest has appeared!") {
        ChatLib.chat(`&6&l[Cm] Sooky Chest!`);
        Client.Companion.showTitle("&6&lSpooky Chest", "", 0, 25, 35);
        }
    
}).setCriteria("${message}");


registerWhen(register("chat", (message, event) => {
    const msg = ChatLib.getChatMessage(event, true); // get the raw msg with colors
    if (message.startsWith("You purchased") || message.startsWith("Visit the Auction House")) {
    new TextComponent(msg).setClick("run_command", "/ah").setHover("show_text", "&eClick To Open The AH").chat();
    cancel(event);
    }
}).setCriteria("${message}"), () => cmSettingsData.replaceAhMsg);

register("command", () => {
ChatLib.command("warp base")
}).setName("base")

let lastMinute = -1;


register("step", () => {
    if (!cmSettingsData.darkAuction || !cmSettingsData.jacob) return;
    
    let currentMinute = new Date().getMinutes();

    if (currentMinute === 54 && lastMinute !== 54 && cmSettingsData.darkAuction) {
        Client.Companion.showTitle("&l&c Dark Auction", "", 0, 25, 35);
        lastMinute = 54;
    } else if (currentMinute === 15 && lastMinute !== 15 && cmSettingsData.jacob) {
        Client.Companion.showTitle("&l&d Jacob Starts!", "", 0, 25, 35);
        lastMinute = 15;
    }

    if (currentMinute !== lastMinute) {
        lastMinute = currentMinute;
    }
}, 30);


register("chat", (player) => {
    if (!cmSettingsData.cf) return
    coin = Math.random() < 0.5 ? "heads" : "tails";
    ChatLib.command(`pc ${player.split(" ").length > 0 ? player.split(" ")[1] : player} flipped ${coin}`);
}).setCriteria("Party > ${player}: !cf")
register("chat", (player) => {
    if (!cmSettingsData.cf) return
    coin = Math.random() < 0.5 ? "heads" : "tails";
    ChatLib.command(`pc ${player.split(" ").length > 0 ? player.split(" ")[1] : player} flipped ${coin}`);
}).setCriteria("Party > ${player}: !coinflip")

register("chat", (player) => {
    if (!cmSettingsData.dice) return
    dice = Math.floor(Math.random() * 6) + 1;
    ChatLib.command(`pc ${player.split(" ").length > 0 ? player.split(" ")[1] : player} rolled ${dice}`);
}).setCriteria("Party > ${player}: !dice")

register("chat", () => {
    ChatLib.command('sboqueue', true)
}).setCriteria("Party > ${player}: !sboqueue")

register("chat", (player, island, event) => {
    if (!cmSettingsData.follow) return
    cancel(event);
}).setCriteria(" » ${player} is traveling to ${island} FOLLOW")


const colorDict = {
    0 : '&0', // #000000
    1 : '&1', // #0000AA
    2 : '&2', // #00AA00
    3 : '&3', // #00AAAA
    4 : '&4', // #AA0000
    5 : '&5', // #AA00AA
    6 : '&6', // #FFAA00
    7 : '&7', // #AAAAAA
    8 : '&8', // #555555
    9 : '&9', // #5555FF
    a : '&a', // #55FF55
    b : '&b', // #55FFFF
    c : '&c', // #FF5555
    d : '&d', // #FF55FF
    e : '&e', // #FFFF55
    f : '&f' // #FFFFFF
}

const combinations = [
    "VIP&a+", "VIP&b+", "VIP&c+", "VIP&d+", "VIP&e+", "VIP&0+", "VIP&1+", "VIP&2+", "VIP&3+", "VIP&4+", 
    "VIP&5+", "VIP&6+", "VIP&7+", "VIP&8+", "VIP&9+",
    "MVP&a+", "MVP&b+", "MVP&c+", "MVP&d+", "MVP&e+", "MVP&0+", "MVP&1+", "MVP&2+", "MVP&3+", "MVP&4+", 
    "MVP&5+", "MVP&6+", "MVP&7+", "MVP&8+", "MVP&9+",
    "MVP&r&d+&r", "MVP&r&e+&r", "MVP&r&0+&r", "MVP&r&1+&r", "MVP&r&2+&r", "MVP&r&3+&r", "MVP&r&4+&r", 
    "MVP&r&5+&r", "MVP&r&6+&r", "MVP&r&7+&r", "MVP&r&8+&r", "MVP&r&9+&r",
    "VIP&r&d+&r", "VIP&r&e+&r", "VIP&r&0+&r", "VIP&r&1+&r", "VIP&r&2+&r", "VIP&r&3+&r", "VIP&r&4+&r", 
    "VIP&r&5+&r", "VIP&r&6+&r", "VIP&r&7+&r", "VIP&r&8+&r", "VIP&r&9+&r"
];

register("chat", (msg, event) => {
    if (!cmSettingsData.colorTagTrue) return
    let message = ChatLib.getChatMessage(event, true)
    if (msg.includes("MVP+") || msg.includes("VIP+")) {
        if (combinations.some(combination => message.includes(combination))) {
            const matchingCombination = combinations.find(combination => message.includes(combination));
            message = message.replace(matchingCombination, (message.includes("MVP") ? `MVP${colorDict[cmSettingsData.colorTag]}+` : `VIP${colorDict[cmSettingsData.colorTag]}+`));
            ChatLib.chat(message)
            cancel(event);
        }
    }
}).setCriteria("${msg}")
