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
    const { quote, author, post } = currentQuote;
    // const { url, text = "Читать дальше" } = joke;
    const copyright = post
      ? ` <a href="${post}" target="_blank">(Читать дальше…)</a>`
      : "";
    const quoteHTML = `${quote} <em>(c) ${author}</em>${copyright}`;

    quoteContainer.innerHTML = quoteHTML;

    return currentQuote;
  }
}
