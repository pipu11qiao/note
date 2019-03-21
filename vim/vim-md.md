#### code collapse
cmd | effect | remark
--- | --- | ---
zc | 折叠 | 
zC | 对躲在范围内所有的嵌套的折叠点进行折叠 |
zo | 展开折叠 |
zO | 对所在范围内所有的签到的折叠点进行折叠 | 

#### search Case insensitive/sensitive

You need to use the \c escape sequence. So:
> /\ccopyright
To do the inverse (case sensitive matching), use \C instead.

#### folding

To enable/disable folding use Vim's standard folding configuration.

> set [no]foldenable

#### cancel search

取消搜索后的高亮

> :noh

