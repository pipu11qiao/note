Vim's Visual mode allows us to define a selection of text and then operate upon it.

Vim has three variants of Visual mode involving working with characters, lines, or rectangular blocks of text. 

# Tip 20 Grok Visual Mode #

However intuitive this might seem, Vim's perspective on selecting text is different from other text editors.

operator command in Visual mode will tigger.

##### Meet Select Mode #####

According to Vim’s built-in documentation, it “resembles the selection mode in Microsoft Windows” (see :h Select-mode   ). Printable characters cause the selection to be deleted, Vim enters Insert mode, and the typed character is inserted.

We can toggle between Visual and Select modes by pressing <C-g>. 

I can think of only one place where I consistently use Select mode: when using a plugin that emulates TextMate’s snippet functionality, Select mode highlights the active placeholder.

# Tip 21 Define a Visual Selection #

Command | Effect
-- | --
v | Enable character-wise Visual mode
V | Enable line-wise Visual mode
<C-v> | Enable block-wise Visual mode
gv | Rrselect the last visual selection

##### Toggling the Fre End of a Selection
We can use o key to toggle the free end.

# Tip 22 Repeat Line-Wise Visual Commands #

When we use the dot command to repeat a Visual mode command, it acts on the same amount of text as was marked by the most recent visual selection. This behavior tends to work in our favor when we make line-wise visual selections, but it can have surprising results with character-wise selections. Next, we’ll look at an example that illustrates this.

# Tip 23 Prefer Operators to Visual Commands Where Possible #





