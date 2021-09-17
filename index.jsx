import { createElement } from "react"
import { render } from "react-dom"



const App = () => {
  return (
    <div>
      <p>hello</p>
      <p>world</p>
    </div>
  )
}

const element = (
  <div id="el">
    text
    <App />
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
