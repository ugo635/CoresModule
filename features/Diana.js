import { getplayername, formatTime, getDianaMayorTotalProfitAndOfferType, calcPercentOne, getBurrowsPerHour, getMobsPerHour, setTimeout } from "../../SBO/utils/functions";
import { data, dianaTrackerMayor } from "../../SBO/utils/variables";
import { playCustomSound } from "../../SBO/utils/functions";
import settings from "../../SBO/settings";
import cmSettingData from "../settings";


function calculatemymffrome(raw) {
    trueraw = raw/1.04;
    return ((trueraw*1.11)*1.05 + (130*1.05));
}

register("command", (raw) => { 
    let r = parseFloat(raw);
    let mf = calculatemymffrome(raw);

    ChatLib.chat(`&6&l[Cm] Your magic find is ${mf} on Inquisitors`); // input ur mf with renowned sorrow, dae axe, greg avc // must have max be, legion V, renowned, shuriken

}).setName("mymf");


register("chat", (player, x, y, z) => {
    if (!cmSettingData.coords) return
    ChatLib.chat(`&c&l[CoresModule] Coords Detected`)
    playCustomSound(settings.inqSound,100);
}).setCriteria("Party > ${player}: x: ${x}, y: ${y}, z:${z}")


register("command", () => {
    playCustomSound(settings.inqSound,100);
}).setName("soundTest")

register("chat", (message) => {
    const regexWithNumber = /^Party > \[?[^\]]*\]?\s*(\w+): !mymf (\d+)$/; // Matches "!mymf <number>"
    const regexWithoutNumber = /^Party > \[?[^\]]*\]?\s*(\w+): !mymf$/; // Matches only "!mymf"
    if (!regexWithNumber.test(message) && !regexWithoutNumber.test(message)) return
    if (regexWithNumber.test(message)) {
        const match = message.match(regexWithNumber);
        const number = parseInt(match[2], 10);
        let mf = calculatemymffrome(number);

        setTimeout(() => { 
            ChatLib.command(`pc [Cm] Your magic find is ${mf} on Inquisitors`);
        }, 200);
    } else {
        setTimeout(() => {
            ChatLib.command(`pc Usage: !mymf <number> (Go in mf set with no1 around (so legion ISNT active) with renowned armor, it will give your mf if you used shuriken, fragged dae axe with max bestiary)`);
        }, 200);
    }

}).setCriteria("${message}");