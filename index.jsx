import { createElement } from "./react";

// concurrent mode
function workLoop(deadline) {
  let shouldYield = false;
  while (nextUnitWork && !shouldYield) {
    nextUnitWork = performUnitWork(nextUnitWork);
    shouldYield = deadline.timeRemaining() < 1;
  }
  requestIdleCallback(workLoop);
}

// 创建一个dom节点, 添加属性, 返回该dom
function createDom(fiber) {
  let dom;

  // 文本节点
  if (fiber.type === "TEXT_ELEMENT") {
    dom = document.createTextNode("");
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
  console.log(dom);
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

// 1. 创建该dom并添加到父节点
// 2. 创建children fiber
// 3. 返回下一个unitWork
function performUnitWork(fiber) {
  let index = 0;
  let prevSibling = null;

  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }

  const elements = fiber.props.children;
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
      return (nextFiber = nextFiber.parent);
    }
  }
}

let nextUnitWork = null;
requestIdleCallback(workLoop);

const element = (
  <div id="foo">
    <div>
      <p>a</p>
      <p>b</p>
      <p>c</p>
    </div>
    <div>world</div>
  </div>
);

const root = document.getElementById("root");
render(element, root);
