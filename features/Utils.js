import FU from "../../FileUtilities/main";
import PogObject from "../../PogData";

// --- PERSISTENT DATA ---
// CoresModule config folder
let configFolderPath = "./config/cm";
if (!FU.exists(configFolderPath)) {
    FU.newDirectory(configFolderPath);
}
if (!FU.exists("./config/cm/backup")) {
    FU.newDirectory("./config/cm/backup");
}

// Initializing a persistent data object using the PogObject class
export const resetVersion = "0.1.3"; // change this to the new version for config.toml reset
export let data = new PogObject("CoresModule", {
    "resetVersion": resetVersion,
    "changelogVersion": "0.0.0",
    "downloadMsg": false,
}, "CmData.json");