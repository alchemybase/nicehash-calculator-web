"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../logger");
// If a user types in the name of a coin it will enable it
// If a user types in the ticker/abbreviation of a coin it will enable it
// If a user types in an algorithm it enables all coins of that algorithm
// If a user types in the ID of a coin it will enable it
// If a user prepends any of this with a single '-' it will instead disable all coins it matches
function isMatch(coin, str) {
    return coin.names.indexOf(str) > -1 || coin.algorithm.names.indexOf(str) > -1 || str === coin.id.toString();
}
function disableCoin(coin, trigger) {
    if (coin.enabled === false) {
        logger_1.logger.warn(`Couldn't disable coin ${coin.displayName} because it's already disabled (triggered by '${trigger}')`);
        return;
    }
    logger_1.logger.debug(`filter(): Disabled coin ${coin.displayName} because of argument '${trigger}'`);
    coin.enabled = false;
}
function enableCoin(coin, trigger) {
    if (coin.enabled === true) {
        logger_1.logger.warn(`Couldn't enable coin ${coin.displayName} because it's already enabled (triggered by '${trigger}')`);
        return;
    }
    logger_1.logger.debug(`filter(): Enabled coin ${coin.displayName} because of argument '${trigger}'`);
    coin.enabled = true;
}
function filter(coins, targets) {
    // This is messy but from my tests it works just how I want it
    // null means not explicitly enabled or disabled
    coins.forEach((coin) => coin.enabled = null);
    let hasEnabledCoins = false;
    for (const str of targets) {
        let foundMatch = false;
        for (const coin of coins) {
            const isDisablingCoin = str.startsWith("-");
            let name = str;
            if (isDisablingCoin) {
                name = name.substr(1);
            }
            if (isMatch(coin, name)) {
                if (isDisablingCoin) {
                    disableCoin(coin, name);
                }
                else {
                    enableCoin(coin, name);
                    if (!hasEnabledCoins) {
                        coins.filter((c) => c.enabled === null).forEach((c) => c.enabled = false);
                    }
                    hasEnabledCoins = true;
                }
                foundMatch = true;
            }
        }
        if (!foundMatch) {
            logger_1.logger.warn(`Couldn't find coins that match argument '${str}'`);
        }
    }
    // Set the coin's enabled state to true for null coins (which act as true)
    coins.forEach((coin) => coin.enabled = coin.enabled || coin.enabled === null);
    // return only the coins that have enabled = true
    return coins.filter((coin) => coin.enabled === true);
}
exports.filter = filter;
