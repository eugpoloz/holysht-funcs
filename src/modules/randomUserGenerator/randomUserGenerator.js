// @flow
import getIdx from "../../helpers/getIdx";
import createPortraits from "./createPortraits";

import type { RandomUserProps } from "../../commonTypes";

export default function randomUserGenerator(pickPortraits: RandomUserProps) {
  const {
    board = "",
    filteredUsers = [],
    group_id = [1, 2],
    howMany = 3,
    placeholder = "http://placehold.it/65x65"
  } = pickPortraits;
  const group_ids = group_id.join(",");

  // initialize callback hell, eh
  fetch(
    `${board}/api.php?method=users.get&fields=user_id,username,avatar&limit=100&group_id=${group_ids}`
  )
    .then(response => response.json())
    .then(({ response }) => {
      let { users } = response;
      if (filteredUsers.length > 0) {
        const userSet = new Set(filteredUsers);

        users = users.filter(({ username }) => !userSet.has(username));
      }

      // let set up our Set
      const indexes = new Set([]);

      // we need to generate as many numbers as our config says,
      // and I suck at recursion, so we loop
      for (let i = 0; i < howMany; i++) {
        let number = getIdx(users);

        // ... and loop
        while (indexes.has(number)) {
          number = getIdx(users);
        }

        // and add our number finally
        indexes.add(number);
      }

      // and then we filter our initial user array to get our desired results
      const pickedUsers = users.filter((user, idx) => indexes.has(idx));

      // ... initiate our custom func to put portraits in their place
      createPortraits({
        board,
        users: pickedUsers,
        placeholder
      });

      return pickedUsers;
    })
    .catch(error => console.error(error));
}
