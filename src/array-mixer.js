const getItemsFromArray = (array) => {
    return (size, offset = 0) => new Array(size).fill("").map((item, index) => {
        return array[(index + offset) % array.length];
    });
};

const ArrayMixer = (aliases, sequence) => {
    let [mixedArray, pattern, offsetsByAliases] = [[], /([0-9]+)?([a-zA-Z]+)/, {}];
    let totalAliases = Object.keys(aliases)
            .map(key => aliases[key])
            .map(item => item.length)
            .reduce((total, current) => total + current);

    let rules = sequence.map(rule => {
        let matches = rule.match(pattern);
        let count = typeof matches[1] === "undefined" ? 1 : parseInt(matches[1]);
        let alias = matches[2];
        return {count, alias};
    });

    let generateMixedArray = (rule) => {
        let incrementalOffset = typeof offsetsByAliases[rule.alias] !== "undefined" ? offsetsByAliases[rule.alias] : 0;
        mixedArray = mixedArray.concat(getItemsFromArray(aliases[rule.alias])(Math.min(totalAliases - mixedArray.length, rule.count), offsetsByAliases[rule.alias]));
        offsetsByAliases[rule.alias] = (rule.count % aliases[rule.alias].length) + incrementalOffset;
        if (mixedArray.length >= totalAliases) return mixedArray;
    };

    while(mixedArray.length < totalAliases) {
        rules.forEach(rule => generateMixedArray(rule));
    }
    return mixedArray;
};

module.exports = ArrayMixer;