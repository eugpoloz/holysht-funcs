// @flow
"use strict";
import quotePicker from "./modules/quotePicker";
import randomUserGenerator from "./modules/randomUserGenerator";

import type { QuoteProps, RandomProps } from "./commonTypes";

type HeaderProps = {
  quotesAndJokes: QuoteProps,
  portraits: RandomProps
};

export function workHeaderMagic({ quotesAndJokes, portraits }: HeaderProps) {
  quotePicker(quotesAndJokes);
  randomUserGenerator(portraits);
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
