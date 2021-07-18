const appendChild = (parent, child) => {
  if (!child) return; // null, undefined, false, "" etc should not create nodes

  if (
    // Covers cases where child is HTMLCollection
    // or NodeList
    typeof child !== 'string' &&
    child[Symbol.iterator] &&
    !(child instanceof Node) // <form /> has [Symbol.iterator]
  ) {
    for (let i = 0; i < child.length; i++) appendChild(parent, child[i]);
    return;
  }

  parent.appendChild(
    typeof child === 'string' ? document.createTextNode(child) : child,
  );
};

export const jsx = (tag, { children, ...props }, _unknown) => {
  if (typeof tag === 'function') return tag({ children, ...props }, _unknown);

  const element = document.createElement(tag);

  // Doesn't work with SVG or path, circle, etc.
  // const isSvg = tag === "svg" || ...
  // const element = isSvg
  //   ? document.createElementNS('http://www.w3.org/2000/svg', tag)
  //   : document.createElement(tag);

  for (const key in props) {
    element.setAttribute(key, props[key]);
  }

  appendChild(element, children);
  return element;
};

export const jsxs = jsx;

export const Fragment = ({ children }, _unknown) => {
  const df = document.createDocumentFragment();
  appendChild(df, children);
  return df;
};
