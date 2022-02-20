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

##### Repeating Commands

+ *{num}{command}* - repeat command {num} times
+ ++period++ - repeat previous change

##### Navigation

+ ++ctrl+"f"++ / ++ctrl+"b"++ ( or ++shift+up++ / ++shift+down++ or ++page-up++ / ++page-down++ ) - move pages up / down

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
+ ++"%"++ - move to matching parenthesis, bracket or brace
<br/><br/>

+ ++h++ / ++m++ / ++l++ - top / middle / bottom line on screen
+ ++"gg"++ / ++g++ - first / last line of the file
+ ++colon++*{num}* or *{num}*++"gg"++ or *{num}*++g++ - line {num} of the file
<br/><br/>

+ ++"*"++ / ++"#"++ - search forward / backwards for the next instance of the identifier(word) under the cursor
+ ++"n"++ / ++n++ - repeats the last search in the same / opposite direction specified by
the last use of ++"*"++ , ++"#"++

##### Editing(part 1)

+ ++"u"++ - undo the previous operation
+ ++ctrl+"r"++ - redo last undo change
<br/><br/>

+ ++tilde++ - toggle case of character beneath the cursor
+ ++"r"++ - replace a character at the cursor position
<br/><br/>

+ ++"p"++ - *put* : paste after the cursor
+ ++p++ - *put* : paste before the cursor
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

+ ++"yy"++ - copy current line(no matter where the cursor located in it), including *invisible newline sign* at the end
+ ++"dd"++ - cut current line(no matter where the cursor located in it), including *invisible newline sign* at the end
+ ++"cc"++ - cut current line(no matter where the cursor located in it), including *invisible newline sign* at the end
+ ++"=="++ - format line
+ ++">>"++ / ++"<<"++ - increase / decrease current line indentation(no matter where the cursor located in it)

useful shorthands:

+ ++s++ ( same as ++"cc"++ ) - *substitute line*

##### Motions

use operators and ==[motions](#motion)== together by following any of these patterns:

+ {operator}{num}{motion}
+ {num}{operator}{motion}

useful shorthands:

!!! tip

    When you capitalize a command it performs a stronger (or alternate) version of the original command.

+ ++y++ ( same as ++"y$"++ ) - copy from cursor position to end of line
<br/><br/>

+ ++d++ ( same as ++"d$"++ ) - cut from cursor position to end of line
+ ++"x"++ ( same as ++"dl"++ ) - cut character after the cursor
+ ++x++ ( same as ++"dh"++ ) - cut character before the cursor
<br/><br/>

+ ++"s"++ ( same as ++"cl"++ ) - *substitute character* :  cut character after the cursor and enter *insert mode*
+ ++c++ ( same as ++"c$"++ ) - cut from cursor position to end of line and enter *insert mode*

##### Text Objects

Text objects are special motions that describe structured pieces of text(the entities of a document domain model), e.g. words, sentences, quoted text, paragraphs, blocks, (HTML) tags, etc.

Specify a text object within a command by following this pattern: **{operator}{a|i}{text-object}**

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
