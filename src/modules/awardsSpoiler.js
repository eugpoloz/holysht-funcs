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

type UpdateProps = {
  awards: HTMLElement,
  label: HTMLElement,
  textProps: Props
};

function updateText(props: UpdateProps) {
  const { awards, label, textProps } = props;
  const { showText, hideText } = textProps;
  const howMany = returnLength(awards);

  if (showText !== undefined) {
    const textWithCounter = showText + howMany;

    return $(label).text() === textWithCounter
      ? $(label).text(hideText)
      : $(label).text(textWithCounter);
  }
}

function runSpoiler(props: Props) {
  if (typeof FORUM.topic === "object") {
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
              updateText({ awards, label, textProps: props });
            });
            observer.disconnect();
          });

          const observerConfig = {
            childList: true
          };

          const targetNode = awards[0];
          observer.observe(targetNode, observerConfig);
        }

        updateText({ awards, label, textProps: props });
        label.click(function() {
          updateText({ awards, label: $(this), textProps: props });
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
  let passedProps = {
    showText: "Ачивки и плюхи",
    hideText: "Фу, спрячь!"
  };

  if (props !== undefined) {
    if (props.showText) {
      passedProps.showText = props.showText;
    }
    if (props.hideText) {
      passedProps.hideText = props.hideText;
    }
  }

  if (document.readyState !== "complete") {
    if (window.MutationObserver) {
      const awardsObserver = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
          const awards = $(mutation.target);
          const label = awards.siblings(".mini_awards_label");
          updateText({ awards, label, textProps: passedProps });
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
    window.addEventListener("load", () => runSpoiler(passedProps), false);
  } else {
    runSpoiler(passedProps);
  }
}
