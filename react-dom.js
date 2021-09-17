function render(element, container) {
  let node;
  // 原生DOM
  if (typeof element.type === "string") {
    node = document.createElement(element.type);
    // 文本节点
    if (typeof element.props.children === "string") {
      const textNode = document.createTextNode(element.props.children);
      node.appendChild(textNode);
    }
    // 多个子节点
    else if (Array.isArray(element.props.children)) {
      element.props.children.forEach((child) => render(child, node));
    }
    // 单个子节点
    else {
      render(element.props.children, node);
    }
  }

  container.appendChild(node);
}
export { render };
