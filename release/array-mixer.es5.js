"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var translateOrderParam = function translateOrderParam(order) {
    var translatedOrder = [],
        pattern = /([0-9]+)?([a-zA-Z]+)/;


    order.forEach(function (item) {
        var matches = item.match(pattern);
        var count = typeof matches[1] === "undefined" ? 1 : parseInt(matches[1]);
        var key = matches[2];
        translatedOrder = translatedOrder.concat(new Array(count).fill(key));
    });
    return translatedOrder;
};

var ArrayMixer = function ArrayMixer(aliases, order) {
    var arraySize = 0,
        index = 0,
        mixedArray = [];

    var currentAliasName = void 0,
        currentAliasArray = void 0,
        currentAliasIndex = void 0,
        currentAliasCounterValue = void 0;
    var currentAliasesCounters = {};

    order = translateOrderParam(order);

    Object.keys(aliases).forEach(function (alias) {
        arraySize += aliases[alias].length;
    });

    while (index < arraySize) {
        currentAliasName = order[(order.length + index) % order.length];
        if (typeof currentAliasesCounters[currentAliasName] === "undefined") {
            currentAliasesCounters[currentAliasName] = 0;
        }
        currentAliasArray = aliases[currentAliasName];
        currentAliasCounterValue = currentAliasesCounters[currentAliasName] % currentAliasArray.length;
        currentAliasesCounters[currentAliasName] = currentAliasCounterValue;
        currentAliasIndex = currentAliasesCounters[currentAliasName];
        mixedArray.push(aliases[currentAliasName][currentAliasIndex]);
        currentAliasesCounters[currentAliasName]++;
        index++;
    }

    return mixedArray;
};

exports.default = ArrayMixer;
