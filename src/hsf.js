// @flow
"use strict";
import quotePicker from "./modules/quotePicker";
import currentUsers from "./modules/randomUserGenerator";
import neededCharacters from "./modules/randomSearchGenerator";
import smilies from "./modules/smilies";
import awardsSpoiler from "./modules/awardsSpoiler";

import type { QuoteProps, RandomUserProps } from "./commonTypes";

type HeaderProps = {
  quotesAndJokes: QuoteProps,
  portraits: RandomUserProps
};

export function workHeaderMagic({ quotesAndJokes, portraits }: HeaderProps) {
  quotePicker(quotesAndJokes);
  currentUsers(portraits);
}

export { neededCharacters, smilies, awardsSpoiler };
