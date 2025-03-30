import { request } from "../../requestV2";
import { formatNum } from "./cmFunctions";

// Définition manuelle de Promise si non supporté (Rhino)
if (typeof Promise === "undefined") {
    function Promise(executor) {
        let resolve, reject;
        this.then = function (callback) {
            resolve = callback;
            return this;
        };
        this.catch = function (callback) {
            reject = callback;
            return this;
        };
        executor(resolve, reject);
    }
}

const apiKey = "5fb0a367-989f-4b4f-b286-f3cc8467aa51";
const apiUrl = `https://api.hypixel.net/skyblock/auctions?key=${apiKey}`;

register("command", (...args) => {
    const lfItem = [args.join(" ")];
    let nbOfItems = 0;
    let itemsWantedFound = 0;
    let itemsList = [];

    function fetchAuctions() {
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
                            nbOfItems++;
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

                        ChatLib.chat(`&cEnd of page, ${nbOfItems} items found, ${itemsWantedFound} items wanted found`);
                        itemsList.sort((a, b) => a.price - b.price);
                        itemsList.reverse();
                        for (const item of itemsList) {
                            new TextComponent(`&eItem: &c${item.item_name}, &eAuction ID: &a ${item.auction_id}, &ePrice: &c${formatNum(item.price)}`)
                                .setClick("run_command", `/viewauction ${item.auction_id}`)
                                .setHoverValue("&eClick to view auction")
                                .chat();
                        }
                    }
                }).catch((error) => {
                    errors.push(error);
                    resolvedPromises++;
                });
            });
        }).catch((error) => {
            console.error(`Error initializing auction data fetch: ${error.message}`);
        });
    }

    fetchAuctions();
}).setName("viewAuctionsForItem").setAliases("VAFI");

register("command", (...args) => {
    const lfItem = [args.join(" ")];
    let nbOfItems = 0;
    let itemsWantedFound = 0;
    let itemsList = [];

    function fetchAuctions() {
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
                            nbOfItems++;
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

                        ChatLib.chat(`&cEnd of page, ${nbOfItems} items found, ${itemsWantedFound} items wanted found`);
                        itemsList.sort((a, b) => a.price - b.price);
                        let item = itemsList[0];
                        new TextComponent(`&eItem: &c${item.item_name}, &eAuction ID: &a ${item.auction_id}, &ePrice: &c${formatNum(item.price)}`)
                        .setClick("run_command", `/viewauction ${item.auction_id}`)
                        .setHoverValue("&eClick to view auction")
                        .chat();
                    }
                }).catch((error) => {
                    errors.push(error);
                    resolvedPromises++;
                });
            });
        }).catch((error) => {
            console.error(`Error initializing auction data fetch: ${error.message}`);
        });
    }

    fetchAuctions();
}).setName("cheapestviewAuctionsForItem").setAliases("CVAFI", "cVa");

// VAFI, no error when loading module






register("command", (...args) => {
    const lfItem = args.map(arg => arg.replace(/_/g, ' '));
    let nbOfItems = 0;
    let itemsWantedFound = 0;
    let itemsList = [];

    function fetchAuctions() {
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
                            nbOfItems++;
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

                        ChatLib.chat(`&cEnd of page, ${nbOfItems} items found, ${itemsWantedFound} items wanted found`);
                        itemsList.sort((a, b) => a.price - b.price);
                        itemsList.reverse();
                        for (const item of itemsList) {
                            new TextComponent(`&eItem: &c${item.item_name}, &eAuction ID: &a ${item.auction_id}, &ePrice: &c${formatNum(item.price)}`)
                                .setClick("run_command", `/viewauction ${item.auction_id}`)
                                .setHoverValue("&eClick to view auction")
                                .chat();
                        }
                    }
                }).catch((error) => {
                    errors.push(error);
                    resolvedPromises++;
                });
            });
        }).catch((error) => {
            console.error(`Error initializing auction data fetch: ${error.message}`);
        });
    }

    fetchAuctions();
}).setName("viewAuctionsForItemMult").setAliases("VAFIM");

register("command", (...args) => {
    const lfItem = args.map(arg => arg.replace(/_/g, ' '));
    let nbOfItems = 0;
    let itemsWantedFound = 0;
    let itemsList = [];

    function fetchAuctions() {
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
                            nbOfItems++;
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

                        ChatLib.chat(`&cEnd of page, ${nbOfItems} items found, ${itemsWantedFound} items wanted found`);
                        itemsList.sort((a, b) => a.price - b.price);
                        let item = itemsList[0];
                        new TextComponent(`&eItem: &c${item.item_name}, &eAuction ID: &a ${item.auction_id}, &ePrice: &c${formatNum(item.price)}`)
                        .setClick("run_command", `/viewauction ${item.auction_id}`)
                        .setHoverValue("&eClick to view auction")
                        .chat();
                    }
                }).catch((error) => {
                    errors.push(error);
                    resolvedPromises++;
                });
            });
        }).catch((error) => {
            console.error(`Error initializing auction data fetch: ${error.message}`);
        });
    }

    fetchAuctions();
}).setName("cheapestviewAuctionsForItemMult").setAliases("CVAFIM", "cVam");