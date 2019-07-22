## vim 设置不同模式下的光标样式

vim的光标在各种模式下都是一个方块，希望能在输入模式下光标变成竖线，看起来方便些，你可以将下面的设置加到 vimrc文件中

#### iTerm2 on osX 使用

```vimrc

let &t_SI = "\<Esc>]50;CursorShape=1\x7"
let &t_SR = "\<Esc>]50;CursorShape=2\x7"
let &t_EI = "\<Esc>]50;CursorShape=0\x7"

```

#### tmux on osX 使用

```

let &t_SI = "\<Esc>Ptmux;\<Esc>\<Esc>]50;CursorShape=1\x7\<Esc>\\"
let &t_SR = "\<Esc>Ptmux;\<Esc>\<Esc>]50;CursorShape=2\x7\<Esc>\\"
let &t_EI = "\<Esc>Ptmux;\<Esc>\<Esc>]50;CursorShape=0\x7\<Esc>\\"

```
理论上在所有的终端的tmux中上述代码都会生效
