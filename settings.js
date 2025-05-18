import { Color } from "../Vigilance";
import {
    @ButtonProperty,
    @CheckboxProperty,
    Color,
    @ColorProperty,
    @PercentSliderProperty,
    @SelectorProperty,
    @SwitchProperty,
    @TextProperty,
    @SliderProperty,
    @Vigilant,
} from 'Vigilance';



@Vigilant('CoresModule', 'CoresModule', {
    getCategoryComparator: () => (a, b) => {
        // By default, categories, subcategories, and properties are sorted alphabetically.
        // You can override this behavior by returning a negative number if a should be sorted before b,
        // or a positive number if b should be sorted before a.

        // In this case, we can put Not general! to be above general.
        const categories = ['Color Replacor', 'General', 'Diana', 'Warps', 'Credits'];

        return categories.indexOf(a.name) - categories.indexOf(b.name);
    },
    // getSubcategoryComparator: () => (a, b) => {
    //     // These function examples will sort the subcategories by the order in the array, so eeeeeee
    //     // will be above Category.
    //     const subcategories = ['Burrows', 'Tracker', 'Waypoints', 'Loot Announcer', 'Bobber Counter', 'Other', 'Party Commands'];

    //     return subcategories.indexOf(a.name) - subcategories.indexOf(b.name);
    // },
    // getPropertyComparator: () => (a, b) => {
    //     // And this will put the properties in the order we want them to appear.
    //     const names = ["Do action!!!", "password", "text", "Color Picker"];

    //     return names.indexOf(a.attributesExt.name) - names.indexOf(b.attributesExt.name);
    // }
})

class cmSettingsData {
    constructor() {
        this.initialize(this);
        // this.addDependency("TheNameOfTheThingYouWannaAddDependencyTo", "TheNameOfTheDependency");
        this.addDependency("Change stash action", "Stash message");
        this.addDependency("Warps Shotcut Value", "Warps Shortcut");
        this.addDependency("Update Warp", "Warps Shortcut");
        this.addDependency("Potion", "Potion Reminder");
        this.addDependency("Coords Sound", "Coords Detector")
        this.addDependency("Replace Rank", "Color Tag Replacor")
        this.addDependency("Rank Replacor", "Replace Rank")
        this.addDependency("Color Username", "Color Username Replacor")
        this.addDependency("Color Tag", "Color Tag Replacor")
        this.addDependency("Custom Rank", "Replace Rank with Custom")
        this.addDependency("Add font to user", "Color Username Replacor")
        this.addDependency("Font Value", "Add font to user")

    }
    //----------- Color Replacor ----------------
    @SwitchProperty({
        name: "Color Username Replacor",
        description: "Enable or disable the Username color replacor",
        category: "Color Replacor",
        subcategory: "Settings"
    })
    colorUserTrue = false;
    @SelectorProperty({
        name: "Color Username",
        description: "Choose color username (/color for example)",
        category: "Color Replacor",
        subcategory: "Settings",
        options: ["Black", "Dark Blue", "Dark Green", "Dark Aqua", "Dark Red", "Dark Purple", "Gold", "Gray", "Dark Gray", "Blue", "Green", "Aqua", "Red", "Light Purple / Pink", "Yellow"]
    })
    colorUser = 0;
    @SwitchProperty({
        name: "Add font to user",
        description: "Add fonts to your username like &lBold &r&7 &nUnderlined &r&7 &oItalic &r&7etc... See /colors",
        category: "Color Replacor",
        subcategory: "Settings"
    })
    fontedName = false;
    @TextProperty({
        name: "Font Value",
        description: "Add fonts to your username like &lBold &r&7 &nUnderlined &r&7 &oItalic &r&7etc... See /colors",
        category: "Color Replacor",
        subcategory: "Settings"
    })
    fontedVal = "&l";
    
    @SwitchProperty({
        name: "Color Tag Replacor",
        description: "Enable or disable the color tag replacor",
        category: "Color Replacor",
        subcategory: "Settings"
    })
    colorTagTrue = false;
    @SelectorProperty({
        name: "Color Tag",
        description: "Choose color tag (/color for example)",
        category: "Color Replacor",
        subcategory: "Settings",
        options: ["Black", "Dark Blue", "Dark Green", "Dark Aqua", "Dark Red", "Dark Purple", "Gold", "Gray", "Dark Gray", "Blue", "Green", "Aqua", "Red", "Light Purple / Pink", "Yellow"]
    })
    colorTag = 0;
    @SwitchProperty({
        name: "Replace Rank",
        description: "Replace your current rank with any desired rank ex: &b[MVP+]&7 to &6[MVP++]&7",
        category: "Color Replacor",
        subcategory: "Settings"
    })
    newTag = false;
    @SelectorProperty({
        name: "Rank Replacor",
        description: "Replace your rank with any desired rank ex: &b[MVP+]&7 to &6[MVP++]&7",
        category: "Color Replacor",
        subcategory: "Settings",
        options: ["MVP++", "MVP+", "MVP", "VIP+", "VIP", "rankless"]
    })
    newRank = 0;
    @SwitchProperty({
        name: "Replace Rank with Custom",
        description: "Replace your current rank with any custom rank",
        category: "Color Replacor",
        subcategory: "Settings"
    })
    customRank = false;
    @TextProperty({
        name: "Custom Rank",
        description: `Replace your rank with any custom rank, do /color for available colors, to make a color use '&' then the desired color use /customRankHelp for help`,
        category: "Color Replacor",
        subcategory: "Settings"
    })
    rankText = "&c[&fYOUTUBE&c]"

    //----------- General ----------------

    @SwitchProperty({
        name: "Party Invite Message Editor",
        description: "Edits party invite message to lyk if the guy is in your lobby",
        category: "General",
        subcategory: "Settings"
    })
    partyEdit = true;
    @SwitchProperty({
        name: "Coords Detector",
        description: "Sends a message when coords are detected and play a (loud) sound effect",
        category: "General",
        subcategory: "Settings"
    })
    coords = true
    @TextProperty({
        name: "Coords Sound",
        description: "Choose the sound for the Coord detector",
        category: "General",
        subcategory: "Settings"
    })
    coordsSound = "emergencyMeeting"
    @SwitchProperty({
        name: "Show container inventory on click",
        description: "Shows every item of a container when clicking with the container open",
        category: "General",
        subcategory: "Settings"
    })
    printContainerClick = false;
    @SwitchProperty({
        name: "Show container inventory when opened",
        description: "Shows every item of a container when opening it",
        category: "General",
        subcategory: "Settings"
    })
    printContainerOpen = false;
    @SwitchProperty({
        name: "Hide Useless from Chest",
        description: "Remove most useless messages from chest in crystal hollows to mainly show gemstone powder",
        category: "General",
        subcategory: "Settings"
    })
    hideUselessFromChest = false;
    @SwitchProperty({
        name: "Potion Reminder",
        description: "Remember to drink your potions, after starting the timer with /potionsTimer [time] in minutes, this setting will only enable the overlay! /delPotionsTimer to cancel and remove the overlay",
        category: "General",
        subcategory: "Settings"
    })
    potionsTimer = true;
    @SwitchProperty({
        name: "Potion",
        description: "Is needed for potion reminder to work correctly, the switch does nothing for you!",
        category: "General",
        subcategory: "Settings"
    })
    UnregisterPotionsTimer = false;
    @SwitchProperty({
        name: "Dark Auction Alert",
        description: "Send a message on screen 1min before Dark Auction",
        category: "General",
        subcategory: "Settings"
    })
    darkAuction = true;
    @SwitchProperty({
        name: "Jacob Start Alert",
        description: "Send a message on screen when Jacob Starts",
        category: "General",
        subcategory: "Settings"
    })
    jacob = true;
    @SwitchProperty({
        name: "Disable Warp Message",
        description: "Disable Warp messages ( » PLAYER is traveling to ISLAND FOLLOW)",
        category: "General",
        subcategory: "Settings"
    })
    follow = false;
    @SwitchProperty({
        name: "Hide falling blocks",
        description: "Hides falling blocks (they won't appear on the screen)",
        category: "General",
        subcategory: "Settings"
    })
    hideFallingBlocks = false;
    @SwitchProperty({
        name: "Replace Ah message",
        description: "Replaces the AH message when buying an item with a clickable one",
        category: "General",
        subcategory: "Settings"
    })
    replaceAhMsg = true;
    @SwitchProperty({
        name: "Coin flip",
        description: "Flip a coin",
        category: "General",
        subcategory: "Settings"
    })
    @SwitchProperty({
        name: "Spooky Warning",
        description: "Send a message on screen when a spooky treat or trick chest spawn",
        category: "General",
        subcategory: "Settings"
    })
    SpookyWarning = true;
    @SwitchProperty({
        name: "Fire Freeze Staff Warning",
        description: "Send a message on screen when to use Fire Freeze Staff on F3/M3",
        category: "General",
        subcategory: "Settings"
    })
    FFWarning = true;
    cf = true;
    @SwitchProperty({
        name: "Dice",
        description: "Roll a dice",
        category: "General",
        subcategory: "Settings"
    })
    dice = true;
    @SwitchProperty({
        name: "Stash message",
        description: "Replace the stash message",
        category: "General",
        subcategory: "Settings"
    })
    stashMsgEdit = true;
    @SelectorProperty({
        name: "Change stash action",
        description: "Clicking on the stash action will change whether it will open the /viewStash or do /pickupstash or hides it",
        category: "General",
        subcategory: "Settings",
        options: ["/viewStash", "/pickupStash", "Hide"]
    })
    changeStashClickAction = 0;

    // ----------- Warps  ----------------
    @SwitchProperty({
        name: "Warps Shortcut",
        description: "Create shortcuts for warps",
        category: "Warps",
        subcategory: "Settings"
    })
    warpsCreate = false;
    @TextProperty({
        name: "Warps Shotcut Value",
        description: "Make couple of warps with a comma between them following this template Ex: (warpName;shotcut),(warpName2;shotcut2) etc... Then use /shortcutName to use. Please /ct load for changes to be affective or update warps with the button below",
        category: "Warps",
        subcategory: "Settings"
    })
    warpsVal = "";
    @ButtonProperty({
        name: "Update Warp",
        description: "Update the warps command, tho you MUST /ct load to if you want to remove old ones",
        placeholder: "Update",
        category: "Warps",
        subcategory: "Settings"
    })
    updateWarp() {
        import "./features/warps";
        import { extractTuples, warp } from "./features/warps";
        let val = extractTuples(this.warpsVal);
        warp(val);
    }
    @SwitchProperty({
        name: "Warps on spawn of a Sea Creature",
        description: "Warps on spawn of a Sea Creature, need FeeshNotifier",
        category: "Warps",
        subcategory: "Settings"
    })
    warpWhenCS = true;

    // ----------- Credits ----------------
    @ButtonProperty({
        name: "Diacyz",
        description: "Found the module name, and found many ideas <3",
        category: "Credits",
        subcategory: "Credits",
        placeholder: "Click Me"
    })
    doNothing() {
        // Do nothing
    }
    @ButtonProperty({
        name: "SBO",
        description: "Many Things",
        category: "Credits",
        subcategory: "Credits",
        placeholder: "Click Me"
    })
    openGithub() {
        java.awt.Desktop.getDesktop().browse(new java.net.URI("https://github.com/SkyblockOverhaul/SBO/"));
    }
}

export default new cmSettingsData();


// Create the settings object (PogObject automatically loads the JSON file)


// import PogObject from "../PogData";
// export let cmSettingsData = new PogObject("CoresModule", {
//     "printContainerClick": 0,
//     "printContainerOpen": 0,
//     "hideFallingBlocks": 0,
//     "replaceAhMsg": 1,
//     "stashMsg": 1,
//     "replaceStashMsg": 1,
//     "vsMatOrItem": "mat",
// }, "CmSettings.json");

// // Save only if new defaults were added
// cmSettingsData.save();
