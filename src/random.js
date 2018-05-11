// @flow
"use strict";

type RandomProps = {
  howMany?: number,
  group_id: Array<number>,
  filteredUsers?: Array<string>
};

async function randomUserGenerator({
  filteredUsers = [],
  group_id = [1, 2],
  howMany = 3
}: RandomProps) {
  const group_ids = group_id.join(",");
  const usersFromAPI = await fetch(
    `/api.php?method=users.get&fields=user_id,username,avatar&limit=100&group_id=${group_ids}`
  );

  const apiObject = await usersFromAPI.json();

  let { users } = apiObject.response;
  if (filteredUsers.length > 0) {
    const userSet = new Set(filteredUsers);

    users = users.filter(({ username }) => !userSet.has(username));
  }

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
