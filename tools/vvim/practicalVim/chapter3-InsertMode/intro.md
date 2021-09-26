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

# Tip 15 Paste from a Register Without Leaving Insert Mode #

Vim's yank and put operations are usually executed from Normal mode, but sometimes we might want to paste text into the document without leaving Insert mode.

##### Remap the Caps Lock Key #####

The simplest way to remap the Caps Lock key is to do it at the system level.The methods differ on OSX,Linux, and Windows, so rather than reproducting instructions here for each system, I suggest you consult Google. Note that this customization won't just affect Vim: it applies system-wide. If you take my advice. you'll throw away the Caps Lock key forever. You don't miss it, I promis.

The general format of the command is <C-r>{register}, where {register} is the address of the  register we want to insert.

The <C-r>{register} commands is convenient for pasting a few words from Insert mode. Don't forget put commands when there is multiple lines or text with indents.

# Tip 16 Do Back-of-the-Envelope Calculations in Place #

The expression register allows us to perform calculations and then insert the result directly into our document.

Most of Vim's register conatin text either as a string of characters or as entire lines of text. The delete and yank commands allow us to set the contents of a register, while the put command allows us to get the contents of a register by inserting it into the document.

The expression register is different. It can evaluate a piece of Vim script code and return the result.

The expression register is addressed by the = symbol. From Insert mode we can access it by typing <C-r>=. This opens a prompt at the bottom of the screen where we can type the expression that we want to evaluate. When done, we hit<CR>, and Vim inserts the result at our current positions in the document. 

The expression register is capable of much more than simple arithmethic.

# Tip 17 Insert Unusual Characters by Chracter Code #

Vim can insert any chracter by its numeric code. This can be handy for entering symbols that are not found on the keyboard.

we just jave to type <C-v>{code}, where {code} is the address of the character that we want to insert.

if we wanted to insert an uppercase "A" character. The character code is 65, so we would have to enter it as <C-v>065.

**ga**command can see the numeric code for any character in document. 

# Tip 18 Insert Unusual Characters by Digraph #

<C-k>{char1}{char2}

:h digraph-table

# Tip 19 Overwrite Existing Text with Replace Mode #












