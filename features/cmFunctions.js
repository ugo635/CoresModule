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

/**
 * @param {number} x - x coordinate
 * @param {number} y - y coordinate
 * @param {number} z - z coordinate 
 * @param {number} red - red color value [0-255] 
 * @param {number} green - green color value [0-255]
 * @param {number} blue - blue color value [0-255]
 * @param {number} alpha - alpha value [0-255]
 * @param {number} type - type of trace, calc is centering the line on the block
 * @param {number} lineWidth - width of the line
 */

/*
export function trace (x, y, z, red, green, blue, alpha, type, lineWidth) {
    if (type === "calc")
    {
        if (x >= 0) {
            x = parseFloat(x) + 0.5;
        } else {
            x = parseFloat(x) - 0.5;
        }
        if (z >= 0)
        {
            z = parseFloat(z) + 0.5;
        } else {
            z = parseFloat(z) - 0.5;
        }
    }
    if (Player.isSneaking())
        drawLine(Player.getRenderX(), Player.getRenderY() + 1.54, Player.getRenderZ(), x, y, z, red, green, blue, alpha, lineWidth)
    else
        drawLine(Player.getRenderX(), Player.getRenderY() + 1.62, Player.getRenderZ(), x, y, z, red, green, blue, alpha, lineWidth)
}

function drawLine (x1, y1, z1, x2, y2, z2, red, green, blue, alpha, lineWidth) {
    GlStateManager.func_179112_b(770,771)
    GlStateManager.func_179147_l()
    GL11.glLineWidth(lineWidth)
    GlStateManager.func_179090_x()
    GlStateManager.func_179097_i()
    GlStateManager.func_179132_a(false)

    Tessellator.begin(GL11.GL_LINE_STRIP).colorize(red, green, blue, alpha)
    Tessellator.pos(x1, y1, z1).tex(0, 0)
    Tessellator.pos(x2, y2, z2).tex(0, 0)
    Tessellator.draw()

    GlStateManager.func_179098_w()
    GlStateManager.func_179126_j()
    GlStateManager.func_179132_a(true)
    GlStateManager.func_179084_k()
    GL11.glLineWidth(2);
}
*/