---
title: DOM
---

# Document Object Model

## Preface: Browser environment, specs

Read more from [source](https://javascript.info/browser-environment).

The JavaScript language was initially created for web browsers. Since then, it has evolved into a language with many uses and platforms.

A platform may be a browser, or a web-server or another *host*, or even a “smart” coffee machine if it can run JavaScript. Each of these provides platform-specific functionality. The JavaScript specification calls that a *host environment*.

A host environment provides its own objects and functions in addition to the language core. Web browsers give a means to control web pages. Node.js provides server-side features, and so on.

### Browser environment

Here’s a bird’s-eye view of what we have when JavaScript runs in a web browser:

+ **window:**
    1. **DOM:** document, ...
    2. **BOM:** navigator, screen, location, frames, history, XMLHttpRequest
    3. **JavsScript:** Object, Array, Function, ...

There’s a “root” object called *window*. It has two roles:

1. First, it is a global object for JavaScript code.
2. Second, it represents the “browser window” and provides methods to control it.

### Specs

+ [DOM specification](https://dom.spec.whatwg.org) - Describes the document structure, manipulations, and events.
+ [CSSOM specification](https://www.w3.org/TR/cssom-1/) - Describes stylesheets and style rules, manipulations with them, and their binding to documents.</br>
  The CSSOM is used together with the DOM when we modify style rules for the document. In practice though, the CSSOM is rarely required, because we rarely need to modify CSS rules from JavaScript (usually we just add/remove CSS classes, not modify their CSS rules), but that’s also possible.
+ [HTML specification](https://html.spec.whatwg.org) - Describes the HTML language (e.g. tags) and also the BOM (browser object model) – various browser functions: `setTimeout`, `alert`, `location` and so on. It takes the DOM specification and extends it with many additional properties and methods.
+ Additionally, some classes are described separately at [https://spec.whatwg.org/](https://spec.whatwg.org/).

## DOM Essentials

!!! info ""

    + [W3S Course](https://www.w3schools.com/js/js_htmldom.asp){target=_blank}
    + [MDN: DOM Events](https://developer.mozilla.org/en-US/docs/Web/Events){target=_blank}
    + [Document(JAVASCRIPT.INFO)](https://javascript.info/document){target=_blank}
    + [Event Delegation(JAVASCRIPT.INFO)](https://javascript.info/event-delegation#hide-messages-with-delegation){target=_blank}
    + [Javascript Char Codes (Key Codes)](https://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes){target=_blank}

Document Object Model, or DOM for short, represents all ^^page content^^ as objects that can be modified.

!!! note

    **DOM is not only for browsers**</br>
    For instance, server-side scripts that download HTML pages and process them can also use the DOM. They may support only a part of the specification though.

## DOM Tree

There are [12 node types](https://dom.spec.whatwg.org/#node). In practice we usually work with 4 of them:

1. `document` object - the main “entry point” to the page(= into DOM), represents the whole document.
2. *element* nodes – HTML-tags, the tree building blocks.
3. *text* nodes – contain text(*spaces* and *newlines* too!).
4. *comment* nodes – sometimes we can put information there, it won’t be shown, but JS can read it from the DOM.

## Walking the DOM

+ The topmost tree nodes are available directly as `document` properties:

    + `#!html <html>...</html>` = `#!js document.documentElement`
    + `#!html <head>...</head>` = `#!js document.head`
    + `#!html <body>...</body>` = `#!js document.body`

+ Given a DOM node, we can go to its immediate neighbors using navigation properties.

    There are two main sets of them:

    + For all nodes: `#!js parentNode`, `#!js childNodes`, `#!js firstChild`(=== `#!js childNodes[0]`), `#!js lastChild`(=== `#!js childNodes[elem.childNodes.length - 1]`), `#!js previousSibling`, `#!js nextSibling`.
    + For element nodes only: `#!js parentElement`, `#!js children`, `#!js firstElementChild`, `#!js lastElementChild`, `#!js previousElementSibling`, `#!js nextElementSibling`.

+ Some types of DOM elements, provide additional properties and collections to access their content, e.g.:

    1. `#!html <table>...</table>`

        + `#!js table.rows` – the collection of `#!html <tr>` elements of the table.
        + `#!js table.caption/tHead/tFoot` – references to elements `#!html <caption>`, `#!html <thead>`, `#!html <tfoot>`.
        + `#!js table.tBodies` – the collection of `#!html <tbody>` elements (can be many according to the standard, but there will always be at least one – even if it is not in the source HTML, the browser will put it in the DOM).

        `#!html <thead>`, `#!html <tfoot>`, `#!html <tbody>` elements provide the rows property:

        + `#!js tbody.rows` – the collection of `#!html <tr>` inside.

        `#!html <tr>` :

        + `#!js tr.cells` – the collection of `#!html <td>` and `#!html <th>` cells inside the given `#!html <tr>`.
        + `#!js tr.sectionRowIndex` – the position (index) of the given `#!html <tr>` inside the enclosing `#!html <thead>/<tbody>/<tfoot>`.
        + `#!js tr.rowIndex` – the number of the `#!html <tr>` in the table as a whole (including all table rows).

        `#!html <td>` and `#!html <th>` :

        + `#!js td.cellIndex` – the number of the cell inside the enclosing `#!html <tr>`.

        An example of usage:

        ```html
        <table id="table">
          <tr>
            <td>one</td><td>two</td>
          </tr>
          <tr>
            <td>three</td><td>four</td>
          </tr>
        </table>

        <script>
          // get td with "two" (first row, second column)
          let td = table.rows[0].cells[1];
          td.style.backgroundColor = "red"; // highlight it
        </script>
        ```

    2. `#!html <form>...</form>`






## DOM Selectors

### *Following 3 selectors used for older code bases:*

#### document.getElementsByTagName

```js
// outputs array:
document.getElementsByTagName("h1");
// outputs specific element:
document.getElementsByTagName("h1")[0];
```

#### document.getElementsByClassName

```js
// outputs array:
document.getElementsByClassName("second");
// outputs specific element:
document.getElementsByClassName("second")[0];
```

#### document.getElementById

```js
document.getElementById("first");
```

### *Following 2 selectors can select anything inside quotes exactly like selecting in CSS:*

!!! note

    These selectors are more powerfull than the first three above.

#### document.querySelector

returns the *first* element that matches a specified [CSS selector(s)](https://www.w3schools.com/cssref/css_selectors.asp){target=_blank} in the document

```js
document.querySelector("li");
```

#### document.querySelectorAll

returns *all* elements in the document that matches a specified [CSS selector(s)](https://www.w3schools.com/cssref/css_selectors.asp){target=_blank}, as a static NodeList object

```js
document.querySelectorAll("li, h1");
```

### *CHANGING STYLES (the old way):*

#### *element*.getAttribute

get the **value** of the attribute

```js
document.querySelector("img").getAttribute("width");
```

#### *element*.setAttribute

can be used to change styles by changing value of 'class' atribute

```js
document.querySelector("img").setAttribute("width", "5px");
```

### *CHANGING STYLES (this is the more common way to change styles):*

#### *element*.style.{property} //ok

all elements on the web page have a 'style' attribute

```js
// return the whole bunch of CSS properties of the element:
document.querySelector("h1").style
```

```js
// set background to yellow:
document.querySelector("h1").style.backgroud = "yellow";
```

``` html
<!-- the above is the exact thing as: -->
<h1 style="background: yellow"></h1>
```

!!! note

    This selector breaks the **separation of control** concept by adding `style` attribute to selected element. So it is recommneded to use following below selectors.

#### *element*.className //best

```js
// returns the class name(s) of an element
document.querySelector("h1").className;
```

```js
// sets the class name of an element (i.e. removes existing class names if any and then adds the new one)
document.querySelector("h1").className = "coolTitle";
```

#### *element*.classList //best

```js
// return a list of classes of the element as an array
document.querySelector("h1").classList;
```

```js
// sets the class name of an element (i.e. removes existing class names if any and then adds the new one)
document.querySelector("h1").classList = "coolTitle";
```

#### *element*.classList.add

#### *element*.classList.remove

#### *element*.classList.toggle

```js
document.querySelector("h1").classList.add("done");
document.querySelector("h1").classList.remove("done");
document.querySelector("h1").classList.toggle("done");
```

### *BONUS:*

#### *element*.innerHTML

```js
// returns the HTML content (inner HTML) of an element
document.querySelector("h1").innerHTML;
```

```js
// sets the HTML content (inner HTML) of an element. DANGEROUS - becsause it removes everything within the element (also other elements).
document.querySelector("h1").innerHTML = "<strong>!!!!!!</strong>";
```

#### *node*.parentElement

```js
document.querySelectorAll.("li")[1].parentElement; //e.g. get 'ul' element
document.querySelectorAll.("li")[1].parentElement.parentElement; //e.g. gets 'body' element
```

#### *element*.children

```js
document.querySelectorAll.("li")[1].parentElement.children; //e.g. get all the children elements of the 'body'
```

!!! tip

    **It is important to CACHE selectors in variables in order to reduce memory usage by js engine(by going to DOM each time when we use selector), e.g: `#!js var h1 = document.querySelector("h1");`**

## DOM Events
