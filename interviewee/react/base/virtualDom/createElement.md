
调用createElement方法创建虚拟dom元素

```javascript

import {REACT_ELEMENT_TYPE} from './ReactSymbol';

// 保留的属性
const RESERVED_PROPS = {
    key: true,
    ref: true,
    __self: true,
    __source: true,
};


/**
 *
 * @param type 元素类型
 * @param config 配置对象
 * @param children 大儿子
 */
export function createElement(type, config, children) {
    const props = {};

    let key = null;
    if (config !== null) {
        key = config.key;
    }
    for (let prop in config) {
        if (!RESERVED_PROPS[prop]) {
            props[prop] = config[prop]
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
        if (__DEV__) {
            if (Object.freeze) {
                Object.freeze(childArray);
            }
        }
        props.children = childArray;
    }
    const element = {
        $$typeof: REACT_ELEMENT_TYPE,
        type,
        key,
        props,

    }

}
```
