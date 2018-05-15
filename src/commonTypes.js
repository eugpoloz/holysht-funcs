// @flow
export type QuoteProps = {
  quotes: Array<{
    quote: string,
    author: string
  }>,
  joke: {
    url: string,
    text?: string
  }
};

export type RandomProps = {
  board?: string, // optional forum link
  howMany?: number,
  group_id: Array<number>,
  filteredUsers?: Array<string>,
  placeholder?: string
};

export type User = {
  user_id: string,
  username: string,
  avatar: string
};

export type PortraitsProps = {
  board?: string, // optional forum link
  users: Array<User>,
  placeholder: string
};
