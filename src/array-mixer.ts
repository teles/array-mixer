/**
 * A single mix entry: a tuple of `[count, items]`.
 *
 * `count` is how many items of this group to emit per round.
 * `items` is the source array.
 */
export type MixEntry<T> = readonly [count: number, items: readonly T[]];

/**
 * Behavior when a source array runs out of fresh items before the result is full.
 *
 * - `"repeat"` (default): keep cycling from the start of the array.
 * - `"skip"`: stop emitting from that group; continue with the others.
 * - `"stop"`: end the result immediately.
 */
export type FillStrategy = "repeat" | "skip" | "stop";

export interface MixerOptions {
    /** Force the result length. Defaults to the sum of all input array lengths. */
    limit?: number;
    /** Shuffle each input array (Fisher-Yates) before mixing. Original arrays are not mutated. */
    shuffle?: boolean;
    /** What to do when an entry's source array is exhausted. Defaults to `"repeat"`. */
    fill?: FillStrategy;
}

type AnyMixArgs<T> = MixEntry<T>[] | [...MixEntry<T>[], MixerOptions];

const isMixEntry = (value: unknown): value is MixEntry<unknown> =>
    Array.isArray(value) &&
    value.length === 2 &&
    typeof value[0] === "number" &&
    Array.isArray(value[1]);

const shuffleArray = <T>(arr: T[]): T[] => {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
};

/**
 * Reorder one or more arrays into a single array by interleaving chunks of each.
 *
 * @example
 * ```ts
 * arrayMixer([2, photos], [1, ads]);
 * // => [photo0, photo1, ad0, photo2, photo3, ad1, ...]
 * ```
 *
 * @example With options:
 * ```ts
 * arrayMixer([2, photos], [1, ads], { limit: 10, shuffle: true });
 * ```
 */
export function arrayMixer<T>(...args: MixEntry<T>[]): T[];
export function arrayMixer<T>(...args: [...MixEntry<T>[], MixerOptions]): T[];
export function arrayMixer<T>(...args: AnyMixArgs<T>): T[] {
    const last = args[args.length - 1];
    const hasOptions = last !== undefined && !isMixEntry(last);
    const options: MixerOptions = hasOptions ? (last as MixerOptions) : {};
    const entries = (hasOptions ? args.slice(0, -1) : args) as MixEntry<T>[];

    if (entries.length === 0) return [];

    const fill: FillStrategy = options.fill ?? "repeat";

    // State is keyed by source array identity, so repeating the same array on
    // multiple entries continues consuming where the previous entry stopped.
    type SourceState = { items: T[]; consumed: number; skipped: boolean };
    const stateByOriginal = new Map<readonly T[], SourceState>();
    const states: SourceState[] = entries.map(([, original]) => {
        let state = stateByOriginal.get(original);
        if (!state) {
            const items = options.shuffle ? shuffleArray([...original]) : [...original];
            state = { items, consumed: 0, skipped: false };
            stateByOriginal.set(original, state);
        }
        return state;
    });
    const counts = entries.map(([count]) => count);

    const totalAvailable = Array.from(stateByOriginal.values())
        .reduce((sum, state) => sum + state.items.length, 0);
    const target = options.limit ?? totalAvailable;

    const result: T[] = [];

    while (result.length < target) {
        let progressed = false;

        for (let i = 0; i < states.length && result.length < target; i++) {
            const state = states[i];
            if (state.skipped) continue;
            const arr = state.items;
            const count = counts[i];
            if (arr.length === 0) {
                state.skipped = true;
                continue;
            }

            for (let j = 0; j < count && result.length < target; j++) {
                const used = state.consumed;
                if (used >= arr.length) {
                    if (fill === "repeat") {
                        result.push(arr[used % arr.length]);
                        state.consumed += 1;
                        progressed = true;
                    } else if (fill === "skip") {
                        state.skipped = true;
                        break;
                    } else {
                        return result;
                    }
                } else {
                    result.push(arr[used]);
                    state.consumed += 1;
                    progressed = true;
                }
            }
        }

        if (!progressed) break;
    }

    return result;
}
