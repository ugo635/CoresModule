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
        const categories = ['General', 'Diana', 'Credits'];

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
        this.addDependency("Change stash open", "Stash message");
        this.addDependency("Warps Shotcut Value", "Warps Shortcut");

    }
    //----------- General ----------------
    @SwitchProperty({
        name: "Color Tag replacor",
        description: "Enable or disable the color tag replacor",
        category: "General",
        subcategory: "Settings"
    })
    colorTagTrue = false;
    @SelectorProperty({
        name: "Color Tag",
        description: "Choose color tag (/color for example)",
        category: "General",
        subcategory: "Settings",
        options: ["Black", "Dark Blue", "Dark Green", "Dark Aqua", "Dark Red", "Dark Purple", "Gold", "Gray", "Dark Gray", "Blue", "Green", "Aqua", "Red", "Light Purple / Pink", "Yellow"]
    })
    colorTag = 0;
    @SwitchProperty({
        name: "Color Username replacor",
        description: "Enable or disable the Username color replacor",
        category: "General",
        subcategory: "Settings"
    })
    colorUserTrue = false;
    @SelectorProperty({
        name: "Color Username",
        description: "Choose color username (/color for example)",
        category: "General",
        subcategory: "Settings",
        options: ["Black", "Dark Blue", "Dark Green", "Dark Aqua", "Dark Red", "Dark Purple", "Gold", "Gray", "Dark Gray", "Blue", "Green", "Aqua", "Red", "Light Purple / Pink", "Yellow"]
    })
    colorUser = 0;
    @SwitchProperty({
        name: "Party Invite Message Editor",
        description: "Edits party invite message to lyk if the guy is in your lobby",
        category: "General",
        subcategory: "Settings"
    })
    partyEdit = true;
    @SwitchProperty({
        name: "Inq detector",
        description: "Sends a message when coords are detected and play a (loud) sound effect",
        category: "General",
        subcategory: "Settings"
    })
    coords = true
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
        name: "Warps Shortcut",
        description: "Create shortcuts for warps",
        category: "General",
        subcategory: "Settings"
    })
    warpsCreate = false;
    @TextProperty({
        name: "Warps Shotcut Value",
        description: "Make couple of warps with a comma between them following this template Ex: (warpName;shotcut),(warpName2;shotcut2) etc... Please /ct load for changes to be affective",
        category: "General",
        subcategory: "Settings"
    })
    warpsVal = "";
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
        description: "Clicking on the stash action will change whether it will open the /viewStash or do /pickupstash",
        category: "General",
        subcategory: "Settings",
        options: ["/viewStash", "/pickupStash"]
    })
    changeStashClickAction = 0;

    @SelectorProperty({
        name: "Change stash open",
        description: "Change if it will show items or material (/viewStash item or /viewStash material) only work if /viewStash is selected above",
        category: "General",
        subcategory: "Settings",
        options: ["Material", "Item"]
    })
    vsMatOrItem = 0;
    // ----------- Credits ----------------
    @ButtonProperty({
        name: "Diacyz",
        description: "Found the module name <3",
        category: "Credits",
        subcategory: "Credits",
        placeholder: "Click Me"
    })
    openGithub() {
        java.awt.Desktop.getDesktop().browse(new java.net.URI("https://github.com/ugo635/CoresModule"));
    }
}

export default new cmSettingsData();


// Create the settings object (PogObject automatically loads the JSON file)


// import PogObject from "../PogData";
// export let cmSettingsData = new PogObject("Cm", {
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
