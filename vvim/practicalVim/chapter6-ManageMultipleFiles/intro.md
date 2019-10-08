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

:args

The argument list represents the list of files that was passed as an argument when we ran the vim command. In our case, we provided a single argument, *.txt, but our shell expanded the * wildcard, matching the five files that we see in our argument list.  The [] characters indicate which of the files in the arguments list is active.

#### Populate the argument list ####

When the :args Ex command is run without arguments, it prints the contents of the argument list. We can also set the contents of the argument list using this form:

:args {arglist}

The {arglist} can include filenames,wildcards,or even the output from a shell command.

#### specify files by name ####

the simplest way of populating the argument list is by specifying file names one by one:

:args index.html app.js
:args
[index.html] app.js

#### specify files by glob ####

wildcards are placeholders that can stand in for characters in the name of a file or directory.

Glob | Files matching the expansion
-- | --
:args \*.\* | index.html app.js
:args \*\*/\*.js | app.js lib/framework.js app/controllers/Mailer.js ...
:args \*\*/\*.\* | app.js index.js lib/framwork.js

#### specify files by backtick expansion ####

Vim executes the text inside the backtick characters in the shell, using the output from the cat command as the argument for the :args command.

#### use the argument list ####

use :args {arglist} to repopulate it from scratch with a single command. we can traverse the files in the argument list using :next and :prev commands. or we can use :argdo to execute the same command on each buffer in the set.

# tip 39 manage hidden files #

The buffer representing a.txt is annotated with a + sign, which indicates that it has been modified.

# tip 40 Divide you workspace into split windows #

vim allows us to view multiple buffers side by side by dividing our workspace into split windows.














