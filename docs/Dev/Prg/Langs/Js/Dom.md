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

+ Given an any DOM node, we can go to its immediate neighbors using *navigation properties*.

    There are two main sets of them:

    + For all nodes: `#!js parentNode`, `#!js childNodes`, `#!js firstChild`(=== `#!js childNodes[0]`), `#!js lastChild`(=== `#!js childNodes[elem.childNodes.length - 1]`), `#!js previousSibling`, `#!js nextSibling`.
    + For *element* nodes only: `#!js parentElement`, `#!js children`, `#!js firstElementChild`, `#!js lastElementChild`, `#!js previousElementSibling`, `#!js nextElementSibling`.

        Examples:

        ```js
        document.querySelectorAll.("li")[1].parentElement; //e.g. get 'ul' element
        document.querySelectorAll.("li")[1].parentElement.parentElement; //e.g. gets 'body' element

        document.querySelectorAll.("li")[1].parentElement.children; //e.g. get all the children elements of the 'body'
        ```

    !!! note "DOM Collections"

        `#!js childNodes` and `#!js children` are *collections*.</br>
        *Collection* – a special array-like ^^iterable^^ object and has two important consequences:

        + we can use `#!js for..of` to iterate over it:

            ```js
            for (let node of document.body.childNodes) {
              alert(node); // shows all nodes from the collection
            }
            ```

            That’s because it’s iterable (provides the `#!js Symbol.iterator` property, as required).

            !!! warning "Don’t use `#!js for..in` to loop over collections"

                The `#!js for..in` loop iterates over all ^^enumerable^^ properties. And collections have some “extra” rarely used properties that we usually do not want to get:

                ```html
                <body>
                <script>
                  // shows 0, 1, length, item, values and more.
                  for (let prop in document.body.childNodes) alert(prop);
                </script>
                </body>
                ```

        + array methods won’t work, because it’s not an array:

            ```js
            alert(document.body.childNodes.filter); // undefined (there's no filter method!)
            ```

            BUT: We can create a “real” array from the collection, if we want array methods, i.e. to make a copy using `#!js Array.from` to iterate over if adding, moving, or removing nodes.

            ```js
            alert( Array.from(document.body.childNodes).filter ); // function
            ```

    !!! note "DOM collections are live"

        Almost all DOM collections with minor exceptions are **live**, i.e. they reflect the ^^current state of DOM^^.</br>
        If we keep a reference to `#!js element.childNodes`, and add/remove nodes into DOM, then they appear in the collection automatically.

    !!! note "DOM collections and navigation properties are read-only"

        We can’t replace a child by something else by assigning `#!js childNodes[i] = ...`. Changing DOM needs other methods, see [below](#changing-the-dom).

+ Some types of DOM elements, provide additional *navigation properties* and *collections* to access their content, e.g.:

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

## Searching the DOM

### Using `getElement(s)*`

!!! note "This methods used for older code bases."

+ ***document*.getElementById**

    ```js
    document.getElementById("first");
    ```

!!! note "All methods `getElementsBy*` below return a *live collection*."

    Such collections always reflect the current state of the document and “auto-update” when it changes.

+ ***element*.getElementsByTagName**

    looks for elements with the given tag and returns the *live collection* of them</br>
    the tag parameter can also be a star `"*"` for “any tags”

    ```js
    // outputs live collection of all h1 elements:
    document.getElementsByTagName("h1");
    // outputs specific element:
    document.getElementsByTagName("h1")[0];
    ```

    ```html
    <!-- Let’s find all input tags inside the table: -->
    <table id="table">
      <tr>
        <td>Your age:</td>

        <td>
          <label>
            <input type="radio" name="age" value="young" checked> less than 18
          </label>
          <label>
            <input type="radio" name="age" value="mature"> from 18 to 50
          </label>
          <label>
            <input type="radio" name="age" value="senior"> more than 60
          </label>
        </td>
      </tr>

    </table>

    <script>
      let inputs = table.getElementsByTagName('input');

      for (let input of inputs) {
        alert( input.value + ': ' + input.checked );
      }
    </script>
    ```

+ ***element*.getElementsByClassName**

    looks for elements with the given class and returns the *live collection* of them

    ```js
    // outputs live collection of all elements with class 'second':
    document.getElementsByClassName("second");
    // outputs specific element:
    document.getElementsByClassName("second")[0];
    ```

+ ***document*.getElementsByName**

    looks for elements with the given name and returns the *live collection* of them

### Using `querySelector*`

!!! note "This methods can select anything inside quotes exactly like selecting in CSS. They are more powerfull than the first three above."

+ ***element*.querySelectorAll**

    returns *all* elements in the document that matches a specified [CSS selector(s)](https://www.w3schools.com/cssref/css_selectors.asp){target=_blank}, as a *static NodeList object(static collection)*, i.e. it doesn't reflect the current state of the document and doesn't “auto-update” when it changes</br>
    can be iterated with `#!js for...of` loop or with `#!js forEach` array method

    !!! note "Can use pseudo-classes as well"

        Pseudo-classes in the CSS selector like `#!css :hover` and `#!css :active` are also supported. For instance, `#!js document.querySelectorAll(':hover')` will return the collection with elements that the pointer is over now (in nesting order: from the outermost `#!html <html>` to the most nested one).

    ```html
    <!-- Here we look for all <li> elements that are last children: -->
    <ul>
      <li>The</li>
      <li>test</li>

    </ul>
    <ul>
      <li>has</li>
      <li>passed</li>
    </ul>
    <script>
      let elements = document.querySelectorAll('ul > li:last-child');

      for (let elem of elements) {
        alert(elem.innerHTML); // "test", "passed"
      }
    </script>
    ```

    !!! note "*element*.querySelectorAll “unexpected“ result"

        By default this method checks the last element without considering the context, e.g.:

        ```html
        <ul class="list">
          <li class="item-list">
            <ul class="sub-list">
              <li class="item-sub-list"></li>
              <li class="item-sub-list"></li>
            </ul>
          </li>
        </ul>

        <script>
          const sublist = document.querySelectorAll('.sub-list')
          const sublistitems = sublist[0].querySelectorAll('.list .item-sub-list')
          console.log(sublistitems)  // NodeList(2) [li.item-sub-list, li.item-sub-list]
        </script>
        <!-- we expect here to get nothing, but instead we've got collection of 2 nodes -->
        ```

+ ***element*.querySelector**

    returns the *first* element that matches a specified [CSS selector(s)](https://www.w3schools.com/cssref/css_selectors.asp){target=_blank} in the document, i.e. the result(only!) is the same as `#!js element.querySelectorAll[css](0)`, but the latter is ^^looking for all^^ elements and picking one, while `#!js element.querySelector` just ^^looks for one^^, so it’s faster and also shorter to write

    ```js
    document.querySelector("li");
    ```

### Dom selectors summary table

| Method                      |Searches by...| Retruns               | Can call on an element?                                                        | Live collection? |
| --------------------------- | ------------ | --------------------- | ------------------------------------------------------------------------------ | ---------------- |
| `querySelector`             |CSS-selector  | One obect             | :material-check:                                                               | :material-close: |
| `querySelectorAll`          |CSS-selector  | Collection of objects | :material-check:                                                               | :material-close: |
| `getElementById`            |`id`          | One obect             | :material-close: - Searches the whole document by calling on `document` object | :material-close: |
| `getElementsByName`         |`name`        | Collection of objects | :material-close: - Searches the whole document by calling on `document` object | :material-check: |
| `getElementsByTagName`      |tag or `'*'`  | Collection of objects | :material-check:                                                               | :material-check: |
| `getElementsByClassName`    |class         | Collection of objects | :material-check:                                                               | :material-check: |

!!! tip

    **It is important to CACHE selectors in variables in order to reduce memory usage by js engine(by going to DOM each time when we use selector), e.g: `#!js var h1 = document.querySelector("h1");`**

### Additional useful methods

+ ***element*.matches(css)**

    checks if *element* matches the given CSS-selector and returns `true` or `false`

    ```html
    <a href="http://example.com/file.zip">...</a>
    <a href="http://ya.ru">...</a>

    <script>
      // can be any collection instead of document.body.children
      for (let elem of document.body.children) {
        if (elem.matches('a[href$="zip"]')) {
          alert("The archive reference: " + elem.href );
        }
      }
    </script>
    ```

+ ***element*.closest(css)**

    looks for the nearest ancestor that matches the CSS-selector; returns `null` if finds nothing; the *element* itself is also included in the search

    ```html
    <h1>Contents</h1>

    <div class="contents">
      <ul class="book">
        <li class="chapter">Chapter 1</li>
        <li class="chapter">Chapter 2</li>
      </ul>
    </div>

    <script>
      let chapter = document.querySelector('.chapter'); // LI

      alert(chapter.closest('.book')); // UL
      alert(chapter.closest('.contents')); // DIV

      alert(chapter.closest('h1')); // null (because h1 is not an ancestor)
    </script>
    ```

+ **elemA.contains(elemB)**

    checks for the child-parent relationship; returns true if `elemB` is inside `elemA` (a descendant of `elemA`) or when `elemA==elemB`

## Changing the DOM

+ ***element*.innerHTML**

    ```js
    // returns the HTML content(inner HTML) of an element as a string
    document.querySelector("h1").innerHTML;
    ```

    ```js
    // sets the HTML content(inner HTML) of an element
    // DANGEROUS - it removes everything within the element(also other elements)
    document.querySelector("h1").innerHTML = "<strong>!!!!!!</strong>";
    ```

    !!! note "`#!js element.innerHTML = "...";` typing errors automatically fixed by browser"

        For example when we forgot to close the tag.

    !!! note "`#!js element.innerHTML = "...";` don’t execute scripts"

        When inserting a `#!html <script>` tag into the document – it becomes a part of HTML, but doesn’t execute.

    ```js
    //appends HTML to an element
    elem.innerHTML += "...";
    // is a shorter way to write:
    elem.innerHTML = elem.innerHTML + "..."
    // In other words, 'innerHTML+=' does this:
    // 1. The old contents is removed.
    // 2. The new 'innerHTML' is written instead (a concatenation of the old and the new one).
    // DANGEROUS - becsause the old content is “zeroed-out” causing following side effects:
    // - all images and other resources will be reloaded
    // - if the existing text was selected with the mouse, then most browsers will remove the selection upon rewriting 'innerHTML'
    // - if there was an <input> with a text entered by the visitor, then the text will be removed
    // - and so on ...
    ```

+ ***element*.outerHTML**

    ```html
    <!-- returns the full HTML of the element as a string, like 'innerHTML' plus the element itself -->
    <div id="elem">Hello <b>World</b></div>
    <script>
      alert(elem.outerHTML); // <div id="elem">Hello <b>World</b></div>
    </script>
    ```

    ```html
    <!-- seting the full HTML of the element -->
    <div>Hello, world!</div>
    <script>
      let elem = document.querySelector('div');

      // replace elem.outerHTML with <p>...</p>
      elem.outerHTML = '<p>A new element</p>'; // (*)

      // Wow! 'elem' is still the same!
      alert(elem.outerHTML); // <div>Hello, world!</div> (**)
    </script>
    ```

    !!! warning "Regarding the codeblock above:</br>Unlike `#!js innerHTML`, writing to `#!js outerHTML` does not change the element. Instead, it replaces it in the DOM."

        In the line `(*)` we replaced `#!js elem` with `#!html <p>A new element</p>`. In the ^^outer document^^ (the DOM and therefore the page content) we can see the new content instead of the `#!html <div>Hello, world!</div>`. But, as we can see in line `(**)`, the value of the old `#!js elem` variable hasn’t changed!

        The `#!js outerHTML` *assignment* **does not modify** the ^^DOM element^^ (^^the object^^ referenced by, in this case, the variable `#!js elem`), but removes ^^it^^ from the DOM and inserts the new HTML in ^^its^^ place.

        So what happened in `#!js elem.outerHTML=...` is:

        + `#!js elem` was removed from the document
        + another piece of HTML `#!html <p>A new element</p>` was inserted in its place
        + `#!js elem` still has its old value and the new HTML(`#!html <p>A new element</p>`) wasn’t saved to any variable

        !!! tip

            It’s so easy to make an error here: modify `#!js elem.outerHTML` and then continue to work with `#!js elem` as if it had the new content in it. But it doesn’t. `#!js elem.outerHTML = '...'` puts the ^^new HTML^^ in its place instead. We can get references to the ^^new elements^^ by querying the DOM.

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

## DOM Events
