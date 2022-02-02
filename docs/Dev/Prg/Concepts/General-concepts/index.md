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

Each environment (the location a project runs on) has its own variables, benefit to things that should **keep secret** or **need to be dynamic**, like API keys, PORT, database url.

### Linux

!!! info ""

    <object data="./environmet-variables.pdf" type="application/pdf" class="pdf"></object>

Levels of environment variables:

+ **Operating System** - available for ^^any^^ user, session, app etc. Set in `/etc/environment` file.

    !!! note

        Restart system after modifying `/etc/environment` so changes will take effect.

+ **User Session** - available for ^^current^^ logged-in user. Set in following dotfiles of the shell that is currently used by that user in a *KEY=VALUE* format:

    !!! note

        **IMHO:** `export KEY=VALUE` can be used too, but thus it exports the variable assignment to child processes of the shell which is in my opinion quite unneseccairy for most of defined envs because each time we run new subshell those envs get **sourced** by the shell.

    + For *Login Shells*:

        + Bash(read by shell in this order!): `/

        + Zsh(read by shell in this order!): `/

    + For *Non-Login Shells*:

        + Bash(read by shell in this order!): `~/.bashrc`

        + Zsh(read by shell in this order!): `~/.zshrc`

    !!! tip

        When you have both *Bash* and *Zsh* shells in your system it is convenient to define $PATH(and other system envs) and also some other user-defined envs in `~/.profile` and source it in `~/.zprofile` by adding `#!bash [[ -e ~/.profile ]] && emulate sh -c '. ~/.profile'` line at the top of the file.

        There is also other complicated scenario with multiple shells and ways to arrange your envs in one place:

+ **Interactive Shell Session** - available for current shell session

+ **Application/Script** - available for current running app/script ^^only^^. Set using *KEY=VALUE* format without prepending `export` command, e.g.:

    ```bash
    # set port of server
    PORT=3000 node server.js
    ```

    ```bash
    # myscript.sh

    MYVAR="Hello World!"
    echo MYVAR    # Hello World!
    ```

    !!! note

        Because such varibales are not exported(using `export`) they called *local variables*(or *shell variables* when they contained exclusively within the shell in which they were set or defined. There are some predefined by shell vars of such type and they are often used to keep track of ephemeral data, like the current working directory(`PWD`).)


+ Как хранить пароли и ключи в коде проектов? Всё о переменных окружения. Пример с Django

    ![type:video](https://www.youtube.com/embed/Y9MRCxq4DIc)

### Windows

!!! info ""

    + [about_Environment_Variables](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_environment_variables?view=powershell-7.1&viewFallbackFrom=powershell-6)
    + [HowTo: Set an Environment Variable in Windows - Command Line and Registry](http://www.dowdandassociates.com/blog/content/howto-set-an-environment-variable-in-windows-command-line-and-registry/)
    + [Set PATH and other environment variables in Windows 10](https://www.opentechguides.com/how-to/article/windows-10/113/windows-10-set-path.html)

## Regex

!!! info ""

    + [RegExp(4pda)](https://4pda.to/forum/index.php?showtopic=940394)

    + [Regex tutorial — A quick cheatsheet by examples(Medium)](https://medium.com/factory-mind/regex-tutorial-a-simple-cheatsheet-by-examples-649dc1c3f285)

    + [Regex cookbook — Top 10 Most wanted regex(Medium)](https://medium.com/factory-mind/regex-cookbook-most-wanted-regex-aa721558c3c1)

    + [RegexOne Tutorial](https://regexone.com/)

    + [Шпаргалка по регулярным выражениям](https://www.exlab.net/tools/sheets/regexp.html)

        ![regexp(rus)](regexp(rus).png){: .zoom}
