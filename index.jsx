import { createElement } from "react";
import { render } from "./react-dom";

const Foo = ({ id }) => {
  return (
    <div id={id}>foo</div>
  )
}

const element = (
  <div id="el">
    <div>
      <a href="www.baidu.com">link</a>
      <h1 style="color: red">sad</h1>
      <h1 className="dd">
        safasdasd
        <p>sad</p>
      </h1>
      fasd fasdasd
    </div>
    <Foo id="red" />
    <p>world</p>
  </div>
);



class Bar {
  render() {
    return <div></div>
  }
}
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

console.log(element, Foo, Bar);
const container = document.getElementById("root");
render(element, container);



