import type { DebouncedFunc } from "./debounce.ts";
import { debounce } from "./debounce.ts";
import { isObject } from "./isObject.ts";

type ThrottleOptions = {
  leading?: boolean;
  trailing?: boolean;
};

export function throttle<T extends (...args: any) => any>(
  func: T,
  wait?: number,
  options?: ThrottleOptions
): DebouncedFunc<T> {
  if (typeof func !== "function") {
    throw new TypeError("Expected a function");
  }

  let leading = true;
  let trailing = true;
  if (isObject(options)) {
    leading = "leading" in options ? !!options.leading : leading;
    trailing = "trailing" in options ? !!options.trailing : trailing;
  }

  return debounce(func, wait, {
    leading,
    trailing,
    maxWait: wait,
  });
}
