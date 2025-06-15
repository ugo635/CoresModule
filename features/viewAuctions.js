import { request } from "../../requestV2";
import { formatNum } from "./cmFunc";

const apiUrl = `https://api.hypixel.net/skyblock/auctions?`;

let loading = false;

function loadingMsg() {
    loading = true;
    let dots = "";
    let loadingMessage = new Message("&6&l[Cm] &r&7Loading");
    loadingMessage.chat();
    //loadingMessage.setChatLineId(1); // Set a unique ID for the message

    function animateDots() {
        if (!loading) return ChatLib.deleteChat(loadingMessage);

        dots = dots.length < 3 ? dots + "." : "";
        setTimeout(() => {
            newMsg = new Message(`&6&l[Cm] &r&7Loading${dots}`);
            loadingMessage.edit(newMsg);
            loadingMessage = newMsg;
            animateDots();
        }, 500);
    }

    animateDots();

    // Stop after a certain time (e.g., 5 seconds)
    setTimeout(() => {
        loading = false;
    }, 5000);
}

register("command", (...args) => {
    const lfItem = [args.join(" ")];
    fetchAuctionsAndDisplay(lfItem, "VAFI");
}).setName("viewAuctionsForItem").setAliases("VAFI");

register("command", (...args) => {
    const lfItem = [args.join(" ")];
    fetchAuctionsAndDisplay(lfItem, "cVa");
}).setName("cheapestviewAuctionsForItem").setAliases("CVAFI", "cVa");

register("command", (...args) => {
    const lfItem = args.map(arg => arg.replace(/_/g, " "));
    fetchAuctionsAndDisplay(lfItem, "VAFIM");
}).setName("viewAuctionsForItemMult").setAliases("VAFIM", "Vam");

register("command", (...args) => {
    const lfItem = args.map(arg => arg.replace(/_/g, " "));
    fetchAuctionsAndDisplay(lfItem, "cVam");
}).setName("cheapestviewAuctionsForItemMult").setAliases("CVAFIM", "cVam");

register("command", (...args) => {
    const lfItem = args.map(arg => arg.replace(/_/g, " "));
    fetchAuctionsAndDisplay(lfItem, "cVam");
}).setName("cheapestviewAuctionsForItemMult2").setAliases("CVAFIM2", "cVam2");

function fetchAuctionsAndDisplay(lfItem, src, price = null) {
    loading = true;
    loadingMsg();
    let itemsWantedFound = 0;
    let itemsList = [];
    request({
        url: apiUrl,
        json: true
    }).then((initialData) => {
        const numberOfPages = initialData.totalPages || 0;

        let promises = [];
        for (let nbPage = 1; nbPage <= numberOfPages; nbPage++) {
            const pageUrl = `${apiUrl}&page=${nbPage}`;
            promises.push(
                request({
                    url: pageUrl,
                    json: true
                }).then((data) => {
                    if (!data.success) {
                        throw new Error("Failed to fetch data from the Hypixel API.");
                    }

                    const auctions = data.auctions || [];
                    for (const auction of auctions) {
                        const itemName = auction.item_name;
                        if (!lfItem.some(item => item.toLowerCase() === itemName.toLowerCase()) || auction.claimed || !auction.bin) {
                            continue;
                        }
                        itemsWantedFound++;
                        const itemAuctionId = auction.uuid;
                        const price = auction.starting_bid;

                        itemsList.push({
                            item_name: itemName,
                            auction_id: itemAuctionId,
                            price: price
                        });
                    }
                }).catch((error) => {
                    console.error(`Error fetching auction data: ${error}`);
                    return { error: error };
                })
            );
        }

        let resolvedPromises = 0;
        let errors = [];

        promises.forEach((p) => {
            p.then(() => {
                resolvedPromises++;
                if (resolvedPromises === promises.length) {
                    if (errors.length > 0) {
                        console.error("Errors encountered while fetching auction data:", errors);
                    }

                    if (src != "ta") ChatLib.chat(`&c${itemsWantedFound} items found`);

                    if (src == "VAFI") {
                    itemsList.sort((a, b) => a.price - b.price);
                    itemsList.reverse();
                    for (const item of itemsList) {
                        new TextComponent(`&eItem: &c${item.item_name}, &eAuction ID: &a ${item.auction_id}, &ePrice: &c${formatNum(item.price)}`)
                            .setClick("run_command", `/viewauction ${item.auction_id}`)
                            .setHoverValue("&eClick to view auction")
                            .chat();
                    }
                } else if (src == "cVa") {
                    itemsList.sort((a, b) => a.price - b.price);
                    let item = itemsList[0];
                    new TextComponent(`&eItem: &c${item.item_name}, &eAuction ID: &a ${item.auction_id}, &ePrice: &c${formatNum(item.price)}`)
                        .setClick("run_command", `/viewauction ${item.auction_id}`)
                        .setHoverValue("&eClick to view auction")
                        .chat();

                } else if (src == "VAFIM") {
                    itemsList.sort((a, b) => a.price - b.price);
                    itemsList.reverse();
                    for (const item of itemsList) {
                        new TextComponent(`&eItem: &c${item.item_name}, &eAuction ID: &a ${item.auction_id}, &ePrice: &c${formatNum(item.price)}`)
                            .setClick("run_command", `/viewauction ${item.auction_id}`)
                            .setHoverValue("&eClick to view auction")
                            .chat();
                    }
                } else if (src == "cVam") {
                    const groupedItems = {};
                    let toOutput = [];
                    for (const item of itemsList) {
                        const name = item.item_name;
                        if (!groupedItems[name]) groupedItems[name] = [];
                        groupedItems[name].push(item);
                    }

                    Object.keys(groupedItems).forEach(itemName => {
                        const sorted = groupedItems[itemName].sort((a, b) => a.price - b.price);
                        const cheapest = sorted[0];
                        toOutput.push(cheapest);
                    });
                
                    toOutput.sort((a, b) => a.price - b.price);
                    toOutput.reverse();
                    for (const item of toOutput) {
                        new TextComponent(`&eItem: &c${item.item_name}, &eAuction ID: &a ${item.auction_id}, &ePrice: &c${formatNum(item.price)}`)
                            .setClick("run_command", `/viewauction ${item.auction_id}`)
                            .setHoverValue("&eClick to view auction")
                            .chat();
                    }
                } else if (src == "cVam2") {
                    itemsList.sort((a, b) => a.price - b.price);
                    let item = itemsList[0];
                    new TextComponent(`&eItem: &c${item.item_name}, &eAuction ID: &a ${item.auction_id}, &ePrice: &c${formatNum(item.price)}`)
                        .setClick("run_command", `/viewauction ${item.auction_id}`)
                        .setHoverValue("&eClick to view auction")
                        .chat();
                } else if (src == "ta") {
                    itemsList.sort((a, b) => a.price - b.price);
                    itemsList.reverse();
                    if (!itemsList || itemsList.length === 0) {
                        ChatLib.chat(`&cNo auctions found for ${lfItem[0]}.`);
                        return;
                    }

                    const filteredItems = itemsList.filter(item => item.price <= price);
                    if (filteredItems.length === 0) {
                        ChatLib.chat(`&cNo auctions found for ${lfItem[0]} below ${formatNum(price)} coins.`);
                        loading = false;
                        return;
                    }

                    ChatLib.chat(`&5Found ${filteredItems.length} auctions for ${lfItem[0]} below ${formatNum(price)} coins:`);
                    filteredItems.forEach(item => {
                        new TextComponent(`&eItem: &c${item.item_name}, &eAuction ID: &a ${item.auction_id}, &ePrice: &c${formatNum(item.price)}`)
                            .setClick("run_command", `/viewauction ${item.auction_id}`)
                            .setHoverValue("&eClick to view auction")
                            .chat();
                    });
                }



                loading = false;
            }}).catch((error) => {
                errors.push(error);
                resolvedPromises++;
            });
        });
    }).catch((error) => {
        console.error(`Error initializing auction data fetch: ${error}`);
    });
}















function unFormatNum(num) {
    let number, mult;

    switch (num.charAt(num.length - 1).toLowerCase()) {
        case "k":
            [number, mult] = [num.split("k")[0], 1000]

            break;

        case "m":
            [number, mult] = [num.split("m")[0], 1000000]
            break;

        case "b":
            [number, mult] = [num.split("b")[0], 1000000000]
            break;

        default:
            number, mult = num, 1
            break;
    }

    return parseFloat(number) * mult

}



register("command", (arg1, arg2, ...args) => {
    if (!arg1 || !arg2) {
        ChatLib.chat("&cUsage: /trackAuction <item> <price>");
        return;
    }

    const item = arg1.replace(/_/g, " ");
    const price = unFormatNum(arg2)

    if (isNaN(price) || price <= 0) {
        ChatLib.chat("&cInvalid price specified.");
        return;
    }

    fetchAuctionsAndDisplay([item], "ta", price);

}).setName("trackAuction")//.setAliases("");