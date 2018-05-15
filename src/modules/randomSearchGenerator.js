// @flow
import pick from "../helpers/pick";

import type { RandomNeededProps } from "../commonTypes";

export default function randomSearchGenerator(pickNeeded: RandomNeededProps) {
  const { characters, howMany = 4 } = pickNeeded;

  const pickedCharacters = pick(characters, howMany);

  const portraitNodeList = document.querySelectorAll(
    ".portrait.portrait--search"
  );

  return pickedCharacters.forEach((char, idx) => {
    const { href, src, title } = char;

    const html = `<a href="${href}"><img src="${src}" title="Разыскивается ${title}" /></a>`;

    if (portraitNodeList && portraitNodeList[idx]) {
      portraitNodeList[idx].innerHTML = html;
    }
  });
}
