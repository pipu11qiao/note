set nocompatible
" kj 替换 Esc
inoremap kj <Esc>
filetype plugin on
set wildmode=longest,list
nnoremap <silent> [b :bprevious<CR>
nnoremap <silent> ]b :bnext<CR>
nnoremap <silent> [B :bfirst<CR>
nnoremap <silent> ]B :blast<CR>
