import { request } from "../../requestV2";
import { formatNum } from "./cmFunctions";

const apiUrl = `https://api.hypixel.net/skyblock/auctions?`;

let loading = false;
function loadingMsg() {
    let loading2 = true;
    ChatLib.chat("&6&l[Cm] &r&7Loading...");
    let dots = "";
        while (loading && loading2) {
            loading2 = false;
            setTimeout(() => {
                ChatLib.editChat("&6&l[Cm] &r&7Loading", new Message(`&6&l[Cm] &r&7Loading${dots}`));
                dots = dots.length < 3 ? dots + "." : "";
                loading2 = true;
            }, 500);
        }
}

let test2 = true;

register("command", () => {
    let test = true;
    while (test2 && test) {
        test = false;
        setTimeout(() => {
            ChatLib.chat("In the delay")
            test = true;
        }, 1000)
        ChatLib.chat("Out the delay")
    }
    
}).setName("delayedMsg")

register("command", () => {
    test2 = false;
}).setName("delayedMsg2")

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

function fetchAuctionsAndDisplay(lfItem, src) {
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
                    console.error(`Error fetching auction data: ${error.message}`);
                    return { error: error.message };
                })
            );
        }

        // Remplacement de Promise.allSettled() par une boucle manuelle
        let resolvedPromises = 0;
        let errors = [];

        promises.forEach((p) => {
            p.then(() => {
                resolvedPromises++;
                if (resolvedPromises === promises.length) {
                    if (errors.length > 0) {
                        console.error("Errors encountered while fetching auction data:", errors);
                    }

                    ChatLib.chat(`&c${itemsWantedFound} items found`);
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
                }
            }}).catch((error) => {
                errors.push(error);
                resolvedPromises++;
            });
        });
    }).catch((error) => {
        console.error(`Error initializing auction data fetch: ${error.message}`);
    });
}
