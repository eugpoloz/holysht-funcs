// @flow
"use strict";

type QuoteProps = {
  quotes: Array<{
    quote: string,
    author: string
  }>,
  joke: {
    url: string,
    text?: string
  }
};

type RandomProps = {
  board?: string, // optional forum link
  howMany?: number,
  group_id: Array<number>,
  filteredUsers?: Array<string>
};

type User = {
  user_id: string,
  username: string,
  avatar: string
};

type PortraitsProps = {
  board?: string, // optional forum link
  users: Array<User>
};

type HeaderProps = {
  quotesAndJokes: QuoteProps,
  portraits: RandomProps
};

function workHeaderMagic({ quotesAndJokes, portraits }) {
  // random number generator
  // cause I don't need anything too sophisticated
  function getIdx(array: Array<*>) {
    const { length } = array;
    return Math.floor(Math.random() * length);
  }

  function pickAQuote(quotesAndJokes: QuoteProps) {
    const { quotes, joke } = quotesAndJokes;
    const quoteContainer = document.querySelector(
      ".holyheader_quote .quote-content"
    );

    const quoteId = getIdx(quotes);
    const currentQuote = quotes[quoteId];

    if (quoteContainer instanceof HTMLElement && currentQuote !== undefined) {
      const { quote, author } = currentQuote;
      const { url, text = "Читать дальше" } = joke;
      const quoteHTML = `${quote} <em>(c) ${author}</em> <a href="${url}">(${text})</a>`;

      quoteContainer.innerHTML = quoteHTML;

      return currentQuote;
    }
  }

  function createPortraits({ board = "", users }: PortraitsProps) {
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

  function randomUserGenerator(pickPortraits: RandomProps) {
    const {
      board = "",
      filteredUsers = [],
      group_id = [1, 2],
      howMany = 3
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
          users: pickedUsers
        });

        return pickedUsers;
      })
      .catch(error => console.error(error));
  }

  pickAQuote(quotesAndJokes);
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
