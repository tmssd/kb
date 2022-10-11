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

+ `.class1.class2` - *`and` selector* - selects all elements with both ^^class1^^ and ^^class2^^ set within its `class` attribute

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

!!! tip "`::after` and `::before` usage"

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
    + **Fill area = Content + Padding:** area that gets filled with `background-color` or `background-image`
    + **Border:** A line around the element, still **inside** of the element
    + **Margin:** Space **outside** of the element, between elements

    **`width` / `height` properties behaviour** depends on `box-sizing` property value:

    + `box-sizing: content-box;` - sets the ^^default^^ behaviour: the specified `width` and `height` (and respective `min` / `max` properties) apply to the width and height respectively of the *content box* of the element, and therefore:<br>
    **final element width** = left border + left padding + content width(defined by `width`) + right padding + right border<br>
    **final element height** = top border + top padding + content height(defined by `height`) + bottom padding + bottom border

    + `box-sizing: border-box;` - sets the ^^alternative^^ behaviour: the specified `width` and `height` (and respective `min` / `max` properties) on the element determine the *border box* of the element, and therefore:<br>
    **final element width** = defined by `width`<br>
    **final element height** = defined by `height`

        Padding and borders that we do specify will now reduce the inner width of the content area, but that's usually not a problem.

!!! note "Type of Boxes"

    Elements are formatted visually as **boxes**. Thera are 3 boxes(= elements) types:

    1. Block-Level Boxes

        + Elements are formatted visually as **blocks**.
        + Elements are always start on a new line and occupy **100% of parent element’s width**, no matter the content.

            !!! note "Browsers typically display the block-level element with a newline both ^^before^^ and ^^after^^ the element. "

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
    /* OPTION 1 */
    .container {
        /* we actually need to give this container a width because otherwise
        there is not really anything to center, and so all the element inside
        this container will able to have maximum this widh. And this is not
        "inheritance" but a simple logic that the child element can never be wider than the parent element.*/
        width: 800px;
        /* centering container inside of the <body> element */
        margin: 0 auto;

        /* OPTION 2 */
        /* Here we don't need to define width for the container.
        The flexbox container width is defined by all the flex items' widths added together! */
        .body {
            display: flex;
            justify-content: center;
        }
    }
    ```

!!! tip "Global Reset"

    Before adding `marging`s,`padding`s and other properties to elements on the page we should remove all default instaces of these properties' values as follows:

    ```css
    * {
        /* whenever we use zero, we do not specify any unit after it */
        margin: 0;
        padding: 0;
        /* setting up an alternative box-model where `width` and `height`
        (and respective `min` / `max` properties) on the element
        determine the border box of the element */
        box-sizing: border-box;

    body {
        /* setting font-family for our design(with fallback 'sans-serif'),
        its color to be non-completely black
        and reseting its predefined line-height to 1 */
        font-family: "Inter", sans-serif;
        color: #343a40;
        line-height: 1;
    }
    }
    ```

    Without doing this it is quite hard to style the page.

    !!! note "Global Reset hides numbers and bullet poits of `<ol>`, `<ul>` lists"

        In order to reveal them back we should set `margin-left` for them, e.g. `#!css ul, ol { margin-left: 50px; }`

+ `border: 5px solid #1098ad;` - a *shorthand* for:<br>
    `border-width`<br>
    `border-style`<br>
    `border-color`

+ `border-top/right/bottom/left: 5px solid #1098ad;` - same as above, but sets border in specific direction; a *shorthand* for:<br>
  `border-top/rifht/bottom/left-width`<br>
  `border-top/rifht/bottom/left-style`<br>
  `border-top/rifht/bottom/left-color`

+ `border-collapse: collapse` - being set on the parent element transforms neighboring borders of the child elements into **one** border, e.g.:

    ```css
    table {
      border-collapse: collapse;
    }

    th,
    td {
      border: 1px solid #343a40;
    }
    ```

#### CSS positioning modes

+ `position: relative;` - default positioning
+ `position: absolute;` - absolute positioning

!!! note "Normal Flow vs. Absolute Positioning"

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

+ `stroke: #087f5b;` - paints along(рисует по контурту) the outline of the given graphical element: used to set color for **outline icons**

+ `fill: #087f5b;` - paints the interior(рисует внутреннюю часть) of the given graphical element: used to set color for **fill icons**

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

### Layouts

Layout:

+ Layout is the way text, images and other content is placed and arranged on a webpage.
+ Layout gives the page a visual structure, into which we place our content.
+ **Building a layout(верстка):** arranging page elements into a visual structure, instead of simply having them placed one after another (normal flow).
+ There are 2 types of layouts: **page layout** and **component layout**.
+ There are 3 ways of building layouts with css: **Float Layouts**, **Flexbox** and **CSS Grid**.

#### Float Layouts

The **old way of building layouts** of all sizes, using the `float` CSS property. Still used, but getting outdated fast.

Float properties:

`float: left;`, `float: right;`

+ Element is removed from the normal flow: “**out of** flow“(like *absolute positioning*).

+ Element's content ^^text^^ only (**not including** element's contetnt area, paddings or margins) and ^^inline elements^^ will **wrap around(float around)** the floated element.

    !!! tip "Locating *wraped around* element right after the *floated element*"

        If we want the whole *wraped around* element to start being located ^^right after^^(on the right/left) of the *floated element* we should also add `float` porperty to that *wraped around* element with the:<br>
        - same direction value, if we want elements to be "sticked" to each other<br>
        - oppozite direction value, if we want elements to be "devided"

+ The container element of the *floated element* will **not** adjust its height to that *floated element*. This phenomena when the container element's height has collapsed is called "collapsing elements".

    !!! tip "Clearing Floats: Solving the "collapsing elements" issue."

        Clearing Floats means ridding off the wrapping around the *floating element* by its first adjacent element(**= clearing the float** of that ajacent element). There are two technics to achieve this:

        1. Adding an empty last child element with e.g. `clear` class to the container element and then style it with the `clear` property.

            ```html title="index.html"
            <header>  <!-- this is a container element -->
                .  <!-- elements here are floating elements -->
                .
                .

                <div class="clear"></div> <!-- last child empty element of the container -->
            </header>
            ```

            ```css title="style.css"
            .clear {
                clear: both; /* other values are: left - for left float and right - for right float */
            }
            ```

            This method is a bad practice because we could have many "collapsing element"(e.g. when we have a row container element with many columns elements in it) on the page and for each of them we would to add an emtpy container's last child element thereby cluttering our index.html file. Therefore the best practice is to use the second technic below.

        2. The Clearfix Hack

            ```html title="index.html"
            <header class="clearfix">  <!-- this is a container element -->
                .  <!-- elements here are floating elements -->
                .
                .
            </header>
            ```

            ```css title="style.css"
            .clearfix::after {  /* last child empty element of the container */
                content: "";
                display: block;
                clear: both; /* other values are: left - for left float and right - for right float */
            }
            ```

#### Flexbox

Modern way of laying out elements in a 1-dimensional row without using floats. Perfect for *component layouts*.

+ Flexbox is a set of related **CSS properties** for **building 1-dimensional layouts**.
+ The main idea behind flexbox is that empty space inside a container element can be **automatically divided** by its child elements.
+ Flexbox makes it easy to automatically **align items to one another** inside a parent container, both horizontally and vertically.
+ Flexbox solves common problems such as **vertical centering** and creating **equal-height columns**.
+ Flexbox is perfect for **replacing floats**, allowing us to write fewer and cleaner HTML and CSS code.

##### Flexbox Properties

![flexbox-cheatsheet](flexbox-cheatsheet.png){: .zoom}

`align-items` - pay attention that the ^^margins^^ of the flex itmes also taken in account when using this property!

`flex-grow` - determines whether the element are allowed to grow as large as it can(to fill up the remaining **width** of the flex container) or not(in this the element would simply occupy the width that it need to fit its *content area*).<br>
If `flex-grow: [amy number greater than 1];` set for ^^all flex items^^, then the remaining width of the flex container ^^devided evenly^^ between them, so this makes them to have the same witdh.<br>
BUT if, for instance, when all flex items set to `flex-grow: 1;` exept one item that set to `flex-grow: 2;`, then it means that this item will have ^^double^^ of the devided remaining **width** of the flex container ^^comparing to^^ the devided remaining **width** of all other items.<br>
Ussually we set `flex-grow: 1;` to all of the flex items to basically having all the elements expanding in order to fill the container's empty space.

`flex-shrink` - determines whether flexbox is allowed to shrink element(in orfer to fit to the **width** of the flex container) if necessary or not. Ussually we don't need to change the default `1` value.

`flex` - as a best practice we should ^^always^^ use this property instead of `flex-grow`, `flex-shrink` and `flex-basis`.

#### CSS Grid

For laying out element in a fully-fledged(полноценный) **2-dimensional grid**. Perfect for *page layouts and complex components*.

+ CSS Grid is a set of **CSS properties** for building **2-dimensional layouts**.
+ The main idea behind CSS Grid is that we **divide a container element into rows and columns** that can be filled with its child elements.
+ In two-dimensional contexts, CSS Grid allows us to write **less nested HTML** and **easier-to-read CSS**.
+ CSS Grid is **not meant to replace flexbox!** Instead, they work perfectly together. Need a **1D** layout? Use flexbox. Need a **2D** layout? Use CSS Grid.

##### CSS Grid Properties

![flexbox-cheatsheet](grid-cheatsheet.png){: .zoom}

`display: grid;` - defines a grid container. By default CSS grid places its grid items into rows(one after another).

`grid-template-rows/columns: <track-size>*;`

+ If one(or more) of the grid items has its own defined width/height and these dimension are higher then of the grid tracks' ones(`<track-size>`s), then the grid tracks' sizes will be defined by that grid items dimensions(or by highest dimensions among these items), otherwise they are defined wether by `<track-size>`s or by highest grid items' *content area* dimensions(when `<track-size>` < *content area* dimensions).

+ `fr` unit - stands for **fractional** or just **fraction**. When set the grid item width can be maximally shrinked to its *content area* width.

    If, for instace, we set `grid-template-rows: 2fr 100px 100px 1fr;` then the first track width(`2fr`) will take ^^double^^ of the grid container's remaining width comaring to the last track width(`1fr`).

    !!! tip "Usually the `fr` unit is actually more helpful on columns."

        So in fact, in many situations, it's actually enough to only define columns and let the rows be filled automatically by whatever content they contain.

+ `auto` unit - set the track size to always fit the grid item's *conten area* size.

+ `repeat(<number of tracks>, <trakc size>);` - a shorhand to define similar sized tracks, e.g.:<br>
  `grid-template-columns: repeat(4, 1fr);`

`grid-column/row: <start line> / <end line> | span <number>;`

+ `<start line> / <end line>` - if `<end line>` > `<start line>` then we can ommit it, e.g.:<br>
  `grid-column: 2 / 3;` &rarr; `grid-column: 2;`

+ Spanning item across multiple grid cells: when `<end line>` > `<start line>` more than by 1, then the grid item will span across `<end line> - <start line>` number of cells(the *span number*).

    Instead of specifying the `<end line>` we can use a shorthand for this, e.g.:<br>
    `grid-column: 1 / 4;` &rarr; `grid-column: 1 / span 3;` (`span 3` means *span across three cells*).

    !!! tip "Spannig one elemnt all the way to the end."

        In some situations, we might not even know how many columns there are in a grid, or we might simply not want to think about how many cells we need to span.<br>
        For this we can use following trick: `grid-column: 1 / -1;`

`justify-items` and `align-items`: aligning items inside cells - is all about moving items around inside cells.

`justify-content` and `align-content`: aligning tracks inside of the grid container - is all about distributing containers' empty space.

## Web Design

### Rule #1: Typography

!!! info ""

    **Free fonts:**

    + [Google Fonts](https://fonts.google.com/)

    **Typeface frameworks:**

    +

Embedding free font:

```html title="index.html"
<head>
    .
    .
    .
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet">
    .
    .
    .
</head>
```

```css title="style.css"
body {
  font-family: 'Inter', sans-serif; /* setting 'sans-serif' here as a backup font in case of issues with loading of 'Inter' font */
}
```

Typeface framework for font size (best to be placed at the top of the CSS file for reference):

```css title="style.css"
/*
SPACING SYSTEM (px)
2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128

FONT SIZE SYSTEM (px)
10 / 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 44 / 52 / 62 / 74 / 86 / 98
*/
```

### Rule #2: Colors

!!! info ""

    **Color Schemes:**

    + [Open-color](https://yeun.github.io/open-color)
    + [Coolors](https://coolors.co/)

    **Contrast checkers:**

    + [Coolors](https://coolors.co/contrast-checker/112a46-acc8e5)

Color system may be placed at the top of the CSS file for reference, e.g.:

```css title="style.css"
/*
MAIN COLOR: #087f5b
GREY COLOR: #343a40
*/
```

### Rule #3: Images

### Rule #4: Icons

!!! info ""

    **Icon Packs:**

    + [Heroicons](https://heroicons.com/)

### Rule #5: Shadows

Following properties used for setting shadows:

+ `#!css box-shadow: 0 20px 30px 0 rgba(0, 0, 0, 0.07);` - used to set *box* shadow

    More than one ^^comma separated^^ shadows can be created using this 5 values(from left to right):

    + `0` - horizontal offset between the box and the shadow
    + `20px` - vertical offset between the box and the shadow
    + `30px` - blur of the shadow(larger value &rarr; more blur)
    + `0` - scales the shadow up(optional)
    + `rgba(0, 0, 0, 0.07)` - color of the shadow

+ `#!css text-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);` - used to set *text* shadow

    More than one ^^comma separated^^ shadows can be created using this 4 values(from left to right):

    + `0` - horizontal offset between the box and the shadow
    + `5px` - vertical offset between the box and the shadow
    + `5px` - blur of the shadow(larger value &rarr; more blur)
    + `rgba(0, 0, 0, 0.2)` - color of the shadow

    !!! tip "Usage: As ^^yet another technique^^ of handling texts on top of images."

### Rule #6: Border-radius

Following properties used for setting border-radius:

+ `#!css border-raius: 12px;` - a *shorthand* for:<br>
   `border-bottom-left-radius`
   `border-top-left-radius`
   `border-bottom-right-radius`
   `border-top-right-radius`

    !!! tip "Setting completely rounded border-radius"

        If an element is a **square:** `#!css border-raius: 50%;`

        If an element is a **rectangle:** `#!css border-raius: 100px;` - the rule here is too use big enough value, so it is **bigger** than the `height` length of the element.

### Rule #7: Whitespace

Spacing framework for whitespace handling (best to be placed at the top of the CSS file for reference):

```css title="style.css"
/*
SPACING SYSTEM (px)
2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128
*/
```

### Rule #8: Visual Hierarchy

### Rule #9: User Experience (UX)

### Rule #10: Components and Layouts

#### Elements and Componenets

??? Example "Accordion component"

    ```html
    <!DOCTYPE html>
    <html lang="en">

    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">

      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet">

      <title>Accordion Component</title>

      <style>

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', sans-serif;
          color: #343a40;
          line-height: 1;
        }

        .accordion {
          width: 700px;
          margin: 100px auto;

          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .item {
          box-shadow: 0 0 32px rgba(0, 0, 0, 0.1);
          padding: 24px;

          display: grid;
          grid-template-columns: auto 1fr auto;
          column-gap: 24px;
          row-gap: 32px;
          align-items: center;
        }

        .number,
        .text {
          font-size: 24px;
          font-weight: 500;
          /* color: #087f5b; */
        }

        .number {
          color: #ced4da;
        }

        .icon {
          width: 24px;
          height: 24px;
          stroke: #087f5b;
        }

        .hidden-box {
          grid-column: 2;
          display: none;
        }

        .hidden-box p {
          line-height: 1.6;
          margin-bottom: 24px;
        }

        .hidden-box ul {
          color: #868e96;
          margin-left: 20px;

          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        /* OPEN STATE */
        .open {
          border-top: 4px solid #087f5b;
        }

        .open .hidden-box {
          display: block;
        }

        .open .number,
        .open .text {
          color: #087f5b;
        }

      </style>
    </head>

    <body>
    <div class="accordion">
        <div class="item">
        <p class="number">01</p>
        <p class="text">Where are these chairs assembled?</p>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="icon">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
        <div class="hidden-box">
            <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure blanditiis velit iste exercitationem accusantium
            tenetur quidem odit aspernatur! Enim est quibusdam illo unde repudiandae, at tempore exercitationem sapiente
            velit necessitatibus.
            </p>
            <ul>
            <li>Lorem ipsum dolor, sit amet consectetur adipisicing elit. </li>
            <li>Laudantium commodi nulla porro quasi error.</li>
            <li>Harum veniam laborum sed dolorem nulla temporibus.</li>
            <li>Praesentium dicta, reprehenderit nisi in quam eum.
            </li>
            </ul>
        </div>
        </div>
        <div class="item open">
        <p class="number">02</p>
        <p class="text">How long do I have to return my chair?</p>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="icon">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
        <div class="hidden-box">
            <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure blanditiis velit iste exercitationem accusantium
            tenetur quidem odit aspernatur! Enim est quibusdam illo unde repudiandae, at tempore exercitationem sapiente
            velit necessitatibus.
            </p>
            <ul>
            <li>Lorem ipsum dolor, sit amet consectetur adipisicing elit. </li>
            <li>Laudantium commodi nulla porro quasi error.</li>
            <li>Harum veniam laborum sed dolorem nulla temporibus.</li>
            <li>Praesentium dicta, reprehenderit nisi in quam eum.
            </li>
            </ul>
        </div>
        </div>
        <div class="item">
        <p class="number">03</p>
        <p class="text">Do you ship to countries outside the EU?</p>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="icon">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
        <div class="hidden-box">
            <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure blanditiis velit iste exercitationem accusantium
            tenetur quidem odit aspernatur! Enim est quibusdam illo unde repudiandae, at tempore exercitationem sapiente
            velit necessitatibus.
            </p>
            <ul>
            <li>Lorem ipsum dolor, sit amet consectetur adipisicing elit. </li>
            <li>Laudantium commodi nulla porro quasi error.</li>
            <li>Harum veniam laborum sed dolorem nulla temporibus.</li>
            <li>Praesentium dicta, reprehenderit nisi in quam eum.
            </li>
            </ul>
        </div>
        </div>
    </div>

    </body>

    </html>
    ```

??? Example "Carousel(=Slider) component"

    ```html
    <!DOCTYPE html>
    <html lang="en">

    <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet">

    <title>Carousel Component</title>

    <style>

        * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        }

        body {
        font-family: 'Inter', sans-serif;
        color: #343a40;
        line-height: 1;
        }

        .carousel {
        width: 800px;
        margin: 100px auto;
        background: #087f5b;
        padding: 32px 48px 32px 86px;
        border-radius: 8px;
        position: relative;

        display: flex;
        align-items: center;
        gap: 86px;
        }

        img {
        height: 200px;
        border-radius: 8px;
        transform: scale(1.5);
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.25);
        }

        .testimonial-text {
        font-size: 18px;
        font-weight: 500;
        line-height: 1.5;
        margin-bottom: 32px;
        color: #e6fcf5;
        }

        .testimonial-author {
        font-size: 14px;
        margin-bottom: 4px;
        color: #e6fcf5;
        }

        .testimonial-job {
        font-size: 12px;
        color: #e6fcf5;
        }

        /*CONTROLS*/
        .btn {
        background: #fff;
        border: none;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        position: absolute;
        cursor: pointer;

        display: flex;
        align-items: center;
        justify-content: center;
        }

        .btn--left {
        /*In relation to PARENT ELEMENT*/
        left: 0;
        top: 50%;

        /*In relation to ELEMENT ITSELF*/
        transform: translate(-50%, -50%);
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
        }

        .btn--right {
        right: 0;
        top: 50%;
        transform: translate(50%, -50%);
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
        }

        .btn-icon {
        height: 24px;
        width: 24px;
        stroke: #087f5b;
        }

        .dots {
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translate(-50%, 32px);

        display: flex;
        gap: 12px;
        }

        .dot {
        height: 12px;
        width: 12px;
        background-color: #fff;
        border: 2px solid #087f5b;
        border-radius: 50%;
        cursor: pointer;
        }

        .dot--fill {
        background-color: #087f5b;
        }

    </style>
    </head>

    <body>
    <div class="carousel">
        <img src="maria.jpg" alt="Maria de Almeida">
        <blockquote class="testimonial">
        <p class="testimonial-text">"Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam eligendi, quas a ab
            fuga deleniti, cumque, illo reprehenderit numquam obcaecati corrupti et quibusdam".</p>
        <p class="testimonial-author">Maria de Almeida</p>
        <p class="testimonial-job">Senior Product Mananger ar EDP Comercial</p>
        </blockquote>
        <button class="btn btn--left">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="btn-icon">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        </button>
        <button class="btn btn--right">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="btn-icon">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
        </button>
        <div class="dots">
        <button class="dot dot--fill">&nbsp;</button>
        <button class="dot">&nbsp;</button>
        <button class="dot">&nbsp;</button>
        <button class="dot">&nbsp;</button>
        </div>
    </div>
    </body>

    </html>
    ```

??? Example "Table component"

    ```html
    <!DOCTYPE html>
    <html lang="en">

    <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet">

    <title> Component</title>

    <style>

        * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        }

        body {
        font-family: 'Inter', sans-serif;
        color: #343a40;
        line-height: 1;
        display: flex;
        justify-content: center;
        }

        table {
        width: 800px;
        margin-top: 100px;
        font-size: 18px;
        /*border: 1px solid #343a40;*/

        /*
        WE ALWAYS NEED TO SET THIS EVEN IF th, td BORDERS ARE NOT SET,
        OTHERWISE THERE WILL BE VISIBLE GAPS BETWEEN CELLS!
        */
        border-collapse: collapse;
        }

        th,
        td {
        /*border: 1px solid #343a40;*/
        padding: 16px 24px;
        text-align: left;
        }

        /*TO STYLE ALL THE CELLS INDIVIDUALLY WE NEVER STYLE thead, tbody, tr BUT CELLS(th, td) ONLY!*/
        thead th {
        background-color: #087f5b;
        color: #fff;
        /*
        TO SET ALL COLUMNS' WIDTH EQUAL WE SET THE CELLS' WIDTH
        OF THE FIRST ROW TO BE EQUAL USIN THI FORMULA: (100% / NUM OF CELLS(=COLUMNS))%.
        THEN THE ENTIRE TABLE WILL ADJUST ITSELF TO THESE DIMENSIONS.
        */
        width: 25%;
        }

        tbody tr:nth-child(odd) {
        background-color: #f8f9fa;
        }

        tbody tr:nth-child(even) {
        background-color: #e9ecef;
        }

    </style>
    </head>

    <body>
    <table>
        <thead>
        <tr>
            <th>Chair</th>
            <th>The Laid Back</th>
            <th>The Worker Bee</th>
            <th>The Chair 4/2</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <th>Width</th>
            <td>80 cm</td>
            <td>60 cm</td>
            <td>22 0cm</td>
        </tr>
        <tr>
            <th>Heght</th>
            <td>100 cm</td>
            <td>110 cm</td>
            <td>90 cm</td>
        </tr>
        <tr>
            <th>Depth</th>
            <td>70 cm</td>
            <td>65 cm</td>
            <td>80 cm</td>
        </tr>
        <tr>
            <th>Weight</th>
            <td>16 kg</td>
            <td>22 kg</td>
            <td>80 kg</td>
        </tr>
        </tbody>
    </table>
    </body>

    </html>
    ```

??? Example "Pagination Component"

    ```html
    <!DOCTYPE html>
    <html lang="en">

    <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet">

    <title> Component</title>

    <style>

        * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        }

        body {
        font-family: 'Inter', sans-serif;
        color: #343a40;
        line-height: 1;
        display: flex;
        justify-content: center;
        }

        .pagination {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-top: 200px;
        }

        .page-link:link,
        .page-link:visited {
        font-size: 18px;
        color: #343a40;
        text-decoration: none;
        /*WE CAN SPECIFY HERE WIDTH FOR ANCHOR ELEMENTS BECAUSE THEY ARE NOW BECAME BLOCK ELEMENTS
    AS EACH OF THEM IS A FLEX ELEMENT NOW AND FLEX ELEMENT IS ALWAYS A BLOCK ELEMENT!*/
        height: 36px;
        width: 36px;
        border-radius: 50%;

        display: flex;
        justify-content: center;
        align-items: center;
        }

        .page-link:hover,
        .page-link:active,
        .page-link.page-link--current {
        color: #fff;
        background-color: #087f5b;
        }

        .btn {
        /*border: none;*/
        border: 1px solid #087f5b;
        height: 48px;
        width: 48px;
        border-radius: 50%;
        background: none;
        cursor: pointer;
        }

        .btn:hover {
        background-color: #087f5b;
        }

        .btn:hover .btn-icon {
        stroke: #fff;
        }

        .btn-icon {
        height: 24px;
        width: 24px;
        stroke: #087f5b;
        }

        .dots {
        color: #868e96;
        }

    </style>
    </head>

    <body>
    <div class="pagination">
        <button class="btn btn--left">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="btn-icon">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        </button>
        <a href="#" class="page-link">1</a>
        <a href="#" class="page-link">2</a>
        <a href="#" class="page-link page-link--current">3</a>
        <a href="#" class="page-link">4</a>
        <a href="#" class="page-link">5</a>
        <a href="#" class="page-link">6</a>
        <span class="dots">...</span>
        <a href="#" class="page-link">23</a>
        <button class="btn btn--right">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="btn-icon">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
        </button>
    </div>
    </body>

    </html>
    ```

#### Layout Patterns

??? Example "Hero Section"

    ```html
    <!DOCTYPE html>
    <html lang="en">

    <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Omnifood Hero Section</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
        * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        }

        html {
        font-family: "Rubik", sans-serif;
        color: #444;
        }

        .container {
        margin: 0 auto;
        width: 1800px;
        }

        header {
        /* background-color: orangered; */
        height: 100vh;
        position: relative;

        background-image: linear-gradient(rgba(34, 34, 34, 0.6), rgba(34, 34, 34, 0.6)), url(hero.jpg);
        background-size: cover;
        color: #fff;
        }

        nav {
        font-size: 20px;
        font-weight: 700;
        display: flex;
        justify-content: space-between;
        padding-top: 32px;
        /* background-color: green; */
        }

        .header-container {
        width: 1800px;
        position: absolute;

        /* In relation to PARENT size */
        left: 50%;
        top: 50%;
        /* In relation to ELEMENT size */
        transform: translate(-50%, -50%);

        /* background-color: violet; */
        }

        .header-container-inner {
        width: 50%;
        }

        h1 {
        font-size: 52px;
        margin-bottom: 32px;
        line-height: 1.05;
        }

        p {
        font-size: 20px;
        line-height: 1.6;
        margin-bottom: 48px;
        }

        .btn:link,
        .btn:visited {
        font-size: 20px;
        font-weight: 600;
        background-color: #e67e22;
        color: #fff;
        text-decoration: none;
        display: inline-block;
        padding: 16px 32px;
        border-radius: 9px;
        }

        h2 {
        font-size: 44px;
        margin-bottom: 48px;
        }

        section {
        padding: 96px 0;
        background-color: #f7f7f7;
        }

    </style>
    </head>

    <body>
    <header>
        <nav class="container">
        <div>LOGO</div>
        <div>NAVIGATION</div>
        </nav>

        <div class="header-container">
        <div class="header-container-inner">
            <h1>A healthy meal delivered to your door, every single day</h1>
            <p>The smart 365-days-per-year food subscription that will make you eat healthy algain. Tailored to your
            personal
            tastes and nutritional needs</p>
            <a href="#" class="btn">Start eating well</a>
        </div>
        </div>
    </header>

    <section>
        <div class="container">
        <h2>Some random heading</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam fuga est necessitatibus! Eius similique
            perspiciatis dignissimos officiis pariatur inventore. Rem quisquam tempora adipisci rerum illum magni excepturi
            molestias nesciunt repellendus, eligendi aspernatur odio labore nisi, quos sunt! Consequatur, quidem, voluptatum
            illo, fuga necessitatibus temporibus neque provident vero minima culpa ratione excepturi non. Deserunt, ex harum
            perspiciatis deleniti ut labore eaque facere aliquid quo aut dolores consectetur molestiae debitis porro rem,
            quia ullam minus magnam nobis! Ex aliquam assumenda ut non ipsa rem distinctio! A nobis earum perferendis culpa
            tempora atque ea nam eos sequi neque, illum, delectus distinctio expedita accusamus.</p>
        </div>
    </section>
    </body>

    </html>
    ```

??? Example "Web App Layout"

    Fake Email Application:

    ```html
    <!DOCTYPE html>
    <html lang="en">

    <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>App Layout</title>

    <style>
        * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        }

        body {
        font-family: sans-serif;
        color: #343a40;
        font-size: 24px;
        height: 100vh;
        text-align: center;
        font-weight: bold;

        display: grid;
        grid-template-columns: 80px 400px 1fr 250px;
        grid-template-rows: 80px 1fr;
        }

        nav,
        section,
        main,
        aside {
        padding-top: 24px;
        }

        nav {
        background-color: #343a40;
        grid-row: 1 / -1;
        color: #fff;
        }

        menu {
        background-color: #7048e8;
        grid-column: 2 / -1;

        display: flex;
        align-items: center;
        gap: 12px;
        padding: 0 40px;
        }

        button {
        display: inline-block;
        font-size: 16px;
        font-weight: bold;
        background-color: #5f3dc4;
        border: none;
        cursor: pointer;
        color: #fff;
        padding: 8px 12px;
        }

        button:last-child {
        background-color: #d6336c;
        margin-left: auto;
        }

        section {
        background-color: #e9ecef;
        padding: 40px;

        /*How elements that don't fit into container appear*/
        overflow-y: scroll;

        display: flex;
        flex-direction: column;
        gap: 40px;
        }

        .email {
        background-color: #adb6bd;
        height: 96px;
        /*Beacuse of flex we need to set this in order to
    'overflow-y' in 'section' selector will take effect*/
        flex-shrink: 0;

        display: flex;
        align-items: center;
        justify-content: center;
        }

        aside {
        background-color: #e9ecef;
        }

    </style>
    </head>

    <body>
    <nav>Nav</nav>
    <menu>
        <button>New</button>
        <button>Reply</button>
        <button>Forward</button>
        <button>Mark unread</button>
        <button>Trash</button>
    </menu>
    <section>
        <div class="email">Email 1</div>
        <div class="email">Email 2</div>
        <div class="email">Email 3</div>
        <div class="email">Email 4</div>
        <div class="email">Email 5</div>
        <div class="email">Email 6</div>
        <div class="email">Email 7</div>
        <div class="email">Email 8</div>
        <div class="email">Email 9</div>
        <div class="email">Email 10</div>
    </section>
    <main>Email view</main>
    <aside>Additional info</aside>
    </body>

    </html>
    ```

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
