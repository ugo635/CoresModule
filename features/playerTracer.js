import cmSettingsData from "../settings";
import { trace } from "./cmFunc";

let trackedPlayer = [];
let [x1, y1, z1] = [Player.getX(), Player.getY(), Player.getZ()];
let [x2, y2, z2] = [0, 0, 0];
let [r, g, b, a] = [cmSettingsData.lineColor.getRed() / 255, cmSettingsData.lineColor.getGreen() / 255, cmSettingsData.lineColor.getBlue() / 255, cmSettingsData.lineColor.getAlpha() / 255]

function updateTracer(p) {
    let player = World.getPlayerByName(p);
    if (!player) return;
    if (c > 10) {
        trackedPlayer = null;
        update_Tracker.unregister();
        [x2, y2, z2] = [0, 0, 0];
        c = 0;
    }
    const toHead = (player) => {return player.isSneaking() ? 1.54 : 1.62}
    try {
        [x2, y2, z2] = [player.getX(), (player.getY() + toHead(player)), player.getZ()]
        trace(x2, y2, z2, r, g, b, a, "", cmSettingsData.lineWidth)
        // if (cmSettingsData.waypoint)
        // if (cmSettingsData.distance)
    } catch(e) {
        console.log(e)
        return;
    }
}

let c = 0;

register("renderWorld", () => {
    if (trackedPlayer) {
        if (!World.getPlayerByName(trackedPlayer.getName())) {c++; return;}
        updateTracer(trackedPlayer.getName())
    }
})

register('command', (args1, ...args) => {
    if (args1 != "add") {
        args.forEach(p => { 
            let playerTracked = World.getPlayerByName(p);
            if (!playerTracked) {
                ChatLib.chat(`&c[Cm Tracker] &ePlayer ${p} not found!`);
                continue;
            }

            trackedPlayer.push(playerTracked);
            [x2, y2, z2] = [playerTracked.getRenderX().toFixed(2), playerTracked.getRenderY().toFixed(2), playerTracked.getRenderZ().toFixed(2)];
            
            ChatLib.chat(`&6[Cm Tracker] &ePlayer: ${p}, currently at X: ${x2}, Y: ${y2}, Z: ${z2}`);
        })
    } else {
        if () {

        } else {
            
        }
        
    }
    

}).setName("trackPlayer").setAliases("track", "playerTrack")

register('command', (p) => {
    
}).setName("unTrackPlayer").setAliases("untrack")

function reset() {
    trackedPlayer = [];
    [x2, y2, z2] = [0, 0, 0];
    ChatLib.chat(`&6[Cm Tracker] &ePlayer: ${p}, is no longer being tracked`)
}

function removep(...args) {
    args.forEach(p => {
        trackedPlayer[trackedPlayer.indexOf(p)] = null
    })
    trackedPlayer.filter(p => p !== null)
}