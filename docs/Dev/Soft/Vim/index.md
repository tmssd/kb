# Vim

## Vim Essentials

### Vim Cheatsheet

<object data="./vim-cheatsheet-1.pdf" type="application/pdf" class="pdf"></object>

<object data="./vim-cheatsheet-2.pdf" type="application/pdf" class="pdf"></object>

<object data="./vi-vim-cheatsheet.pdf" type="application/pdf" class="pdf"></object>

### Vim Shortcuts

!!! note "Legend:"

    **bol** - begining of line

    **"soft" bol** - first non-whitespace character of line

    **eol** - end of line

#### Normal Mode

++esc++ or ++ctrl+bracket-left++ - back to normal mode from any other mode <br>
++"v"++ / ++"v"++++"v"++ - back to normal mode from charwise / linewise visual mode

##### Repeating Commands

+ ***{num}{command}*** - repeat command {num} times
+ ++"&"++ - repeat `:s` command
+ ++period++ - repeat previous change

##### Navigation

+ ++ctrl+"f"++ / ++"b"++ ( or ++shift+up++ / ++down++ or ++page-up++ / ++page-down++ ) - move pages up / down
+ ++ctrl+"e"++ / ++"y"++ - ^^scroll^^ line up / down
+ ++"z"++++"t"++ , ++"z"++++"z"++ , ++"z"++++"b"++ - ^^scroll^^ cursor to top, center, bottom
<br/><br/>

+ ++k++ - jumps to the help for the word under the cursor: neovim help, man page, etc...( ++"q"++++"q"++ - to get back to the editor)

###### Motion

!!! info ""

    Motion - move the cursor, or define the range for an operator.

+ ++"h"++ , ++"j"++ , ++"k"++ , ++"l"++ (or ++left++ , ++down++ , ++up++ , ++right++ ) - move the cursor left, down, up, right
+ ++"w"++ ( or ++shift+right++ ) / ++w++ ( or ++ctrl+right++ ) - move cursor to ^^begining of next^^ word / whitespace-separated segment of text
+ ++"b"++ ( or ++shift+left++ ) / ++b++ ( or ++ctrl+left++ ) - move cursor to ^^previous begining^^ of word / whitespace-separated segment of text
+ ++"e"++ / ++e++ - move cursor to ^^end^^ of word / whitespace-separated segment of text
<br/><br/>

+ ++0++ or ++pipe++ - bol of current line
+ ++"^"++ or ++underscore++ - "soft" bol of current line
+ ++"$"++ - eol of current line
+ ++plus++ or ++enter++ - "soft" bol of next line
+ ++minus++ - "soft" bol of previous line
<br/><br/>

+ ++"%"++ - move the cursor to matching parenthesis, bracket or brace
+ ++"f"++*{char}* / ++f++*{char}* - move the cursor ^^to^^ the next / previous instance of {char}
+ ++"t"++*{char}* / ++t++*{char}* - move the cursor ^^till^^ the next / previous instance of {char}
+ ++semicolon++ - repeat ++"f"++ , ++f++ , ++"t"++ , ++t++ commands
+ ++comma++ - reverse ++"f"++ , ++f++ , ++"t"++ , ++t++ commands
<br/><br/>

+ ++"("++ / ++")"++ - move the cursor ^^backwards^^ to the beginning of the current(if cursor is not at the first letter of the sentence) or next sentence / ^^forward^^ to the beginning of the next sentence
+ ++brace-left++ / ++brace-right++ - move the cursor to the previous / next empty line
+ ++h++ , ++m++ , ++l++ - move the cursor to the top, middle, bottom line on screen
+ ++"g"++++"g"++ / ++g++ - move the cursor first / last line of the file
+ ++colon++*{num}* or *{num}*++"gg"++ or *{num}*++g++ - move the cursor to line {num} of the file
<br/><br/>

+ ++"*"++ / ++"#"++ - search forward / backwards for the next instance of the identifier(word) under the cursor
+ ++"n"++ / ++n++ - repeats the last search in the same / opposite direction specified by
the last use of ++"*"++ , ++"#"++ , ++slash++ , ++question++ (the last two are command mode motion commands)

##### Editing(part 1)

+ ++"u"++ - undo the previous operation
+ ++ctrl+"r"++ - redo last undo change
<br/><br/>

+ ++tilde++ - toggle case of character beneath the cursor
+ ++"r"++ - replace a character at the cursor position
+ ++j++ - joins the current line with the next one, or all the lines in the current visual selection
<br/><br/>

+ ++"p"++ - *put* : to paste after (if charwise, to the right; if linewise, below)
+ ++p++ - *put* : to paste before (if charwise, to the left; if linewise, above)
+ ++dblquote++++plus++ - select the system CLIPBOARD(traditional windows-like) clipboard; to paste: use immediately ++"p"++ / ++p++ after that command
+ ++dblquote++++"*"++ - select the system PRIMARY(data copied upon highlighting with mouse) clipboard; to paste: use immediately ++"p"++ / ++p++ after that command
+ ++shift+insert++ - paste from system PRIMARY clipboard
+ ++ctrl+shift+"v"++ - paste from system CLIPBOARD clipboard

###### Operator(part 1)

!!! info ""

    Operator - operate on the specified range depending on current vim mode:

    + *normal mode* - range is specified by a series of ==[modifiers](#operators-modifiers)==
    + *visual mode* - range is the highlighted text

+ ++"y"++ - *yank* : copy
+ ++"d"++ - *delete* : cut
+ ++equal++ - format code
+ ++gt++ / ++lt++ - un-indent / indent

#### Insert Mode

##### Editing(part 2)

+ ++"i"++ - insert at cursor
+ ++"a"++ - append after cursor
+ ++i++ - insert at the beginning of the line
+ ++a++ - append at the end of the line
+ ++"o"++ - insert a line below the current line
+ ++o++ - insert a line above the current line

###### Operator(part 2)

+ ++"c"++ - *change* : cut

#### Visual Mode

##### Selecting

+ ++"v"++ - *visual* : marks starting selection point, then move the cursor to the desired end selection point
+ ++v++ - *linewise-visual* : always select full lines
+ ++ctrl+"v"++ - *block-visual* : select any rectangular region

##### Editing(part 3)

Use ==[operators](#operatorpart-1)== on selected text.

#### Replace Mode

#### Command Mode

#### ==[Operator's](#operatorpart-1)== Modifiers

##### Operator Doubling

double an operator to make it operate on a whole line:

+ ++"y"++++"y"++ - copy current line(no matter where the cursor located in it), including *invisible newline sign* at the end
+ ++"d"++++"d"++ - cut current line(no matter where the cursor located in it), including *invisible newline sign* at the end
+ ++"c"++++"c"++ - cut current line(no matter where the cursor located in it), including *invisible newline sign* at the end
+ ++"="++++"="++ - format line
+ ++">"++++">"++ / ++"<"++++"<"++ - increase / decrease current line indentation(no matter where the cursor located in it)

useful shorthands:

+ ++s++ ( same as ++"c"++++"c"++ ) - *substitute line*

##### Motions

use operators and ==[motions](#motion)== together by following any of these patterns:

+ ***{operator}{num}{motion}***
+ ***{num}{operator}{motion}***

useful shorthands:

!!! tip

    When you capitalize a command it performs a stronger (or alternate) version of the original command.

+ ++y++ ( same as ++"y"++++"$"++ ) - copy from cursor position to end of line
<br/><br/>

+ ++d++ ( same as ++"d"++++"$"++ ) - cut from cursor position to end of line
+ ++"x"++ ( same as ++"d"++++"l"++ ) - cut character after the cursor
+ ++x++ ( same as ++"d"++++"h"++ ) - cut character before the cursor
<br/><br/>

+ ++"s"++ ( same as ++"c"++++"l"++ ) - *substitute character* :  cut character after the cursor and enter *insert mode*
+ ++c++ ( same as ++"c"++++"$"++ ) - cut from cursor position to end of line and enter *insert mode*

##### Text Objects

Text objects are special motions that describe structured pieces of text(the entities of a document domain model), e.g. words, sentences, quoted text, paragraphs, blocks, (HTML) tags, etc.

Specify a text object within a command by following this pattern: ***{operator}{a|i}{text-object}***

+ **a** (think **a** or **a**ll) - ^^a^^ text object plus surrounding whitespace
+ **i** (think **i**nner) - ^^inner^^ object without whitespace
+ **text-object** - one of the built-in text objects:

    + `w` - word
    + `s` - sentence
    + `'`, `"`, `` ` `` - quotes
    + `p` - paragraph
    + `b` (or `(`, `)`) - block surrounded by ( )
    + `B` (or `{`, `}`) - block surrounded by { }
    + `<`, `>` - block surrounded by < >
    + `[`, `]` - block surrounded by [ ]
    + `t` - tag
