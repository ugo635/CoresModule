import { registerWhen } from "../../SBO/utils/variables";
import cmSettingsData from "../settings";


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

let player = Player.getName()
const combinations = [
    `[VIP&a+&b] ${player}`, `[VIP&b+&b] ${player}`, `[VIP&c+&b] ${player}`, `[VIP&d+&b] ${player}`, 
    `[VIP&e+&b] ${player}`, `[VIP&0+&b] ${player}`, `[VIP&1+&b] ${player}`, `[VIP&2+&b] ${player}`, 
    `[VIP&3+&b] ${player}`, `[VIP&4+&b] ${player}`, `[VIP&5+&b] ${player}`, `[VIP&6+&b] ${player}`, 
    `[VIP&7+&b] ${player}`, `[VIP&8+&b] ${player}`, `[VIP&9+&b] ${player}`,
    
    `[MVP&a+&b] ${player}`, `[MVP&b+&b] ${player}`, `[MVP&c+&b] ${player}`, `[MVP&d+&b] ${player}`, 
    `[MVP&e+&b] ${player}`, `[MVP&0+&b] ${player}`, `[MVP&1+&b] ${player}`, `[MVP&2+&b] ${player}`, 
    `[MVP&3+&b] ${player}`, `[MVP&4+&b] ${player}`, `[MVP&5+&b] ${player}`, `[MVP&6+&b] ${player}`, 
    `[MVP&7+&b] ${player}`, `[MVP&8+&b] ${player}`, `[MVP&9+&b] ${player}`,
    
    `[MVP&r&d+&r&b] ${player}`, `[MVP&r&e+&r&b] ${player}`, `[MVP&r&0+&r&b] ${player}`, 
    `[MVP&r&1+&r&b] ${player}`, `[MVP&r&2+&r&b] ${player}`, `[MVP&r&3+&r&b] ${player}`, 
    `[MVP&r&4+&r&b] ${player}`, `[MVP&r&5+&r&b] ${player}`, `[MVP&r&6+&r&b] ${player}`, 
    `[MVP&r&7+&r&b] ${player}`, `[MVP&r&8+&r&b] ${player}`, `[MVP&r&9+&r&b] ${player}`,
    
    `[VIP&r&d+&r&b] ${player}`, `[VIP&r&e+&r&b] ${player}`, `[VIP&r&0+&r&b] ${player}`, 
    `[VIP&r&1+&r&b] ${player}`, `[VIP&r&2+&r&b] ${player}`, `[VIP&r&3+&r&b] ${player}`, 
    `[VIP&r&4+&r&b] ${player}`, `[VIP&r&5+&r&b] ${player}`, `[VIP&r&6+&r&b] ${player}`, 
    `[VIP&r&7+&r&b] ${player}`, `[VIP&r&8+&r&b] ${player}`, `[VIP&r&9+&r&b] ${player}`
];


register("chat", (msg, event) => {
    if (!cmSettingsData.colorUserTrue && !cmSettingsData.colorTagTrue) return;
    let msg2 = ChatLib.getChatMessage(event, true);
    if (!msg.includes("MVP+") && !msg.includes("VIP+")) return;
    if (!msg.includes(player)) return;
    let msg = new Message(event).getMessageParts();
    if (combinations.some(combination => msg2.includes(combination))) {
        let matchingCombination = combinations.find(combination => msg2.includes(combination));
        plusColor = matchingCombination.slice(6,8)
        plusColor = plusColor.replace('&', '§')
        if (cmSettingsData.colorUserTrue) {
            msg.forEach(element => {
                element.text = element.text.replace(player, `${colorDict[cmSettingsData.colorUser]}${player}§r`)
            });
        }
        if (cmSettingsData.colorTagTrue) {
            msg.forEach(element => {
                    // For /show (I fuckin hate you !)
                if (element.text.match(/\[(MVP|VIP)§[0-9a-f]\+§b\]/g)) {
                    element.text = element.text.replace(/\b(MVP|VIP)§[0-9a-f]\+§b\b/g, `MVP${colorDict[cmSettingsData.colorTag]}+§b`);
                } else {
                    element.text = element.text.replace(`${plusColor}+§r`, `${colorDict[cmSettingsData.colorTag]}+§r`);
                }
                
            });
        }
    }
    
    new Message(msg).chat() // msg.edit(msg)
    cancel(event)
    
}).setCriteria("${msg}")

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
    