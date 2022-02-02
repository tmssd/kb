# Shell

## Bash

!!! info ""

    **Reference:**

    + [Shell & Utilities: Detailed Toc](https://pubs.opengroup.org/onlinepubs/9699919799/utilities/contents.html)

    **Bash Learning Sources**

    + [Learn X in Y minutes](https://learnxinyminutes.com/docs/bash/)

    + [Bash Pitfalls](https://mywiki.wooledge.org/BashPitfalls)

    + Introduction to Advanced Bash Usage - James Pannacciulli @ OSCON 2014

        ![type:video](https://www.youtube.com/embed/uqHjc7hlqd0)

        <object data="./bash_oscon_2014.pdf" type="application/pdf" class="pdf"></object>

### Bash Essentials

```bash
#! /bin/bash

# ECHO COMMAND
echo Hello World!

# VARIABLES
# Uppercase by convention
# Letters, numbers, underscores
NAME="Bob"
echo "My name is $NAME"
echo "My name is ${NAME}"

# USER INPUT
read -p "Enter your name: " NAME
echo "Hello $NAME, nice to meet you!"

# SIMPLE IF STATEMENT
if [ "$NAME" == "Brad" ]
then
  echo "Your name is Brad"
fi

# IF-ELSE
if [ "$NAME" == "Brad" ]
then
  echo "Your name is Brad"
else
  echo "Your name is NOT Brad"
fi

# ELSE-IF (elif)
if [ "$NAME" == "Brad" ]
then
  echo "Your name is Brad"
elif [ "$NAME" == "Jack" ]
then
  echo "Your name is Jack"
else
  echo "Your name is NOT Brad or Jack"
fi

# COMPARISON
NUM1=31
NUM2=5
if [ "$NUM1" -gt "$NUM2" ]
then
  echo "$NUM1 is greater than $NUM2"
else
  echo "$NUM1 is less than $NUM2"
fi

########
# val1 -eq val2 Returns true if the values are equal
# val1 -ne val2 Returns true if the values are not equal
# val1 -gt val2 Returns true if val1 is greater than val2
# val1 -ge val2 Returns true if val1 is greater than or equal to val2
# val1 -lt val2 Returns true if val1 is less than val2
# val1 -le val2 Returns true if val1 is less than or equal to val2
########

# FILE CONDITIONS
FILE="test.txt"
if [ -e "$FILE" ]
then
  echo "$FILE exists"
else
  echo "$FILE does NOT exist"
fi

########
# -d file   True if the file is a directory
# -e file   True if the file exists (note that this is not particularly portable, thus -f is generally used)
# -f file   True if the provided string is a file
# -g file   True if the group id is set on a file
# -r file   True if the file is readable
# -s file   True if the file has a non-zero size
# -u    True if the user id is set on a file
# -w    True if the file is writable
# -x    True if the file is an executable
########

# CASE STATEMENT
read -p "Are you 21 or over? Y/N " ANSWER
case "$ANSWER" in
  [yY] | [yY][eE][sS])
    echo "You can have a beer :)"
    ;;
  [nN] | [nN][oO])
    echo "Sorry, no drinking"
    ;;
  *)
    echo "Please enter y/yes or n/no"
    ;;
esac

# SIMPLE FOR LOOP
NAMES="Brad Kevin Alice Mark"
for NAME in $NAMES
  do
    echo "Hello $NAME"
done

# FOR LOOP TO RENAME FILES
FILES=$(ls *.txt)
NEW="new"
for FILE in $FILES
  do
    echo "Renaming $FILE to new-$FILE"
    mv $FILE $NEW-$FILE
done

# WHILE LOOP - READ THROUGH A FILE LINE BY LINE
LINE=1
while read -r CURRENT_LINE
  do
    echo "$LINE: $CURRENT_LINE"
    ((LINE++))
done < "./new-1.txt"

# FUNCTION
function sayHello() {
  echo "Hello World"
}
sayHello

# FUNCTION WITH PARAMS
function greet() {
  echo "Hello, I am $1 and I am $2"
}

greet "Brad" "36"

# CREATE FOLDER AND WRITE TO A FILE
mkdir hello
touch "hello/world.txt"
echo "Hello World" >> "hello/world.txt"    # >> adds to file, > overwrites a file
echo "Created hello/world.txt"
```

#### Bash Shell Shortcuts

![bash-shortcuts.jpg](bash-shortcuts.jpg){: .zoom}

### Bash Tips & Tricks

#### Useful Commands

+ `du -hs` - show the current folder's size

+ convert pdf to jpg

    **Using `pdftoppm` tool**

    basic command format:

    `#! bash pdftoppm -jpeg -r 300 input.pdf output`

    The `-jpeg` sets the output image format to JPG, `-r 300` sets the output image resolution to 300 DPI, and the word `output` will be the prefix to all pages of images, which will be numbered and placed into your current directory you are working in. A better way, in my opinion, however, is to use `mkdir -p images` first to create an "images" directory, then set the output to `images/pg` so that all output images will be placed cleanly into the `images` dir you just created, with the file prefix `pg` in front of each of their numbers.

    Therefore, here are my favorite commands:

    1. [Produces ~1MB-sized files per pg] Output in **.jpg** format at **300 DPI**:

        ```bash
        mkdir -p images && pdftoppm -jpeg -r 300 mypdf.pdf images/pg
        ```

    2. [Produces ~2MB-sized files per pg] Output in **.jpg** format **at highest quality (least compression)** and still at **300 DPI**:

        ```bash
        mkdir -p images && pdftoppm -jpeg -jpegopt quality=100 -r 300 mypdf.pdf images/pg
        ```

    **Using ImageMagick's `convert` tool**

    1. install `imagemagick`

    2. use `convert` like this:

        ```bash
        convert input.pdf output.jpg

        # For good quality use these parameters
        convert -density 300 -quality 100 in.pdf out.jpg
        ```

#### Run Commands in the Background

1. End a Command with **&**

    !!! note

        When the terminal session is closed, the command ends. You can also kill the command by issuing the `jobs` command, finding the number of the command that’s running, and killing it with the `kill` command: `kill %1`

    !!! warning

        Using `&` doesn’t disconnect the command away from you; it just pushes it into the background. You can verify this by typing `jobs` into the terminal. This means that while you’re trying to use the terminal, anything the command wants to push to `STDOUT` or `STDERR` will still be printed, which may be distracting, e.g. `ping google.com &`. If you’re looking to prevent this, consider redirecting the command to “/dev/null”: `COMMAND &>/dev/null &`

2. **&** After a Command, Then **Disown** It

    !!! note

        Using `disown` after running command with `&` keep this command running in constant, even with your terminal session ending. It’ll still keep piping things to `STDOUT` or `STDERR`, but once you exit and reopen your terminal, you won’t see anything there. You can find the command again with the `top` or `ps` commands and kill it with the `kill` command.

3. **Nohup**, with **&** and **/dev/null**

    !!! note

        `nohup` bypasses the HUP signal (signal hang up), making it possible to run commands in the background even when the terminal is off. Combine this command with redirection to “/dev/null” (to prevent nohup from making a nohup.out file), and everything goes to the background with one command: `nohup COMMAND &>/dev/null &`

### Bash Utilities

+ [Basher - bash package manager](https://www.basher.it/)
+ [dotenv](https://github.com/bashup/dotenv)
+ [bashew - bash script / project creator](https://github.com/pforret/bashew)
+ [setver - get and set semver versions for php, node, github and bash](https://github.com/pforret/setver)

## Zsh

+ [ ] [terminal-helpful-tips (7 Part Series)](https://dev.to/equiman/reveal-the-command-behind-an-alias-with-zsh-4d96)

### Oh My Zsh

A delightful community-driven framework for managing your zsh configuration.

+ [Official Website](https://ohmyz.sh/)
+ [Official Git](https://github.com/ohmyzsh)
