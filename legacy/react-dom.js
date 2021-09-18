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
  // return fiber.props.children
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }

  if (fiber.parent) {
    fiber.parent.dom.appendChild(fiber.dom);
  }

  let elements
  if(typeof fiber.props.children === 'string') {

  }
  const elements = fiber.props.children;
  let index = 0;
  let prevSibling = null;

  while (index < elements.length) {
    const element = elements[index];
    const newFiber = {
      type: element.type,
      props: element.props,
      parent: fiber,
      dom: null,
    };

    if (index === 0) {
      fiber.child = newFiber;
    } else {
      prevSibling.sibling = newFiber;
    }

    prevSibling = newFiber;
    index++;

    // 深度优先遍历

    // 1. child
    if (fiber.child) {
      return fiber.child;
    }

    // 2. sibling
    let nextFiber = fiber;
    while (nextFiber) {
      if (nextFiber.sibling) {
        return nextFiber.sibling;
      }

      // 3. parent
      nextFiber = nextFiber.parent;
    }
    return null
  }
}

function createDom(fiber) {
  let dom;
  if (typeof fiber === "string") {
    dom = document.createTextNode(fiber);
  } else if (typeof fiber.type === "string") {
    dom = document.createElement(fiber.type);
  }
  return dom;
}

function render(element, container) {
  nextUnitWork = {
    dom: container,
    props: {
      children: [element],
    },
  };
}

export { render };
