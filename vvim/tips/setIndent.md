## vim 设置缩进

1. shiftwidth

程序中自动缩进长度,expandtab是空格个数，noexpandtab用制表符表示

2. tabstop

一个tab所占的列数,默认为8,如果expandtab为true，就是8个空格替代

3. softtabstop

设置一个不是0也不是tabstop的数值，在输出模式下tab键将会插入制表符和空格混合的组合。如果tabstop为4，softtabstop为7，按下tab就是一个制表符和三个空格。在按一个tab键，就是三个制表符和两个空格（14）

4. expandtab/noexpandtab

输入tab时是否将其转换为空格


```
autocmd FileType javascript,html,css,less,scss,jsx set tabstop=4 shiftwidth=4 softtabstop=4 expandtab ai

```



