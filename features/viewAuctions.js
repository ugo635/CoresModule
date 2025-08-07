import { request } from "../../requestV2";
import { formatNum } from "./cmFunc";
import PogObject from "../../PogData";

// Define the API URLs for both auctions and bazaar
const AUCTION_API_URL = `https://api.hypixel.net/skyblock/auctions?`;
const BAZAAR_API_URL = `https://api.hypixel.net/skyblock/bazaar`;

let loading = false;

/**
 * Displays a loading message in chat.
 */
function loadingMsg() {
    loading = true;
    let dots = "";
    let loadingMessage = new Message("&6&l[Cm] &r&7Loading");
    loadingMessage.chat();

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

    // Set a timeout to stop loading after 45 seconds, just in case.
    setTimeout(() => {
        loading = false;
    }, 45000);
}

// Register commands for auction viewing
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
    fetchAuctionsAndDisplay(lfItem, "cVam2");
}).setName("cheapestviewAuctionsForItemMult2").setAliases("CVAFIM2", "cVam2");

/**
 * Fetches item data from Bazaar or Auction House and displays it.
 * It first attempts to fetch from Bazaar. If not found, it falls back to Auction House.
 * @param {string[]} lfItem - Array of item names to look for. Only lfItem[0] is used for Bazaar lookup.
 * @param {string} src - Type of display format for Auction House results ("VAFI", "cVa", "VAFIM", "cVam", "cVam2", "ta").
 * @param {number} [price=null] - Price for tracking auctions (only relevant for "ta" src).
 */
function fetchAuctionsAndDisplay(lfItem, src, price = null) {
    loading = true;
    loadingMsg();
    let itemsList = [];
    let errors = [];
    const itemNameForBazaar = lfItem[0].toUpperCase().replace(/ /g, '_');
    
    // --- Step 1: Attempt to fetch from Bazaar ---
    request({ url: BAZAAR_API_URL, json: true })
        .then(bazaarResponse => {
            if (bazaarResponse.success && bazaarResponse.products[itemNameForBazaar]) {
                const product = bazaarResponse.products[itemNameForBazaar];
                const buyPrice = product.buy_summary.length ? product.buy_summary[0].pricePerUnit : 'N/A';
                const sellPrice = product.sell_summary.length ? product.sell_summary[0].pricePerUnit : 'N/A';
                const quickStatus = product.quick_status;

                ChatLib.chat(`&a--- Bazaar Info for &c${lfItem[0]} &a---`);
                ChatLib.chat(`&eBuy Price: &a${formatNum(buyPrice)}`);
                ChatLib.chat(`&eSell Price: &c${formatNum(sellPrice)}`);
                ChatLib.chat(`&eDemand: &f${formatNum(quickStatus.buyOrders)}`);
                ChatLib.chat(`&eSupply: &f${formatNum(quickStatus.sellOrders)}`);
                ChatLib.chat(`&a-----------------------------------`);
                loading = false;
                return; // Item found in Bazaar, no need to check auctions
            }

            // --- Step 2: If not in Bazaar, proceed with Auction House search ---
            return request({ url: AUCTION_API_URL, json: true });
        })
        .then(initialData => {
            if (!initialData) { // If Bazaar item was found, initialData will be undefined
                loading = false; // Ensure loading is stopped if Bazaar item was handled
                return;
            }

            const numberOfPages = initialData.totalPages || 0;
            let resolvedPromisesCount = 0; // Manual counter for promises

            // Function to check if all promises are resolved
            function checkAllPromisesResolved() {
                if (resolvedPromisesCount === numberOfPages) {
                    // All auction pages fetched, now process and display
                    if (errors.length > 0) {
                        console.error("Errors encountered while fetching auction data:", errors);
                    }

                    if (src !== "ta") ChatLib.chat(`&c${itemsList.length} items found`);

                    // Sorting and displaying logic based on src
                    if (src === "VAFI") {
                        itemsList.sort((a, b) => b.price - a.price); // Sort descending for VAFI
                        for (const item of itemsList) {
                            new TextComponent(`&eItem: &c${item.item_name}, &eAuction ID: &a ${item.auction_id}, &ePrice: &c${formatNum(item.price)}`)
                                .setClick("run_command", `/viewauction ${item.auction_id}`)
                                .setHoverValue("&eClick to view auction")
                                .chat();
                        }
                    } else if (src === "cVa") {
                        itemsList.sort((a, b) => a.price - b.price); // Sort ascending for cVa
                        if (itemsList.length > 0) {
                            let item = itemsList[0];
                            new TextComponent(`&eItem: &c${item.item_name}, &eAuction ID: &a ${item.auction_id}, &ePrice: &c${formatNum(item.price)}`)
                                .setClick("run_command", `/viewauction ${item.auction_id}`)
                                .setHoverValue("&eClick to view auction")
                                .chat();
                        } else {
                            ChatLib.chat(`&cNo auctions found for ${lfItem[0]}.`);
                        }
                    } else if (src === "VAFIM") {
                        itemsList.sort((a, b) => b.price - a.price); // Sort descending for VAFIM
                        for (const item of itemsList) {
                            new TextComponent(`&eItem: &c${item.item_name}, &eAuction ID: &a ${item.auction_id}, &ePrice: &c${formatNum(item.price)}`)
                                .setClick("run_command", `/viewauction ${item.auction_id}`)
                                .setHoverValue("&eClick to view auction")
                                .chat();
                        }
                    } else if (src === "cVam") { // Cheapest of each type, sorted ascending based on input queries
                        const groupedItems = {};
                        // Iterate through each item found in the itemsList
                        for (const item of itemsList) {
                            // For each item, check against every original search query (lfItem)
                            for (const query of lfItem) {
                                // If the item's name (case-insensitive) includes the current search query (case-insensitive)
                                if (item.item_name.toLowerCase().includes(query.toLowerCase())) {
                                    // Use the original search query as the key for the group
                                    // This ensures that "Spicy Aspect Of The Dragon" gets grouped under "Aspect Of The Dragon"
                                    if (!groupedItems[query]) {
                                        groupedItems[query] = [];
                                    }
                                    // Add the item to this group
                                    groupedItems[query].push(item);
                                    // Break here: This ensures an item is only added to the first matching group.
                                    // If an item's name contains multiple search queries (e.g., "Diamond Sword" matches "Diamond" and "Sword"),
                                    // it will be grouped under the first query it matches in the lfItem array.
                                    break;
                                }
                            }
                        }

                        let toOutput = [];
                        // For each group (which is based on an original search query)
                        Object.keys(groupedItems).forEach(queryName => {
                            // Sort the items within this group by price to find the cheapest
                            const sorted = groupedItems[queryName].sort((a, b) => a.price - b.price);
                            // Take the cheapest item from this group
                            const cheapest = sorted[0];
                            // Add it to the list of items to be outputted
                            if (cheapest) { // Ensure cheapest is not undefined if group was empty
                                toOutput.push(cheapest);
                            }
                        });

                        // Sort the final list of cheapest items (one per query) by price for display
                        toOutput.sort((a, b) => a.price - b.price);
                        for (const item of toOutput) {
                            new TextComponent(`&eItem: &c${item.item_name}, &eAuction ID: &a ${item.auction_id}, &ePrice: &c${formatNum(item.price)}`)
                                .setClick("run_command", `/viewauction ${item.auction_id}`)
                                .setHoverValue("&eClick to view auction")
                                .chat();
                        }
                    } else if (src === "cVam2") { // Single cheapest overall
                        let matchingItems = [];
                        // Filter itemsList to include only items that match any of the input queries
                        for (const item of itemsList) {
                            for (const query of lfItem) {
                                if (item.item_name.toLowerCase().includes(query.toLowerCase())) {
                                    matchingItems.push(item);
                                    break; // Add item once and move to the next item
                                }
                            }
                        }

                        // If any matching items were found, sort them by price to find the absolute cheapest
                        if (matchingItems.length > 0) {
                            matchingItems.sort((a, b) => a.price - b.price);
                            const absoluteCheapest = matchingItems[0];
                            new TextComponent(`&eItem: &c${absoluteCheapest.item_name}, &eAuction ID: &a ${absoluteCheapest.auction_id}, &ePrice: &c${formatNum(absoluteCheapest.price)}`)
                                .setClick("run_command", `/viewauction ${absoluteCheapest.auction_id}`)
                                .setHoverValue("&eClick to view auction")
                                .chat();
                        } else {
                            // If no auctions were found for any of the input items
                            ChatLib.chat(`&cNo auctions found for ${lfItem[0]}.`);
                        }
                    } else if (src === "ta") {
                        itemsList.sort((a, b) => b.price - a.price); // Sort descending for tracking auctions
                        if (!itemsList || itemsList.length === 0) {
                            ChatLib.chat(`&cNo auctions found for ${lfItem[0]}.`);
                            loading = false;
                            return;
                        }

                        const filteredItems = itemsList.filter(item => item.price <= price);
                        if (filteredItems.length === 0) {
                            ChatLib.chat(`&cNo auctions found for ${lfItem[0]} below ${formatNum(price)} coins.`);
                            loading = false;
                            return;
                        }

                        ChatLib.chat(`&5Found ${filteredItems.length} auctions for &c${lfItem[0]} &5below &c${formatNum(price)} &5coins:`);
                        filteredItems.forEach(item => {
                            new TextComponent(`&eItem: &c${item.item_name}, &eAuction ID: &a ${item.auction_id}, &ePrice: &c${formatNum(item.price)}`)
                                .setClick("run_command", `/viewauction ${item.auction_id}`)
                                .setHoverValue("&eClick to view auction")
                                .chat();
                        });
                    }
                    loading = false; // Stop loading after all processing
                }
            }

            // Fetch data from all auction pages
            for (let nbPage = 0; nbPage < numberOfPages; nbPage++) {
                const pageUrl = `${AUCTION_API_URL}&page=${nbPage}`;
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
                        // Check if the item name (case-insensitive) is in lfItem and if it's a BIN auction and not claimed
                        if (lfItem.some(item => itemName.toLowerCase().includes(item.toLowerCase())) && auction.bin && !auction.claimed) {
                            itemsList.push({
                                item_name: itemName,
                                auction_id: auction.uuid,
                                price: auction.starting_bid
                            });
                        }
                    }
                    resolvedPromisesCount++;
                    checkAllPromisesResolved();
                }).catch((error) => {
                    console.error(`Error fetching auction data: ${error}`);
                    errors.push(error); // Collect errors
                    resolvedPromisesCount++;
                    checkAllPromisesResolved(); // Still call to ensure loading stops
                });
            }
            // If there are no pages, ensure loading stops immediately
            if (numberOfPages === 0) {
                loading = false;
            }
        })
        .catch(error => {
            console.error(`Error in fetchAuctionsAndDisplay: ${error}`);
            ChatLib.chat(`&cAn error occurred: ${error.message}`);
            loading = false; // Ensure loading stops on error
        });
}

/**
 * Converts a formatted number string (e.g., "1.2k", "3m") to a numerical value.
 * @param {string} num - The formatted number string.
 * @returns {number} The unformatted numerical value.
 */
function unFormatNum(num) {
    let number, mult;
    const lastChar = num.charAt(num.length - 1).toLowerCase();

    switch (lastChar) {
        case "k":
            [number, mult] = [num.slice(0, -1), 1000];
            break;
        case "m":
            [number, mult] = [num.slice(0, -1), 1000000];
            break;
        case "b":
            [number, mult] = [num.slice(0, -1), 1000000000];
            break;
        default:
            [number, mult] = [num, 1];
            break;
    }
    return parseFloat(number) * mult;
}

// Register command for tracking auctions
register("command", (arg1, arg2) => {
    if (!arg1 || !arg2) {
        ChatLib.chat("&cUsage: /trackAuction <item> <price>");
        return;
    }

    const item = arg1.replace(/_/g, " ");
    const price = unFormatNum(arg2);

    if (isNaN(price) || price <= 0) {
        ChatLib.chat("&cInvalid price specified.");
        return;
    }

    fetchAuctionsAndDisplay([item], "ta", price);
}).setName("trackAuction");

/**
 * Fetches item prices from the Hypixel Bazaar API.
 * This is a helper function primarily for internal calculations (like dragonBootProfit).
 * @param {string} itemId - The ID of the item (e.g., "ENCHANTED_DIAMOND").
 * @param {number} multiplier - Multiplier for the price (e.g., quantity).
 * @returns {{buyPrice: number, sellPrice: number}} Object containing buy and sell prices.
 */
function getItemPriceBz() {
    return request({ url: BAZAAR_API_URL, json: true })
    .then(response => {
        const data = response;

        // Check API's success flag
        if (!data.success) {
            throw new Error('Failed to fetch data from the Hypixel API.');
        }

        return data;
    })
    .catch(error => {
        // This catch block handles any errors from the `request` promise or `throw` statements above.
        console.error('Error fetching item prices:', error);
        // Return a resolved promise with zero prices on error
        return;
    });
}

function getPriceBz(data, itemId, multiplier) {
    const product = data.result.products[itemId];
    const buyPrice = product.buy_summary.length ? product.buy_summary[0].pricePerUnit : 0;
    const sellPrice = product.sell_summary.length ? product.sell_summary[0].pricePerUnit : 0;
    return { buyPrice: buyPrice * multiplier, sellPrice: sellPrice * multiplier };
}


/**
 * Calculates profit for Dragon Boot crafting based on Bazaar prices and simulates runs.
 * Usage: /dragonBootProfit <endermite_multiplier_type> <boots_per_run> <iterations>
 * endermite_multiplier_type: "true" (0.55) or "false" (0.45)
 * boots_per_run: Number of boots crafted per simulation run (default 1)
 * iterations: Number of simulation iterations (default 100000)
 */
register("command", (bootsPerRunStr, endermiteType, iterationsStr) => {
    ChatLib.chat("&6&l[Cm] &r&7Calculating Dragon Boot Profit...");
    loadingMsg();

    let endermiteMultiplier = 0.55; // Default to true (0.55)
    if (endermiteType && endermiteType.toLowerCase() === 'false') {
        endermiteMultiplier = 0.45;
    } else endermiteType = 'true'; // Default to true if not specified

    let bootsPerRun = parseInt(bootsPerRunStr);
    if (isNaN(bootsPerRun) || bootsPerRun <= 0) {
        bootsPerRun = 1; // Default to 1 boot per run
    }

    let iterations = parseInt(iterationsStr);
    if (isNaN(iterations) || iterations <= 0) {
        iterations = 100000; // Default to 100,000 iterations
    }
    if (iterations > 1000000) {
        iterations = 1000000; // Cap iterations to 1,000,000
    }

    // --- Price Fetching Logic (Identical to previous edit) ---

    let frag = [
        {name: 'Holy_Fragment', multiplier: 1, price: null},
        {name: 'Old_Fragment', multiplier: 1, price: null},
        {name: 'Protector_Fragment', multiplier: 1, price: null},
        {name: 'Strong_Fragment', multiplier: 1, price: null},
        {name: 'Superior_Fragment', multiplier: 1, price: null},
        {name: 'Unstable_Fragment', multiplier: 1, price: null},
        {name: 'Wise_Fragment', multiplier: 1, price: null},
        {name: 'Young_Fragment', multiplier: 1, price: null}
    ];

    let data = getItemPriceBz()

    setTimeout(() => {
    if (!data) {
        console.error("Failed to fetch data from Bazaar API.");
        return;
    }




    for (const item of frag) {
        const prices = getPriceBz(data, item.name.toUpperCase(), item.multiplier)
        item.price = prices.buyPrice
    }
    
    let CheapestFrag = frag[0]
    for (const item of frag) {
        if (item.price < CheapestFrag.price) CheapestFrag = item
    }
    CheapestFrag = CheapestFrag.name



    const items = [
        { name: CheapestFrag, multiplier: 40 },
        { name: 'Essence_Dragon', multiplier: 30 },
        { name: CheapestFrag, multiplier: 15, dropChance: 0.8193 },
        { name: 'Ritual_Residue', multiplier: 1, dropChance: 0.1084 },
        { name: 'Summoning_Eye', multiplier: 1, dropChance: 0.0482 },
        { name: 'Dragon_Horn', multiplier: 1, dropChance: 0.0241 }
    ];

    const cost = [items[0]];
    const guaranteed = [items[1]];
    const bonus = items.slice(2);

    for (const item of items) {
        const prices = getPriceBz(data, item.name.toUpperCase(), item.multiplier);
        item.buyPrice = prices.buyPrice;
        item.sellPrice = prices.sellPrice;
    }

    let totalProfit = 0;
    let minProfit = Infinity;
    let maxProfit = -Infinity;


    for (let i = 0; i < iterations; i++) {
        let iterationProfit = 0;

        for (let j = 0; j < bootsPerRun; j++) {
            let runProfit = 0;

            // Calculate costs
            cost.forEach(item => {
                runProfit -= item.sellPrice;
            });

            // Add guaranteed rewards
            guaranteed.forEach(item => {
                runProfit += item.buyPrice;
            });

            // Add bonus rewards based on dropChance
            bonus.forEach(item => {
                if (Math.random() < item.dropChance) {
                    runProfit += item.buyPrice * endermiteMultiplier;
                }
            });

            iterationProfit += runProfit;
        }

        totalProfit += iterationProfit;
        minProfit = Math.min(minProfit, iterationProfit);
        maxProfit = Math.max(maxProfit, iterationProfit);
    }

    let avgProfit = totalProfit / iterations;
    let avgProfitPerBoot = formatNum(Math.round(avgProfit / bootsPerRun));
    let minProfitPerBoot = formatNum(Math.round(minProfit / bootsPerRun));
    let maxProfitPerBoot = formatNum(Math.round(maxProfit / bootsPerRun));
    avgProfit = formatNum(Math.round(avgProfit));
    minProfit = formatNum(Math.round(minProfit));
    maxProfit = formatNum(Math.round(maxProfit));
    
    ChatLib.chat(`&a----- Dragon Boot Profit Simulation -----`);
    ChatLib.chat(`&eEndermite Multiplier: &b${endermiteType}`);
    ChatLib.chat(`&eBoots per Run: &b${bootsPerRun}`);
    ChatLib.chat(`&eIterations: &b${formatNum(iterations)}`);
    ChatLib.chat(`&aMinimum Profit: &b${minProfit} (${minProfitPerBoot}/run)`);
    ChatLib.chat(`&aAverage Profit: &b${avgProfit} (${avgProfitPerBoot}/run)`);
    ChatLib.chat(`&aMaximum Profit: &b${maxProfit} (${maxProfitPerBoot}/run)`);
    ChatLib.chat(`&a-----------------------------------`);
    loading = false;

    }, 10000)

    
}).setName("dragonBootProfit").setAliases("dbp"); // /dragonBootProfit <endermite_multiplier_type (true/false)> <boots_per_run> <iterations>