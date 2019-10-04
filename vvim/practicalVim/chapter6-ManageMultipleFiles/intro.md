# tip 37 track open files with the buffer list #

Instead, we're editing an in-memory representation of a file, which is called a buffer in Vim's terminology.

Most Vim commands operate on buffers, but a few operate on files, including the :write, :update, and :saveas commands.

The :ls command gives us a listing of all the buffers that have been loaded into memory.

The % symbol indicates whick of the buffers is visible in the current window, whild the # symbol represents the alternate file. toggle between the current and alternate files by pressing <C-^>

#### use the buffer list ####

* nnoremap <silent> [b :bprevious<CR>
* nnoremap <silent> ]b :bnext<CR>
* nnoremap <silent> [B :bfirst<CR>
* nnoremap <silent> ]B :blast<CR>

:buffer N command。
:buffer {bufname}. The {bufname} need only contain enough charaters from filepath to uniqurely identify the buffer.
The :bufdo command allows us to execute an Ex command in all of the buffers listed by :ls. :argdo

#### deleting buffers ####

:bdelete N1 N2 N3
:N,M bdelete

Buffer numbers are automatically assigned by Vim， and we have no means of changing them by hand.

Vim's build-in controls for managing the buffer list lack flexibility. If we want to arrange buffers in a way, that makes sense for our workflow, attempting to organize the buffer list is not the way to go. Instead, w're better off dividing our workspace using split windows, tab pages, or the argument list.

#### group buffers into a collection with the argument list ####

The arguments list is easily managed and can be useful for grouping together a collection of files for easy navigation. We can run an Ex command on each item in the argument list using the :argdo command.





