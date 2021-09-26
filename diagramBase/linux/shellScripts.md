shell scripts

1.&& ||
2.$0 $1
3.if .. then

```sh

if [条件判断式]: then
        当条件判断式成立时，可以进行的指令工作内容
fi

```
4. case esac

```sh
case $变量名称 in
    "第一个变量内容")
        echo "aaa"
        ;;
        "第二个")
        echo "bbb"
        ;;
        "第三个")
        echo "ccc"
        ;;
esac
```

5. function

function fname(){
    程序段
}

6.循环

```sh

while [ condition ]
do
    程序段落
done

until [ condition ]
do
    程序段落
done

```

