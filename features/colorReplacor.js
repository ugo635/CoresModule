import cmSettingsData from "../settings";

const colorDict = {
    0 : '§0', // #000000
    1 : '§1', // #0000AA
    2 : '§2', // #00AA00
    3 : '§3', // #00AAAA
    4 : '§4', // #AA0000
    5 : '§5', // #AA00AA
    6 : '§6', // #FFAA00
    7 : '§7', // #AAAAAA
    8 : '§8', // #555555
    9 : '§9', // #5555FF
    10 : '§a', // #55FF55
    11 : '§b', // #55FFFF
    12 : '§c', // #FF5555
    13 : '§d', // #FF55FF
    14 : '§e', // #FFFF55
    15 : '§f' // #FFFFFF
}

let player = Player.getName()

register("command", (...args) => {
    ChatLib.chat("If you want to add colors to your rank, a color is a '&' follow by a number from 0 to 9 or a letter from a to f, f being white (default), if you don't have custom username color, add '&' followed by the color code of your username)")
}).setName("customRankHelp")

// Color Test
testing_list = [
    `&r&8[&r&d331&r&8] &r&b&lᛝ &6[MVP&d++&6] ${player}&r: &fHi, I'm M++`,
    `&r&8[&r&d331&r&8] &r&b&lᛝ &b[MVP&d+&b] ${player}&r: &fHi, I'm M+`,
    `&r&8[&r&d331&r&8] &r&b&lᛝ &a[VIP&6+&a] ${player}&r: &fHi, I'm V+`,
    `&r&8[&r&d331&r&8] &r&b&lᛝ &b[MVP&b] ${player}&r: &fHi, I'm M`,
    `&r&8[&r&d331&r&8] &r&b&lᛝ &a[VIP&a] ${player}&r: &fHi, I'm V`,
    `&r&8[&r&d331&r&8] &r&b&lᛝ &7${player}&r&7: Hi, I'm rankless! Hi ${player} wsp?`,
    `&6[MVP&d++&6] ${player}&r: &fHi, I'm M++`,
    `&b[MVP&d+&b] ${player}&r: &fHi, I'm M+`,
    `&a[VIP&6+&a] ${player}&r: &fHi, I'm V+`,
    `&b[MVP&b] ${player}&r: &fHi, I'm M`,
    `&a[VIP&a] ${player}&r: &fHi, I'm V`,
    `&7${player}&r&7: Hi, I'm rankless! Hi ${player} wsp?`
]

register("command", () => {
    testing_list.forEach((test_msg) => {
    ChatLib.simulateChat(test_msg)
    })
}).setName("colorTests").setAliases("colorTest")

register("command", () => {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
        testing_list.forEach((test_msg) => {
        ChatLib.simulateChat(test_msg)
        })
        cmSettingsData.newRank += 1;
        if (cmSettingsData.newRank > 5) cmSettingsData.newRank = 0;
    }, 500 * i)
    }
}).setName("colorTests2").setAliases("colorTest2")

let newRankDict = {
    0: `§6[MVP${colorDict[cmSettingsData.colorTag]}++§6]`,
    1 : `§b[MVP${colorDict[cmSettingsData.colorTag]}+§b]`,
    2 : `§b[MVP]`,
    3 : `[VIP${colorDict[cmSettingsData.colorTag]}+§a]`,
    4 : `§b[VIP]`,
    5 : `${player}`
}

let rankDict = {
    0: `MVP++`,
    1 : `MVP+`,
    2 : `MVP`,
    3 : `VIP+`,
    4 : `VIP`,
    5 : `rankless`,
}

let newPlayerRank = (cmSettingsData.customRank) ? cmSettingsData.rankText.replaceAll("&", "§") : newRankDict[cmSettingsData.newRank]
let wantRank = rankDict[cmSettingsData.newRank] != "rankless"

function UpdateInfos() {
    newRankDict = {
        0: `§6[MVP${colorDict[cmSettingsData.colorTag]}++§6]`,
        1 : `§b[MVP${colorDict[cmSettingsData.colorTag]}+§b]`,
        2 : `§b[MVP]`,
        3 : `§a[VIP${colorDict[cmSettingsData.colorTag]}+§a]`,
        4 : `§a[VIP]`,
        5 : `${player}`,
    }

    rankDict = {
        0: `MVP++`,
        1 : `MVP+`,
        2 : `MVP`,
        3 : `VIP+`,
        4 : `VIP`,
        5 : `rankless`,
    }
    newPlayerRank = (cmSettingsData.customRank) ? cmSettingsData.rankText.replaceAll("&", "§") : newRankDict[cmSettingsData.newRank]
    wantRank = rankDict[cmSettingsData.newRank] != "rankless"
}

UpdateInfos()

const combinations = [
    `[VIP&r&6+&r&a] ${player}`,
    `[VIP&6+&a] ${player}`,
    `[MVP&r&b] ${player}`,
    `[MVP&b] ${player}`,
    `[VIP&r&a] ${player}`,
    `[VIP&a] ${player}`,

    `[MVP&a+&b] ${player}`, `[MVP&b+&b] ${player}`, `[MVP&c+&b] ${player}`, `[MVP&d+&b] ${player}`, 
    `[MVP&e+&b] ${player}`, `[MVP&f+&b] ${player}`, `[MVP&0+&b] ${player}`, `[MVP&1+&b] ${player}`, 
    `[MVP&2+&b] ${player}`, `[MVP&3+&b] ${player}`, `[MVP&4+&b] ${player}`, `[MVP&5+&b] ${player}`,
    `[MVP&6+&b] ${player}`, `[MVP&7+&b] ${player}`, `[MVP&8+&b] ${player}`, `[MVP&9+&b] ${player}`,
    
    `[MVP&r&a+&r&b] ${player}`, `[MVP&r&b+&r&b] ${player}`, `[MVP&r&c+&r&b] ${player}`, `[MVP&r&d+&r&b] ${player}`,
    `[MVP&r&e+&r&b] ${player}`, `[MVP&r&f+&r&b] ${player}`, `[MVP&r&0+&r&b] ${player}`, `[MVP&r&1+&r&b] ${player}`,
    `[MVP&r&2+&r&b] ${player}`, `[MVP&r&3+&r&b] ${player}`, `[MVP&r&4+&r&b] ${player}`, `[MVP&r&5+&r&b] ${player}`,
    `[MVP&r&6+&r&b] ${player}`, `[MVP&r&7+&r&b] ${player}`, `[MVP&r&8+&r&b] ${player}`, `[MVP&r&9+&r&b] ${player}`,

    `[MVP&a++&6] ${player}`, `[MVP&b++&6] ${player}`, `[MVP&c++&6] ${player}`, `[MVP&d++&6] ${player}`, 
    `[MVP&e++&6] ${player}`, `[MVP&f++&6] ${player}`, `[MVP&0++&6] ${player}`, `[MVP&1++&6] ${player}`,
    `[MVP&2++&6] ${player}`, `[MVP&3++&6] ${player}`, `[MVP&4++&6] ${player}`, `[MVP&5++&6] ${player}`,
    `[MVP&6++&6] ${player}`, `[MVP&7++&6] ${player}`, `[MVP&8++&6] ${player}`, `[MVP&9++&6] ${player}`,
    
    `[MVP&r&a++&r&6] ${player}`, `[MVP&r&b++&r&6] ${player}`, `[MVP&r&c++&r&6] ${player}`, `[MVP&r&d++&r&6] ${player}`,
    `[MVP&r&e++&r&6] ${player}`, `[MVP&r&f++&r&6] ${player}`, `[MVP&r&0++&r&6] ${player}`, `[MVP&r&1++&r&6] ${player}`,
    `[MVP&r&2++&r&6] ${player}`, `[MVP&r&3++&r&6] ${player}`, `[MVP&r&4++&r&6] ${player}`, `[MVP&r&5++&r&6] ${player}`,
    `[MVP&r&6++&r&6] ${player}`,  `[MVP&r&7++&r&6] ${player}`, `[MVP&r&8++&r&6] ${player}`, `[MVP&r&9++&r&6] ${player}`,
    `${player}`
];

register("chat", (msg, event) => {
    if (!cmSettingsData.colorUserTrue && !cmSettingsData.colorTagTrue && !cmSettingsData.customRank) return;
    if (!msg.includes("MVP+") && !msg.includes("VIP+") && !msg.includes("MVP++") && !msg.includes("MVP") && !msg.includes("VIP") && !msg.includes(player)) return;
    let msg2 = ChatLib.getChatMessage(event, true);
    let rank = msg.includes("[MVP++]") ? "MVP++" : msg.includes("[MVP+]") ? "MVP+" : msg.includes("[MVP]") ? "MVP" : msg.includes("[VIP+]") ? "VIP+" : msg.includes("[VIP]") ? "VIP" : "rankless";
    let msg3 = new Message(event).getMessageParts();

    // Fuse Message
    let i = 0;
    let iterations = 0;
    const maxIterations = 1000;

    while (i < msg3.length - 1 && iterations < maxIterations) {
        iterations++;
        const elem = msg3[i];
        const elem2 = msg3[i + 1];

        const noActions = (e) =>
            e.getHoverAction?.() == null &&
            e.getHoverValue?.() == null &&
            e.getClickAction?.() == null &&
            e.getClickValue?.() == null;

        if (noActions(elem) && noActions(elem2)) {
            elem.text += elem2.text;
            msg3[i + 1] = null;
        } else {
            i++;
        }
        msg3 = msg3.filter(item => item !== null);
    }

    if (iterations === maxIterations) {
        console.warn("Fusion stopped after reaching max iterations (possible infinite loop).");
    }

    // Tag Replace
    if (combinations.some(combination => msg2.includes(combination))) {
        let matchingCombination = combinations.find(combination => msg2.includes(combination));
        if (cmSettingsData.colorTagTrue || cmSettingsData.customRank) {
            matchingCombination = matchingCombination.slice(0, matchingCombination.length - (player.length + 1)).replaceAll("&", "§")
            UpdateInfos()
            msg3.forEach(element => {
                if ((cmSettingsData.newRank != 5 && cmSettingsData.newTag) || !cmSettingsData.newTag) {
                if (cmSettingsData.newTag || cmSettingsData.customRank) {
                    if (rank === "rankless") {
                        element.text = element.text.replace(player, `${newPlayerRank} ${player}`);
                    } else {
                        element.text = element.text.replace(matchingCombination, newPlayerRank);
                    }
                } else {
                    switch (rank) {
                        case "MVP++":
                            element.text = element.text.replace(matchingCombination, `[MVP${colorDict[cmSettingsData.colorTag]}++§6]`);
                            break;
                        case "MVP+":
                            element.text = element.text.replace(matchingCombination, `[MVP${colorDict[cmSettingsData.colorTag]}+§b]`);
                            break;
                        case "VIP+":
                            element.text = element.text.replace(matchingCombination, `[VIP${colorDict[cmSettingsData.colorTag]}+§a]`);
                            break;
                        default:
                            break;
                    }
                }} else {
                switch (rank) {
                    case "MVP++":
                        element.text = element.text.replace(matchingCombination, "").replace(" ", "");
                        break;
                    case "MVP+":
                        element.text = element.text.replace(matchingCombination, "").replace(" ", "");
                        break;
                    case "MVP":
                        element.text = element.text.replace(matchingCombination, "").replace(" ", "");
                        break;
                    case "VIP+":
                        element.text = element.text.replace(matchingCombination, "").replace(" ", "");
                        break;
                    case "VIP":
                        element.text = element.text.replace(matchingCombination, "").replace(" ", "");
                        break;
                    case "rankless":
                        break;
                }}
            });
        }
    }

    // Player Replace
    cmSettingsData.fontedVal.replace("&", "§")
    if (cmSettingsData.colorUserTrue) {
        UpdateInfos()
        if (rank != "rankless") {
            msg3.forEach(element => {
                if (cmSettingsData.fontedName) {
                    element.text = element.text.replace(player, `${colorDict[cmSettingsData.colorUser]}${cmSettingsData.fontedVal.replace("&", "§") + player}§f`)
                } else {
                    element.text = element.text.replace(player, `${colorDict[cmSettingsData.colorUser]}${player}§f`)
                }
                
            });
        } else {
            msg3.forEach(element => {
                if (!(wantRank && (cmSettingsData.newTag || cmSettingsData.customRank))) {
                element.text = element.text.replace(player, `${colorDict[cmSettingsData.colorUser]}${(cmSettingsData.fontedName) ? cmSettingsData.fontedVal + player : player}§r§f`)
                } else {
                element.text = element.text.replace(`${player}§7§r§7`, `${colorDict[cmSettingsData.colorUser]}${(cmSettingsData.fontedName) ? cmSettingsData.fontedVal + player : player}§r§f`)
                element.text = element.text.replace(`${player}§r§7`, `${colorDict[cmSettingsData.colorUser]}${(cmSettingsData.fontedName) ? cmSettingsData.fontedVal + player : player}§r§f`)
                element.text = element.text.replace(`${player}§7`, `${colorDict[cmSettingsData.colorUser]}${(cmSettingsData.fontedName) ? cmSettingsData.fontedVal + player : player}§r§f`)
                element.text = element.text.replaceAll(`${player}`, `${colorDict[cmSettingsData.colorUser]}${(cmSettingsData.fontedName) ? cmSettingsData.fontedVal + player : player}§r§f`)
                }
            });
        }
    } else if (cmSettingsData.customRank) {
        msg3.forEach(element => {
            if (!(wantRank && (cmSettingsData.newTag || cmSettingsData.customRank))) {
                element.text = element.text.replace(player, `${(cmSettingsData.fontedName) ? cmSettingsData.fontedVal + player : player}§r§f`)
                } else {
                element.text = element.text.replace(`${player}§7§r§7`, `${(cmSettingsData.fontedName) ? cmSettingsData.fontedVal + player : player}§r§f`)
                element.text = element.text.replace(`${player}§r§7`, `${(cmSettingsData.fontedName) ? cmSettingsData.fontedVal + player : player}§r§f`)
                element.text = element.text.replace(`${player}§7`, `${(cmSettingsData.fontedName) ? cmSettingsData.fontedVal + player : player}§r§f`)
                element.text = element.text.replaceAll(`${player}`, `${player}§r§f`)
                }
        })
    }


    // Send the message
    let fmsg = textCompToChatComponent(new Message(msg3).getMessageParts())
    fmsg = replaceDupe(fmsg)
    event.message = fmsg
}).setCriteria("${msg}")

const ChatComponentText = Java.type("net.minecraft.util.ChatComponentText")
const IChatComponent = Java.type("net.minecraft.util.IChatComponent")
const HoverEvent = Java.type("net.minecraft.event.HoverEvent")
const ClickEvent = Java.type("net.minecraft.event.ClickEvent")
const ChatStyle = Java.type("net.minecraft.util.ChatStyle")

function stringToChatComponent(message) {
    return new ChatComponentText(message).func_150257_a(new ChatComponentText(""));;
}

function eventAction(act) {
    switch(act) {
        case "show_text":
            return HoverEvent.Action.SHOW_TEXT;
        case "show _item":
            return HoverEvent.Action.SHOW_ITEM;
        case "show_entity":
            return HoverEvent.Action.SHOW_ENTITY;
        case "show_achievement":
            return HoverEvent.Action.SHOW_ACHIEVEMENT;
        case "run_command":
            return ClickEvent.Action.RUN_COMMAND;
        case "suggest_command":
            return ClickEvent.Action.SUGGEST_COMMAND;
        case "open_url":
            return ClickEvent.Action.OPEN_URL;
        case "change_page":
            return ClickEvent.Action.CHANGE_PAGE;
        case "open_file":
            return ClickEvent.Action.OPEN_FILE;
        default:
            return null;
    }
}

function replaceDupe(comp) {
    comp.forEach((textComponent) => {
        textComponent.text = textComponent.text.replace("§r§r§r§r§r§r§r", "").replace("§r§r§r§r§r§r", "").replace("§r§r§r§r§r", "").replace("§r§r§r§r","").replace("§r§r§r","").replace("§r§r","").replace("§r","")
        if (textComponent.func_150253_a()/* getSiblings */.length > 0) {
            textComponent.func_150253_a().forEach((siblings) => {
                replaceDupe(siblings)
            })
        }
    })
    return comp
}

function textCompToChatComponent(comp) {
    let fullComponent = new ChatComponentText(comp[0].text);
    comp.slice(1).forEach((textComponent) => {
        let componentText = new ChatComponentText(textComponent.text);
        let hoverAction = eventAction(textComponent.hoverAction);
        const hoverValue = textComponent.hoverValue;
        let clickAction = eventAction(textComponent.clickAction);
        const clickValue = textComponent.clickValue;

        if (hoverAction && hoverValue && clickAction && clickValue) {
            hoverAction = hoverAction
            clickAction = clickAction
            const hover = new HoverEvent(hoverAction, new ChatComponentText(hoverValue));
            const click = new ClickEvent(clickAction, clickValue);
            componentText.func_150255_a(new ChatStyle().func_150209_a(hover).func_150241_a(click))
        } else if (hoverAction && hoverValue && !clickAction && !clickValue) {
            hoverAction = hoverAction
            const hover = new HoverEvent(hoverAction, new ChatComponentText(hoverValue));
            componentText.func_150255_a(new ChatStyle().func_150209_a(hover))
        } else if (!hoverAction && !hoverValue && clickAction && clickValue) {
            clickAction = clickAction
            const click = new ClickEvent(clickAction, clickValue)
            componentText.func_150255_a(new ChatStyle().func_150241_a(click))
        }

        fullComponent.func_150257_a(componentText)
    })
    if (fullComponent.func_150253_a().length == 0) fullComponent.func_150257_a(new ChatComponentText(""))
    return fullComponent
}

