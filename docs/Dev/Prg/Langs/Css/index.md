# CSS

!!! info ""

    + [CSS Tricks](https://css-tricks.com/almanac/)
    + [Learn CSS](https://web.dev/learn/css/)
    + [Шпаргалка по CSS](https://www.exlab.net/tools/sheets/css.html)

    ![css(rus)](css(rus).png){: .zoom}

## CSS Fundamentals

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

    [CSS selectors full list (W3S)](https://www.w3schools.com/cssref/css_selectors.asp)

#### Element selectors

+ `element` - *element selector*, selects the element by its name

+ `element, element` - combining selectors into one list, so the *selector* here is now a *list selector*

+ `element1 element2` - *descendant(= the very next) selector*, selects ^^all^^ the `element2` elements **inside** the `element1` elements

+ `element > element`

+ `element1 + element2` - *adjacent sibling selector*, selects the ^^first^^ `element2` element that is placed immediately **after** `element1` elements

!!! tip "*Encoding the HTML structure* problem"

    Usnig the selectors above encodes the HTML structure into our CSS selector. That is if in a certain point of time the HTML structure changes then our selector is no more applied as was intended.<br>
    Therefore the good practice is to use *element naming selcetors* from the next paragraph below.

+ `*` - *universal selector*, selects every single element on the page

    !!! note "Inheritance and the Universal Selector"

        *Inheritance* - is a mechanism by which some style properties gets their values inherited from parent elements to child elements.

        Not all properties get inherited. It’s mostly ones related to **text**:<br>
        `font-family`<br>
        `font-size`<br>
        `font-weight`<br>
        `font-style`<br>
        `color`<br>
        `line-height`<br>
        `letter-spacing`<br>
        `text-align`<br>
        `text-transform`<br>
        `text-shadow`<br>
        `list-style`<br>
        etc.

        If we actually want a certain style property, ^^which does not get inherited^^, applied to all elements we use the *universal selector*.

#### Element naming selectors

+ `.class` - selects the element by its `class` attribute value

+ `#id` - selects the element by its `id` attribute value

!!! note "`class` and `id` HTML attributes naming convention"

    If we have a Class or an ID name with multiple words, we separate these words by Dashes like this:<br>
    `#!html <p class="related-author">By Jim Dillon</p>`

!!! tip "Prefer Class over ID"

    In contrast to HTML `class` attribute the `id` attribute has to have unique value. Therefore having ID selector can be inconvenient when in a certain point of time we will want to add same as `id` attribute naming to another element.

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

!!! tip "Anchors styling best practice"

    Always style the different anchor states specifying ^^all^^ the four states in **LHVA**(`:link` &rarr; `:visited` &rarr; `:hover` &rarr; `:active`) order!

#### Pseudo-elements

Elements that don't exist in the HTML, but that we can still select and style in CSS.

+ `::first-letter`
+ `::first-line`
+ `::after` - creates a pseudo element, that will automatically be the very ^^last^^ child of the selected element
+ `::before` - creates a pseudo element, that will automatically be the very ^^first^^ child of the selected element

!!! tip "`::after` and `::before` usage

    Can be very useful for some small cosmetic style for which we don't want to necessarily add a new element to the HTML"

    ```css
    h1::after {
        content: "TOP"; /* this property is mandatory, can be an empty string */
        background-color: #ffe70e;
        font-size: 16px;
        font-weight: bold;
        display: inline-block; /* because by default it is inline element */
        padding: 5px 10px;
        position: absolute;
        top: -10px;
        right: -25px;
    }
    ```

### Conflicts between selectors

What seletors win out in the cascade depends on:

1. Resolving conflicting declarations(styles) steps ordered by priority from **5-highest** to **0-lowest**:

    **5** - Importance (styles marked with `#!css !important`)<br>
    a `!` delimiter followed by the `important` *keyword* marks the style more important than ^^all^^ the other ones, e.g. `#!css p { color: green !important; }`

    &darr;

    **4** - Inline style(`style` attribute in HTML)<br>
    !!! tip "Steps 5-4 should be used as a last resort only!"

        Use it only in case you really, really cannot figure out what's happening in your code.<br>
        **BUT** even then , instead of using the `important` keyword, write your selectors as simple as possible:<br>
        - do not add too much nesting selectors<br>
        - don't add too many IDs and Classes all in the same selector

    &darr;

    **3** - ID (`#`) selector

    &darr;

    **2** - Class (`.`) or pseudo-class (`:`) selector

    &darr;

    **1** - Element Selector (`p` , `div`, `li`, etc.)<br>
    !!! note "Selectors Specificity (steps 3-1)"

        Official Docs: [CSS specificity](https://www.w3.org/TR/selectors-3/#specificity)<br>
        Specificity Calculator: [https://specificity.keegan.st/](https://specificity.keegan.st)<br>
        When there are multiple **different** selectors ^^selecting the same element^^ that have ^^confilicting styles^^ then ^^all of them^^(all rules and properties) are applied! **BUT** only one wins out, i.e. gets active depending on its *specificity* value.
    &darr;

    **0** - Universal Selector (`*`)

2. Source order

    + When there are multiple **same** selectors ^^selecting the same element^^ that have ^^confilicting styles^^ then ^^the last of them^^ gets applied!

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

+ `text-decoration: none;` - decorations applied to font used for an element's text; a *shorthand* for:<br>
     `text-decoration-line`<br>
     `text-decoration-style`<br>
     `text-decoration-color`<br>
     `text-decoration-thickness`

+ `line-height: 1.5;` - here the *value* is without the unit and it simply means that the line height will be 1.5 times the `font-size`

+ `letter-spacing`

#### CSS Box Model styles

!!! note "The CSS Box Model"

    + **Content:** Element's content: text, images, etc. Has **content width** and **content height**
    + **Padding:** Invisible space around the *Content*, **inside** of the element
    + **Fill width = Content + Padding:** height that gets filled with `background-color` or `background-image`
    + **Final element width** = left border + left padding + content width + right padding + right border
    + **Final element height** = top border + top padding + content height + bottom padding + bottom border
    + **Border:** A line around the element, still **inside** of the element
    + **Margin:** Space **outside** of the element, between elements

!!! note "Type of Boxes"

    Elements are formatted visually as **boxes**. Thera are 3 boxes(= elements) types:

    1. Block-Level Boxes

        + Elements are formatted visually as **blocks**.
        + Elements occupy **100% of parent element’s width**, no matter the content.
        + Elements are **stacked vertically** by default, one after another.
        + The box-model **applies as showed** earlier in previous note.
        + **Default elements:** `body`, `main`, `header`, `footer`, `section`, `nav`, `aside`, `div`, `h1-h6`, `p`, `ul`, `ol`, `li`, etc.
        + CSS style to change from inline boxes to block-level boxes: `#!css display: block;`

    2. Inline Boxes

        + Occupies only the space **necessary for its content**.
        + Causes **no line-breaks** after or before the element.
        + Box model applies in a different way: **heights and widths do not apply**.
        + **Paddings and margins** are applied **only horizontally** (left and right).<br>
        That is the padding will be added to all sides expanding the *fill area* **BUT VISUALLY** the *content area* will move right/left only and stay on its place vertically(^^no new space^^ actually gets created on the page) unlike when we set padding on *block-level* boxes where the *content area* moves right/left and up/down also, affecting the content verticall alignment by actually creating a ^^new space^^ on the page.
        + **Default elements:** `::any-pseudo-elements`, `a`, `strong`, `em`, etc.
        + CSS style to change from block-level boxes to inline boxes: `#!css display: inline;`

    3. Inline-Block Boxes

        + Looks like *inline* from the **outside**, behaves like *block-level* on the **inside**.
        + Occupies only the space **necessary for its content**.
        + Causes **no line-breaks** after or before the element.
        + The box-model **applies as showed** earlier in previous note.
        + **Default elements:** `img`, `button`, etc.
        + CSS style to change from block-level/inline boxes to inline-block boxes: `#!css display: inline-block;`

        !!! tip "Good ^^old^^ technic to arrange links in navigation bar"

            ```css
            nav a:link {
                margin-right: 30px;
                margin-top: 10px;
                display: inline-block;
            }

            nav a:link:last-child {
                margin-right: 0;
            }
            ```

            Nowadays there is more modern tools achieving this like *Flexbox* and *CSS Grid*.

+ height + bottom padding + bottom border

+ `padding` - a *shorthand* for:<br>
    `padding-top`<br>
    `padding-right`<br>
    `padding-bottom`<br>
    `padding-left`

    ```css
    padding: 5%;                /* All sides: 5% padding */

    padding: 10px;              /* All sides: 10px padding */

    padding: 10px 20px;         /* top and bottom: 10px padding */
                                /* left and right: 20px padding */

    padding: 10px 3% 20px;      /* top:            10px padding */
                                /* left and right: 3% padding   */
                                /* bottom:         20px padding */

    padding: 1em 3px 30px 5px;  /* top:    1em padding  */
                                /* right:  3px padding  */
                                /* bottom: 30px padding */
                                /* left:   5px padding  */
    ```

    !!! tip "Usage"

        When we need some space **inside** of an element, mostly for applying a ^^background coloror^^ a ^^border^^ on the element.

+ `margin` - a *shorthand* for:<br>
    `margin-top`<br>
    `margin-right`<br>
    `margin-bottom`<br>
    `margin-left`

    !!! warning "Collapsing Margins of Block-Level elements"

        **For Block-Level boxes only:** When we have two margins that occupied the same space, ^^the larger one^^ of them is actually visible on the page.<br>
        Margins **aren't** collapsed in *Inline* and *Inline-Block* boxes.

    !!! tip "Usage"

        When we need some space **outside** of an element, or also to create **space between** multiple elements.

        In case of adding vertical space, ^^most of the time^^ stick to `margin-bottom`.

!!! tip "Global Reset"

    Before adding `marging`s and `padding`s to elements on the page we should remove all default instaces of these properties' values as follows:

    ```css
    * {
        /* whenever we use zero, we do not specify any unit after it */
        margin: 0;
        padding: 0;
    }
    ```

    Without doing this it is quite hard to style the page.

    !!! note "Global Reset hides numbers and bullet poits of `<ol>`, `<ul>` lists"

        In order to reveal them back we should set `margin-left` for them, e.g. `#!css ul, ol { margin-left: 50px; }`

+ `width: 100%;` - sets the width of the content width, padding width or border width (depending on `box-sizing`) of certain boxes

    !!! note "Width measurement using the percentage unit = usually the percentage of the width of the parent container."

+ `height: 20px;` - sets the height of the content height, padding height or border height (depending on `box-sizing`) of certain boxes

!!! note "Keeping aspect ratio of images"

    If we **don't** specified `width` / `height` HTML attributes for the `#!html <img />` element then setting just one of the `width` or `height` CSS property will keep the aspect ratio. **BUT** if we **do** specified all or one of these HTML attributes then to keep aspect ratio while setting up just one of the `width` or `height` CSS property we will need to specify the remaining property to the value of `auto`, e.g.:

    ```css
    .post-img {
        width: 800px;
        height: auto;
    }
    ```

!!! tip "Centering a page inside of the browser."

    ```html title="index.htnl"
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <link href="style.css" rel="stylesheet" />
    </head>
      <body>
        <div class="container">
            .
            .
            .
        </div>
      </body>
    </html>
    ```

    ```css title="style.css"
    .container {
        /* we actually need to give this container a width because otherwise
        there is not really anything to center, and so all the element inside
        this container will able to have maximum this widh. And this is not
        "inheritance" but a simple logic that the child element can never be wider than the parent element.*/
        width: 800px;
        /* centering container inside of the <body> element */
        margin: 0 auto;
    }
    ```

+ `border: 5px solid #1098ad;` - a *shorthand* for:<br>
    `border-width`<br>
    `border-style`<br>
    `border-color`

+ `border-top/right/bottom/left: 5px solid #1098ad;` - same as above, but sets border in specific direction; a *shorthand* for:<br>
  `border-top/rifht/bottom/left-width`<br>
  `border-top/rifht/bottom/left-style`<br>
  `border-top/rifht/bottom/left-color`

#### CSS positioning modes

+ `position: relative;` - default positioning
+ `position: absolute;` - absolute positioning

!!! note "Normal Flow Vs. Absolute Positioning"

    1. Normal Flow

        + Default positioning of element on the page.
        + Element is “**in** flow”
        + Elements are simply laid out according to their HTML code.

    2. Absolute Positioning

        + Element is removed from the normal flow: “**out of** flow”.
        + No impact on surrounding elements, might overlap them.
        + Use `top`, `bottom`, `left`, or `right` properties(can have negative values) to offset the element from its **relatively positioned container**.<br>
        The ^^default^^ relatively positioned container is the **viewport(= visible part of the page after reloading)**.<br>
        To position the *absolute displayed element*(that is set by `position: absolute;` style) in relation to specific element we need to style that element with `position: absolute;`.

#### Working with colors

+ `color: #1098ad;` - defines the color of the element's content text

+ `background-color: #444;` - set the backgroud color of an element(`#444` is a shorthand of `#444444`)

!!! note "Defining colors in CSS"

    + RGB/RGBA Notation

        `rgb(0, 255, 255)` - regular RGB model<br>
        `rgb(0, 255, 255, 0.3)` - RGB with **trasparency(alpha)**

    + Hexademical notation

        Instead of using a scale from 0 to 255, we go from **0 to ff**(255 in hexademical numbers)<br>
        `#00ffff` or `#off` for shorthand(only when al colors are identical pairs)

    !!! tip "In practice we mostly use *hexademical* colors, and *rgba* when we need transparency"

    **Shades of grey:**

    When colors in all 3 channels(RGB) are the same, we get a **grey color**. There are 256 pure grays to choose from. There are some that worse to remember:<br>
    `rgb(0, 0, 0)` / `#000` - black<br>
    `rgb(69, 69, 69)` / `#444` - good for test color<br>
    `rgb(183, 183, 183)` / `#b7b7b7`<br>
    `rgb(119, 119, 119)` / `#777`<br>
    `rgb(247, 247, 247)` / `#f7f7f7`<br>
    `rgb(255, 255, 255)` / `#fff` - white

#### Element specific styles

+ `list-style: none;` - sets the bullet point for the list elements(`<li>`s inside the `<ul>` or `<ol>`)

#### Other styles

+ `cursor: pointer;` - sets the cursor shape

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
