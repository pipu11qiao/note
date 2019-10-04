# The Vim Way

Our work is repetitive by nature. Whether we're making the same change in serveral places or moving around between similar regions of a document, we repeat many actions. Anything that can streamline a repetitive workflow will save out time multifold.

Vim is optimized for repettion. Its efficiency stems from the way it tracks our most recent actions. We can always replay the last change with a single keystroke. Powerful as this sounds, it's useless unless we learn to craft our actions so that they perform a useful unit of work when replayed. Mastering this concept is the key to becoming effective with Vim.

The dot command is our starting point. This seemingly simple command is the most versatile tool in the box, and understanding it is the first step toward Vim mastery.

# Tip 1 Meet The Dot Command #

The dot command lets us repeat the last change. It is the most powerful and versatile command in Vim.

# Tip 2 Don't Repeat Yourself #

#### Reduce Extraneous Movement 使用最有效的命令 ####

While the a command appends after the current cursor position, the A command appends at the end of the current line.

##### Two for the price one  #####
we could say the A command compounds two actions ($a) into a single keystroke.

compound command | equivalent in longhand
-- | --
C | c$
s | cl
S | ^C
I | ^i
A | $a
o | A<CR>
O | ko

if you catch yourself running ko . stop! Think about what you're doing. Then recognize that you could used the O command instead.

# Tip 3 Take One Step Back, Then Three Forward #

repeat '+' with 's..+..', then you can use '.'

# Tip 4 Act, Repeat, Reverse #

When facing a repetitive task, we can achieve an optimal editing strategy by making both the motion and the change repeatable.jjjkkk

Vim's repeatable commands along with their corresponding reverse action. In most cases, the undo command is the one that we reach for.

intent | Act | Repeat | Reverse
-- | -- | -- | --
Make a change | {edit} | . | u
Scan line for next character | f{char}/t{char} | ; | ,
Scan line for prvious character | F{char}/T{char} | ; | ,
Scan document for next match | /pattern<CR> | n | N
Scan document for previous match | ?pattern<CR> | n | N
Perform substitution | :s/target/replacement | & | u
Perform substitution | qx{change}q | @x | u

# Tip 5 Find and Replace by Hand #


In all of these examples, using the dot command repeats the last change. A single stoke is all that's required to move the cursor to its next target
：


