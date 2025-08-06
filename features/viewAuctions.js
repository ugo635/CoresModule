import { request } from "../../requestV2";
import { formatNum } from "./cmFunc";

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

    // Set a timeout to stop loading after 5 seconds, just in case.
    setTimeout(() => {
        loading = false;
    }, 5000);
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
    fetchAuctionsAndDisplay(lfItem, "cVam");
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
            ChatLib.chat(`&eItem '${lfItem[0]}' not found in Bazaar. Searching Auction House...`);
            return request({ url: AUCTION_API_URL, json: true });
        })
        .then(initialData => {
            if (!initialData) { // If Bazaar item was found, initialData will be undefined
                loading = false; // Ensure loading is stopped if Bazaar item was handled
                return;
            }

            const numberOfPages = initialData.totalPages || 0;
            let promises = [];
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
                    } else if (src === "cVam" || src === "cVam2") { // Both cVam and cVam2 should show cheapest of each type
                        const groupedItems = {};
                        for (const item of itemsList) {
                            const name = item.item_name;
                            if (!groupedItems[name]) groupedItems[name] = [];
                            groupedItems[name].push(item);
                        }

                        let toOutput = [];
                        Object.keys(groupedItems).forEach(itemName => {
                            const sorted = groupedItems[itemName].sort((a, b) => a.price - b.price);
                            const cheapest = sorted[0];
                            toOutput.push(cheapest);
                        });

                        toOutput.sort((a, b) => a.price - b.price); // Sort ascending for cheapest overall
                        for (const item of toOutput) {
                            new TextComponent(`&eItem: &c${item.item_name}, &eAuction ID: &a ${item.auction_id}, &ePrice: &c${formatNum(item.price)}`)
                                .setClick("run_command", `/viewauction ${item.auction_id}`)
                                .setHoverValue("&eClick to view auction")
                                .chat();
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
 * Fetches and displays item information from the Hypixel Bazaar API.
 * This function is now deprecated as its logic has been integrated into fetchAuctionsAndDisplay.
 * @param {string} itemId - The ID of the item (e.g., "ENCHANTED_DIAMOND").
 */
function displayBazaarItemInfo(itemId) {
    // This function is now deprecated. Its logic has been moved to fetchAuctionsAndDisplay.
    // However, keeping it for compatibility if other parts of the code still call it directly.
    ChatLib.chat("&6&l[Cm] &r&7Fetching Bazaar Info (via deprecated function)...");
    loadingMsg();
    request({ url: BAZAAR_API_URL, json: true })
        .then(response => {
            if (!response.success) {
                throw new Error("Failed to fetch data from the Hypixel Bazaar API.");
            }

            const products = response.products;
            const formattedItemId = itemId.toUpperCase().replace(/ /g, '_'); // Convert item name to Bazaar ID format

            if (products[formattedItemId]) {
                const product = products[formattedItemId];
                const buyPrice = product.buy_summary.length ? product.buy_summary[0].pricePerUnit : 'N/A';
                const sellPrice = product.sell_summary.length ? product.sell_summary[0].pricePerUnit : 'N/A';
                const quickStatus = product.quick_status;

                ChatLib.chat(`&a--- Bazaar Info for &c${itemId} &a---`);
                ChatLib.chat(`&eBuy Price: &a${formatNum(buyPrice)}`);
                ChatLib.chat(`&eSell Price: &c${formatNum(sellPrice)}`);
                ChatLib.chat(`&eDemand: &f${formatNum(quickStatus.buyOrders)}`);
                ChatLib.chat(`&eSupply: &f${formatNum(quickStatus.sellOrders)}`);
                ChatLib.chat(`&a-----------------------------------`);
            } else {
                ChatLib.chat(`&cItem '${itemId}' not found in Bazaar.`);
            }
        })
        .catch(error => {
            console.error(`Error in displayBazaarItemInfo: ${error}`);
            ChatLib.chat(`&cAn error occurred fetching Bazaar info: ${error.message}`);
        })
        .finally(() => { // This .finally() is in a deprecated function, so it's less critical.
            loading = false;
        });
}

// Register a new command for Bazaar item info
// This command will now effectively call the main fetchAuctionsAndDisplay,
// which will handle the Bazaar check first.
register("command", (arg1) => {
    if (!arg1) {
        ChatLib.chat("&cUsage: /bazaaritem <item_name>");
        return;
    }
    // Call the main function, it will handle the Bazaar check
    fetchAuctionsAndDisplay([arg1], "bazaar_check_only"); // Using a dummy src for bazaar check
}).setName("bazaaritem").setAliases("bzi");


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
 * @returns {Promise<{buyPrice: number, sellPrice: number}>} Object containing buy and sell prices.
 */
function getItemPriceBazaar(itemId, multiplier = 1) {
    return new Promise((resolve, reject) => {
        request({ url: BAZAAR_API_URL, json: true })
            .then(response => {
                if (!response.success) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = response;

                const product = data.products[itemId];
                if (!product) {
                    console.warn(`Item with ID '${itemId}' not found in Bazaar data.`);
                    resolve({ buyPrice: 0, sellPrice: 0 }); // Resolve with 0 if not found
                    return;
                }

                const buyPrice = product.buy_summary.length ? product.buy_summary[0].pricePerUnit : 0;
                const sellPrice = product.sell_summary.length ? product.sell_summary[0].pricePerUnit : 0;

                resolve({
                    buyPrice: buyPrice * multiplier,
                    sellPrice: sellPrice * multiplier
                });
            })
            .catch(error => {
                console.error('Error fetching item prices from Bazaar:', error);
                reject(error); // Reject the promise on error
            });
    });
}

/**
 * Calculates profit for Dragon Boot crafting based on Bazaar prices and simulates runs.
 * Usage: /dragonBootProfit <endermite_multiplier_type> <boots_per_run> <iterations>
 * endermite_multiplier_type: "true" (0.55) or "false" (0.45)
 * boots_per_run: Number of boots crafted per simulation run (default 1)
 * iterations: Number of simulation iterations (default 100000)
 */
register("command", (endermiteType, bootsPerRunStr, iterationsStr) => {
    ChatLib.chat("&6&l[Cm] &r&7Calculating Dragon Boot Profit...");
    loadingMsg();

    let endermiteMultiplier = 0.55; // Default to true (0.55)
    if (endermiteType && endermiteType.toLowerCase() === 'false') {
        endermiteMultiplier = 0.45;
    }

    let bootsPerRun = parseInt(bootsPerRunStr);
    if (isNaN(bootsPerRun) || bootsPerRun <= 0) {
        bootsPerRun = 1; // Default to 1 boot per run
    }

    let iterations = parseInt(iterationsStr);
    if (isNaN(iterations) || iterations <= 0) {
        iterations = 100000; // Default to 100,000 iterations
    }

    // Use a sequential promise chain for fetching data
    const fragNames = [
        'HOLY_FRAGMENT', 'OLD_FRAGMENT', 'PROTECTOR_FRAGMENT', 'STRONG_FRAGMENT',
        'SUPERIOR_FRAGMENT', 'UNSTABLE_FRAGMENT', 'WISE_FRAGMENT', 'YOUNG_FRAGMENT'
    ];

    let cheapestFrag = { name: '', price: Infinity };
    let fragIndex = 0;

    // Function to fetch fragment prices sequentially
    function fetchNextFragPrice() {
        if (fragIndex < fragNames.length) {
            const fragName = fragNames[fragIndex];
            getItemPriceBazaar(fragName)
                .then(prices => {
                    if (prices.buyPrice > 0 && prices.buyPrice < cheapestFrag.price) {
                        cheapestFrag = { name: fragName, price: prices.buyPrice };
                    }
                    fragIndex++;
                    fetchNextFragPrice(); // Call next in sequence
                })
                .catch(error => {
                    console.error(`Error fetching price for ${fragName}:`, error);
                    fragIndex++;
                    fetchNextFragPrice(); // Continue even if one fails
                });
        } else {
            // All fragments fetched, proceed to next step
            if (cheapestFrag.name === '') {
                ChatLib.chat("&cCould not determine cheapest fragment. Aborting profit calculation.");
                loading = false;
                return; // Stop execution
            }

            const materialsCost = [
                { name: cheapestFrag.name, multiplier: 40, type: 'crafting_cost' },
                { name: 'ESSENCE_DRAGON', multiplier: 30, type: 'crafting_cost' }
            ];

            const potentialDrops = [
                { name: cheapestFrag.name, multiplier: 15, dropChance: 0.8193, type: 'bonus_drop' },
                { name: 'RITUAL_RESIDUE', multiplier: 1, dropChance: 0.1084, type: 'bonus_drop' },
                { name: 'SUMMONING_EYE', multiplier: 1, dropChance: 0.0482, type: 'bonus_drop' },
                { name: 'DRAGON_HORN', multiplier: 1, dropChance: 0.0241, type: 'bonus_drop' }
            ];

            let allItems = [...materialsCost, ...potentialDrops];
            let itemIndex = 0;

            // Function to fetch all item prices sequentially
            function fetchNextItemPrice() {
                if (itemIndex < allItems.length) {
                    const item = allItems[itemIndex];
                    getItemPriceBazaar(item.name, item.multiplier)
                        .then(prices => {
                            item.buyPrice = prices.buyPrice;
                            item.sellPrice = prices.sellPrice;
                            itemIndex++;
                            fetchNextItemPrice(); // Call next in sequence
                        })
                        .catch(error => {
                            console.error(`Error fetching price for ${item.name}:`, error);
                            itemIndex++;
                            fetchNextItemPrice(); // Continue even if one fails
                        });
                } else {
                    // All item prices fetched, now run simulation
                    let totalProfit = 0;
                    let minProfit = Infinity;
                    let maxProfit = -Infinity;

                    for (let i = 0; i < iterations; i++) {
                        let iterationProfit = 0;

                        for (let j = 0; j < bootsPerRun; j++) {
                            let runProfit = 0;

                            // Calculate crafting costs (using buy prices for materials)
                            materialsCost.forEach(item => {
                                runProfit -= item.buyPrice;
                            });

                            // Add profit from potential drops (using sell prices for drops)
                            potentialDrops.forEach(item => {
                                if (Math.random() < item.dropChance) {
                                    runProfit += item.sellPrice * endermiteMultiplier; // Apply endermite multiplier to sell price of drops
                                }
                            });
                            iterationProfit += runProfit;
                        }

                        totalProfit += iterationProfit;
                        minProfit = Math.min(minProfit, iterationProfit);
                        maxProfit = Math.max(maxProfit, iterationProfit);
                    }

                    const avgProfit = totalProfit / iterations;

                    ChatLib.chat(`&a--- Dragon Boot Profit Simulation ---`);
                    ChatLib.chat(`&eEndermite Multiplier: &b${endermiteMultiplier}`);
                    ChatLib.chat(`&eBoots per Run: &b${bootsPerRun}`);
                    ChatLib.chat(`&eIterations: &b${iterations}`);
                    ChatLib.chat(`&aAverage Profit: &b${formatNum(avgProfit)}`);
                    ChatLib.chat(`&aMinimum Profit: &b${formatNum(minProfit)}`);
                    ChatLib.chat(`&aMaximum Profit: &b${formatNum(maxProfit)}`);
                    ChatLib.chat(`&a-----------------------------------`);
                    loading = false; // Stop loading after simulation
                }
            }
            fetchNextItemPrice(); // Start fetching all item prices
        }
    }
    fetchNextFragPrice(); // Start fetching fragment prices
});
