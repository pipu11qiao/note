# Open Files and Save Them to Disk #

# open a file by its filepath using ':edit' #
The :edit command allow us to open files from within Vim, either by specifying an absolute or a relative filepath. 

#### open a file relative to the current working directory ####

:pwd stands for 'print working directory'

#### open a file relative to the active file directory ####

we want to open a file which is in the save directory; it would be ideal if we could use the context of the active vuffer as a reference point.

`:edit %` 按<Tab>键

The % symbol is a shorthand for the filepath of the active bugger.

`:edit %:h` <Tab>

the :h modifier removes the filenames whilde preservingthe reset of the path. typing %:h es expanded to the full path of the current file's directory.

#### open a file by its filename using ':find' ####

The :find command allow us to open a file by its name without having to provide a fully qualified path.

##### configure the 'path' #####
the 'path' option allows us to specify a set of directories inside of which vim will search when the :find is invoked.







