import { describe, expect, test, vi } from "vitest";
import { arrayMixer } from "./array-mixer";

const colors = ["Amber", "Blue", "Cyan", "Dim Gray", "Emerald"];

const musicians = [
    "Al Green", "Bruno Mars", "Caetano Veloso", "Deep Purple", "Ed Sheeran",
    "Franz Ferdinand", "George Michael", "Heaven And Hell", "INXS", "Jorge Ben Jor",
    "Kings of Leon", "Led Zeppelin", "Marvin Gaye", "Norah Jones", "Ozzy Osbourne",
    "Pink Floyd", "Queen", "Rage Against The Machine", "Simply Red", "Tom Jones",
    "U2", "Van Halen", "Wham!", "XX, The", "Yes", "ZZ Top",
];

const animals = ["Alligator", "Bear", "Cat", "Dog", "Elephant"];

describe("arrayMixer (core)", () => {
    test("returns the original list when there's only one entry", () => {
        const mixed = arrayMixer([colors.length, colors]);
        expect(mixed).toEqual(colors);
    });

    test("interleaves two same-size arrays alternately", () => {
        const twoByTwo = arrayMixer([2, colors], [2, animals]);
        const threeByThree = arrayMixer([3, colors], [3, animals]);
        expect(twoByTwo[1]).toBe(colors[1]);
        expect(twoByTwo[3]).toBe(animals[1]);
        expect(threeByThree[0]).toBe(colors[0]);
        expect(threeByThree[3]).toBe(animals[0]);
    });

    test("interleaves two same-size arrays disproportionately", () => {
        const mixed = arrayMixer([5, colors], [2, animals]);
        expect(mixed[4]).toBe(colors[4]);
        expect(mixed[5]).toBe(animals[0]);
        expect(mixed[6]).toBe(animals[1]);
    });

    test("interleaves two different-size arrays alternately", () => {
        const mixed = arrayMixer([3, colors], [3, musicians]);
        expect(mixed[2]).toBe(colors[2]);
        expect(mixed[3]).toBe(musicians[0]);
    });

    test("interleaves two different-size arrays disproportionately", () => {
        const mixed = arrayMixer([2, colors], [21, musicians]);
        expect(mixed[1]).toBe(colors[1]);
        expect(mixed[3]).toBe(musicians[1]);
        expect(mixed[22]).toBe(musicians[20]);
    });

    test("supports repeating the same source on multiple entries", () => {
        const mixed = arrayMixer([2, musicians], [2, colors], [7, musicians]);
        expect(mixed[1]).toBe(musicians[1]);
        expect(mixed[2]).toBe(colors[0]);
        expect(mixed[4]).toBe(musicians[2]);
    });

    test("supports repeating the same source more than twice", () => {
        const mixed = arrayMixer([2, musicians], [2, colors], [3, musicians], [1, colors]);
        expect(mixed[1]).toBe(musicians[1]);
        expect(mixed[2]).toBe(colors[0]);
        expect(mixed[4]).toBe(musicians[2]);
        expect(mixed[7]).toBe(colors[2]);
    });

    test("count of 1 works the same as the old omitted-counter syntax", () => {
        const mixed = arrayMixer([1, colors], [1, musicians]);
        expect(mixed[0]).toBe(colors[0]);
        expect(mixed[1]).toBe(musicians[0]);
    });

    test("default result length equals the sum of input array lengths", () => {
        const mixed = arrayMixer([2, colors], [4, musicians]);
        expect(mixed.length).toBe(colors.length + musicians.length);
    });

    test("combines sibling chunks of the same source", () => {
        const mixed = arrayMixer([2, colors], [1, colors], [4, musicians]);
        expect(mixed[2]).toBe(colors[2]);
        expect(mixed[3]).toBe(musicians[0]);
    });
});

describe("arrayMixer (options)", () => {
    test("limit forces a fixed result length", () => {
        const mixed = arrayMixer([2, colors], [1, animals], { limit: 6 });
        expect(mixed).toHaveLength(6);
    });

    test("limit larger than total cycles via fill='repeat' (default)", () => {
        const mixed = arrayMixer([1, [1, 2]], [1, [9]], { limit: 6 });
        expect(mixed).toEqual([1, 9, 2, 9, 1, 9]);
    });

    test("fill='stop' ends the result when an array runs out", () => {
        const mixed = arrayMixer(
            [2, [1, 2, 3, 4]],
            [1, [9]],
            { limit: 100, fill: "stop" },
        );
        expect(mixed).toEqual([1, 2, 9, 3, 4]);
    });

    test("fill='skip' drops exhausted entries but keeps the others going", () => {
        const mixed = arrayMixer(
            [1, ["a", "b"]],
            [1, ["x", "y", "z", "w"]],
            { fill: "skip", limit: 10 },
        );
        expect(mixed).toEqual(["a", "x", "b", "y", "z", "w"]);
    });

    test("shuffle does not mutate the original array", () => {
        const original = [1, 2, 3, 4, 5];
        const snapshot = [...original];
        arrayMixer([5, original], { shuffle: true });
        expect(original).toEqual(snapshot);
    });

    test("shuffle reorders inputs deterministically when Math.random is mocked", () => {
        const spy = vi.spyOn(Math, "random").mockReturnValue(0);
        try {
            const mixed = arrayMixer([3, [1, 2, 3]], { shuffle: true });
            expect(mixed).toHaveLength(3);
            expect(mixed.sort()).toEqual([1, 2, 3]);
        } finally {
            spy.mockRestore();
        }
    });

    test("preserves element type via generics", () => {
        const mixed = arrayMixer([1, ["a", "b"]], [1, ["c", "d"]]);
        const sample: string = mixed[0];
        expect(typeof sample).toBe("string");
    });

    test("returns an empty array when called with no entries", () => {
        expect(arrayMixer()).toEqual([]);
        expect(arrayMixer({ limit: 5 })).toEqual([]);
    });
});
