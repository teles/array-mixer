const getItemsFromArray = (array) => {
    return (size, offset = 0) => new Array(size + offset).fill("").map((item, index) => {
        return array[index % array.length];
    }).slice(offset);
};

const ArrayMixer = (aliases, sequence) => {
    let [mixedArray, pattern, offsetsByAliases] = [[], /([0-9]+)?([a-zA-Z]+)/, {}];

    sequence.forEach(rule => {
        let matches = rule.match(pattern);
        let count = typeof matches[1] === "undefined" ? 1 : parseInt(matches[1]);
        let alias = matches[2];
        let incrementalOffset = typeof offsetsByAliases[alias] !== "undefined" ? offsetsByAliases[alias] : 0;
        mixedArray = mixedArray.concat(getItemsFromArray(aliases[alias])(count, offsetsByAliases[alias]));
        offsetsByAliases[alias] = (count % aliases[alias].length) + incrementalOffset;
    });
    return mixedArray;
};

export default ArrayMixer;