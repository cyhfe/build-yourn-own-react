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

  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
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
    return null;
  }
}

function createDom(fiber) {
  let dom;

  // 文本节点
  if (fiber.type === "TEXT_ELEMENT") {
    dom = document.createTextNode('');
  }
  // dom节点
  else if (typeof fiber.type === "string") {
    dom = document.createElement(fiber.type);
  }

  // 添加属性
  const isProperty = (key) => key !== "children";
  Object.keys(fiber.props)
    .filter(isProperty)
    .forEach((propName) => (dom[propName] = fiber.props[propName]));
  console.log(dom)
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

const element = (
  <div id="foo">
    <div>hello</div>
    <div>world</div>
  </div>
)

export { render };
