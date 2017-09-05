const translateOrderParam = (order) => {

    let [translatedOrder, pattern] = [[], /([0-9]+)?([a-zA-Z]+)/];

    order.forEach(item => {
        let matches = item.match(pattern);
        let count = typeof matches[1] === "undefined" ? 1 : parseInt(matches[1]);
        let key = matches[2];
        translatedOrder = translatedOrder.concat(new Array(count).fill(key));
    });
    return translatedOrder;
};

const ArrayMixer = (aliases, order) => {
    let [arraySize, index, mixedArray] = [0,0, []];
    let currentAliasName, currentAliasArray, currentAliasIndex, currentAliasCounterValue;
    let currentAliasesCounters = {};

    order = translateOrderParam(order);

    Object.keys(aliases).forEach(alias => {
        arraySize+= aliases[alias].length;
    });

    while(index < arraySize){
        currentAliasName = order[(order.length + index) % order.length];
        if(typeof currentAliasesCounters[currentAliasName] === "undefined") {
            currentAliasesCounters[currentAliasName] = 0;
        }
        currentAliasArray = aliases[currentAliasName];
        currentAliasCounterValue = (currentAliasesCounters[currentAliasName]) % currentAliasArray.length;
        currentAliasesCounters[currentAliasName] = currentAliasCounterValue;
        currentAliasIndex = currentAliasesCounters[currentAliasName];
        mixedArray.push(aliases[currentAliasName][currentAliasIndex]);
        currentAliasesCounters[currentAliasName]++;
        index++;
    }

    return mixedArray;
};

export default ArrayMixer;