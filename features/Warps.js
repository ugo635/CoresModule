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