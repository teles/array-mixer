"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var getItemsFromArray = function getItemsFromArray(array) {
    return function (size) {
        var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        return new Array(size + offset).fill("").map(function (item, index) {
            return array[index % array.length];
        }).slice(offset);
    };
};

var ArrayMixer = function ArrayMixer(aliases, sequence) {
    var mixedArray = [],
        pattern = /([0-9]+)?([a-zA-Z]+)/,
        offsetsByAliases = {};


    sequence.forEach(function (rule) {
        var matches = rule.match(pattern);
        var count = typeof matches[1] === "undefined" ? 1 : parseInt(matches[1]);
        var alias = matches[2];
        var incrementalOffset = typeof offsetsByAliases[alias] !== "undefined" ? offsetsByAliases[alias] : 0;
        mixedArray = mixedArray.concat(getItemsFromArray(aliases[alias])(count, offsetsByAliases[alias]));
        offsetsByAliases[alias] = count % aliases[alias].length + incrementalOffset;
    });
    return mixedArray;
};

exports.default = ArrayMixer;
