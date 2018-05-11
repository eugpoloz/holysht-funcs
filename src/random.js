// @flow
"use strict";

// random number generator
// cause I don't need anything too sophisticated
function getIdx(array: Array<*>) {
  const { length } = array;
  return Math.floor(Math.random() * length);
}

type QuoteProps = {
  quotes: Array<string>,
  joke: string
};

async function pickAQuote({ quotes, joke }: QuoteProps) {
  const quoteContainer = document.querySelector(
    ".holyheader_quote .quote-content"
  );

  if (quoteContainer instanceof HTMLElement) {
    const quoteId = getIdx(quotes);
    const currentQuote = quotes[quoteId];

    const quoteHTML = `${currentQuote} <a href="${joke}">Смотреть котиков?</a>`;

    quoteContainer.innerHTML = quoteHTML;

    return currentQuote;
  }
}

type PortraitsProps = {
  board?: string, // optional forum link
  users: Array<{
    user_id: string,
    username: string,
    avatar: string
  }>
};

async function createPortraits({ board = "", users }: PortraitsProps) {
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

type RandomProps = {
  board?: string, // optional forum link
  howMany?: number,
  group_id: Array<number>,
  filteredUsers?: Array<string>
};

async function randomUserGenerator({
  board = "",
  filteredUsers = [],
  group_id = [1, 2],
  howMany = 3
}: RandomProps) {
  const group_ids = group_id.join(",");
  const usersFromAPI = await fetch(
    `${board}/api.php?method=users.get&fields=user_id,username,avatar&limit=100&group_id=${group_ids}`
  );

  const apiObject = await usersFromAPI.json();

  let { users } = apiObject.response;
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
    users: pickedUsers
  });

  return pickedUsers;
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
