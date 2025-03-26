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

function checkSettings(loadedSettings) {
    // Get the default settings
    const defaultSettings = initializeGuiSettings();

    // Loop through default settings and ensure loaded settings have all properties
    for (let key in defaultSettings) {
        if (!loadedSettings.hasOwnProperty(key)) {
            loadedSettings[key] = defaultSettings[key];
        }
    }
    
    return loadedSettings;
}