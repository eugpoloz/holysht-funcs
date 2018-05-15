// @flow
import type { PortraitsProps } from "../commonTypes";

export default function createPortraits({ board = "", users }: PortraitsProps) {
  const portraitNodeList = document.querySelectorAll(
    ".portrait.portrait--character"
  );

  return users.forEach(({ username, user_id, avatar }, idx) => {
    const html = `<a href="${board}/profile.php?id=${user_id}"><img src="${board}${avatar}" title="${username}" /></a>`;

    if (portraitNodeList && portraitNodeList[idx]) {
      portraitNodeList[idx].innerHTML = html;
    }
  });
}
