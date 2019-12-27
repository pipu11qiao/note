#### g修饰符对test和exec方法的影响 ####

正则实例的`lastIndex`属性，表示尝试匹配时，从字符串的`lastIndex`位开始去匹配。
正则的`ecec test`两个方法，如果正则中有`g`修饰符，每一次匹配完成后，都会修改`lastIndex`

从开始位置到结束位置都是非字母或汉字
```javascript
    var reg = /^[^a-zA-Z\u4e00-\u9fa5]+$/g
```




