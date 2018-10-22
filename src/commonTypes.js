// @flow
export type QuoteProps = {
  quotes: Array<{
    quote: string,
    author: string,
    post?: string // url
  }>,
  joke: {
    url: string,
    text?: string
  }
};

export type RandomUserProps = {
  board?: string, // optional forum link
  howMany?: number,
  group_id: Array<number>,
  filteredUsers?: Array<string>,
  placeholder?: string
};

export type RandomNeededProps = {
  characters: Array<{
    href: string, // ссылка на акцию
    src: string, // ссылка на картинку
    title: string // всплывающая подсказка
  }>,
  howMany?: number
};

export type User = {
  user_id: string,
  username: string,
  avatar: string
};
