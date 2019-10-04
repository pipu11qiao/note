# Tip 27 Meet Vim's Command Line #


Command Line mode prompts us to enter an Ex command, a search pattern, or an expression.

When i press : key , Vim switches into Command-Line mode. type some command and press <CR> to execute and in any time press Esc to quit the command-line mode

For historical resons, the commands that we execute from Command-Line mode are called Ex commands. Command-Line mode is alse enabled when we press / to bring up a search prompt or <C-r>= to access the expression register. 

##### Ex Commands That Operate on the Text in a Buffer #####

Command | Effect
--|--
:[range]delete[x] | Delete specified lines [into register x]
:[range]yank[x] | Yank specified lines [into register x]
:[line]put[x] | Put the text from register x after the specified line
:[range]copy{address} | Copy the specified lines to below the line specifed by {address}
:[range]move{address} | Move the specified lines to below the line specifed by {address}
:[range]join | Join the spedified lines
:[range]normal{commands} | Execute Normal mode {commands} on each specified line
:[range]substitute/{pattern}/{string}/[flags] | Replace occurrences of {pattern} with {string} on each specified line
:[range]global/{patter}/[cmd] | Execute the EX command [cmd] on all specified lines where the {pattern} matches


We can use Ex commands to read and write files (:edit and :write), to create tabs (:tabnew) or split windows (:split), or to interact with the argument list (:prev/:next) or the buffer list (:bprev/:bnext). In fact, Vim has an Ex command for just about everything (see :h ex-cmd-index   for the full list).

#### Special Keys in Vim's Command-line Mode ####

In command line promt key stroke is similar with Insert Mode.
<C-w>, <C-u>, <C-v>, <C-k>, <C-r>{register}

ed ex vi vim , the editor develop 

##### Ex Commands Strike Far and Wide #####

It can sometimes be quicker to use an Ex command than to get the same job done with Vim's Normal commands. For example, Normal commands tend to act on the current character or the current line, whereas an Ex command can be executed anywhere. This means that we can use Ex commands to make changes without having to move our cursor. But the greatest feature that distinguishes Ex commands is their ability to be executed across many lines at the save time.

As a general rule, we could say that Ex commands are long range and have the capacity to modify many lines in a single move. Or to condense that even further: Ex commands strike far and wide.

# Tip 28 Execute a Command on One or More Consecutive Lines #

#### Use line numbers as an address ####

If we enter an Ex command consisting only of a number, then Vim will inter- pret that as an address and move our cursor to the specified line. 

```
:1
:print
:$
:p
:3p
```

#### Specify a range of lines by address ####

#### Specify a range of liens by visual selection ####

If we press the : key now, the command-line prompt will be prepopulated with the range : `'<,'>.` It looks cryptic, but you can think of it simply as a range standing for the visual selection.

This range can be really handy if we want to run a :substitute command on a subset of the file.

#### Specify a range of lines by pattern ####

```
/<html>,/<\/html>/p
```

#### Modify and address using an offset ####

```
 :/<html>/+1,/<\/html>/-1p
```

#### Discussion ####

Symbol | address
-- | --
1 | first line of the file
$ | last line of the file
0 | virtual line above first line of the file
. | line where the cursor is placed
'm | line containing mark m
`'<` | start of visual selection
`'>` | end of visual selection
% | entire file (shorthand for :1,$)

Line 0 doesn’t really exist, but it can be useful as an address in certain con- texts. In particular, it can be used as the final argument in the :copy {address} and :move {address} commands when we want to copy or move a range of lines to the top of a file.


# Tip 29 Dumplicate Or Move lines using ':t' and ':m' commands #

The :copy command(and its shorhant :t) let us duplicate one or more lines from one part of the document to another,while the move dommand lets us place them somewhere else in the document.

```
:[range]copy{address}
```
The :move command looks similar to the :copy command

```
:[range]move{address}
```


# Tip 30 Run a normal command across a range #

use :normal Ex command to execute the dot command across a range of lines

```
 :'<,'>normal .
```
sytax 
```
:[range]nomal <normal command>
```

The :`'<,'>`normal . command can be read as follows: “For each line in the visual selection, execute the Normal mode . command.” 

# Tip 31 Repeat the lase ex command #
While the . command can be used to repeat our most recent Normal mode command, we have to use @: instead if we want to repeat the last Ex command. Knowing how to reverse the last command is always useful, so we’ll consider that, too, in our discussion.

# Tip 32 Tab-Complete your ex commands #
Just like in the shell, we can use the <Tab> key to autocomplete commands at the prompt.o

The <C-d> command asks Vim to reveal a list of possible completions (see :h c_CTRL-D   ). If we hit the <Tab> key,
tab will cycle the command and <S-tab> will scroll backward

```
:colorscheme <C-d>
```
This time, <C-d> shows a list of suggestions based on the color schemes that are available.

# Tip 33 insert the current word at the command prompt #

At Vim’s command line, the <C-r><C-w> mapping copies the word under the cursor and inserts it at the command-line prompt.

# Tip 34 recall commands from history #

` q: ` will meet the command window
The command-line window is like a regular Vim buffer, where each line con- tains an item from our history. With the k and j keys, we can move backward and forward through our history. Or we can use Vim’s search feature to find the line that we’re looking for. When we press the <CR> key, the contents of the current line are executed as an Ex command.
When the command-line window is open, it always gets the focus. That means we can’t switch to other windows except by dismissing the command-line window. We can close the command-line window by running the :q command (just like any ordinary Vim window) or by pressing <CR>.
This table summarizes a few of the methods for summoning the command-line window:
command | action
-- | --
q/ | open the command-line window with history of searches
q: | Open the command-line window with history of Ex commands
ctrl-f | Switch from Command-Line mode to the command-line window

# Tip 35 run commands in the shell #
we can easily invoke external programs without leaving Vim. Best of all, we can send the contents of a buffer as standard input to a command or use the standard output from an external command to populate our buffer.


The :!{cmd} syntax is great for firing one-off commands, but what if we want to run several commands in the shell?

In that case, we can use Vim’s :shell command to start an interactive shell session

#### using the content of a buffer for standard input or output ####

the :read !{cmd} command, which puts the output from the {cmd} into our current buffer (see :h :read!   ).

As you might expect, the :write !{cmd} does the inverse: it uses the contents of the buffer as standard input for the specified {cmd} (see :h :write_c   ).
Vim provides a convenient shortcut for setting the range of a :[range]!{filter} command such as this.The !{motion} operator command drops us into Com- mand-Line mode and prepopulates the [range] with the lines covered by the specified {motion}.

# Discussion #

When operating Vim, we’re never more than a couple of keystrokes away from the shell.

command | effect
-- | --
:shell | Start a shell (return to Vim by typing exit)
:!{cmd} | Execute {cmd} with the shell
:read !{cmd} | Execute {cmd} in the shell and insert its standard output below the cursor
:[range]write !{cmd} | Execute {cmd} in the shell and insert its standard output below the cursor
:[range]!{filter} | Filter the specified [range] through external program {filter}

# Tip 36 run multiple ex command as a batch #

```
:g/href/j
:v/href/d
:%norm A: http://vimcasts.org
:%norm yi"$p
:%s/\v^[^\>]+\>\s//g
```


