
### 项目中用到的jsdoc用法 ###

[jsdoc 文档](现有组件ButtonGroup,需要给该组件添加文档)
[jsdoc 文档 tags 标签说明](https://devdocs.io/jsdoc-tags/)

#### React组件的文档写法 ####

现有组件ButtonGroup,需要给该组件添加文档

##### 1.添加 `@module` 标签在文件顶部，在所有的 `imports` 后面 #####

```
/**
 * @file ButtonGroup 这是该组件的描述 *
 * @module ButtonGroup
 * @extends Component
 */
```

##### 2.在需要说明的方法处，添加 `@method` 标签在文件顶部，写法参考jsdoc中的方法的书写方法 #####

```
/**
  * @name onbuttonclick
  * @function
  * @param {object} data - 点击按钮元素的数据
  * @property {string} name - 名称
  * @property {any} ...other - 其他属性
  */
```
##### 3.propTypes 说明 #####

```
/**
  * @name propTypes
  * @param {object} propTypes
  * @property {string} [size]  按钮大小 默认为‘’,可选值为sm
  * @property {number} index active按钮的索引
  * @property {array} buttons 按钮元素数组，[{name: 'aaa'}]
  * @property {function} onBtnClick 按钮点击回调，[{name: 'aaa'}]
  */
```
