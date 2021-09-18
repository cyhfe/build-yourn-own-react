import {Component} from "../react";

const isClassComponent = comp => comp instanceof Component

function renderTextNode(text, container) {
  const textNode = document.createTextNode(text);
  container.appendChild(textNode);
}

function renderHostNode(element, container) {
  const node = document.createElement(element.type);

  // 给原生DOM节点添加属性
  const isProperty = (key) => key !== "children";
  Object.keys(element.props)
    .filter(isProperty)
    .forEach((key) => node[key] = element.props[key]);
  // 判断子节点

  // 子节点:文本节点
  if (typeof element.props.children === "string") {
    renderTextNode(element.props.children, node);
  }

  // 子节点:多个子节点
  else if (Array.isArray(element.props.children)) {
    element.props.children.forEach((child) => render(child, node));
  }

  // 子节点:单个子节点
  else {
    render(element.props.children, node);
  }

  container.appendChild(node);
}

function render(element, container) {
  // 文本节点
  if (typeof element === "string") {
    renderTextNode(element, container);
  }

  // 原生DOM节点
  else if (typeof element.type === "string") {
    renderHostNode(element, container);
  }

  // 函数组件
  else if(typeof element.type === 'function' && !isClassComponent(element.type)) {
    const functionComponent = element.type
    //给函数组件传递props
    const vdom = functionComponent(element.props)
    render(vdom, container)
  }
}

export { render };
