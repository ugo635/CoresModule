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

// Color Test
testing_list = [
    `&6[MVP&d++&6] ${player}&r: &fHi, I'm M++`,
    `&b[MVP&d+&b] ${player}&r: &fHi, I'm M+`,
    `&a[VIP&6+&a] ${player}&r: &fHi, I'm V+`,
    `&b[MVP&b] ${player}&r: &fHi, I'm M`,
    `&a[VIP&a] ${player}&r: &fHi, I'm V`,
    `&7${player}&r&7: Hi, I'm rankless!`
]

register("command", () => {
    testing_list.forEach((test_msg) => {
    ChatLib.command(`ct simulate ${test_msg}`, true)
    })
}).setName("colorTests").setAliases("colorTest")

register("command", () => {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
        testing_list.forEach((test_msg) => {
        ChatLib.command(`ct simulate ${test_msg}`, true)
        })
        cmSettingsData.newRank += 1
        if (cmSettingsData.newRank > 5) cmSettingsData.newRank = 0
    }, 500 * i)
    }
}).setName("colorTests2").setAliases("colorTest2")

let newRankDict = {
    0: `§6[MVP${colorDict[cmSettingsData.colorTag]}++§6]`,
    1 : `§b[MVP${colorDict[cmSettingsData.colorTag]}+§b]`,
    2 : `§b[MVP]`,
    3 : `[VIP${colorDict[cmSettingsData.colorTag]}+§a]`,
    4 : `§b[VIP]`,
    5 : `${player}`,
}

let rankDict = {
    0: `MVP++`,
    1 : `MVP+`,
    2 : `MVP`,
    3 : `VIP+`,
    4 : `VIP`,
    5 : `rankless`,
}

let newPlayerRank = `${newRankDict[cmSettingsData.newRank]}`
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
    newPlayerRank = `${newRankDict[cmSettingsData.newRank]}`
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
    if (!cmSettingsData.colorUserTrue && !cmSettingsData.colorTagTrue) return;
    let msg2 = ChatLib.getChatMessage(event, true);
    if (!msg.includes("MVP+") && !msg.includes("VIP+") && !msg.includes("MVP++") && !msg.includes("MVP") && !msg.includes("VIP") && !msg.includes(player)) return;
    let rank = msg.includes("MVP++") ? "MVP++" : msg.includes("MVP+") ? "MVP+" : msg.includes("MVP") ? "MVP" : msg.includes("VIP+") ? "VIP+" : msg.includes("VIP") ? "VIP" : "rankless";
    let msg3 = new Message(event).getMessageParts();

    // Tag Replace
    if (combinations.some(combination => msg2.includes(combination))) {
        let matchingCombination = combinations.find(combination => msg2.includes(combination));
        if (cmSettingsData.colorTagTrue) {
            matchingCombination = matchingCombination.slice(0, matchingCombination.length - (player.length + 1)).replaceAll("&", "§")
            msg3.forEach(element => {
                if ((cmSettingsData.newRank != 5 && cmSettingsData.newTag) || !cmSettingsData.newTag) {
                UpdateInfos()
                switch (rank) {
                    case "MVP++":
                        if (cmSettingsData.newTag) {
                            element.text = element.text.replace(matchingCombination, newPlayerRank);
                        } else {
                            element.text = element.text.replace(matchingCombination, `[MVP${colorDict[cmSettingsData.colorTag]}++§6]`);
                        }
                        break;
                    case "MVP+":
                        if (cmSettingsData.newTag) {
                            element.text = element.text.replace(matchingCombination, newPlayerRank);
                        } else {
                            element.text = element.text.replace(matchingCombination, `[MVP${colorDict[cmSettingsData.colorTag]}+§b]`);
                        }
                        break;
                    case "MVP":
                        if (cmSettingsData.newTag) {
                            element.text = element.text.replace(matchingCombination, newPlayerRank);
                        }
                        break;
                    case "VIP+":
                        if (cmSettingsData.newTag) {
                            element.text = element.text.replace(matchingCombination, newPlayerRank);
                        } else {
                            element.text = element.text.replace(matchingCombination, `[VIP${colorDict[cmSettingsData.colorTag]}+§a]`);
                        }
                        break;
                    case "VIP":
                        if (cmSettingsData.newTag) {
                            element.text = element.text.replace(matchingCombination, newPlayerRank);
                        }
                        break;
                    case "rankless":
                        if (cmSettingsData.newTag) {
                            element.text = element.text.replace(player, `${newPlayerRank} ${player}`);
                        }
                        break;
                }} else {
                UpdateInfos()
                matchingCombination += " "
                switch (rank) {
                    case "MVP++":
                        element.text = element.text.replace(matchingCombination, "");
                        break;
                    case "MVP+":
                        element.text = element.text.replace(matchingCombination, "");
                        break;
                    case "MVP":
                        element.text = element.text.replace(matchingCombination, "");
                        break;
                    case "VIP+":
                        element.text = element.text.replace(matchingCombination, "");
                        break;
                    case "VIP":
                        element.text = element.text.replace(matchingCombination, "");
                        break;
                    case "rankless":
                        break;
                }}
            });
        }
    }

    // Player Replace
    if (cmSettingsData.colorUserTrue) {
        UpdateInfos()
        if (rank != "rankless") {
            msg3.forEach(element => {
                element.text = element.text.replace(player, `${colorDict[cmSettingsData.colorUser]}${player}§f`)
            });
        } else {
            msg3.forEach(element => {
                if (!(wantRank && cmSettingsData.newTag)) {
                element.text = element.text.replace(player, `${colorDict[cmSettingsData.colorUser]}${player}`)
                } else {
                element.text = element.text.replace(`${player}§7`, `${colorDict[cmSettingsData.colorUser]}${player}§r`)
                element.text = element.text.replace(`${player}§r§7`, `${colorDict[cmSettingsData.colorUser]}${player}§r`)
                element.text = element.text.replace(`${player}§7§r§7`, `${colorDict[cmSettingsData.colorUser]}${player}§r`)
                }
            });
        }
        
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


// const ChatComponentText = Java.type("net.minecraft.util.ChatComponentText")
// const IChatComponent = Java.type("net.minecraft.util.IChatComponent")
// const HoverEvent = Java.type("net.minecraft.event.HoverEvent")
// const ChatStyle = Java.type("net.minecraft.util.ChatStyle")

// let finalMessage = new Message(msg3)
// let ListOfClicksAndHover = [];
// finalMessage.getMessageParts().forEach((part) => {
//     const clickEvent = part.clickEvent
//     const hoverEvent = part.hoverEvent
//     ListOfClicksAndHover.push([clickEvent, hoverEvent])
// })

// event.message =  new ChatComponentText("Hello :3")
// // IChatComponent can't be used for event.message





// TextComponent{text='§r§9Party §8> i hate humanity', siblings=[], style=Style{hasParent=false, color=null, bold=null, italic=null, underlined=null, obfuscated=null, clickEvent=null, hoverEvent=null, insertion=null}}







// for item in msg:
//     item.text.replace()

// [TextComponent{text:§r§r, formatted:true, hoverAction:null, hoverValue:null, clickAction:null, clickValue:null}, TextComponent{text:§8[§r, formatted:true, hoverAction:show_text, hoverValue:§b[MVP§d+§b] JudgementCorePls§f

//     §7SkyBlock Level: §8[§9291§8]
//     §7Skill Average: §645.8

//     §7Emblem: §6ჶ
//     §8Golden Riftstalker Strange Time
    
//     §7§8Unlocked for Vampire Slayer 5.
    
//     §7Riftstalker Bloodfiend XP: §e15,910
//     §7Total Tier V Kills: §576§r, clickAction:null, clickValue:null}, TextComponent{text:§9291§r, formatted:true, hoverAction:show_text, hoverValue:§b[MVP§d+§b] JudgementCorePls§f
    
//     §7SkyBlock Level: §8[§9291§8]
//     §7Skill Average: §645.8
    
//     §7Emblem: §6ჶ
//     §8Golden Riftstalker Strange Time
    
//     §7§8Unlocked for Vampire Slayer 5.
    
//     §7Riftstalker Bloodfiend XP: §e15,910
//     §7Total Tier V Kills: §576§r, clickAction:null, clickValue:null}, TextComponent{text:§8] §r, formatted:true, hoverAction:show_text, hoverValue:§b[MVP§d+§b] JudgementCorePls§f
    
//     §7SkyBlock Level: §8[§9291§8]
//     §7Skill Average: §645.8
    
//     §7Emblem: §6ჶ
//     §8Golden Riftstalker Strange Time
    
//     §7§8Unlocked for Vampire Slayer 5.
    
//     §7Riftstalker Bloodfiend XP: §e15,910
//     §7Total Tier V Kills: §576§r, clickAction:null, clickValue:null}, TextComponent{text:§6ჶ §r, formatted:true, hoverAction:show_text, hoverValue:§b[MVP§d+§b] JudgementCorePls§f
    
//     §7SkyBlock Level: §8[§9291§8]
//     §7Skill Average: §645.8
    
//     §7Emblem: §6ჶ
//     §8Golden Riftstalker Strange Time
    
//     §7§8Unlocked for Vampire Slayer 5.
    
//     §7Riftstalker Bloodfiend XP: §e15,910
//     §7Total Tier V Kills: §576§r, clickAction:null, clickValue:null}, TextComponent{text:§6[The Owner] §r, formatted:true, hoverAction:null, hoverValue:null, clickAction:null, clickValue:null}, TextComponent{text:§b[MVP§r, formatted:true, hoverAction:null, hoverValue:null, clickAction:null, clickValue:null}, TextComponent{text:§d+§r, formatted:true, hoverAction:null, hoverValue:null, clickAction:null, clickValue:null}, TextComponent{text:§b] JudgementCorePls§r, formatted:true, hoverAction:null, hoverValue:null, clickAction:null, clickValue:null}, TextComponent{text:§f: me again§r, formatted:true, hoverAction:null, hoverValue:null, clickAction:null, clickValue:null}]




// /Show: 

// [TextComponent{text:§8[§9291§8] §6ჶ §r§r, formatted:true, hoverAction:show_text, hoverValue:§b[MVP§d+§b] JudgementCorePls§f

//     §7SkyBlock Level: §8[§9291§8]
//     §7Skill Average: §645.8
    
//     §7Emblem: §6ჶ
//     §8Golden Riftstalker Strange Time
    
//     §7§8Unlocked for Vampire Slayer 5.
    
//     §7Riftstalker Bloodfiend XP: §e15,910
//     §7Total Tier V Kills: §576§r, clickAction:null, clickValue:null}, TextComponent{text:§b[MVP§d+§b] JudgementCorePls§f§7 is holding §r, formatted:true, hoverAction:show_text, hoverValue:§b[MVP§d+§b] JudgementCorePls§f
    
//     §7SkyBlock Level: §8[§9291§8]
//     §7Skill Average: §645.8
    
//     §7Emblem: §6ჶ
//     §8Golden Riftstalker Strange Time
    
//     §7§8Unlocked for Vampire Slayer 5.
    
//     §7Riftstalker Bloodfiend XP: §e15,910
//     §7Total Tier V Kills: §576§r, clickAction:null, clickValue:null}, TextComponent{text:§8[§dHeroic Hyperion §6✪✪✪✪✪§8]§r, formatted:true, hoverAction:show_text, hoverValue:§dHeroic Hyperion §r§6✪✪✪✪✪
//     §r§7Gear Score: §r§d1165 §r§8(4381)
//     §r§7Damage: §r§c+355 §r§e(+30) §r§8(+1,503.53)
//     §r§7Strength: §r§c+245 §r§e(+30) §r§9(+50) §r§8(+1,051.1)
//     §r§7Crit Damage: §r§c+70% §r§8(+319.9%)
//     §r§7Bonus Attack Speed: §r§c+7% §r§9(+7%) §r§8(+10.78%)
//     §r§7Intelligence: §r§a+628 §r§9(+125) §r§d(+40) §r§8(+2,710.01)
//     §r§7Ferocity: §r§a+33 §r§8(+46.2)
//      §r§5[§r§b✎§r§5] §r§5[§r§b⚔§r§5]
    
//     §r§d§lUltimate Wise V§r§9, §r§9Champion X§r§9, §r§9Cleave V
//     §r§9Critical VI§r§9, §r§9Cubism V§r§9, §r§9Ender Slayer VI
//     §r§9Execute V§r§9, §r§9Experience IV§r§9, §r§9Fire Aspect III
//     §r§9First Strike IV§r§9, §r§9Giant Killer VI§r§9, §r§9Impaling III
//     §r§9Lethality VI§r§9, §r§9Life Steal IV§r§9, §r§9Looting IV
//     §r§9Luck VI§r§9, §r§9Scavenger V§r§9, §r§9Sharpness VI
//     §r§9Smoldering III§r§9, §r§9Thunderlord V§r§9, §r§9Vampirism VI
//     §r§9Venomous V
    
//     §r§b◆ Music Rune I
    
//     §r§7Deals §r§c+50% §r§7damage to Withers.
//     §r§7Grants §r§c+1 §r§c❁ Damage §r§7and §r§a+2 §r§b✎
//     §r§bIntelligence §r§7per §r§cCatacombs §r§7level.
    
//     §r§aScroll Abilities:
//     §r§6Ability: Wither Impact  §r§e§lRIGHT CLICK
//     §r§7Teleport §r§a10 blocks§r§7 ahead of you.
//     §r§7Then implode dealing §r§c61,730.5 §r§7damage
//     §r§7to nearby enemies. Also applies the
//     §r§7wither shield scroll ability reducing
//     §r§7damage taken and granting an
//     §r§7absorption shield for §r§e5 §r§7seconds.
//     §r§8Mana Cost: §r§3150
    
//     §r§fKills: §r§6200,771
    
//     §r§8§l* §r§8Co-op Soulbound §r§8§l*
//     §r§d§l§ka§r§r §r§d§lMYTHIC DUNGEON SWORD §r§d§l§ka§r, clickAction:run_command, clickValue:/viewitem f1d7b704-62f8-483a-8e11-e1d7ffe20179}]
    

// Party message:

// [
//     TextComponent{
//       text: §r§r,
//       formatted: true,
//       hoverAction: null,
//       hoverValue: null,
//       clickAction: null,
//       clickValue: null
//     },
//     TextComponent{
//       text: §9Party §8> §b[MVP§d+§b] JudgementCorePls§f: §r,
//       formatted: true,
//       hoverAction: show_text,
//       hoverValue: §eClick here to view §bJudgementCorePls§e's profile§r,
//       clickAction: run_command,
//       clickValue: /viewprofile eec82c33-ea9d-4628-b2e1-bf1a6b770095
//     },
//     TextComponent{
//       text: :3§r,
//       formatted: true,
//       hoverAction: null,
//       hoverValue: null,
//       clickAction: null,
//       clickValue: null
//     }
// ]

