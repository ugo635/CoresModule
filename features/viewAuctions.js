import { request } from "../../requestV2";

const apiKey = "5fb0a367-989f-4b4f-b286-f3cc8467aa51";
const apiUrl = `https://api.hypixel.net/skyblock/auctions?key=${apiKey}`;

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
                            const itemSeller = auction.auctioneer;
                            const itemAuctionId = auction.uuid;
                            const price = auction.starting_bid;

                            itemsList.push({
                                item_name: itemName,
                                seller: itemSeller,
                                auction_id: itemAuctionId,
                                price: price
                            });
                        }
                    }).catch((error) => {
                        console.error(`Error fetching auction data: ${error.message}`);
                    })
                );
            }

            Promise.all(promises).then(() => {
                ChatLib.chat(`End of page, ${nbOfItems} items found, ${itemsWantedFound} items wanted found`);
                itemsList.sort((a, b) => a.price - b.price);
                for (const item of itemsList) {
                    new TextComponent(`Item: ${item.item_name}, Seller: ${item.seller}, Auction ID: ${item.auction_id}, Price: ${item.price}`)
                        .setClick("run_command", `/viewauction ${item.auction_id}`)
                        .setHoverValue("&eClick to view auction")
                        .chat();
                }
            });
        }).catch((error) => {
            console.error(`Error initializing auction data fetch: ${error.message}`);
        });
    }

    fetchAuctions();
}).setName("viewAuctionsForItem").setAliases("VAFI");
