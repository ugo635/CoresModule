import { setTimeout } from "../../SBO/utils/functions";
import { CMsOverlay, OverlayTextLine } from "./CMoverlays";
import cmSettingsData from "../settings"

let time = 0;
let potionsOverlay = new CMsOverlay("potions", cmSettingsData.potionsTimer, "render", "PotionsLoc");
let timerRunning = false;

function potionsTimerOverlay() {
    if (timerRunning) return; // Prevent multiple timers
    timerRunning = true;

    let stepEvent = register("step", () => {
        if (time <= 0) {
            potionsOverlay.setLines([]); // Clear overlay
            timerRunning = false;
            stepEvent.unregister(); // Stop step event
            return;
        }

        let message = `&6&lPotions Timer:  &c&l${time.toFixed(1)} minutes
                        &c&l${(time * 60).toFixed(1)} seconds`;

        // Update overlay text dynamically
        potionsOverlay.setLines([
            new OverlayTextLine(message, true)
        ]);

        time -= 1 / 60; // Decrease by 1 second (1/60 of a minute)
    }).setFps(1); // Runs every second
}

register("command", (t) => {
    time = t; // Convert input to a float
    if (isNaN(time) || time <= 0) {
        ChatLib.chat("&c&l[Cm] Invalid time! Please enter a positive number.");
        return;
    }

    ChatLib.chat(`&a&l[Cm] Timer Started for ${time} minutes`);
    potionsTimerOverlay();

    setTimeout(() => {
        Client.showTitle("&6Potion Timer", "&6Potions are now gone, drink one again", 0, 25, 35);
        ChatLib.chat(`&c&l[Cm] Timer for ${time} minutes is now OVER, remember to drink your potions!`);

        potionsOverlay.setLines([]); // Clear overlay when timer ends
        timerRunning = false; // Reset flag
    }, time * 60000); // Convert minutes to milliseconds
}).setName("potionsTimer");
