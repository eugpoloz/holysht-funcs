// @flow
import type { User } from "../../commonTypes";

type PortraitsProps = {
  board?: string, // optional forum link
  users: Array<User>,
  placeholder: string
};

export default function createPortraits({
  board = "",
  users,
  placeholder
}: PortraitsProps) {
  const portraitNodeList = document.querySelectorAll(
    ".portrait.portrait--character"
  );

  return users.forEach((user, idx) => {
    const { username, user_id } = user;
    const avatar = user.avatar || placeholder;

    const html = `<a href="${board}/profile.php?id=${user_id}"><img src="${board}${avatar}" title="${username}" /></a>`;

    if (portraitNodeList && portraitNodeList[idx]) {
      portraitNodeList[idx].innerHTML = html;
    }
  });
}
