# Tip 8 Chunk Your Undos #


The u key triggers the undo command, which reverts the most recent change. A change could be anything that modifies the text in the document. That includes commands triggered from Normal, Visual, and Command-Line modes, Pause with Your Brush Off the Page report erratum • discuss but a change could also encompass any text entered (or deleted) in Insert mode. So we could also say that i{insert some text}<Esc> constitutes a change.  

In Vim, we can control the granularity of the undo command. From the moment we enter Insert mode until we return to Normal mode, everything we type (or delete) counts as a single change. So we can make the undo command operate on words, sentences, or paragraphs just by moderating our use of the <Esc> key.

So how often should you leave Insert mode ?

open a new line is to press <CR>. And yet I sometimes prefer to press <Esc>o just because I anticipate that I might want that extra granularity from the undo command.

##### Moving Around in Insert Mode Resets the Change #####

when in Insert Mode the <Up>, <Down>, <Left>, or<Right> cursor keys, a new undo chunk is created.

# Tip 9 Compose Repeatable Changes #

Vim is optimized for repetition. In order to expoit this, we have to be mindful of how we compose our changes.

which technique requires the fewest keystrokes.

#### delete a word start at the end of word ####

* delete backward db x
* delete forward b dw
* delete an entire word daw

##### Discussion #####

The daw technique invests the most power into the dot command. so I declare it the winner of this round.

Making effective use of the dot command often requires some forthought. If you notice that you have to make the same small change in a handful of places, you can attempt to compose your changes in such a way that they can be repeated with the dot command. Recognizing those opportunities takes prative. But if you develop a habit of making your changes repeatable wherever possible, then Vim will reward you for it.

# 10 Use Counts to Do Simple Arithmetic #

The <C-a> and <C-x> commands perform addition and subtraction on numbers. When run without a count they increment by one, buf if we prefix a number, then we can add or substract by any whole number.

##### Number Formats #####

vim interprets numberals with a leading zero to be in octal notation rather than in decimal. 

```vim
set nrformats=
```

This will cause Vim to treat all numerals as decimal.

# Tip 11 Don't Count If You Can Repeat #

Now suppose that we want to delete seven words. We could either run d7w, or dw...... (that is, dw followed by the dot command six times). Counting keystrokes, we have a clear winner. But would you trust yourself to make the right count?
Counting is tedious. I’d rather hit the dot command six times than spend the same time looking ahead in order to reduce the number of keys that I have to press. What if I hit the dot command one too many times? No matter, I just back up by hitting the u key once.

# Tip 12 Combine and Conquer #


```
Operator + Motion = Action
```




