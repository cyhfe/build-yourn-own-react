import { createElement } from "./react";
import { render } from "./react-dom";

const App = () => {
  return (
    <div>
      <p>hello</p>
      <p>world</p>
      <p>world</p>
      <p>world</p>
    </div>
  );
};

const element = (
  <div id="el">
    <div>
      <a>fasdas</a>
      <h1>sad</h1>
      <h1>
        safasdasd
        <p>sad</p>
      </h1>
      fasd fasdasd
    </div>
    <p>world</p>
    <p>world</p>
  </div>
);

// const element = createElement(
//   'div',
//   {
//     id: 'el',
//   },
//   createElement(
//     'p',
//     null,
//     'hello'
//   ),
//   createElement(
//     'p',
//     null,
//     'world'
//   )
// )

// const element = {
//   type: 'p',
//   props: {
//     id: 'text',
//     children:
//   }
// }

// function createElement(type, props, ...children) {
//   return {
//     type,
//     props: {
//       ...props
//       children: children.map
//     }
//   }
// }

console.log(element);
const container = document.getElementById("root");
render(element, container);
