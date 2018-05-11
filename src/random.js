// @flow
"use strict";

type RandomProps = {
  howMany?: number,
  users: Array<{
    name: string
  }>
};

async function randomUserGenerator({ users, howMany = 3 }: RandomProps) {
  // random number generator
  // cause I don't need anything too sophisticated
  function getIdx() {
    const { length } = users;
    return Math.floor(Math.random() * length);
  }

  // let set up our Set
  const indexes = new Set([]);

  // we need to generate as many numbers as our config says,
  // and I suck at recursion, so we loop
  for (let i = 0; i < howMany; i++) {
    let number = getIdx();

    // ... and loop
    while (indexes.has(number)) {
      number = getIdx();
    }

    // and add our number finally
    indexes.add(number);
  }

  // and then we filter our initial array to get our desired results
  return users.filter((user, idx) => indexes.has(idx));
}

// randomUserGenerator({
//   howMany: 3,
//   users: [
//     { name: "Jesus Christ" },
//     { name: "Judas Iscariot" },
//     { name: "Lucifer" },
//     { name: "Flying Spaghetti Monster" },
//     { name: "Gabriel" },
//     { name: "Yahweh" },
//     { name: "Baron Samedi" },
//     { name: "Maman Brigitte" },
//     { name: "Señor de la Muerte" }
//   ]
// });
