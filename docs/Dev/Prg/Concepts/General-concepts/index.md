# General Concepts
## Conventions and standards

### 3-2-1 Data Backup Rule

+ **3** - at least 3 copies (one primary, two copies)
+ **2** - two different technologies (e.g. different filesystem, different software, or different media types)
+ **1** - one copy should be off-site/offline

### Semantic Versioning: aa.bb.cc

+ **aa** - major release, quite different from previous version
+ **bb** - minor release, add a new feature
+ **cc** - patch release, a bug fix

### The Twelve Factor App([source](https://www.12factor.net/))

1. **Codebase** - *One codebase tracked in revision control, many deploys*
2. **Dependencies** - *Explicitly declare and isolate dependencies*
3. **Config** - *Store config in the environment*
4. **Backing services** - *Treat backing services as attached resources*
5. **Build, release, run** - *Strictly separate build and run stages*
6. **Processes** - *Execute the app as one or more stateless processes*
7. **Port binding** - *Export services via port binding*
8. **Concurrency** - *Scale out via the process model*
9. **Disposability** - *Maximize robustness with fast startup and graceful shutdown*
10. **Dev/prod parity** - *Keep development, staging, and production as similar as possible*
11. **Logs** - *Treat logs as event streams*
12. **Admin processes** - *Run admin/management tasks as one-off processes*

## Environment variables

!!! info ""

    **Linux:**

    + [How To Read and Set Environmental and Shell Variables on Linux(Digital Ocean)](https://www.digitalocean.com/community/tutorials/how-to-read-and-set-environmental-and-shell-variables-on-linux)

    **Windows:**

    + [about_Environment_Variables](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_environment_variables?view=powershell-7.1&viewFallbackFrom=powershell-6)
    + [HowTo: Set an Environment Variable in Windows - Command Line and Registry](http://www.dowdandassociates.com/blog/content/howto-set-an-environment-variable-in-windows-command-line-and-registry/)
    + [Set PATH and other environment variables in Windows 10](https://www.opentechguides.com/how-to/article/windows-10/113/windows-10-set-path.html)

+ *Environment* is an area that the shell builds every time that it starts a session that contains variables that define system properties.
+ The environment provides a medium through which the shell process can get or set settings and, in turn, pass these on to its child processes. It implemented as strings that represent key-value pairs. If multiple values are passed, they are typically separated by colon(`:`) characters: `#!bash KEY=value1:value2:...`. If the value contains significant white-space, quotations(as double as single quotes) are used: `#!bash KEY="value with spaces"`, `#!bash KEY='value with spaces'`.
+ An *environment variable* is a storage location that has a ^^name(key)^^ and a ^^value^^. The keys in these scenarios are variables. They can be one of two types, *environmental variables* or *shell variables*(==[see below](#types-of-environment-variables)==).
+ Benefit to things that should **keep secret** or **need to be dynamic**, like API keys, PORT, database url.

### Common Environment Variables

| Variable    | Description                                                   |
| ----------- | ------------------------------------------------------------- |
| EDITOR      | The program to run to perform edits.                          |
| HOME        | The Home directory of the user.                               |
| LOGNAME     | The login name of the user.                                   |
| MAIL        | The location of the user's local inbox.                       |
| OLDPWD      | The previous working directory.                               |
| PATH        | A colon separated list of directories to search for commands. |
| PAGER       | This program may be called to view a file.                    |
| PS1         | The primary prompt string.                                    |
| PWD         | The present working directory.                                |
| USER        | The username of the user.                                     |

### Common commands

+ `#!bash echo $VARIABLE_NAME` or `#!bash printenv VARIABLE_NAME` - examine specific variable
+ `#!bash env` or `#!bash printenv` - examine all the environmental variables that are set
+ `#!bash set` - list of all *shell variables*, *environmental variables*, *local variables*(and also *shell functions* in Bash)
    + `(#!bash set -o posix; set)` - for Bash: clean up the output by specifying that `set` should operate in POSIX mode, which won’t print the *shell functions* by executing this in a sub-shell(by wrapping the whole command with parenthesis) so that it does not change our current environment.
    + `#!bash comm -23 <(set | sort) <(env | sort)`, `#!bash comm -23 <(set -o posix; set | sort) <(env | sort)`(in Bash) - list of only shell variables

        !!! warning

            This will likely still include a few environmental variables, due to the fact that the `set` outputs quoted values, while the `printenv` and `env` do not quote the values of strings.

+ `#!bash KEY=VALUE` or `#!bash export KEY=VALUE` - set *shell* or *environmental* variable(see below)
+ `#!bash env VAR1="value1" VAR2="value2" command_to_run command_options` - modify the environment that programs run in by passing a set of variable definitions into a command
+ `#!bash printenv | grep VARIABLE_NAME` - check if variable is an *environmental variable*
+ `#!bash set | grep VARIABLE_NAME` - check if variable is a *shell variable*
+ `#!bash export -n VARIABLE_NAME` - demote an environmental variable, i.e. set to shell variable
+ `#!bash unset VARIABLE_NAME` - remove or delete an environment variable

### Types of environment variables

+ ***Shell(Local?) Variables*** - defined using `KEY=VALUE` format. Only effects the current running process, e.g. within the running script or shell in which they were set or defined. There are some predefined by shell vars of such type and they are often used to keep track of ephemeral data, like the current working directory(`PWD`).

+ ***Environmental(Global?) Variables*** - defined using `export KEY=VALUE` format. `export` exports the variable assignment to child processes of the shell in which the export command was ran. In general, when a process is started it inherits the exported environment variables of the process that spawned it.

+ Local vs. Global variables example:

    ```bash
    $ echo $PAGER
                           # PAGER is not defined
    $ PAGER=less           # let's difine it
    $ echo $PAGER
    less                   # now PAGER defined locally
    $ bash                 # running a sub-shell
    $ echo $PAGER
                           # PAGER is not defined in child process
    $ exit                 # exit from a sub-shell to parent shell
    exit
    $ export PAGER=less    # let's define PAGER globally
    $ bash                 # running a sub-shell
    $ echo $PAGER
    less                   # now PAGER defined in child process too!
    $ exit
    exit
    $
    ```

!!! tip

    If you need envs(wether they are **local** or **environmental**) that are defined in some file to be available in current running **interactive** or **non-interacrive**(e.x. when running script) shell you should use `.`(`source` - optional for Bash) command, e.g.: `#!bash . ./file-with-envs.sh`(this actually executes the script commands in the current shell environment)

### Levels of environment variables

!!! info ""

    **Definitions:**

    + ^^*Login Shell*^^ - is a shell session that begins by authenticating the user, e.g. if you signing into a terminal session or through SSH and authenticate.
    + ^^*Non-Login Shell*^^ -is a new shell session from within your authenticated session.
    + ^^*Interactive Shell*^^ - is a shell session that is attached to a terminal.
    + ^^*Non-Interactive Shell*^^ - is a shell session that is not attached to a terminal session. It’s most often run from a script or similar. It is important to note that this often influences your `PATH` variable.
    + Detect the type of shell:

        ```bash
        ## Detect login/non-login shells:
        shopt -q login_shell && echo 'login' || echo 'not-login'    # for Bash only
        # or
        shopt | grep login_shell                                    # for Bash only
        # or
        echo $0                                                     # if output prepended with '-' then it is a login shell, e.g. '-zsh'

        ## Detect interactive/non-interactive shells:
        [[ $- == *i* ]] && echo 'Interactive' || echo 'not-interactive'
        ```

    **Reference:**

    + [Unix Shells: Bash, Fish, Ksh, Tcsh, Zsh startup files](https://hyperpolyglot.org/unix-shells#startup-file)
    + [Difference between Login Shell and Non-Login Shell?(Unix & Linux Stack Exchange)](https://unix.stackexchange.com/questions/38175/difference-between-login-shell-and-non-login-shell)
    + [Zsh/Bash startup files loading order (.bashrc, .zshrc etc.)](https://shreevatsa.wordpress.com/2008/03/30/zshbash-startup-files-loading-order-bashrc-zshrc-etc/)
    + [Zsh - Startup/Shutdown files(ArchWiki)](https://wiki.archlinux.org/title/Zsh#Startup/Shutdown_files)

    + Shell Startup Graph
        <figure markdown>
          ![Javascript Engine](./shell-startup-graph.png){: .zoom}
          <figcaption>
              <a href="https://blog.flowblok.id.au/2013-02/shell-startup-scripts.html" target="_blank">https://blog.flowblok.id.au/2013-02/shell-startup-scripts.html</a>
          </figcaption>
        </figure>

1. {++**System-wide**++} - available for ^^any^^ user, session, app etc. Set in folowing files:

    + `/etc/environment` - This file is parsed by *pam_env* module. Syntax: simple "KEY=VAL" pairs on separate lines.

    + for ^^*Login Shells*^^:
        + **Bash**(read by shell in this order!<sup> [source](https://www.gnu.org/software/bash/manual/html_node/Bash-Startup-Files.html)</sup>): `/etc/profile` -> *logged-in user dotfiles*

        + **Zsh**(read by shell in this order!): `/etc/zshenv` -> *logged-in user dotfile* -> `/etc/zprofile` -> *logged-in user dotfile* -> `/etc/zshrc` -> *logged-in user dotfile* -> `/etc/zlogin` -> *logged-in user dotfile*

    + for ^^*Non-Login Interactive Shells*^^:

        + **Bash**(read by shell in this order!): `/etc/bash.bashrc` -> *logged-in user dotfiles*

        + **Zsh**(read by shell in this order!): `/etc/zshenv` -> *logged-in user dotfile* -> `/etc/zshrc` -> *logged-in user dotfile*

    + for ^^*Non-Login Non-Interactive Shells(scripts etc.)*^^:

        + **Bash**: *BASH_ENV* environmental variable

        + **Zsh**(read by shell in this order!): `/etc/zshenv` -> *logged-in user dotfile*

    !!! note

        Restart system after modifying these system files so changes will take effect.

2. {++**User**++} - available for ^^current^^ logged-in user. Set in following dotfiles of the shell that is currently used by that user in a *KEY=VALUE* format:

    !!! note

        **IMHO:** `export KEY=VALUE` can be used too, but thus it exports the variable assignment to child processes of the shell which is in my opinion quite unneseccairy for most of defined envs because each time we run new sub-shell those envs get **sourced** by the shell.

    + for ^^*Login Shells*^^:

        + **Bash**(read by shell in this order but it executes only the first of those files found!<sup> [source](https://www.gnu.org/software/bash/manual/html_node/Bash-Startup-Files.html)</sup>): system-wide settings files -> `~/.bash_profile` -> `~/.bash_login` -> `~/.profile`

            !!! tip

                Put these in `~/.profile` at the top in order to source `~/.bashrc`:
                ```bash
                # ~/.profile must include ~/.bashrc, but only if the shell is interactive and is bash but not if the login shell is some other shell
                case "$-" in *i*)
                    if
                        test "$BASH_VERSION" &&\
                        test "${0#-}" != sh &&\
                        test -r "$HOME"/.bashrc
                    then
                        . "$HOME"/.bashrc
                    fi
                    ;;
                esac
                ```

            !!! info ""

                + [Configuring your login sessions(for 5 different environments!) with dot files](http://mywiki.wooledge.org/DotFiles)
                + [Difference between .bashrc and .bash_profile(SuperUser)](https://superuser.com/questions/183870/difference-between-bashrc-and-bash-profile)

        + **Zsh**(read by shell in this order!): *system-wide settings file* -> `$ZDOTDIR/.zshenv` -> *system-wide settings file* -> `$ZDOTDIR/.zprofile` -> *system-wide settings file* -> `$ZDOTDIR/.zshrc` -> *system-wide settings file* -> `$ZDOTDIR/.zlogin`

    + for ^^*Non-Login Interactive Shells*^^:

        + **Bash**(read by shell in this order!): *system-wide settings files* -> `~/.bashrc`

        + **Zsh**(read by shell in this order!): *system-wide settings file* -> `$ZDOTDIR/.zshenv` -> *system-wide settings file* -> `$ZDOTDIR/.zshrc`

    + for ^^*Non-Login Non-Interactive Shells(scripts etc.)*^^:

        + **Bash**: *BASH_ENV* environmental variable

        + **Zsh**(read by shell in this order!): system-wide settings -> `$ZDOTDIR/.zshenv`

    !!! note

        If `$ZDOTDIR` is not set, `$HOME` is used instead.

    !!! tip

        When you have both *Bash* and *Zsh* shells in your system it is convenient to define $PATH(and other system envs) and also some other user-defined envs in `~/.profile` and source it through `~/.zprofile` by adding `#!bash [[ -e ~/.profile ]] && emulate sh -c '. ~/.profile'` line at the top of the file([Zsh not hitting ~/.profile(SuperUser thread comment)](https://superuser.com/a/398990)).

        There is also other complicated scenario with multiple shells and ways to arrange your envs in one place:

        + [Xsh - A simple framework for shell configuration management.](https://github.com/sgleizes/xsh)
        + [Is there a ".bashrc" equivalent file read by all shells?(SuperUser thread comment)](https://unix.stackexchange.com/a/44619)
        + [Shell startup scripts](https://blog.flowblok.id.au/2013-02/shell-startup-scripts.html)

3. {++**Shell Session**++} - available for current shell session and its child processes. Set by using *environmental variables*.

4. {++**Application/Script**++} - available for current running app/script process ^^only^^. Set by using *shell variables*, e.g.:

    ```bash
    # set port of server
    PORT=3000 node server.js
    ```

    ```bash
    # myscript.sh

    MY_VAR="Hello World!"
    echo MY_VAR    # Hello World!
    ```

## Regex

!!! info ""

    + [RegExp(4pda)](https://4pda.to/forum/index.php?showtopic=940394)
    + [Regular Expression HOWTO(python.org)](https://docs.python.org/dev/howto/regex.html)
    + [Regex tutorial — A quick cheatsheet by examples(Medium)](https://medium.com/factory-mind/regex-tutorial-a-simple-cheatsheet-by-examples-649dc1c3f285)
    + [Regex cookbook — Top 10 Most wanted regex(Medium)](https://medium.com/factory-mind/regex-cookbook-most-wanted-regex-aa721558c3c1)
    + [RegexOne Tutorial](https://regexone.com/)
    + [Шпаргалка по регулярным выражениям](https://www.exlab.net/tools/sheets/regexp.html)

        ![regexp(rus)](regexp(rus).png){: .zoom}
