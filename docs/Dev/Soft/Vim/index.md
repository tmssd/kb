# Vim

## Vim Essentials

### Vim Cheatsheet

<object data="./vim-cheatsheet-1.pdf" type="application/pdf" class="pdf"></object>

<object data="./vim-cheatsheet-2.pdf" type="application/pdf" class="pdf"></object>

<object data="./vi-vim-cheatsheet.pdf" type="application/pdf" class="pdf"></object>

### Vim Shortcuts

#### Normal Mode

##### Repeating Commands

+ *{num}{command}* - repeat command {num} times
+ ++period++ - repeat previous change

##### Navigation

+ ++ctrl+"f"++ / ++ctrl+"b"++ ( or ++shift+up++ / ++shift+down++ or ++page-up++ / ++page-down++ ) - move pages up / down

###### Motion

!!! info ""

    Motion - move the cursor, or define the range for an operator.

+ ++"h"++ , ++"j"++ , ++"k"++ , ++"l"++ (or ++left++ , ++down++ or ++enter++ , ++up++ , ++right++ ) - move the cursor left, down, up, right
+ ++"w"++ ( or ++shift+right++ ) / ++w++ ( or ++ctrl+right++ ) - move cursor to ^^begining of next^^ word / whitespace-separated segment of text
+ ++"b"++ ( or ++shift+left++ ) / ++b++ ( or ++ctrl+left++ ) - move cursor to ^^previous begining^^ of word / whitespace-separated segment of text
+ ++"e"++ / ++e++ - move cursor to ^^end^^ of word / whitespace-separated segment of text
<br/><br/>

+ ++0++ - beginning of current line
+ ++"^"++ - first non-whitespace character of current line
+ ++"$"++ - end of current line
+ ++"%"++ - move to matching parenthesis, bracket or brace
<br/><br/>

+ ++h++ / ++m++ / ++l++ - top / middle / bottom line on screen
+ ++"gg"++ / ++g++ - first / last line of the file
+ ++colon++*{num}* / *{num}*++"gg"++ / *{num}*++g++ - line {num} of the file

##### Editing(part 1)

+ ++"u"++ - undo the previous operation
+ ++ctrl+"r"++ - redo last undo change
<br/><br/>

+ ++gt++++gt++ / ++lt++++lt++ - increase / decrease current line indentation(no matter where the cursor located in it)
+ ++tilde++ - toggle case of character beneath the cursor
+ ++"r"++ - replace a character at the cursor position
+ ++"x"++ - cut character after the cursor
+ ++x++ - cut character before the cursor
<br/><br/>

+ ++"p"++ - paste after the cursor
+ ++p++ - paste before the cursor
+ ++ctrl+shift+"v"++ - paste from system clipboard

###### Operator(part 1)

!!! info ""

    Operator - operate on the specified range depending on current vim mode:

    + *normal mode* - range is specified by a series of ==[modifiers](#operators-modifiers)==
    + *visual mode* - range is the highlighted text

+ ++"y"++ - *yank* command : copy
+ ++"d"++ - *delete* command : cut

#### Insert Mode

##### Editing(part 2)

+ ++"i"++ - insert at cursor
+ ++"a"++ - append after cursor
+ ++i++ - insert at the beginning of the line
+ ++a++ - append at the end of the line
+ ++"o"++ - insert a line below the current line
+ ++o++ - insert a line above the current line

###### Operator(part 2)

+ ++"c"++ - *change* command : cut

#### Visual Mode

##### Selecting

+ ++"v"++ - *visual* : marks starting selection point, then move the cursor to the desired end selection point
+ ++v++ - *linewise-visual* : always select full lines
+ ++ctrl+"v"++ - *block-visual* : select any rectangular region

##### Editing(part 3)

#### Replace Mode

#### Command Mode

#### ==[Operator's](#operatorpart-1)== modifiers

##### Operator Doubling

##### Motions

##### Text-objects

<br/><br/>

+ ++y++ ( shorthand for ++"y$"++ ) - copy from cursor position to end of line
+ ++d++ ( shorthand for ++"d$"++ ) - cut from cursor position to end of line

modifiers:

+ ++"yy"++ - copy current line(no matter where the cursor located in it), including *invisible newline sign* at the end
+ ++"dd"++ - cut current line(no matter where the cursor located in it), including *invisible newline sign* at the end
+ *{command}{num}{motion}* - ^^motion^^ are commands from ==[navigation section](#navigation)== above except *page-up/down* commands

<br/><br/>

+ ++c++ ( shorthand for ++"c$"++ ) - cut from cursor position to end of line

modifiers:

+ ++"cc"++ - cut current line(no matter where the cursor located in it), including *invisible newline sign* at the end
+ *{command}{num}{motion}* - ^^motion^^ are commands from ==[navigation section](#navigation)== above except *page-up/down* commands
