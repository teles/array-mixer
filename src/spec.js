import test from "ava";
import ArrayMixer from "./array-mixer";

let colors = [
    "Amber",
    "Blue",
    "Cyan",
    "Dim Gray",
    "Emerald"
];

let musicians = [
    "Al Green",
    "Bruno Mars",
    "Caetano Veloso",
    "Deep Purple",
    "Ed Sheeran",
    "Franz Ferdinand",
    "George Michael",
    "Heaven And Hell",
    "INXS",
    "Jorge Ben Jor",
    "Kings of Leon",
    "Led Zeppelin",
    "Marvin Gaye",
    "Norah Jones",
    "Ozzy Osbourne",
    "Pink Floyd",
    "Queen",
    "Rage Against The Machine",
    "Simply Red",
    "Tom Jones",
    "U2",
    "Van Halen",
    "Wham!",
    "XX, The",
    "Yes",
    "ZZ Top"
];

let animals = [
    "Alligator",
    "Bear",
    "Cat",
    "Dog",
    "Elephant"
];

test("Returns original list when order params has only one item", t =>{
    let mixed = ArrayMixer({C: colors}, [`${colors.length}C`]);
    t.deepEqual(mixed, colors);
});

test("Reorder two same size arrays alternately", t => {
    let mixedTwoByTwo = ArrayMixer({C: colors, A:animals}, ["2C", "2A"]);
    let mixedThreeByThree = ArrayMixer({C: colors, A:animals}, ["3C", "3A"]);
    t.deepEqual(mixedTwoByTwo[1], colors[1]);
    t.deepEqual(mixedTwoByTwo[3], animals[1]);
    t.deepEqual(mixedThreeByThree[0], colors[0]);
    t.deepEqual(mixedThreeByThree[3], animals[0]);
});

test("Reorder two same size arrays disproportionately", t => {
    let mixed = ArrayMixer({A: animals, C: colors}, ["5C", "2A"]);
    t.deepEqual(mixed[4], colors[4]);
    t.deepEqual(mixed[5], animals[0]);
    t.deepEqual(mixed[6], animals[1]);
});

test("Reorder two different size arrays alternately", t => {
   let mixed = ArrayMixer({M: musicians, C: colors}, ["3C", "3M"]);
   t.deepEqual(mixed[2], colors[2]);
   t.deepEqual(mixed[3], musicians[0]);
});

test("Reorder two different size arrays disproportionately", t => {
    let mixed = ArrayMixer({M: musicians, C: colors}, ["2C", "21M"]);
    t.deepEqual(mixed[1], colors[1]);
    t.deepEqual(mixed[3], musicians[1]);
    t.deepEqual(mixed[22], musicians[20]);
});

test("Reorder two different arrays repeating alias on sequence", t => {
    let mixed = ArrayMixer({M: musicians, C: colors}, ["2M", "2C", "7M"]);
    t.deepEqual(mixed[1], musicians[1]);
    t.deepEqual(mixed[2], colors[0]);
    t.deepEqual(mixed[4], musicians[2]);
});

test("Reorder two different arrays repeating alias more than once on sequence", t => {
    let mixed = ArrayMixer({M: musicians, C: colors}, ["2M", "2C", "3M", "1C"]);
    t.deepEqual(mixed[1], musicians[1]);
    t.deepEqual(mixed[2], colors[0]);
    t.deepEqual(mixed[4], musicians[2]);
    t.deepEqual(mixed[7], colors[2]);
});

test("Omits all aliases counters on sequence", t => {
    let mixed = ArrayMixer({M: musicians, C: colors}, ["C", "M"]);
    t.deepEqual(mixed[0], colors[0]);
    t.deepEqual(mixed[1], musicians[0]);
});

test("Omits SOME aliases counters on sequence", t => {
    let mixed = ArrayMixer({M: musicians, C: colors}, ["C", "4M"]);
    t.deepEqual(mixed[0], colors[0]);
    t.deepEqual(mixed[4], musicians[3]);
});

test("Mixed array cant have more items than sequence sum", t => {
    let mixed = ArrayMixer({M: musicians, C: colors}, ["2C", "4M"]);
    t.deepEqual(mixed.length, 6);
});

test("Combines sibling sentences", t => {
    let mixed = ArrayMixer({M: musicians, C: colors}, ["2C", "C", "4M"]);
    t.deepEqual(mixed[2], colors[2]);
    t.deepEqual(mixed[3], musicians[0]);
});