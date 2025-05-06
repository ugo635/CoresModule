import cmSettingsData from "../settings";
import { trace } from "./cmFunc";

let trackedPlayers = []; // Array to store tracked players as objects with name and coords properties
let [r, g, b, a] = [
    cmSettingsData.lineColor.getRed() / 255,
    cmSettingsData.lineColor.getGreen() / 255,
    cmSettingsData.lineColor.getBlue() / 255,
    cmSettingsData.lineColor.getAlpha() / 255
];

function updateTracer(playerName) {
    let player = World.getPlayerByName(playerName);
    if (!player) {
        trackedPlayers = trackedPlayers.filter(p => p.name !== playerName);
        return;
    }

    const toHead = (player) => (player.isSneaking() ? 1.54 : 1.62);

    try {
        let [x, y, z] = [
            player.getX(),
            player.getY() + toHead(player),
            player.getZ()
        ];
        let playerIndex = trackedPlayers.findIndex(p => p.name === playerName);
        if (playerIndex !== -1) {
            trackedPlayers[playerIndex] = { name: playerName, coords: [x, y, z] };
        } else {
            trackedPlayers.push({ name: playerName, coords: [x, y, z] });
        }
        trace(x, y, z, r, g, b, a, "", cmSettingsData.lineWidth);
    } catch (e) {
        console.log(e);
        trackedPlayers = trackedPlayers.filter(p => p.name !== playerName);
    }
}

register("renderWorld", () => {
    for (let player of trackedPlayers) {
        updateTracer(player.name);
    }
});

register("command", (...args) => {
    if (args.length === 0) {
        ChatLib.chat("&c[Cm Tracker] &ePlease specify a player name.");
        return;
    }

    if (args[0].toLowerCase() === "add") {
        if (args.length < 2) {
            ChatLib.chat("&c[Cm Tracker] &ePlease specify player names to add.");
            return;
        }

        args.slice(1).forEach((playerName) => {
            let player = World.getPlayerByName(playerName);
            if (!player) {
                ChatLib.chat(`&c[Cm Tracker] &ePlayer ${playerName} not found!`);
                return;
            }

            if (!trackedPlayers.some(p => p.name === playerName)) {
                trackedPlayers.push({
                    name: playerName,
                    coords: [
                        player.getRenderX().toFixed(2),
                        player.getRenderY().toFixed(2),
                        player.getRenderZ().toFixed(2)
                    ]
                });

                ChatLib.chat(
                    `&6[Cm Tracker] &ePlayer: ${playerName}, is now being tracked.`
                );
            }
        });
    } else {
        let playerName = args[0];
        let player = World.getPlayerByName(playerName);
        if (!player) {
            ChatLib.chat(`&c[Cm Tracker] &ePlayer ${playerName} not found!`);
            return;
        }

        trackedPlayers = [{
            name: playerName,
            coords: [
                player.getRenderX().toFixed(2),
                player.getRenderY().toFixed(2),
                player.getRenderZ().toFixed(2)
            ]
        }];

        ChatLib.chat(
            `&6[Cm Tracker] &ePlayer: ${playerName}, is now being tracked.`
        );
    }
})
    .setName("trackPlayer")
    .setAliases("track", "playerTrack");

register("command", (playerName) => {
    if (!playerName) {
        if (trackedPlayers.length === 0) {
            ChatLib.chat("&c[Cm Tracker] &eNo players are currently being tracked.");
            return;
        }

        trackedPlayers = [];
        ChatLib.chat("&6[Cm Tracker] &eAll players have been untracked.");
        return;
    }

    if (trackedPlayers.some(p => p.name === playerName)) {
        trackedPlayers = trackedPlayers.filter(p => p.name !== playerName);
        ChatLib.chat(`&6[Cm Tracker] &ePlayer: ${playerName}, is no longer being tracked.`);
    } else {
        ChatLib.chat(`&c[Cm Tracker] &ePlayer: ${playerName} is not being tracked.`);
    }
})
    .setName("unTrackPlayer")
    .setAliases("untrack");
