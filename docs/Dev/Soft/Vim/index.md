# Vim

!!! info ""

    + [Vim Tips Wiki](https://vim.fandom.com/wiki/Vim_Tips_Wiki)

## Vim Essentials

### Vim Cheatsheet

!!! info ""

    [Neovim Cheat Sheet fro various keyboard layouts :material-github:](https://github.com/mattmc3/neovim-cheatsheet)

<figure markdown>
  ![vim-cheatsheet](vim-cheatsheet.png){: .zoom}
  <figcaption>
      <a href="[image-source-link](https://docs.google.com/spreadsheets/d/15k_UgeY0C3j8tVQnR2hD_kNljB1AApG3x3gYrKtUAlw/edit#gid=1082709605)" target="_blank">neovim/vim graphical cheat sheet(google sheets)</a>
  </figcaption>
</figure>

### Vim Shortcuts

!!! tip

    Run `vimtutor` in a terminal to learn the first Vim commands.

!!! note "Legend:"

    **bol** - begining of line <br>
    **"soft" bol** - first non-whitespace character of line <br>
    **eol** - end of line <br>
    **"soft" eol** - last non-whitespace character of line <br>
    **buffer** - content of opened in vim file <br>
    **register** - vim's clipboard

#### Modes

^^Normal Mode^^

+ Default mode vim starts in. Key presses don’t insert text into the document.
+ To get back to the mode from other ones: <br>
    ++esc++ or ++ctrl+bracket-left++ - back from any mode <br>
    ++"v"++ / ++"v"++++"v"++ - back from charwise / linewise *visual mode* <br>

^^Insert Mode^^

+ Typing inserts characters just like a regular text editor.
+ Accessed from *normal mode* by pressing: ++"i"++ , ++i++ , ++"a"++ , ++a++ , ++"o"++ , ++o++ , ++"c"++ , ++c++ or ++"s"++ , ++s++
+ Mode's specific commands:

    ++ctrl+"h"++ - delete the character before the cursor <br>
    ++ctrl+"w"++ - delete word before the cursor <br>
    ++ctrl+"j"++ - begin new line <br>
    ++ctrl+"t"++ / ++ctrl+"d"++ - indent(move right) / de-indent(move left) line one shiftwidth <br>
    ++ctrl+"p"++ / ++ctrl+"n"++ - insert(auto-complete) previous / next  match before the cursor <br>
    ++ctrl+"r"++ *{char}* - insert the contents of register {char} <br>
    ++ctrl+"o"++ *{command}* - Temporarily enter normal mode to issue one normal-mode {command} <br>

^^Replace Mode^^

+ Allows replace existing text by directly typing over it.
+ Accessed from *normal mode* by pressing: ++r++

^^Visual Mode^^

+ Used to make selections of text, similar to how clicking and dragging with a mouse behaves.
+ Accessed from *normal mode* by pressing: ++"v"++ , ++v++ or ++ctrl+"q"++
+ Mode's specific commands:

    ++"u"++ / ++u++ - change marked text to lowercase / uppercase

^^Command Mode^^

+ Has a wide variety of commands and can do things that *normal mode* can’t do as easily.
+ Accessed by pressing: ++slash++ , ++question++ or ++colon++

#### Global

+ ++"q"++++colon++ - show commands history list in a new horisontally-splitted window
+ `:map` - mapping a key in command mode to a group of commands, e.g. `:map de :1,$d^M` will delete all lines when using the `:de` command
+ `:ab` - define a text abbreviation in *insert node*, e.g. `:ab VIM Vi Improved` will auto-complete "VIM" in *insert mode* for the phrase "Vi Improved"
them to the clipboard, so that a following ++"p"++ / ++p++ commands would paste the previously *yanked* value instead

#### Help

+ `:h` (or `:help`) - help
+ ++k++ - jumps to the help for the word under the cursor: neovim help, man page, etc...( ++"q"++++"q"++ - to get back to the editor)

#### Terminal Related

+ `:pwd` - print working directory
+ `:!{cmd}` - execute a shell command named {cmd}
+ `:ter` - load an inline terminal to new buffer in *normal mode*; to exit use `:bd!` or `exit` command in *insert mode*

#### Options

+ `:set` / `:set {options}` - show / define editor options

    ^^Some of the commmon *{options}* are:^^

    `all` - display all current vi options <br>
    `[no]nu` - display line numbers <br>
    `[no]ruler` (and optionally `rulerformat`) - showing line number headers; if you don't want to see the ruler all the time but want to know where you are, use ++"g"++ ++ctrl+"g"++ <br>
    `[no]wrap` - text wrapping <br>
    `[no]linebreak` - line breaking <br>
    `[no]spell` - spellchecking <br>
    `syntax on/off` - syntax highlighting <br>
    `expandtab` - space-tabbing <br>
    `softtabstop=4` - soft tab <br>
    `shiftwidth=4` - indent sizing <br>

+ `noremap x "_x` - re-map ++"x"++ command to work with the "black hole" register, i.e. to allow deleting characters without copying

#### Repeating

+ ***{num}{command}*** - repeat command {num} times
+ ++"&"++ - repeat `:s` ==[command](#replacing)==
+ ++period++ - repeat previous change

#### Macros

+ ++"q"++*{a-z}* - start recording macro named {a-z}
+ ++"q"++ - stop recording macro(after it started with the above command)
+ ++"@"++*{a-z}* - replay {a-z} macro
+ ++"@"++++"@"++ - replay the last macro played

#### Navigation

##### Buffers

+ ++ctrl+"^"++ - switch between two last buffers
+ `:ls` - list all open buffers; focused buffer named with `%a`
+ `:bp` / `:bn` / `:b#` / `:b{N}` / `:b {Name}` - switch to previous / next/ alternate(heretofore opened) / {N}'s(as shown by `:ls`) / {Name}(as shown by `:ls`) buffer
+ `:bd` / `:%bd` /  `:bd#` / `:bd{N}` / `:bd {Name}` - unload current / all / alternate(heretofore opened) / {N}'s(as shown by `:ls`) / {Name}(as shown by `:ls`) buffer and delete it from the buffer list
    1. to force unload use `!` after `bd`; changes are lost in this case
    2. in splitted layout that command will also close all windows currently showing the buffer
+ `:tab ba` - edit all buffers as tabs

##### Tabs

+ `:tabs` - list all open tabs
+ `:tabe` or `:tabnew`  - open new tab
+ `:tabe {name} / {file}` or `:tabnew {name} / {file}`  - open new tab with name {name} / file {file}
+ `#!bash vim -p file1 file2` - run vim and open file1 and file2 in separate tabs
+ ++"g"++++"t"++ / ++"g"++++t++  or `:tabn` / `:tabp` - move to the next / previous tab
+ *{num}*++"g"++++"t"++ or `:tabm {num}` - move to tab number *{num}*
+ `:tabm {num}` - move current tab to the *{num}*th position (indexed from 0)
+ `:tabc` - close the current tab and all its windows
+ `:tabo` - close all tabs except for the current one
+ `:tabdo {command}` - run the *{command}* on all tabs (e.g. `:tabdo q` - closes all opened tabs)
+ ++ctrl+"w"++ ++t++ - move the current split window into its own tab

##### Windows

+ ++ctrl+"w"++ ++"s"++ / ++ctrl+"w"++ ++"v"++ - create a horizontal / vertical split
+ ++ctrl+"w"++ ++"w"++ - move cursor between windows
+ ++ctrl+"w"++ ++"c"++ or `:clo` - close focused split window, i.e. doesn't close not-splitted window
+ ++ctrl+"w"++ ++"q"++ - quit a window
+ ++ctrl+"w"++ ++equal++ - make all windows equal height & width
+ ++ctrl+"w"++ ++"x"++ - exchange current window with next one
<br/><br/>

+ ++ctrl+"w"++ ++"h"++ / ++ctrl+"w"++ ++"l"++ - move cursor to the left /right window (vertical split)
+ ++ctrl+"w"++ ++"j"++ / ++ctrl+"w"++ ++"k"++ - move cursor to the window below / above (horizontal split)
<br/><br/>

+ ++ctrl+"w"++ ++h++ / ++ctrl+"w"++ ++l++ - make current window full height at far left(leftmost) / right(rightmost) vertical window
+ ++ctrl+"w"++ ++j++ / ++ctrl+"w"++ ++k++ - make current window full width at the very bottom(bottommost) / top(topmost) horizontal window

##### Screen

+ ++ctrl+"f"++ / ++"b"++ ( or ++shift+up++ / ++down++ or ++page-up++ / ++page-down++ ) - move pages up / down
+ ++ctrl+"u"++ / ++"d"++ - move up / down 1/2 a screen
+ ++ctrl+"e"++ / ++"y"++ - ^^scroll^^ line up / down
+ ++"z"++++"t"++ , ++"z"++++"z"++ , ++"z"++++"b"++ - ^^scroll^^ cursor to top, center, bottom

###### Marks and positions

+ `:marks` - list of marks
+ ++"m"++*{a/A-z/Z}* - set a mark {a/A-z/Z}; {a-z} - per buffer marks, {A-Z} - global marks
<br/><br/>

+ `:ju` - list of jumps

    !!! note

        **Jump** - a command that normally moves the cursor several lines away. <br>
        If you make the cursor **jump** the position of the cursor before the jump is remembered. <br>
        **Junp** commands are: ++grave++ , ++single-quote++ , ++"g"++, ++g++ , ++l++ , ++m++ , ++h++ , ++"("++ , ++")"++ , ++brace-left++ , ++brace-right++ , ++bracket-left++++bracket-left++ , ++bracket-right++++bracket-right++ , ++"%"++ , `/` , `?` , ++"n"++ , ++n++ , `:s` , `:tag` and the commands that start editing a new file.

+ ++ctrl+"o"++ / ++ctrl+"i"++ (or ++tab++ ) - move cursor to older(backwards) / newer(forward) position in jump list
<br/><br/>

+ `:changes` - list of changes
+ ++"g"++++semicolon++ / ++"g"++++comma++ - move cursor to older(backwards) / newer(forward) position in change list

###### Motion

!!! note

    Motion - move the cursor, or define the range for an ==[operator](#operators)==.

+ ++grave++*{mark}* / ++single-quote++*{mark}* - move the cursor to *{mark}* / "soft" bol of *{mark}*

    ^^Special marks:^^

    ++grave++ / ++single-quote++ - position / "soft" bol of position before the last jump <br>
    ++period++ - position of the last change in this file <br>
    ++dblquote++ - position when last editing this file <br>
    ++0++ - position where Vim was previously exited
<br/><br/>

+ ++"("++ / ++")"++ - move the cursor ^^backwards^^ to the beginning of the current(if cursor is not at the first letter of the sentence) or next sentence / ^^forward^^ to the beginning of the next sentence
+ ++brace-left++ / ++brace-right++ - move the cursor to the previous / next empty line, i.e. to previous / next paragraph(or function/block, when editing code)
+ ++h++ , ++m++ , ++l++ - move the cursor to the top, middle, bottom line on screen
+ ++"g"++++"g"++ (or ++bracket-left++++bracket-left++ ) / ++g++ (or ++bracket-right++++bracket-right++ ) - move the cursor first / last line of the file
+ ++colon++*{num}* or *{num}*++"gg"++ or *{num}*++g++ - move the cursor to line {num} of the file
<br/><br/>

+ ++"h"++ , ++"j"++ , ++"k"++ , ++"l"++ (or ++left++ , ++down++ , ++up++ , ++right++ ) - move the cursor left, down, up, right
+ ++"g"++++"j"++ / ++"g"++++"k"++ - move the cursor down / up in multi-line text
+ ++"w"++ ( or ++shift+right++ ) / ++w++ ( or ++ctrl+right++ ) - move cursor to ^^begining of next^^ word / whitespace-separated segment of text
+ ++"b"++ ( or ++shift+left++ ) / ++b++ ( or ++ctrl+left++ ) - move cursor to ^^previous begining^^ of word / whitespace-separated segment of text
+ ++"e"++ / ++e++ - move the cursor to ^^end^^ of word / whitespace-separated segment of text
+ ++"g"++++"e"++ / ++"g"++++e++ - move the cursor to ^^end^^ of ^^previous^^ word / whitespace-separated segment of text
<br/><br/>

+ ++"%"++ - move the cursor to matching parenthesis, bracket or brace
+ ++"f"++*{char}* / ++f++*{char}* - move the cursor ^^to^^ the next / previous instance of {char}
+ ++"t"++*{char}* / ++t++*{char}* - move the cursor ^^till^^ the next / previous instance of {char}
+ ++semicolon++ - repeat ++"f"++ , ++f++ , ++"t"++ , ++t++ commands
+ ++comma++ - reverse ++"f"++ , ++f++ , ++"t"++ , ++t++ commands
<br/><br/>

+ ++0++ or ++pipe++ - bol of current line
+ ++"^"++ or ++underscore++ - "soft" bol of current line
+ ++"$"++ - eol of current line
+ ++"g"++++underscore++ - "soft" eol of current line
+ ++plus++ or ++enter++ - "soft" bol of next line
+ ++minus++ - "soft" bol of previous line
<br/><br/>

+ `/{pattern}` / `?{pattern}` - forward / reverse search for {pattern}

    !!! note

        **Regular expressions:**

        Both vim’s find(`/`, `?`) and ==[replace](#replacing)== functions accept regular expressions. <br>
        Characters assumed by vim as part of regular expression(must be escaped with `\` to be searched for literally): `(`, `)`,  `*`,  `.`, `^`, `$` <br>
        Regular expression patterns that interpreted literally(must be escaped with `\` to be used as a part of a regular expression): `+`

        **Ignoring case:**

        `\c` in searching and replacing commands - can be placed anywhere in the sequence being searched for and affects the whole sequence

+ `/\<{word}\>` - find the next occurrence of the word {word}, where {word} is bounded by word
+ ++"*"++ / ++"#"++ - search forward / backwards for the next instance of the identifier(word) under the cursor
+ ++"g"++++"*"++ / ++"g"++++"#"++ - search forward / backwards for the next instance(including nested in other word) of the identifier(word) under the cursor
+ ++"n"++ / ++n++ - repeats the last search in the same / opposite direction specified by
the last use of ++"*"++ , ++"#"++ , ++slash++ , ++question++ (the last two are command mode motion commands)
boundaries (ex. space, dash)

#### Selecting

+ ++"v"++ - *visual* : marks starting selection point, then move the cursor to the desired end selection point
+ ++v++ - *linewise-visual* : always select full lines
+ ++ctrl+"q"++ - *block-visual* : select any rectangular region
+ upon selecting one can use various ==[operators](#operators)==
+ `:noh` - un-highlight search matches

#### Editing

+ `:new` - new file
+ `:e {file}` - edit {file} in a new buffer
+ `:sp {file}` - open a file in a new buffer and horizontally split window
+ `:vs {file}` - open a file in a new buffer and vertically split window
+ ++"g"++++"f"++ - open file under cursor
+ `:r {file}` - insert {file} content at the current cursor position
<br/><br/>

+ ++"i"++ - insert at cursor
+ ++"a"++ - append after cursor
+ ++i++ - insert at the beginning of the line
+ ++a++ - append at the end of the line
+ ++"o"++ - insert a line below the current line
+ ++o++ - insert a line above the current line
+ ++"g"++++"i"++ - insert text in the same position as where *insert mode* was stopped last time in the current buffer
<br/><br/>

+ ++"u"++ - undo the previous operation
+ ++u++ - restore (undo) last changed line
+ ++ctrl+"r"++ - redo last undo change
<br/><br/>

+ ++tilde++ - toggle case of character beneath the cursor
+ ++"r"++ - replace a character at the cursor position
+ ++r++ - replace characters starting at the cursor position using overstrike cursor, which types over existing characters
+ ++j++ - joins the current line with the next one, or all the lines in the current visual selection with one space in between
+ ++"g"++++j++ - joins the current line with the next one, or all the lines in the current visual selection without space in between
<br/><br/>

+ ++"p"++ - *put* : to paste after (if charwise, to the right; if linewise, below)
+ ++p++ (or ++"p"++++bracket-left++ ) - *put* : to paste before (if charwise, to the left; if linewise, above)
+ ++"g"++++"p"++ , ++"g"++++p++ - same as ++"p"++ , ++p++ + leave cursor after the new text(if charwise) or at the bigining of next line(if linewise)
+ ++shift+insert++ - paste from system PRIMARY clipboard
+ ++ctrl+shift+"v"++ - paste from system CLIPBOARD clipboard

##### Registers

!!! tip

    Registers are being stored in ~/.viminfo, and will be loaded again on next restart of vim.

+ ++dblquote++*{char}* - select from register the {char} register before a *yank*/*delete*/*put* commands, e.g. ++dblquote++++"a"++++y++ - copy rest of line to register *a*
    1. ++dblquote++*{A-Z}* before *yank*/*delete* - ^^append-copy^^ to register {a-z}
    2. following *{chars}* are *special registers*: <br>
        `0` - last yank <br>
        `"` - unnamed register, last delete or yank <br>
        `%` - current file name <br>
        `#` - alternate file name <br>
        `*` - X11 PRIMARY(data copied upon highlighting with mouse) clipboard contents <br>
        `+` - X11 CLIPBOARD(traditional windows-like) clipboard contents <br>
        `/` - last search pattern <br>
        `:` - last command-line <br>
        `.` - last inserted text <br>
        `-` - last small (less than a line) delete <br>
        `=` - expression register <br>
        `_` - black hole register <br>

##### Replacing

+ `:[range]s/{old}/{new}/[flags]` - replace {old} with {new} in ^^range^^ according to ^^flags^^

    ^^Ranges:^^

    `%` - the entire file <br>
    `'<,'>` - the current selection; the default range while in visual mode <br>
    `25` - line 25 <br>
    `25,50` - lines 25-50 <br>
    `$` - last line;  can be combined with other lines as in `50,$` <br>
    `.` (or just empty sign) - current line; can be combined with other lines as in `.,50` (or `,50`) <br>
    `,+2` or `+2,` - the current lines and the two lines therebelow <br>
    `-2,` or `,-2` - the current line and the two lines thereabove <br>

    ^^Flags:^^

    `g` - replace all occurrences on the specified line(or lines selected in *visual mode*); without this flag just the ^^first^^ occurrence is changed per line <br>
    `i` - ignore case <br>
    `c` - confirm each substitution <br>

##### Operators

!!! note

    Operator - operate on the specified range depending on current vim mode:

    + *normal mode* - range is specified by a series of ==[modifiers](#operators-modifiers)==
    + *visual mode* - range is the highlighted text

+ ++"y"++ - *yank* : copy
+ ++"d"++ - *delete* : cut
+ ++"c"++ - *change* : cut
+ ++equal++ - format code
+ ++gt++ / ++lt++ - un-indent / indent

##### ==[Operator's](#operators)== Modifiers

###### Operator doubling

double an operator to make it operate on a whole line:

+ ++"y"++++"y"++ - copy current line(no matter where the cursor located in it), including *invisible newline sign* at the end
+ ++"d"++++"d"++ - cut current line(no matter where the cursor located in it), including *invisible newline sign* at the end
+ ++"c"++++"c"++ - cut current line(no matter where the cursor located in it), including *invisible newline sign* at the end
+ ++"="++++"="++ - format line
+ ++">"++++">"++ / ++"<"++++"<"++ - increase / decrease current line indentation(no matter where the cursor located in it)

useful shorthands:

+ ++s++ ( same as ++"c"++++"c"++ ) - *substitute line*

###### Motions

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

###### Text objects

Text objects are special motions that describe structured pieces of text(the entities of a document domain model), e.g. words, sentences, quoted text, paragraphs, blocks, (HTML) tags, etc.

Specify a text object within a command by following this pattern: ***{operator}{a|i}{text-object}***

+ **a** (think **a** or **a**ll) - ^^a^^ text object plus surrounding whitespace
+ **i** (think **i**nner) - ^^inner^^ object without whitespace
+ **text-object** - one of the built-in text objects:

    `w` - word <br>
    `s` - sentence <br>
    `'`, `"`, `` ` `` - quotes <br>
    `p` - paragraph <br>
    `b` (or `(`, `)`) - block surrounded by ( ) <br>
    `B` (or `{`, `}`) - block surrounded by { } <br>
    `<`, `>` - block surrounded by < > <br>
    `[`, `]` - block surrounded by [ ] <br>
    `t` - tag <br>

#### Saving, Exiting

+ `:q` / `:q!` or ++z++++q++ - close / force-close a file without saving
+ `:w` - save the current file
+ `:wq` (or `:x`) / `:wq!` (or `:x!`) or ++z++++z++ - save and close the current file / force save and close the current file; exits vim if no open files remain
+ `:w {newfile}` (`:{x},{y}w {newfile}`) - ^^write^^ the whole ( from line {x} to line {y} ) current buffer into {newfile}, but continue editing the original file; `:w! {file}` (`:{x},{y}w! {file}`) to ^^overwrite^^ content of {file} that already exists
+ `:w >> {file}` (`:{x},{y}w >> {file}`) - ^^append^^ the whole ( from line {x} to line {y} ) current buffer to {file}
+ `:sav {newname}` - save a copy of the current file as {newname} and continue editing the file {newname}

## Vim Tips & Tricks

### Execute vim's commands in a file from the command line

Use `-c` flag. You can separate multiple commands with a pipe `|`. Example:

``` bash
vi -c "%s/false/true/g|:wq" file.txt
```
