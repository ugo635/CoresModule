export function saveGuiSettings(guiSettings) {
    FileLib.write("CoresModule", "guiSettings.json", JSON.stringify(guiSettings, null, 4));
}

export function initializeGuiSettings() {
    return {
        // x, y, scale
        PotionsLoc: { "x": 15, "y": 22, "s": 1 },
    };
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


const Runnable = Java.type("java.lang.Runnable");
const Executors = Java.type("java.util.concurrent.Executors");
const TimeUnit = Java.type("java.util.concurrent.TimeUnit");
const scheduler = Executors.newSingleThreadScheduledExecutor();
export function setTimeout(callback, delay, ...args) {
    args = args || [];

    const timer = scheduler.schedule(
        new JavaAdapter(Runnable, {
            run: function() {
                callback(...args);
            }
        }),
        delay,
        TimeUnit.MILLISECONDS
    );
    return timer;
}

export function formatNum(number) {
    if (number >= 1e9) {
        return (number / 1e9).toFixed(2).replace(/\.0$/, "") + "b";
    } else if (number >= 1e6) {
        return (number / 1e6).toFixed(2).replace(/\.0$/, "") + "m";
    } else if (number >= 1e3) {
        return (number / 1e3).toFixed(2).replace(/\.0$/, "") + "k";
    }
    return number.toString();
}