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
    if (!cmSettingsData.colorTagTrue) return
    let message = ChatLib.getChatMessage(event, true);
    if (msg.includes("MVP+") || msg.includes("VIP+")) {
        if (cmSettingsData.colorTagTrue) {
        if (combinations.some(combination => message.includes(combination))) {
            if (cmSettingsData.colorUserTrue) {
            const matchingCombination = combinations.find(combination => message.includes(combination));
            playerColor = colorDict[cmSettingsData.colorUser] + player + '&r'
            message = message.replace(matchingCombination, (message.includes("MVP") ? `[MVP${colorDict[cmSettingsData.colorTag]}+&b] ${playerColor}` : `[VIP${colorDict[cmSettingsData.colorTag]}+&a] ${playerColor}`));
            ChatLib.chat(message)
            cancel(event);
            } else {
                const matchingCombination = combinations.find(combination => message.includes(combination));
                message = message.replace(matchingCombination, (message.includes("MVP") ? `[MVP${colorDict[cmSettingsData.colorTag]}+&b] ${player}&r` : `[VIP${colorDict[cmSettingsData.colorTag]}+&a] ${player}&r`));
                ChatLib.chat(message)
                cancel(event);
            }
        }
    }
    } else {
        if (cmSettingsData.colorTagTrue && msg.includes(player)) {
            const playerColor = colorDict[cmSettingsData.colorUser] + player + '&r'
            message = message.replace(player, playerColor);
            ChatLib.chat(message)
            cancel(event);
        }
    }
}).setCriteria("${msg}")