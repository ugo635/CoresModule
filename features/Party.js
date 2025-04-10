import cmSettingsData from '../settings';

register("chat", (player, event) => {
    if (!cmSettingsData.partyEdit) return;
    let rawMsg = ChatLib.getChatMessage(event, true);
    color = "&7" // Default to grey (rankless)
    col = rawMsg.split("-----------------------------------------------------");
    col = col[1].split(" ")

    if (player.split(" ")[0] == "[VIP]" || player.split(" ")[0] == "[VIP+]" || player.split(" ")[0] == "[MVP]" || player.split(" ")[0] == "[MVP+]" || player.split(" ")[0] == "[MVP++]") {

        rank = player.split(" ")[0]
        player = player.split(" ")[1]
        color = col[0]
    }

    if (!isPlayerInLobby(player)) {
    let message = new Message(new TextComponent("&9&m-----------------------------------------------------"+`${color} ${player} &ehas invited you to join their party!`+"\n"),new TextComponent("&eYou have &c60 &eseconds to accept. &6Click here to join! &c&lNot In Lobby"+"\n"+"&9&m-----------------------------------------------------").setClick("run_command", `/party accept ${player}`).setHover("show_text", "Click to run"+"\n"+`/party accept ${player}`))
    // new Message(TextComponent1, TextComponent2) concatenate 2 TextComponents
    ChatLib.chat(message);
    cancel(event);
    }

    if (color == "&7" && !isPlayerInLobby(player)) {
        new TextComponent("&cThis dude is rankless, high chance it's a housing bot, check his skyblock data here").setClick("run_command", `/pv ${player}`).setHover("show_text", `&5&l/pv ${player}`).chat()
    }

}).setCriteria("------------------------------------------------------>newLine<-${player} has invited you to join their party!->newLine<-You have 60 seconds to accept. Click here to join!->newLine<------------------------------------------------------")


register("chat", (player, player2, event) => {
    if (!cmSettingsData.partyEdit) return;
    let rawMsg = ChatLib.getChatMessage(event, true);
    color = "&7" // Default to grey (rankless)
    color2 = "&7"
    col = rawMsg.split("-----------------------------------------------------");
    col = col[1].split(" ")
    col2 = col

    if (player.split(" ")[0] == "[VIP]" || player.split(" ")[0] == "[VIP+]" || player.split(" ")[0] == "[MVP]" || player.split(" ")[0] == "[MVP+]" || player.split(" ")[0] == "[MVP++]") {

        rank = player.split(" ")[0]
        player = player.split(" ")[1]
        color = col[0]
    }
    if (player2.split(" ")[0] == "[VIP]" || player2.split(" ")[0] == "[VIP+]" || player2.split(" ")[0] == "[MVP]" || player2.split(" ")[0] == "[MVP+]" || player2.split(" ")[0] == "[MVP++]") {

        rank2 = player2.split(" ")[0]
        player2 = player2.split(" ")[1]
        color2 = col2[7]
    }


    if (isPlayerInLobby(player)==false) {
    let message = new Message(new TextComponent("&9&m-----------------------------------------------------"+`${color} ${player} &ehas invited you to join ${color2} ${player2}&e's party!`+"\n"), new TextComponent("&eYou have &c60 &eseconds to accept. &6Click here to join! &c&lNot In Lobby"+"\n"+"&9&m-----------------------------------------------------").setClick("run_command", `/party accept ${player}`).setHover("show_text", "Click to run"+"\n"+`/party accept ${player}`))
    ChatLib.chat(message);
    cancel(event);
    }

}).setCriteria("------------------------------------------------------>newLine<-${player} has invited you to join ${player2}'s party!->newLine<-You have 60 seconds to accept. Click here to join!->newLine<------------------------------------------------------")

// ->newLine<-
// Line Jump

// dupe it for in case where it's 
// -----------------------------------------------------
// [MVP+] hecatombs has invited you to join [MVP+] Froide's party!
// You have 60 seconds to accept. Click here to join!
// -----------------------------------------------------
// Also edit TextComponent



// -----------------------------------------------------
// [MVP+] Froide has invited you to join their party!
// You have 60 seconds to accept. Click here to join!
// -----------------------------------------------------

function isPlayerInLobby(playerName) {
    playerName = playerName.toLowerCase();
    return World.getAllPlayers().some(player => player.getName().toLowerCase() === playerName);
}


register("command", (player) => {
    if (isPlayerInLobby(player)) {
        ChatLib.chat(`&a${player} is in your lobby!`);
    } else {
        ChatLib.chat(`&c${player} is NOT in your lobby.`);
    }
}).setName("checkLobby").setAliases("LobbyCheck");

register("command", () => {
    let playerInWorld = World.getAllPlayers();
    for (let i=0; i<playerInWorld.length; i++) {
        ChatLib.chat(playerInWorld[i].getName());
    }
}).setName("testPlayerWorld")


register("chat", (player, number) => {
    if (number == 0 || number == 1 || number == 2 || number == 3 || number == 4) {
    let choice = ["basic", "hot", "burning", "fiery", "infernal"]
    ChatLib.command(`joininstance kuudra_${choice[number-1]}`)
    }
}).setCriteria("Party > ${player}: !t${number}")

register("chat", (player, event) => {
    ChatLib.command("chat p")
}).setCriteria("You have joined ${player}'s party!")


let partyMembers = [];
const playerOwner = Player.getName()

register("chat", (msg) => {
    const match = msg.match(/^(Party (Moderators|Leader|Members)):\s?(.*)$/i)
    if (!match) return;
    let players = match[3].split("●").map(player => player.replace("[VIP] ","").replace("[VIP+] ", "").replace("[MVP] ", "").replace("[MVP+] ", "").replace("[MVP++] ", "").replace(" ", ""))
    players = players.slice(0, players.length - 1) /* Remove last one which is blank */
    for (let i = 0; i < players.length; i++) {
        if (!partyMembers.includes(players[i]) && players[i] !== playerOwner) {
            partyMembers.push(players[i]);
        }
    }
}).setCriteria("${msg}")

register("command", (...args /* Players to not add */) => {
    partyMembers = [];
    args = args || [];
    if (args != []) args.map(arg => arg.toLowerCase())
    setTimeout(() => {
    ChatLib.command("pl")
    }, 100)
    setTimeout(() => {
        for (let i = 0; i < partyMembers.length; i++) {
            if (!args.includes(partyMembers[i].toLowerCase())) {
                setTimeout(() => {
                    ChatLib.command(`f ${partyMembers[i-1]}`)
                }, 500 + 750 * i)
            }
            if (i == partyMembers.length - 1) {
                setTimeout(() => {
                    partyMembers = [];
                }, 500 + 750 * partyMembers.length+1)
            }
        }
    }, 1000)
    
}).setName("fParty").setAliases("fp")
