
function workLoop(deadline) {
  let shouldYield = false;
  while (nextUnitWork && !shouldYield) {
    nextUnitWork = performUnitWork(nextUnitWork);
    shouldYield = deadline.timeRemaining() < 1;
  }
  requestIdleCallback(workLoop);
}

let nextUnitWork = null;
requestIdleCallback(workLoop);


function performUnitWork(fiber) {
  // 1. add the element to the DOM
  // 2. create the fibers for the element’s children
  // 3. select the next unit of work
  return fiber.props.children
}

function createDom(fiber) {
  const dom = document.createElement(fiber.type)
  const isProperty = key => key !== "children"
  return dom
}

function render(element, container) {
  nextUnitWork = {
    dom: container,
    props: {
      children: [element],
    },
  }
}


export {
  render
}
