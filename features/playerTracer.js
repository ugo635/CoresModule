import cmSettingsData from "../settings";
import { trace } from "./cmFunc";

let trackedPlayer;
let [x1, y1, z1] = [Player.getX(), Player.getY(), Player.getZ()];
let [x2, y2, z2] = [0, 0, 0];
let [r, g, b, a] = [cmSettingsData.lineColor.getRed() / 255, cmSettingsData.lineColor.getGreen() / 255, cmSettingsData.lineColor.getBlue() / 255, cmSettingsData.lineColor.getAlpha() / 255]

function updateTracer(p) {
    let player = World.getPlayerByName(p);
    [x2, y2, z2] = [player.getRenderX().toFixed(2), player.getRenderY().toFixed(2) /*+ (player.isSneaking() ? 1.54 : 1.62)*/, player.getRenderZ().toFixed(2)]
    trace(x2, y2, z2, r, g, b, a, "calc", cmSettingsData.lineWidth)
}

register("renderWorld", () => { 
    if (trackedPlayer && World.getAllPlayers().includes(trackedPlayer)) {
        updateTracer(trackedPlayer.getName())
    }
})

const update_Tracker = register('step', () => {
    updateTracer(trackedPlayer.getName())
}).setDelay(cmSettingsData.trackerFrequency)

update_Tracker.unregister()

register('command', (p) => {
    let playerTracked = World.getPlayerByName(p);
    if (!playerTracked) {
        ChatLib.chat(`&c[Cm Tracker] &ePlayer not found!`);
        return;
    }

    trackedPlayer = playerTracked;
    [x2, y2, z2] = [playerTracked.getRenderX().toFixed(2), playerTracked.getRenderY().toFixed(2), playerTracked.getRenderZ().toFixed(2)];
    
    ChatLib.chat(`&6[Cm Tracker] &ePlayer: ${p}, currently at X: ${x2}, Y: ${y2}, Z: ${z2}`);
    update_Tracker.register();

}).setName("trackPlayer").setAliases("track", "playerTrack")

register('command', (p) => {
    update_Tracker.unregister();
    trackedPlayer = null;
    [x2, y2, z2] = [0, 0, 0];
    ChatLib.chat(`&6[Cm Tracker] &ePlayer: ${p}, is no longer being tracked`);
}).setName("unTrackPlayer").setAliases("untrack")

