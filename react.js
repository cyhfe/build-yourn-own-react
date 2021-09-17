// jsx => createElement() => vdom {type, props}
// type 可以是DOM元素字符串'div', 函数（组件），类（组件） 等
// props 属性对象以及一个children属性
// props.children 1:无； 2: string 文本节点; 3: object 一个child vdom; 4: array 多个child vdom 

function createElement(type, config, children) {
  const props = {};

  if (!config) {
    for (propName in config) {
      props[propName] = config[propName];
    }
  }

  const childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    const childArray = Array(childrenLength);
    for (let i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }

  return {
    type,
    props,
  };
}

export { createElement };
