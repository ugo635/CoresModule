export function saveGuiSettings(guiSettings) {
    FileLib.write("CoresModule", "guiSettings.json", JSON.stringify(guiSettings, null, 4));
}

export function initializeGuiSettings() {
    let tempGuiSettings = {
        // x, y, scale
        PotionsLoc: { "x": 15, "y": 22, "s": 1 },
    };
    saveGuiSettings(tempGuiSettings);
    return tempGuiSettings
}

export function loadGuiSettings() {
    let loadedSettings = {};
    try {
        loadedSettings = JSON.parse(FileLib.read("CoresModule", "guiSettings.json")) || initializeGuiSettings();
        loadedSettings = checkSettings(loadedSettings);
    } 
    catch (e) {
        loadedSettings = initializeGuiSettings();
        saveGuiSettings(loadedSettings);
    }
    return loadedSettings;
}