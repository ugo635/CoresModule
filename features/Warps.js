import cmSettingsData from "../settings";

export function extractTuples(str) {
    const regex = /\((\w+);(\w+)\)/g;
    let match;
    const result = [];

    while ((match = regex.exec(str)) !== null) {
        result.push([match[1], match[2]]);
    }

    return result;
}
export function warp() {
    try {
        if (cmSettingsData.warpsCreate) {
            let val = extractTuples(cmSettingsData.warpsVal);
            // console.log("val: ", val);
            val.forEach(warps => {
            let [warpName, shortcut] = [warps[0], warps[1]];
            // console.log("warpName: ", warpName);
            // console.log("shotcut: ", shortcut);
            register("command", () => {
                ChatLib.command(`warp ${warpName}`);
            }).setName(shortcut, true)
            });
        }
    } catch(error) {
        console.log("error: ", error);
    }
}

warp();




let willWarp = false;

register("chat", (player, mob) => {
    if (!cmSettingsData.warpWhenCS) return
    ignoreList = ["VANQUISHER", "THUNDER", "FIERY SCUTTLER"]
    if (ignoreList.includes(mob)) return;
    ChatLib.chat("&6&l [Cm] The mob is: " + mob)
    willWarp = true;
    ChatLib.command("pc Type !c if you don't want a warp to occur ! Otherwise, a warp will occur in 5 seconds")
    setTimeout(() => {
        // Just wait
    }, 5000)
    if (!willWarp) return;
    ChatLib.command("pc !warp")
    willWarp = false;
}).setCriteria("&r&9Party &8> ${player}: &r--> A ${mob} has spawned <--&r")

register("chat", () => {
    willWarp = false;
}).setCriteria("Party > ${player}: !warp")