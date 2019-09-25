Most of Vim's commands are triggered from other modes, but some function-ality is within easy reach from Insert mode.In this chapter, we'll explore these commands. Although delete, yank, and put commands are all triggered from Normal mode, we'll see that there is a convenient shortcut for pasting text from a register without leaving Insert mode. We'll learn that Vim provides two easy ways for inserting unusual characters that are not represented on the keyboard.

Replace mode is a special case of Insert mode, which overwrites existing characters in the document. We'll learn how to invoke this and consider some scenarios where it proves useful. We'll also meet Insert Normal mode, a submode that lets us fire a single Normal mode command before dropping us back into Insert mode.

# Tip 13 Make Corrections Instantly from Insert Mode #


In Insert mode, the backspace key works just as you would expect: it deletes the character in front of the cursor. The following chords are also available to us:

Keystroks | Effect
-- | --
<c-h> | Delete back one character(backspace)
<c-w> | Delete back one word
<c-u> | Delete back to start of line

These commands are note unique to Insert mode or even to Vim. We can also use them in Vim's command line as well as in the bash shell.



