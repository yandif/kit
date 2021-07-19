import { assertEquals } from "../deps.ts";
import { debounce, isArray, isObject, throttle } from "../mod.ts";

const { test } = Deno;

test("isObject", () => {
  assertEquals(isObject({}), true);
  assertEquals(isObject(null), false);
});
test("isArray", () => {
  assertEquals(isArray([]), true);
});

test("throttle", async () => {
  let count = 0;
  const throttled = throttle(() => {
    count++;
  }, 30);

  throttled();
  throttled();
  throttled();

  const lastCount = count;
  assertEquals(count, 1);

  await new Promise<void>((resolve) => {
    setTimeout(() => {
      assertEquals(count > lastCount, true);
      resolve();
    }, 60);
  });
});

test("debounce", async () => {
  let count = 0;
  const debounced = debounce((value: any) => {
    ++count;
    return value;
  }, 32);

  const results = [debounced("a"), debounced("b"), debounced("c")];
  assertEquals(results, [undefined, undefined, undefined]);
  assertEquals(count, 0);

  await Promise.all([
    new Promise<void>((resolve) => {
      setTimeout(() => {
        assertEquals(count, 1);
        const results = [debounced("d"), debounced("e"), debounced("f")];
        assertEquals(results, ["c", "c", "c"]);
        assertEquals(count, 1);
        resolve();
      }, 128);
    }),
    new Promise<void>((resolve) => {
      setTimeout(() => {
        assertEquals(count, 2);
        resolve();
      }, 256);
    }),
  ]);
});
