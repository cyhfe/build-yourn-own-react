import { createElement } from "react"
import { render } from "react-dom"

const element = (
  <div id="el">
    {/* <p>hello</p> */}
    {/* <p>world</p> */}
  </div>
)

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

console.log(element)
const container = document.getElementById('root')
// render(element, container)
const node = document.createElement(element.type)
node['id'] = element.props.id
const text = document.createTextNode('')
text['nodeValue'] = element.props.children
node.appendChild(text)
container.appendChild(node)
