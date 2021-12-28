# Welcome to MkDocs

## Commands

+ `mkdocs new [dir-name]` - Create a new project.
+ `mkdocs serve` - Start the live-reloading docs server.
+ `mkdocs build` - Build the documentation site.
+ `mkdocs -h` - Print help message and exit.

## Project layout

    mkdocs.yml    # The configuration file.
    docs/
        index.md  # The documentation homepage.
        ...       # Other markdown pages, images and other files.

## Documentation

+ [mkdocs](https://www.mkdocs.org)
+ [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)
    + [Getting started](https://squidfunk.github.io/mkdocs-material/getting-started/)
    + [Setup](https://squidfunk.github.io/mkdocs-material/setup/changing-the-colors/)
    + [Reference](https://squidfunk.github.io/mkdocs-material/reference/)
    + [PyMdown Extensions(built-in into Material for MkDocs)](https://facelessuser.github.io/pymdown-extensions/)
+ Plugins:
    + [List of plugins from official mkdocs github repo](https://github.com/mkdocs/mkdocs/wiki/MkDocs-Plugins#site-management)
    + [The best MkDocs plugins and customizations(medium)](https://chrieke.medium.com/the-best-mkdocs-plugins-and-customizations-fc820eb19759)
    + [mkdocs-awesome-pages-plugin](https://github.com/lukasgeiter/mkdocs-awesome-pages-plugin)
    + [mkdocs-exclude](https://github.com/apenwarr/mkdocs-exclude)
    + [mkdocs-video](https://github.com/soulless-viewer/mkdocs-video)
    + [mkdocs-macros-plugin](https://github.com/fralau/mkdocs_macros_plugin)

+ Style:
    + Code syntax highlight:
        1. [Code blocks: Custom syntax theme(docs)](https://squidfunk.github.io/mkdocs-material/reference/code-blocks/#custom-syntax-theme)
        2. [Source style sheet(_colors.scss)](https://github.com/squidfunk/mkdocs-material/blob/master/src/assets/stylesheets/main/_colors.scss#L68)
        3. [Syntax theme definition(_highlight.scss)](https://github.com/squidfunk/mkdocs-material/blob/master/src/assets/stylesheets/main/extensions/pymdownx/_highlight.scss#L86)

    + [Icons + Emojis Search](https://squidfunk.github.io/mkdocs-material/reference/icons-emojis/)

+ Personal customization to implement in the future:
    + [medium-zoom](https://github.com/francoischalifour/medium-zoom#selectors), [medium-zoom docsify plugin](https://cdn.jsdelivr.net/npm/docsify/lib/plugins/zoom-image.min.js)

+ How To:
    + Embed video: [MkDocs Video plugin](https://github.com/soulless-viewer/mkdocs-video), [1](https://github.com/squidfunk/mkdocs-material/issues/492), [2](https://github.com/mkdocs/mkdocs/issues/243)
    + Embed pdf:
        1. Embedding a PDF file

            `#!html <object data="../foo.pdf" type="application/pdf" class="pdf"></object>`

        2. Creating a link to a PDF file

            + `#!html <a href="../foo.pdf" class="image fit" style="color: red">:fontawesome-regular-file-pdf:</a>`

            + `#!html <a href="../foo.pdf" class="image fit" style="color: red">:fontawesome-solid-file-pdf:</a>`
