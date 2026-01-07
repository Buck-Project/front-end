import { useEffect } from "react";

const PERSIAN_DIGITS = [
  "\u06F0",
  "\u06F1",
  "\u06F2",
  "\u06F3",
  "\u06F4",
  "\u06F5",
  "\u06F6",
  "\u06F7",
  "\u06F8",
  "\u06F9",
];

const replaceDigits = (value: string) =>
  value.replace(/\d/g, (digit) => PERSIAN_DIGITS[Number(digit)]);

const shouldSkipNode = (node: Text) => {
  const parent = node.parentElement;
  if (!parent) {
    return true;
  }
  const tag = parent.tagName;
  return tag === "SCRIPT" || tag === "STYLE" || tag === "NOSCRIPT";
};

const normalizeTextNode = (node: Text) => {
  if (shouldSkipNode(node) || !node.nodeValue || !/\d/.test(node.nodeValue)) {
    return;
  }
  const replaced = replaceDigits(node.nodeValue);
  if (replaced !== node.nodeValue) {
    node.nodeValue = replaced;
  }
};

const normalizeSubtree = (root: Node) => {
  const walker = document.createTreeWalker(
    root,
    NodeFilter.SHOW_TEXT,
    null
  );
  let current = walker.nextNode();
  while (current) {
    normalizeTextNode(current as Text);
    current = walker.nextNode();
  }
};

const PersianDigitNormalizer = () => {
  useEffect(() => {
    normalizeSubtree(document.body);

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "characterData") {
          normalizeTextNode(mutation.target as Text);
          continue;
        }
        for (const node of mutation.addedNodes) {
          if (node.nodeType === Node.TEXT_NODE) {
            normalizeTextNode(node as Text);
          } else {
            normalizeSubtree(node);
          }
        }
      }
    });

    observer.observe(document.body, {
      subtree: true,
      childList: true,
      characterData: true,
    });

    return () => observer.disconnect();
  }, []);

  return null;
};

export default PersianDigitNormalizer;
