// @flow
import getIdx from "./getIdx";

export default function pick(array: Array<*>, howMany: number) {
  // let set up our Set
  const indexes = new Set([]);

  // we need to generate as many numbers as our config says,
  // and I suck at recursion, so we loop
  for (let i = 0; i < howMany; i++) {
    let number = getIdx(array);

    // ... and loop
    while (indexes.has(number)) {
      number = getIdx(array);
    }

    // and add our number finally
    indexes.add(number);
  }

  // and then we filter our initial user array to get our desired results
  return array.filter((user, idx) => indexes.has(idx));
}
