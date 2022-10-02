# CSS

!!! info ""

    + [CSS Tricks](https://css-tricks.com/almanac/)
    + [Learn CSS](https://web.dev/learn/css/)
    + [Шпаргалка по CSS](https://www.exlab.net/tools/sheets/css.html)

    ![css(rus)](css(rus).png){: .zoom}

## CSS Essentials

**C**ascading **S**tyle **S**heets describes the ^^visual style and presentation^^ of the ^^content written in HTML.^^<br>
CSS at the most basic level it indicates that the order of *CSS Rules* matter.<br>
CSS consist of countless *properties* that developer use to format the content: preperties about font, text, spacing, layout, etc.

### A CSS Rule

**`h1 { color: blue; }`** - this is the *CSS Rule*, where:

+ `h1` - is a *Selector*
+ `{ color: blue; }` - is a *Decalration Block*
+ `color: blue;` - is a *Declararion/Style*
+ `color` - is a *Property*
+ `blue` - is a *Value* and it can be one of the two types: ^^length^^(like `20px`) or ^^keyword^^(like `blue`)

### 3 ways to connect CSS to HTML

1. *Inline CSS*, using `style` attribute. Should usually never be used, because of *separarion of concern* principle.

    `#!html <h1 style="color: blue">The Code Magazine</h1>`

2. *Internal CSS*, using `#!html <style>` element inside `#!html <head>` element.

    ```html
    <head>
        <meta charset="UTF-8" />
        <title>The Basic Language of the Web: HTML</title>

        <style>
            h1 {
                color: blue;
            }
        </style>
    </head>
    ```

3. *External CSS*, using completely different file(e.g. style.css) and link it to the index.html through the `#!html <link />` element inside `#!html <head>` element.

    ```html
    <head>
        <meta charset="UTF-8" />
        <title>The Basic Language of the Web: HTML</title>

    <link href="style.css" rel="stylesheet" />

    </head>
    ```

### Most commonly used selectors

!!! info ""

    [W3S list of CSS selectors](https://www.w3schools.com/cssref/css_selectors.asp)

+ `.class` - selects the element by its `class` attribute value

+ `#id` - selects the element by its `id` attribute value

!!! note "`class` and `id` HTML attributes naming convention"

    If we have a Class or an ID name with multiple words, we separate these words by Dashes like this:<br>
    `#!html <p class="related-author">By Jim Dillon</p>`

+ `*` - universal selector: selects every single element on the page; this selecor has the lowest priority

+ `element` - *element selector* select the element by its name

+ `element, element` - combining selectors into one list, so the *selector* here is now a *list selector*

+ `element1 element2` - *descendant selector*, selects all the `element2` elements inside the `element1` elements

+ `element > element`

+ `element + element`

+ `!important` (not recommended) - make the style more important than ^^all^^ the other ones, e.g. `#!css p { color: green !important; }`

#### Pseudo-classes

+ `elem:first-child` - selects every `elem` element that is the first child of its parent

+ `elem:last-child` - selects every `elem` element that is the last child of its parent

+ `elem:nth-child(n)` - selects every `elem` element that is the `n`th child of its parent

    `n` can be a **number**, a *keyword* (**odd** or **even**), or a formula **an + b**, where **a** represents a cycle size, **n** is a counter (starts at 0), and **b** is an offset value.

    ```css
    /* Here, we specify a background color for all p elements whose index is a multiple of 3.
    Then we subtract 1 (will select the second, fifth, eight, etc)  */
    p:nth-child(3n-1) {
      background: red;
    }
    ```

+ `:active` - select elements when mouse clicks them

    !!! warning "`:active` MUST come after `:hover` (if present) in the CSS definition in order to be effective!"

+ `:hover` - select elements when mouse over them

    !!! warning "`:hover` MUST come after `:link` and `:visited` (if they are present) in the CSS definition, in order to be effective!"

Anchor elements(`#!html <a>`) should always be selected with following pseudo-classes that allow us to target different states:

+ `:link` - target all ^^unvisited^^ anchor elements that have an `href` attribute
+ `:visited` - target all ^^visited^^ anchor elements

What seletors win out in the cascade depends on:

+ Specificity
+ Importance
+ Source Order

    ```css
    -moz-     /* Firefox and other browsers using Mozilla's browser engine */
    -webkit-  /* Safari, Chrome and browsers using the Webkit engine */
    -o-       /* Opera */
    -ms-      /* Internet Explorer (but not always) */
    ```

### Most commonly used style properties

#### Styling text

+ `font-family: sans-serif;`

    By default the font family of the html elements content is **serif**<br>
    We cannot set font that we have in our computer because that wouldn't then work for all the users that are going to visit our page(unless they also have that font installed on their computer).<br>
    Using `sans-serif` *keyword* here we are not actually specify a real font family but rather "tell" the browser to use any font family that is a "sans serif".

+ `font-size: 26px` - changes font size to 26px of the ^^physical screen^^

    By default the font size of the html elements content(or `<li>` elements only ?) is **16px**

+ `font-weight: bold;`

+ `font-style: italic;`

+ `text-transform: uppercase;`

+ `text-align: center;` - puts element content at the center of its parent element

+ `text-decoration: none;` - decorations applied to font used for an element's text, a *shorthand property* for `text-decoration-line`, `text-decoration-style`, `text-decoration-color` and `text-decoration-thickness` properties

+ `line-height: 1.5;` - here the *value* is without the unit and it simply means that the line height will be 1.5 times the `font-size`

+ `color: #1098ad;` - defines the color of the element's content text

+ `background-color: #444;` - set the backgroud color of an element(`#444` is a shorthand of `#444444`)

!!! note "Defining colors in CSS"

    + RGB/RGBA Notation

        `rgb(0, 255, 255)` - regular RGB model<br>
        `rgb(0, 255, 255, 0.3)` - RGB with **trasparency(alpha)**

    + Hexademical notation

        Instead of using a scale from 0 to 255, we go from **0 to ff**(255 in hexademical numbers)<br>
        `#00ffff` or `#off` for shorthand(only when al colors are identical pairs)

    > In practice we mostly use **hexademical** colors, and **rgba** when we need transparency

    **Shades of grey:**

    When colors in all 3 channels(RGB) are the same, we get a **grey color**. There are 256 pure grays to choose from. There are some that worse to remember:<br>
    `rgb(0, 0, 0)` / `#000` - black<br>
    `rgb(69, 69, 69)` / `#444` - good for test color<br>
    `rgb(183, 183, 183)` / `#b7b7b7`<br>
    `rgb(247, 247, 247)` / `#f7f7f7`<br>
    `rgb(255, 255, 255)` / `#fff` - white

+ `list-style: none;` - removes the bullet point from the list elements(`<ul>` or `<ol>`)

#### Shorthand properties

Use one property for defining several different properties.

+ `border: 5px solid #1098ad;` - defines `border-width`, `border-style` and `border-color` properties
+ `border-top/rifht/bottom/left: 5px solid #1098ad;` - same as above, but defines border in specific direction

## Useful staff

### CSS Tricks

+ [Using @font-face](https://css-tricks.com/snippets/css/using-font-face/)

### Code snippets

+ [Converting Color Spaces in JavaScript](https://css-tricks.com/converting-color-spaces-in-javascript/)
+ [Stackoverflow: Javascript function to convert color names to hex codes](https://stackoverflow.com/questions/1573053/javascript-function-to-convert-color-names-to-hex-codes)

### Fonts

+ [CUFON Fonts](https://www.cufonfonts.com/)

## SCSS

[What is SCSS?](https://stackoverflow.com/questions/46400443/what-is-the-difference-between-css-and-scss)
