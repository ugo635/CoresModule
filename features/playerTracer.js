import cmSettingsData from "../settings"; 

register('command', (p) => {
    let playerTracked = World.getPlayerByName(p);
    const playerX = playerTracked.getX().toFixed(2)
    const playerY = playerTracked.getY().toFixed(2)
    const playerZ = playerTracked.getZ().toFixed(2)
    
    ChatLib.chat(`&6[Trace] &ePlayer: ${p}, currently at X: ${playerX}, Y: ${playerY}, Z: ${playerZ}`);

}).setName("tracePlayer")

/* Create a settings for how often it refreshes, use cmFunc -> drawLine so settings for line width etc...
    w1, y1, z1 = Player.getX(), Player.getY(), Player.getZ()
*/