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

+ [mkdocs](https://www.mkdocs.org){target=_blank}
+ [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/){target=_blank}
    + [Getting started](https://squidfunk.github.io/mkdocs-material/getting-started/){target=_blank}
    + [Setup](https://squidfunk.github.io/mkdocs-material/setup/changing-the-colors/){target=_blank}
    + [Reference](https://squidfunk.github.io/mkdocs-material/reference/){target=_blank}
    + [PyMdown Extensions(built-in into Material for MkDocs)](https://facelessuser.github.io/pymdown-extensions/){target=_blank}
+ Plugins:
    + [List of plugins from official mkdocs github repo](https://github.com/mkdocs/mkdocs/wiki/MkDocs-Plugins#site-management){target=_blank}
    + [The best MkDocs plugins and customizations(medium)](https://chrieke.medium.com/the-best-mkdocs-plugins-and-customizations-fc820eb19759){target=_blank}
    + [mkdocs-awesome-pages-plugin](https://github.com/lukasgeiter/mkdocs-awesome-pages-plugin){target=_blank}
    + [mkdocs-exclude](https://github.com/apenwarr/mkdocs-exclude){target=_blank}
    + [mkdocs-video](https://github.com/soulless-viewer/mkdocs-video){target=_blank}
    + [mkdocs-macros-plugin](https://github.com/fralau/mkdocs_macros_plugin){target=_blank}

+ Style:
    + Code syntax highlight:
        1. [Code blocks: Custom syntax theme(docs)](https://squidfunk.github.io/mkdocs-material/reference/code-blocks/#custom-syntax-theme){target=_blank}
        2. [Source style sheet(_colors.scss)](https://github.com/squidfunk/mkdocs-material/blob/master/src/assets/stylesheets/main/_colors.scss#L68){target=_blank}
        3. [Syntax theme definition(_highlight.scss)](https://github.com/squidfunk/mkdocs-material/blob/master/src/assets/stylesheets/main/extensions/pymdownx/_highlight.scss#L86){target=_blank}

    + [Icons + Emojis Search](https://squidfunk.github.io/mkdocs-material/reference/icons-emojis/){target=_blank}
        + :fontawesome-brands-youtube: - `:fontawesome-brands-youtube:`
        + :material-thumb-up: - `:material-thumb-up:`
        + :material-thumb-down: - `:material-thumb-down:`
        + :fontawesome-solid-file-excel: - `:fontawesome-solid-file-excel:`
        + :fontawesome-regular-file-excel: - `:fontawesome-regular-file-excel:`
        + :fontawesome-solid-file-word: - `:fontawesome-solid-file-word:`
        + :fontawesome-regular-file-word: - `:fontawesome-regular-file-word:`
        + :fontawesome-solid-file-powerpoint: - `:fontawesome-solid-file-powerpoint:`
        + :fontawesome-regular-file-powerpoint: - `:fontawesome-regular-file-powerpoint:`

+ Personal customization to implement in the future:
    + [medium-zoom](https://github.com/francoischalifour/medium-zoom#selectors){target=_blank}, [medium-zoom docsify plugin](https://cdn.jsdelivr.net/npm/docsify/lib/plugins/zoom-image.min.js){target=_blank}

+ How To:
    + Embed image with captions

        ```html
        <figure markdown>
          ![Javascript Engine](image-file){: .zoom}
          <figcaption>
              <a href="image-source-link" target="_blank">image-caption(e.g. image-source-description)</a>
          </figcaption>
        </figure>
        ```

    + Embed video: [MkDocs Video plugin](https://github.com/soulless-viewer/mkdocs-video){target=_blank}, [1](https://github.com/squidfunk/mkdocs-material/issues/492){target=_blank}, [2](https://github.com/mkdocs/mkdocs/issues/243){target=_blank}
    + Embed YouTube Video List

        copy initial embed code from the YouTube and then set `#!html width="400vw" height="225vw"`

        ```html
        <iframe width="400vw" height="225vw" src="https://www.youtube.com/embed/gb7gMluAeao?list=PLcvhF2Wqh7DNVy1OCUpG3i5lyxyBWhGZ8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        ```

    + Embed pdf:
        1. Embedding a PDF file

            ```html
            <object data="../foo.pdf" type="application/pdf" class="pdf"></object>
            ```

        2. Creating a link to a PDF file

            ```html
            <a href="../foo.pdf" class="image fit" style="color: red">:fontawesome-regular-file-pdf:</a>
            ```

            or

            ```html
            <a href="../foo.pdf" class="image fit" style="color: red">:fontawesome-solid-file-pdf:</a>
            ```

        3. [docsify-pdf-embed.js](https://unpkg.com/docsify-pdf-embed-plugin@1.0.8/src/docsify-pdf-embed.js){target=_blank}
