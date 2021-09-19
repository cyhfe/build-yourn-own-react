import { createElement } from "./react";

function commitRoot() {
  deletions.forEach(commitWork)
  commitWork(wipRoot.child)
  currentRoot = wipRoot
  wipRoot = null
}

function commitWork(fiber) {
  if (!fiber) return


  const domParent = fiber.parent.dom

  if (fiber.effectTag === "PLACEMENT" && fiber.dom != null) {
    domParent.appendChild(fiber.dom)
  } else if (fiber.effectTag === "UPDATE" &&
    fiber.dom != null) {
    updateDom(
      fiber.dom,
      fiber.alternate.props,
      fiber.props
    )
  } else if (fiber.effectTag === "DELETION") {
    domParent.removeChild(fiber.dom)

  }
  commitWork(fiber.child)
  commitWork(fiber.sibling)
}

// concurrent mode
function workLoop(deadline) {
  let shouldYield = false;
  while (nextUnitWork && !shouldYield) {
    nextUnitWork = performUnitOfWork(nextUnitWork);
    shouldYield = deadline.timeRemaining() < 1;
  }

  if (!nextUnitWork && wipRoot) {
    commitRoot()
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
  wipRoot = {
    dom: container,
    props: {
      children: [element],
    },
    alternate: currentRoot
  };
  deletions = []
  nextUnitWork = wipRoot

}

// 1. 执行当前任务
//  一个fiber进入函数， 创建dom并append到parent
// 2. 返回下一个任务
//  遍历children， 为每一个child fiber设置child, parent, sibling
//  如果有child， 将它设为下一个work
//  如果没有child，查找它的sibling
//  如果没有sibing， 查找它的parent的sibling
function performUnitOfWork(fiber) {

  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }

  const elements = fiber.props.children;
  reconcileChildren(fiber, elements)
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
    nextFiber = nextFiber.parent
  }
}

function reconcileChildren(wipFiber, elements) {
  let index = 0
  let prevSibling = null

  let oldFiber = wipFiber.alternate && wipFiber.alternate.child

  while (index < elements.length || oldFiber != null) {
    const element = elements[index];
    let newFiber = null

    const sameType = oldFiber && element && element.type === oldFiber.type

    if (sameType) {
      newFiber = {
        type: oldFiber.type,
        props: element.props,
        dom: oldFiber.dom,
        parent: wipFiber,
        alternate: oldFiber,
        effectTag: "UPDATE"
      }
    }

    if (element && !sameType) {
      newFiber = {
        type: element.type,
        props: element.props,
        dom: null,
        parent: wipFiber,
        alternate: null,
        effectTag: "PLACEMENT"
      }
    }

    if (oldFiber && !sameType) {
      oldFiber.effectTag = "DELETION"
      deletions.push(oldFiber)
    }

    if (oldFiber) {
      oldFiber = oldFiber.sibling
    }

    if (index === 0) {
      wipFiber.child = newFiber;
    } else {
      prevSibling.sibling = newFiber;
    }

    prevSibling = newFiber;
    index++;
  }
}

let nextUnitWork = null;
let wipRoot = null
let currentRoot = null
let deletions = null
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

