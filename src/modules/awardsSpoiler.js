// @flow
"use strict";

declare var $: any;
declare var FORUM: {
  topic: Object
};

type Props = {
  hideText?: string,
  showText?: string
};

function returnLength(node: HTMLElement) {
  const length = $(node).children("a").length;
  let howMany = "";
  if (length > 0) howMany = " (" + length + ")";
  return howMany;
}

function updateText(awards: HTMLElement, label: HTMLElement, props: Props) {
  const { showText = "Ачивки и плюхи", hideText = "Фу, спрячь!" } = props;
  const howMany = returnLength(awards);

  const textWithCounter = "Ачивки и плюхи" + howMany;

  return $(label).text() === textWithCounter
    ? $(label).text(hideText)
    : $(label).text(textWithCounter);
}

function runSpoiler(props: Props) {
  if (typeof FORUM.topic === "object") {
    console.log("v0.0.5");
    $(".post-author .pa-awards").each(function() {
      const wrapperClass = "mini_awards_wrapper";
      const awards = $(this).find(".mini_awards");
      const label = $(this).find(".mini_awards_label");

      if (awards[0] instanceof HTMLElement && label[0] instanceof HTMLElement) {
        awards.wrap(
          "<div class='" + wrapperClass + "' style='display: none;'></div>"
        );

        if (window.MutationObserver) {
          const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
              const awards = $(mutation.target);
              updateText(awards, label, props);
            });
            observer.disconnect();
          });

          const observerConfig = {
            childList: true
          };

          const targetNode = awards[0];
          observer.observe(targetNode, observerConfig);
        }

        updateText(awards, label, props);
        label.click(function() {
          updateText(awards, $(this), props);
          $(this)
            .siblings("." + wrapperClass)
            .slideToggle("fast");
        });

        $(this).css("display", "block");
        awards.css("display", "block");
      }
    });
  }
}

export default function awardsSpoiler(props: Props) {
  if (document.readyState !== "complete") {
    if (window.MutationObserver) {
      const awardsObserver = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
          const awards = $(mutation.target);
          const label = awards.siblings(".mini_awards_label");
          updateText(awards, label, props);
        });
        awardsObserver.disconnect();
      });

      $(".post-author .pa-awards .mini_awards").each(function() {
        const targetNode = $(this)[0];
        awardsObserver.observe(targetNode, {
          childList: true
        });
      });
    }
    window.addEventListener("load", () => runSpoiler(props), false);
  } else {
    runSpoiler(props);
  }
}
