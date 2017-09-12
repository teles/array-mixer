"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var getItemsFromArray = function getItemsFromArray(array) {
    return function (size) {
        var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        return new Array(size).fill("").map(function (item, index) {
            return array[(index + offset) % array.length];
        });
    };
};

var ArrayMixer = function ArrayMixer(aliases, sequence) {
    var mixedArray = [],
        pattern = /([0-9]+)?([a-zA-Z]+)/,
        offsetsByAliases = {};

    var totalAliases = Object.values(aliases).map(function (item) {
        return item.length;
    }).reduce(function (total, current) {
        return total + current;
    });

    var rules = sequence.map(function (rule) {
        var matches = rule.match(pattern);
        var count = typeof matches[1] === "undefined" ? 1 : parseInt(matches[1]);
        var alias = matches[2];
        return { count: count, alias: alias };
    });

    while (mixedArray.length < totalAliases) {
        rules.forEach(function (rule) {
            var incrementalOffset = typeof offsetsByAliases[rule.alias] !== "undefined" ? offsetsByAliases[rule.alias] : 0;
            mixedArray = mixedArray.concat(getItemsFromArray(aliases[rule.alias])(Math.min(totalAliases - mixedArray.length, rule.count), offsetsByAliases[rule.alias]));
            offsetsByAliases[rule.alias] = rule.count % aliases[rule.alias].length + incrementalOffset;
            if (mixedArray.length >= totalAliases) return mixedArray;
        });
    }
    return mixedArray;
};

exports.default = ArrayMixer;
