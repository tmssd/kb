# General Concepts
## Conventions and standards

### Semantic Versioning: aa.bb.cc

+ **aa**: major release, quite different from previous version
+ **bb**: minor release, add a new feature
+ **cc**: patch release, a bug fix

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

+ Environment is
+ Each environment (the location a project runs on) has its own variables.
+ An *environment variable* is a storage location that has a ^^name^^ and a ^^value^^.
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
+ `#!bash env` or `#!bash printenv` - examine all the environment variables that are set
+ `#!bash KEY=VALUE` or `#!bash export KEY=VALUE` - set *local* or *global* variable(see below)
+ `#!bash unset VARIABLE_NAME` - remove or delete an environment variable

### Types of environment variables

+ ***Local(Shell?) Variables*** - defined by `KEY=VALUE` format. Only effects the current running process, e.g. within the running script or shell(when defined in it).

+ ***Environmental(Global?) Variables*** - defined by `export KEY=VALUE` format. `export` exports the variable assignment to child processes of the shell in which the export command was ran. In general, when a process is started it inherits the exported environment variables of the process that spawned it.

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

1. **^^Operating System^^** - available for ^^any^^ user, session, app etc. Set in `/etc/environment` file.

    !!! note

        Restart system after modifying `/etc/environment` so changes will take effect.

2. **^^User Session^^** - available for ^^current^^ logged-in user in all processes. Set in following dotfiles of the shell that is currently used by that user in a *KEY=VALUE* format:

    !!! note

        **IMHO:** `export KEY=VALUE` can be used too, but thus it exports the variable assignment to child processes of the shell which is in my opinion quite unneseccairy for most of defined envs because each time we run new subshell those envs get **sourced** by the shell.

    + For *Login Shells*:

        + Bash(read by shell in this order!<sup> [source](https://www.gnu.org/software/bash/manual/html_node/Bash-Startup-Files.html)</sup>): `/etc/profile` -> `~/.bash_profile` -> `~/.bash_login` -> `~/.profile`

            !!! info ""

                [Configuring your login sessions(for 5 different environments!) with dot files](http://mywiki.wooledge.org/DotFiles)

        + Zsh(read by shell in this order!): `/

    + For *Non-Login Shells*:

        + Bash(read by shell in this order!): `/etc/bash.bashrc` -> `~/.bashrc`

        + Zsh(read by shell in this order!): `~/.zshrc`

    !!! tip

        When you have both *Bash* and *Zsh* shells in your system it is convenient to define $PATH(and other system envs) and also some other user-defined envs in `~/.profile` and source it in `~/.zprofile` by adding `#!bash [[ -e ~/.profile ]] && emulate sh -c '. ~/.profile'` line at the top of the file.

        There is also other complicated scenario with multiple shells and ways to arrange your envs in one place:

3. **^^Interactive Shell Session^^** - available for current shell session

4. **^^Application/Script^^** - available for current running app/script ^^only^^. Set using *KEY=VALUE* format without prepending `export` command, e.g.:

    ```bash
    # set port of server
    PORT=3000 node server.js
    ```

    ```bash
    # myscript.sh

    MY_VAR="Hello World!"
    echo MY_VAR    # Hello World!
    ```

    !!! note

        Because such varibales are not exported(using `export`) they called **local variables**(or **shell variables** when they contained exclusively within the shell in which they were set or defined. There are some predefined by shell vars of such type and they are often used to keep track of ephemeral data, like the current working directory(`PWD`).)

+ Как хранить пароли и ключи в коде проектов? Всё о переменных окружения. Пример с Django

    ![type:video](https://www.youtube.com/embed/Y9MRCxq4DIc)

## Regex

!!! info ""

    + [RegExp(4pda)](https://4pda.to/forum/index.php?showtopic=940394)

    + [Regex tutorial — A quick cheatsheet by examples(Medium)](https://medium.com/factory-mind/regex-tutorial-a-simple-cheatsheet-by-examples-649dc1c3f285)

    + [Regex cookbook — Top 10 Most wanted regex(Medium)](https://medium.com/factory-mind/regex-cookbook-most-wanted-regex-aa721558c3c1)

    + [RegexOne Tutorial](https://regexone.com/)

    + [Шпаргалка по регулярным выражениям](https://www.exlab.net/tools/sheets/regexp.html)

        ![regexp(rus)](regexp(rus).png){: .zoom}
