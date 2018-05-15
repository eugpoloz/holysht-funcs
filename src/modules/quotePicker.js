// @flow
import getIdx from "../helpers/getIdx";

import type { QuoteProps } from "../commonTypes";

export default function quotePicker(quotesAndJokes: QuoteProps) {
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
