import { playCustomSound } from "./cmFunc";
import cmSettingData from "../settings";


function calculatemymffrome(raw, kc) {
    console.log("Kc:", isNaN(kc))
    trueraw = raw/1.04;
    kc = 1 + (kc / 100)
    console.log("Kc2:", isNaN(kc))
    return ((trueraw*1.11/* Renowned + Legion */)*1.05 /* Shuriken */+ (130 /* Max Bestiary */ * 1.05 /* Shuriken */) * kc);
}

register("command", (raw, ...args) => {
    try {
        args = args[0]
    } catch(e) {
        console.log("Args failed")
        args = undefined
    }
    console.log("Args:", args)
    if (args == undefined) {
        let r = parseFloat(raw);
        let mf = calculatemymffrome(r, 0);
        ChatLib.chat(`&6&l[Cm] Your magic find is ${mf.toFixed(2)} on Inquisitors`); // input ur mf with renowned sorrow, dae axe, mf pet // must have max be, legion V, renowned, shuriken
    } else {
        let r = parseFloat(raw);
        let kc = parseInt(args)
        let mf = calculatemymffrome(r, kc);
        console.log("kc:", kc, isNaN(kc), "r:", r, isNaN(r), "mf:", mf)
        ChatLib.chat(`&6&l[Cm] Your magic find is ${mf.toFixed(2)} on Inquisitors`)
    }
}).setName("mymf");


register("chat", (player, x, y, z) => {
    if (!cmSettingData.coords) return
    ChatLib.chat(`&c&l[CoresModule] Coords Detected`)
    playCustomSound(cmSettingData.coordsSound, 100);
}).setCriteria("Party > ${player}: x: ${x}, y: ${y}, z:${z}")


register("command", () => {
    playCustomSound(cmSettingData.coordsSound, 100);
}).setName("soundTest")

register("chat", (message) => {
    const regexWith2Numbers = /^Party > \[?[^\]]*\]?\s*(\w+): !mymf (\d+) (\d+)$/; // Matches "!mymf <number> <number>"
    const regexWithNumber = /^Party > \[?[^\]]*\]?\s*(\w+): !mymf (\d+)$/; // Matches "!mymf <number>"
    const regexWithoutNumber = /^Party > \[?[^\]]*\]?\s*(\w+): !mymf$/; // Matches only "!mymf"

    if (!regexWithNumber.test(message) && !regexWithoutNumber.test(message) && !regexWith2Numbers.test(message)) return
    if (regexWithNumber.test(message)) {
        const match = message.match(regexWithNumber);
        const number = parseFloat(match[2]);
        let mf = calculatemymffrome(number, 0);
        setTimeout(() => { 
            ChatLib.command(`pc [Cm] Your magic find is ${mf.toFixed(2)} on Inquisitors`);
        }, 750);
    } else if (regexWith2Numbers.test(message)) {
        const match = message.match(regexWith2Numbers);
        const number = parseFloat(match[2]);
        let kc = parseInt(match[3])
        let mf = calculatemymffrome(number, kc);
        setTimeout(() => { 
            ChatLib.command(`pc [Cm] Your magic find is ${mf.toFixed(2)} on Inquisitors`)
        }, 750);
    } else {
        setTimeout(() => {
            ChatLib.command(`pc Usage: !mymf <number> (Go in mf set with no1 around (so legion ISNT active) with renowned armor, it will give your mf if you used shuriken, fragged dae axe with max bestiary)`);
        }, 750);
    }

}).setCriteria("${message}");

register("command", (...args) => {
    ChatLib.chat("&cInput ur mf with any renowned armor, fragged dae axe, mf pet, no1 arround so legion isn't active (must have max be, legion V, renowned, shuriken) e.g: /mymf 300")
}).setName("mf_help")

register("command", (...args) => {
    ChatLib.chat("&cInput ur mf with any renowned armor, fragged dae axe, mf pet, no1 arround so legion isn't active (must have max be, legion V, renowned, shuriken) \n &cInput the mf you gain from kill combo e.g: /mymf 300 6 (15 kill combo)")
}).setName("mfCombo_help")