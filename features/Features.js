import cmSettingsData from "../settings";

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

    ChatLib.chat(`&kObfuscated&r : &\k`);
    ChatLib.chat(`&lBold : &&ll`);
    ChatLib.chat(`&mStrikethrough : &&mm`);
    ChatLib.chat(`&nUnderline : &&nn`);
    ChatLib.chat(`&oItalic : &&oo`);
    ChatLib.chat(`&rReset : &&rr`);
}).setName("color").setAliases("format");

register("command", () => {
    new TextComponent(`&6[CM] &r&eThis should appear`).setClick("run_command", `/ct copy Copy this`).setHover("show_text", "&eClick To Copy").chat();
    Client.Companion.showTitle(`&6&lBro we're showing msg on screen?`, "", 0, 25, 35);
    //ChatLib.command("pc Wut this?" + "test"); // Send message in chat -> /pc Wut this? test 
    ChatLib.chat("&6&lYipee");
    
}).setName("CmTestMsg").setAliases("cmtm");


// Chat reactions #00ff00


register("chat", (message) => {
    if (!cmSettingsData.SpookyWarning) return
    if (message == "SPOOKY! A Trick or Treat Chest has appeared!") {
    ChatLib.chat(`&6&l[Cm] Sooky Chest!`);
    Client.Companion.showTitle("&6&lSpooky Chest", "", 0, 25, 35);
    }

}).setCriteria("${message}");


register("chat", (message, event) => {
    if (!cmSettingsData.replaceAhMsg) return;
    const msg = ChatLib.getChatMessage(event, true);
    if (message.startsWith("You purchased") || message.startsWith("Visit the Auction House")) {
    new TextComponent(msg).setClick("run_command", "/ah").setHover("show_text", "&eClick To Open The AH").chat();
    cancel(event);
    }
}).setCriteria("${message}");

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

register("command", () => {
    ChatLib.clearChat();
}).setName("clear")

register("command", () => {
    let item = Player.getHeldItem();
    
    if (item && item.getNBT()) {
        let nbt = item.getNBT();
        let uuid = nbt.getTag("tag")?.getTag("ExtraAttributes")?.getString("uuid");

        if (uuid) {
            new TextComponent("&eItem UUID: &b" + uuid).setClick("run_command", `/ct copy ${uuid}`).setHoverValue("&eClick to copy").chat();
        }
    } else {
        ChatLib.chat("You're not holding a valid item!");
    }
}).setName("getMyItemUUID");


register('chat', (key) => {
    if (!cmSettingsData.FFWarning)
    new Thread(() => {
        Thread.sleep(1000);
        Client.showTitle("&cIn 4 sec", "&eGet Ready!", 0, 60, 0);

        World.playSound("random.burp", 2, 1);
        Thread.sleep(4000);
        
        Client.showTitle("&4NOW", "&eUSE THE Fire Freeze Staff", 0, 60, 0);
		World.playSound("random.anvil_land", 2, 1);
    }).start();
}).setCriteria("[BOSS] The Professor: Oh? You found my Guardians' one weakness?").setContains();
