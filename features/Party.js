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
    ChatLib.command(`joininstance kuudra_${choice[number-1]}`)
    }
}).setCriteria("Party > ${player}: !t${number}")

register("chat", (player, number) => {
    number = parseInt(number.replace(" ", ""))
    if ([1, 2, 3, 4, 5, 6, 7].includes(number)) {
        const choice = ["ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX", "SEVEN"]
        ChatLib.command(`joindungeon master_catacombs_floor_${choice[number-1]}`)
    }
}).setCriteria("Party > ${player}: !m${number}")

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

let t1 = null
let t2 = null
let t3 = null
let t4 = null
let t5 = null
let t6 = null
let t7 = null

register("command", (...args /* Players to not add */) => {
    partyMembers = [];
    args = (args || []).map(arg => arg.toLowerCase().replace(" ", ""));
    setTimeout(() => {
        ChatLib.command("pl")
    }, 100)
    setTimeout(() => {
        pLength = partyMembers.length
        if (partyMembers.length > 7 || partyMembers.length == 0) return
        partyMembers.forEach((pMember) => {
            if (!args.includes(pMember.toLowerCase().replace(" ", ""))) {
                    index = partyMembers.indexOf(pMember)
                    switch(index) {
                        case 0:
                            t1 = new TextComponent("&a" + pMember).setHover("show_text", `&eadd &c${pMember}`).setClick("run_command", `/f add ${pMember}`)
                            break
                        case 1:
                            t2 = new TextComponent("&a" + pMember).setHover("show_text", `&eadd &c${pMember}`).setClick("run_command", `/f add ${pMember}`)
                            break
                        case 2:
                            t3 = new TextComponent("&a" + pMember).setHover("show_text", `&eadd &c${pMember}`).setClick("run_command", `/f add ${pMember}`)
                            break
                        case 3:
                            t4 = new TextComponent("&a" + pMember).setHover("show_text", `&eadd &c${pMember}`).setClick("run_command", `/f add ${pMember}`)
                            break
                        case 4:
                            t5 = new TextComponent("&a" + pMember).setHover("show_text", `&eadd &c${pMember}`).setClick("run_command", `/f add ${pMember}`)
                            break
                        case 5:
                            t6 = new TextComponent("&a" + pMember).setHover("show_text", `&eadd &c${pMember}`).setClick("run_command", `/f add ${pMember}`)
                            break
                        case 6:
                            t7 = new TextComponent("&a" + pMember).setHover("show_text", `&eadd &c${pMember}`).setClick("run_command", `/f add ${pMember}`)
                            break
                    }
            }



            if (partyMembers.indexOf(pMember) == partyMembers.length - 1) {
                setTimeout(() => {
                    partyMembers = [];
                }, 500 + 2000 * partyMembers.length+1)
            }
        })

        let components = [t1, t2, t3, t4, t5, t6, t7].filter(Boolean);
        if (components.length > 0) {
            let msg = new Message("&e[CM] Click to the user to add!\n");
            components.forEach((comp, i) => {
                msg.addTextComponent(comp);
                if (i !== components.length - 1) msg.addTextComponent(new TextComponent(" &c|&r "));
            });
            msg.chat();
        }

        pLength = 0
        t1 = null
        t2 = null
        t3 = null
        t4 = null
        t5 = null
        t6 = null
        t7 = null
    }, 500)
    
}).setName("fParty").setAliases("fp") // I'm so lonely 😭

register("chat", (player) => {
    if (!cmSettingsData.cf) return
    coin = Math.random() < 0.5 ? "heads" : "tails";
    ChatLib.command(`pc ${player.split(" ").length > 0 ? player.split(" ")[1] : player} flipped ${coin}`);
}).setCriteria("Party > ${player}: !cf")
register("chat", (player) => {
    if (!cmSettingsData.cf) return
    coin = Math.random() < 0.5 ? "heads" : "tails";
    ChatLib.command(`pc ${player.split(" ").length > 0 ? player.split(" ")[1] : player} flipped ${coin}`);
}).setCriteria("Party > ${player}: !coinflip")

register("chat", (player) => {
    if (!cmSettingsData.dice) return
    dice = Math.floor(Math.random() * 6) + 1;
    ChatLib.command(`pc ${player.split(" ").length > 0 /* Because player is rank + player */ ? player.split(" ")[1] : player} rolled ${dice}`);
}).setCriteria("Party > ${player}: !dice")

register("chat", () => {
    ChatLib.command('sboqueue', true)
}).setCriteria("Party > ${player}: !sboqueue")

register("chat", (player, island, event) => {
    if (!cmSettingsData.follow) return
    cancel(event);
}).setCriteria(" » ${player} is traveling to ${island} FOLLOW")