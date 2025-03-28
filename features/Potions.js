import { setTimeout } from "./cmFunctions";
import { CMsOverlay, OverlayTextLine, OverlayButton } from "./cmOverlays";
import cmSettingsData from "../settings"

let time = 0;
let potionsOverlay = new CMsOverlay("potions", "UnregisterPotionsTimer", "inventory", "PotionsLoc", "", true, ["GuiInventory"]);
let potionsText = new OverlayTextLine("", true, true);
let timerRunning = false;
let resetPotionButton = new OverlayButton("&cReset Session", true, true, true, true).onClick(() => {
    ChatLib.command("delPotionsTimer", true);
});

resetPotionButton.onMouseEnter(() => {
    resetPotionButton.setText(`&c&nReset Session`);
});

resetPotionButton.onMouseLeave(() => {
    resetPotionButton.setText(`&cReset Session`);
})


function potionsTimerOverlay() {
    if (timerRunning) return; // Prevent multiple timers from running at once
    timerRunning = true;

    register("tick", () => {
        if (time <= 0) {
            timerRunning = false;
            return; // Stop updating when timer reaches 0
        }

        
        /*
        let message = "Hello sir!";
        let message2 = "Hello dear sir!";

        potionsOverlay.setLines([
            new OverlayTextLine(message, true),
            new OverlayTextLine(message2, true),
            new OverlayTextLine(`Time left: ${time} min`, true)
        ]);
        */
        
        color = (time > 60) ? "&a" : "&c";
        let message = `
&6&lPotions Timer:  &c&l${color + (time/60).toFixed(2)} minutes
&c&l${color + (time).toFixed(2)} seconds
&c&l${color +(time * 1000).toFixed(2)} milliseconds
                        `;

        potionsOverlay.setLines([
            potionsText.setText(message)
        ]);

        let finalMessage = [];
        finalMessage.push(potionsText);
        finalMessage.push(resetPotionButton);

        potionsOverlay.setLines(
            finalMessage
        )

        
        setTimeout(() => {
            time -= 0.05;
        }, 50);
        
        // Decrease time every tick
        // console.log(time)
    }); // Runs every second

    
}


register("command", (t) => {
    time = t * 60;
    cmSettingsData.UnregisterPotionsTimer = true;
    if (isNaN(time) || time <= 0) {
        ChatLib.chat("&c&l[Cm] Invalid time! Please enter a positive number.");
        return;
    }

    ChatLib.chat(`&a&l[Cm] Timer Started for ${t} minutes`);

    potionsTimerOverlay();


    setTimeout(() => {
        if (time == -9999) return;
        Client.showTitle("&6Potion Timer", "&6Potions are now gone, drink one again", 0, 25, 35);
        ChatLib.chat(`&c&l[Cm] Timer for ${t} minutes is now OVER, remember to drink your potions!`);
        cmSettingsData.UnregisterPotionsTimer = false;
    }, time * 1000);  // Convert seconds to milliseconds


}).setName("potionsTimer").setAliases("potionTimer");

register("command", (t) => {
    time = -9999;
    cmSettingsData.UnregisterPotionsTimer = false;
    ChatLib.chat(`&c[Cm] Timer cancelled`);

}).setName("delPotionsTimer").setAliases("delPotionTimer");

