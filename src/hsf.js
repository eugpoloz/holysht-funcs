// @flow
"use strict";
import quotePicker from "./modules/quotePicker";
import currentUsers from "./modules/randomUserGenerator";
import neededCharacters from "./modules/randomSearchGenerator";

import type { QuoteProps, RandomUserProps } from "./commonTypes";

type HeaderProps = {
  quotesAndJokes: QuoteProps,
  portraits: RandomUserProps
};

export function workHeaderMagic({ quotesAndJokes, portraits }: HeaderProps) {
  quotePicker(quotesAndJokes);
  currentUsers(portraits);
}

export { neededCharacters };

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
