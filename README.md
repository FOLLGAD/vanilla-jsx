# JSX to JS — Use JSX without react

[https://mikofilas.netlify.app/blog/jsx-without-react](https://mikofilas.netlify.app/blog/jsx-without-react)

## Installation and setup

```bash
$ npm i jsx2js @babel/plugin-transform-react-jsx
```

Edit `babel.config.js` or `.babelrc`:

```js
{
  // ...
  "plugins": [
    // ...
    [
      "@babel/plugin-transform-react-jsx",
      {
        "runtime": "automatic",
        "importSource": "jsx2js"
      }
    ]
  ]
}
```

Now you're ready to start writing JSX!

## Example

```jsx
const ExampleComponent = ({
  children,
  title = 'Default title',
  ...props
}) => {
  return (
    <div class="component" {...props}>
      <h2>{title}</h2>
      <div>{children}</div>
    </div>
  );
};

const Counter = ({}) => {
  let clicks = 0
  const clickSpan = <span>0</span>
  const increment = () => {
    clicks++
    clickSpan.innerText = clicks
  }
  const button = (
    <button>
      Clicked {clickSpan} times
    </button>
  )
  button.addEventListener("click", increment)

  return button
}

document.body.append(
  <div>
    <ExampleComponent title="JSX without React">
      <p>Example child</p>
    </ExampleComponent>

    <Counter />

    <p>It just works</p>
  </div>
)
```

Demo here: https://codesandbox.io/s/nostalgic-architecture-kv47z?file=/src/index.jsx

