import { Cache } from "./pokecache.js";
import { expect, test } from "vitest";

test("stores separate keys, replaces values, and handles missing keys",
    () => {
    const cache = new Cache(100);
    try {
        cache.add("key1", "testValue");
        cache.add("key2", 42);

        expect(cache.get<string>("key1")).toBe("testValue");
        expect(cache.get<number>("key2")).toBe(42);

        cache.add("key1", ["testValue", 42]);
        expect(cache.get<(string | number)[]>("key1")).toEqual(["testValue", 42]);
        expect(cache.get("key3")).toBeUndefined();
        expect(cache.get<number>("key2")).toBe(42);
    } finally {
        cache.stopReapLoop();
    }
});

test("old entries are reaped", async () => {
    const cache = new Cache(200);
    try {
        cache.add("key1", "test1");
        expect(cache.get("key1")).toBe("test1");

        await expect.poll(() => cache.get("key1"), { timeout: 1000 })
            .toBeUndefined();
    } finally {
        cache.stopReapLoop();
    }
});