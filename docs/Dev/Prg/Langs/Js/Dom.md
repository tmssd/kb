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

***node*.nodeType** - “old-fashioned” way to get the “type” of a DOM node, read only:

+ `#!js node.nodeType == 9` for the 'document' object
+ `#!js node.nodeType == 8` for comment nodes
+ `#!js node.nodeType == 3` for text nodes
+ `#!js node.nodeType == 1` for element nodes

```html
<body><!-- this is a comment -->
  <script>
    let elem = document.body;

    // let's examine: what type of node is in elem?
    console.log(elem.nodeType); // 1 => element

    // its first child is...
    console.log(elem.firstChild.nodeType); // 8 => comment

    // and its second childi is...
    console.log(elem.childNodes[1].nodeType) // 3 => text

    // for the document object, the type is 9
    console.log( document.nodeType ); // 9
  </script>
</body>
```

In modern scripts, we can use `#!js instanceof` and other class-based tests to see the node type.

***node*.nodeName** - returns:

+ for *element* nodes: `#!html <tag>` name(same as `#!js element.tagName` property [==do==](#additional-useful-methods))
+ for other node types (*text*, *comment*, etc.): string with the node type

```html
<body><!-- comment -->
  <script>
    // for <body> element
    console.log(document.body.nodeName); // BODY

    // for comment
    console.log(document.body.firstChild.nodeName); // #comment

    // for document
    console.log(document.nodeName); // #document
  </script>
</body>
```

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

        We can’t replace a child by something else by assigning `#!js childNodes[i] = ...`. Changing DOM needs other methods, [==see below==](#changing-the-dom).

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

### DOM selectors summary table

| Method                      |Searches by...| Retruns               | Can call on an element?                                                        | Live collection? |
| --------------------------- | ------------ | --------------------- | ------------------------------------------------------------------------------ | ---------------- |
| `querySelector`             |CSS-selector  | One obect             | :material-check:                                                               | :material-close: |
| `querySelectorAll`          |CSS-selector  | Collection of objects | :material-check:                                                               | :material-close: |
| `getElementById`            |`id`          | One obect             | :material-close: - Searches the whole document by calling on `document` object | :material-close: |
| `getElementsByName`         |`name`        | Collection of objects | :material-close: - Searches the whole document by calling on `document` object | :material-check: |
| `getElementsByTagName`      |tag or `'*'`  | Collection of objects | :material-check:                                                               | :material-check: |
| `getElementsByClassName`    |class         | Collection of objects | :material-check:                                                               | :material-check: |

!!! tip "It is important to CACHE selectors in variables."

     This is in order to reduce memory usage by js engine(by going to DOM each time when we use selector), e.g: `#!js var h1 = document.querySelector("h1");`

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

+ ***elemA*.contains(*elemB*)**

    checks for the child-parent relationship; returns true if `elemB` is inside `elemA` (a descendant of `elemA`) or when `elemA==elemB`

+ ***element*.tagName**

    returns `#!html <tag>` name

    `#!js tagName` is only supported by *element* nodes (as it originates from `Element` class)

    ```html
    <body><!-- comment -->
      <script>
        // for <body> element
        console.log(document.body.tagName); // BODY

        // for comment
        console.log(document.body.firstChild.tagName); // undefined (not an element)

        // for document
        console.log(document.tagName); // undefined (not an element)
      </script>
    </body>
    ```

    !!! note "The tag name is always uppercase except in XML mode."

        The browser has two modes of processing documents: HTML and XML. Usually the HTML-mode is used for webpages. XML-mode is enabled when the browser receives an XML-document with the header: `Content-Type: application/xml+xhtml`.

        In HTML mode `#!js tagName`(and `#!js nodeName`) is always uppercased: it’s `BODY` either for `#!html <body>` or `#!html <BoDy>`.

## Changing the DOM

### Changing nodes content

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

+ ***textNode/commentNode*.data**, ***textNode/commentNode*.nodeValue**

    !!! note "`#!js data` and `#!js nodeValue` properties are almost the same for practical use."

        There are only minor specification differences. So we’ll use `#!js data`, because it’s shorter.

    returns/modifies the content of a non-element node(text, comment):

    ```html
    <body>
      Hello
      <!-- Comment -->
      <script>
        let text = document.body.firstChild;
        console.log(text.data); // Hello

        text.data = 'Hello World!'
        console.log(text.data); // Hello World!

        let comment = text.nextSibling;
        console.log(comment.data); // Comment

        comment.data = 'New Comment';
        console.log(comment.data); // New Comment
      </script>
    </body>
    ```

    !!! tip "Practical usgae of ***commentNode*.data**"

        Sometimes developers embed information or template instructions into HTML in them, like this:

        ```html
        <!-- if isAdmin -->
          <div>Welcome, Admin!</div>
        <!-- /if -->
        ```

        …Then JavaScript can read it from `#!js data` property and process embedded instructions.

+ ***element*.textContent**

    provides access to the text inside the element: only text, minus all `<tags>`

    ```html
    <!-- returning text content -->
    <div id="news">
      <h1>Headline!</h1>
      <p>Martians attack people!</p>

    </div>

    <script>
      let news = document.querySelector('#news');
      // Headline! Martians attack people!
      alert(news.textContent);
    </script>
    ```

    ```html
    <!-- modifying/writing to text content -->

    <!-- this div gets the name “as HTML”: all tags become tags, so we see the bold name -->
    <div id="elem1"></div>
    <!-- this div gets the name “as text”, so we literally see <b>Winnie-the-Pooh!</b> -->
    <div id="elem2"></div>
    <script>
      let name = prompt("What's your name?", "<b>Winnie-the-Pooh!</b>");

      let elem1 = document.querySelector('#elem1')
      let elem2 = document.querySelector('#elem2')
      elem1.innerHTML = name;
      elem2.textContent = name;
    </script>
    ```

    !!! tip "Getting an input from a user."

        In most cases, we expect the text from a user, and want to treat it as text. We don’t want unexpected HTML in our site. An assignment to `#!js textContent` does exactly that.

+ ***element*.hidden, `<tag hidden>...</tag>`**

    The “hidden” attribute and the DOM property specifies whether the element is visible or not.</br>
    Technically, hidden works the same as `#!css style="display:none"`. But it’s shorter to write.

    Example of blinking element:

    ```html
    <div id="elem">A blinking element</div>

    <script>
      let elem = document.querySelector('#elem');
      setInterval(() => elem.hidden = !elem.hidden, 1000);
    </script>
    ```

### Creation, insertion, removal of nodes

#### Creation

+ ***document*.createElement('tag')** – creates an element with the given tag
+ ***document*.createTextNode('string value')** – creates a text node(rarely used)
+ ***element*.cloneNode(*deep*)** – clones the element without descendants when `deep==''`, if `deep==true` then with all descendants

#### Insertion and removal

+ ***node*.append(*...nodes or 'strings'*)** - insert into node, at the end
+ ***node*.prepend(*...nodes or 'strings'*)** - insert into node, at the beginning
+ ***node*.before(*...nodes or 'strings'*)** - insert right before node
+ ***node*.after(*...nodes or 'strings'*)** - insert right after node
+ ***node*.replaceWith(*...nodes or 'strings'*)** - replace node
+ ***node*.remove()** - remove the node

!!! note "The above insertion methods can only be used to insert DOM nodes or text pieces."

    To insert an HTML string “as html”, with all tags and stuff working, in the same manner as `#!js element.innerHTML` does it use following method:

+ Given some HTML in `html`, ***element*.insertAdjacentHTML("where", html)** inserts it depending on the value of `"where"`:

    + **"beforebegin"** – insert html right before elem
    + **"afterbegin"** – insert html into elem, at the beginning
    + **"beforeend"** – insert html into elem, at the end
    + **"afterend"** – insert html right after elem

    Also there are similar methods, ***element*.insertAdjacentText("where", 'text')** and ***element*.insertAdjacentElement("where", element)**, that insert text strings and elements, but they are rarely used because there are mentioned above `#!js append`, `#!js prepend`, `#!js before` and `#!js after` methods for this needs.

```html
<style>
.alert {
  padding: 15px;
  border: 1px solid #d6e9c6;
  border-radius: 4px;
  color: #3c763d;
  background-color: #dff0d8;
}
</style>

<script>
  // 1. Create <div> element
  let div = document.createElement('div');
  // 2. Set its class to "alert"
  div.className = "alert";
  // 3. Fill it with the content
  div.innerHTML = "<strong>Hi there!</strong> You've read an important message.";

  document.body.append(div);
</script>

<!-- alternative variant using insertAdjacentHTML -->
<script>
  document.body.insertAdjacentHTML("afterbegin", `<div class="alert">
    <strong>Hi there!</strong> You've read an important message.
  </div>`);
</script>
```

```html
<!-- inserting multiple nodes and text pieces in a single call -->
<div id="div"></div>
<script>
  div.before('<p>Hello</p>', document.createElement('hr'));
</script>
```

!!! tip "All insertion methods automatically remove the node from the old place."

    For instance, let’s swap elements:

    ```html
    <div id="first">First</div>
    <div id="second">Second</div>
    <script>
      // no need to call remove
      second.after(first); // take #second and after it insert #first
    </script>
    ```

+ [**DocumentFragment**](https://javascript.info/modifying-document#document-fragment) - a special DOM node that serves as a wrapper to pass around lists of nodes. It is rarely used explicitly.

    `DocumentFragment` mentioned here mainly because there are some concepts on top of it, like `#!html <template></template>` element.

+ ***document*.write(html)** - append HTML to the page before it has finished loading

    ```html
    <p>Somewhere in the page...</p>
    <script>
      document.write('<b>Hello from JS</b>');
    </script>
    <p>The end</p>
    ```

    The call to `#!js document.write` only works while the page is loading. So it’s kind of unusable at “after loaded” stage, unlike other DOM methods.

    Technically, when `#!js document.write` is called while the browser is reading (“parsing”) incoming HTML, and it writes something, the browser consumes it just as if it were initially there, in the HTML text. So it works blazingly fast, because there’s ^^no DOM modification^^ involved. It writes directly into the page text, while the DOM is not yet built.</br>
    So if we need to add a lot of text into HTML dynamically, and we’re at page loading phase, and the speed matters, it may help. But in practice these requirements rarely come together. And usually we can see this method in scripts just because they are old.

    !!! note "After the page is loaded such a call erases the document."

#### Insertion and removal(“old school” methods)

+ ***parent*.appendChild(*node*)** - appends `node` as the ^^last child^^ of `parentElem`
+ ***parent*.insertBefore(*node*, nextSibling)** - inserts `node` ^^before^^ `nextSibling` into `parentElem`

    ```html
    <ol id="list">
      <li>0</li>
      <li>1</li>
      <li>2</li>

    </ol>
    <!-- insert a new list item before the second <li> -->
    <script>
      let newLi = document.createElement('li');
      newLi.innerHTML = 'Hello, world!';

      list.insertBefore(newLi, list.children[1]);
    </script>

    <!--  insert 'newLi' as the first element -->
    <script>
      list.insertBefore(newLi, list.firstChild);
    </script>
    ```

+ ***parent*.removeChild(*node*)** - removes `node` from `parentElem` (assuming `node` is its child)
+ ***parent*.replaceChild(*newElement*, *node*)** - replaces `oldChild` with `node` among children of `parentElem`

!!! note "All these methods return the inserted/removed `node`."

    But usually the returned value is not used, we just run the method.

### Changing element properties: class, style

#### class

+ ***element*.className** – corresponds to the `#!html class` attribute; the string value, good to manage the whole set of classes

    ```js
    // returns the class name(s) of an element as string
    document.querySelector("h1").className;
    ```

    ```js
    // sets the class name of an element (i.e. removes existing class names if any and then adds the new one)
    document.querySelector("h1").className = "coolTitle";
    ```

+ ***element*.classList**– the object with methods `add/remove/toggle/contains`, good for individual classes

    ```js
    // return a list of classes of the element as iterable,
    document.querySelector("h1").classList;

    // so we can list all classes with 'for..of' loop
    for (let name of document.querySelector("h1").classList) {
      console.log(name);
    }
    ```

    ```js
    // sets the class name of an element (i.e. removes existing class names if any and then adds the new one)
    document.querySelector("h1").classList = "coolTitle";
    ```

    Methods of classList:

    + ***element*.classList.add/remove("class")** – adds/removes the class
    + ***element*.classList.toggle("class")** – adds the class if it doesn’t exist, otherwise removes it
    + ***element*.classList.contains("class")** – checks for the given class, returns `true/false`

    ```js
    document.querySelector("h1").classList.add("done");
    document.querySelector("h1").classList.remove("done");
    document.querySelector("h1").classList.toggle("done");
    ```

#### style

+ ***element*.style.[*css-property*]** - corresponds to what’s written in the `#!html style` attribute

    !!! note "All elements on the web page have a 'style' attribute"

    ```js
    // return the whole bunch of CSS properties of the element(a long list):
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

    ```js
    // two ways to reset style property, e.g. given:
    document.body.style.background = 'red';

    // 1. set the property to an empty string
    document.body.style.background = "";

    // 2. element.style.removeProperty('style property')
    document.body.style.removeProperty('background');
    ```

    ```html
    <!-- Don’t forget to add CSS units to values -->
    <body>
      <script>
        // doesn't work!
        document.body.style.margin = 20;
        alert(document.body.style.margin); // '' (empty string, the assignment is ignored)

        // now add the CSS unit (px) - and it works
        document.body.style.margin = '20px';
        alert(document.body.style.margin); // 20px

        alert(document.body.style.marginTop); // 20px
        alert(document.body.style.marginLeft); // 20px
      </script>
    </body>
    <!-- Please note: the browser “unpacks” the property 'style.margin' in the last lines
    and infers 'style.marginLeft' and 'style.marginTop' from it. -->
    ```

    !!! note "For multi-word property the camelCase is used (a dash `-` means upper case):"

        | CSS property            | → | `#!js style` object property     |
        | ----------------------- | - | -------------------------------- |
        | `background-color`      | → | elem.style.backgroundColor       |
        | `z-index`               | → | elem.style.zIndex                |
        | `border-left-width`     | → | elem.style.borderLeftWidth       |
        | `-moz-border-radius`    | → | element.style.MozBorderRadius    |
        | `-webkit-border-radius` | → | element.style.WebkitBorderRadius |

        and so on...

    !!! tip "How to apply other staff."

        To see how to apply `important` and other rare stuff – there’s a list of methods at [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration).

    !!! warning "The `#!js element.style` property operates only on the value of the ^^`"style"` attribute^^, without any CSS cascade."

        To read anything that comes from CSS classes use `#!js getComputedStyle(element, [pseudo])`, see below.

    *element*.style is an object, and it’s read-only,</br>
    so we can’t set the full style like `#!js element.style="color: red; width: 100px"`.</br>
    Instead `#!js element.style.cssText` below can be used.

+ ***element*.style.cssText** - corresponds to the whole "style" attribute, the full string of styles

    ***element*.style.cssText = \`*css-property1: value1; css-property2: value2; ...*\`** - full style rewrite

    ```html
    <div id="div">Button</div>

    <script>
      // we can set special style flags like "important" here
      div.style.cssText=`color: red !important;
        background-color: yellow;
        width: 100px;
        text-align: center;
      `;

      alert(div.style.cssText);
    </script>
    ```

    !!! tip "This property is rarely used."

        Because such assignment removes all existing styles: it does not add, but replaces them. May occasionally delete something needed. But we can safely use it for new elements, when we know we won’t delete an existing style.</br>
        The code above can be accomplished by [==^^setting an attribute^^==](#html-attributes-vs-dom-properties): `#!js div.setAttribute('style', 'color: red...')`

+ **getComputedStyle(*element*, [pseudo])** - reads the resolved(= *resolved value* of the property, usually in `px` for geometry) styles(with respect to all classes, after all CSS is applied and final values are calculated)

    **[pseudo]** - a pseudo-element if required, for instance `#!css ::before`. An empty string or no argument means the element itself.

    Returns the `#!js element.style`-like object. Read-only.

    ```html
    <head>
      <style> body { color: red; margin: 5px } </style>
    </head>
    <body>

      <script>
        let computedStyle = getComputedStyle(document.body);

        // now we can read the margin and the color from it
        alert( computedStyle.marginTop ); // 5px
        alert( computedStyle.color ); // rgb(255, 0, 0)
      </script>

    </body>
    ```

    !!! warning "`#!js getComputedStyle` requires the full property name"

        We should always ask for the exact property that we want, like `paddingLeft` or `marginTop` or `borderTopWidth`. Otherwise the correct result is not guaranteed.

    !!! note "Styles applied to `#!css :visited` links are hidden!"

        Visited links may be colored using `#!css :visited` CSS pseudoclass.

        But `#!js getComputedStyle` does not give access to that color, because otherwise an arbitrary page could find out whether the user visited a link by creating it on the page and checking the styles.

        JavaScript may not see the styles applied by `#!css :visited`. And also, there’s a limitation in CSS that forbids applying geometry-changing styles in `#!css :visited`. That’s to guarantee that there’s no side way for an evil page to test if a link was visited and hence to break the privacy.

#### styles: working tips

+ We should always prefer CSS classes to `#!js element.style`, because the latter breaks the *separation of control* concept by adding ^^`style` attribute^^ to selected element. The `#!js element.style` should only be used if classes “can’t handle it”.

    For example, `#!js element.style` is acceptable if we calculate coordinates of an element dynamically and want to set them from JavaScript, like this:

    ```js
    let top = /* complex calculations */;
    let left = /*complex calculations*/;

    elem.style.left = left; // e.g '123px', calculated at run-time
    elem.style.top = top; // e.g '456px'
    ```

    For other cases, like making the text red, adding a background icon – describe that in CSS and then add the class (JavaScript can do that). That’s more flexible and easier to support.

+ Converting string property value to number using `#!js parseInt()`, in order to do math with it later.

    ```js
    // get element
    const elem = documant.querySelector('h1');

    // element style
    const elemStyle = getComputedStyle(elem);
    console.log(elemStyle.paddingLeft); // e.g. 20px

    // get number
    const paddingLeft = parseInt(elemStyle.paddingLeft);
    console.log(paddingLeft); // e.g. 20
    ```

### HTML attributes vs. DOM properties

!!! tip "For most situations using DOM properties is preferable."

    We should refer to attributes only when DOM properties do not suit us, when we need exactly attributes, for instance:

    + We need a non-standard non-“data-*” attribute. See [==Non-standard attributes use cases==](#non-standard-attributes-use-cases)
    + We want to read the value “as written” in HTML. For instanse: see [==note==](#html-attributes) about `href` attribute later on this page.

#### DOM properties

DOM nodes are regular JavaScript objects.

+ We can alter them.

    ```js
    // create a new property in document.body
    document.body.myData = {
      name: 'Caesar',
      title: 'Imperator'
    };
    alert(document.body.myData.title); // Imperator

    // add a method
    document.body.sayTagName = function() {
      alert(this.tagName);
    };
    document.body.sayTagName(); // BODY (the value of "this" in the method is document.body)

    // modify built-in prototypes like Element.prototype and add new methods to all elements
    Element.prototype.sayHi = function() {
      alert(`Hello, I'm ${this.tagName}`);
    };
    document.documentElement.sayHi(); // Hello, I'm HTML
    document.body.sayHi(); // Hello, I'm BODY
    ```

+ They can have any value, i.e. they are typed(типизированные)

    ```html
    <!-- For instance, the element.input.checked property (for checkboxes) is a boolean -->
    <input id="input" type="checkbox" checked> checkbox

    <script>
      let input = document.querySelecor("#input");

      alert(input.getAttribute('checked')); // the attribute value is: empty string
      alert(input.checked); // the property value is: true
    </script>
    ```

    ```html
    <!-- The "style" attribute is a string, but the 'style' property is an object. -->
    <div id="div" style="color:red;font-size:120%">Hello</div>

    <script>
      let div = document.querySelecor("#div");

      // string
      alert(div.getAttribute('style')); // color:red;font-size:120%

      // object
      alert(div.style); // [object CSSStyleDeclaration]
      alert(div.style.color); // red
    </script>
    ```

    !!! note "Most properties are strings."

        Quite rarely, even if a DOM property type is a string, it may differ from the attribute. See [==note==](#html-attributes) about `href` attribute later on this page.

+ They are case-sensitive (write `#!js element.nodeType`, not `#!js element.NoDeTyPe`).

#### HTML attributes

When the browser parses the HTML to create DOM objects for tags, it recognizes **standard** attributes and creates the corresponding DOM properties from them. But that doesn’t happen if the attribute is **non-standard**.

Most **standard** HTML attributes have the corresponding DOM properties. They described in the specification for the corresponding element class(see [WHATWG: HTML Living Standard](https://html.spec.whatwg.org/)).</br>
For instance, `HTMLInputElement` class is documented at [https://html.spec.whatwg.org/#htmlinputelement](https://html.spec.whatwg.org/#htmlinputelement).</br>

!!! tip "Alternative way to get DOM properties"
    If we’d like to get them fast or are interested in a concrete browser specification – we can always output the element using `console.dir(element)` and read the properties.</br>
    Or explore “DOM properties” in the Elements tab of the browser developer tools.

HTML attributes have the following features:

+ Their values are always strings.
+ Their name is case-insensitive (`id` is same as `ID`), but usually attributes are lowercased.

```html
<body id="test" something="non-standard">
  <script>
    alert(document.body.id); // test
    // non-standard attribute does not yield a property
    alert(document.body.something); // undefined
  </script>
</body>
```

A standard attribute for one element can be unknown for another one. For instance, "type" is standard for `#!html <input>`(`HTMLInputElement` specification class), but not for `#!html <body>` (`HTMLBodyElement` specification class).

```html
<body id="body" type="...">
  <input id="input" type="text">
  <script>
    alert(input.type); // text
    alert(body.type); // undefined: DOM property not created, because it's non-standard
  </script>
</body>
```

Examples of **standard** attributes and their corresponing DOM nodes properties(depending on their specification class):

+ `#!js id` – the value of “id” attribute, for all elements (`HTMLElement` class).
+ `#!js value` – the value for `#!html <input>`, `#!html <select>` and `#!html <textarea>` (classes: `HTMLInputElement`, `HTMLSelectElement`…).
+ `#!js href` – the “href” for `#!html <a href="...">` (`HTMLAnchorElement` class).

    !!! note "`#!js href` DOM property is always a ^^full URL^^."

        Even if the attribute contains a relative URL or just a `#hash`.

        ```html
        <a id="a" href="#hello">link</a>
        <script>
          let a = document.querySelecor("#a");

          // attribute
          alert(a.getAttribute('href')); // #hello

          // property
          alert(a.href ); // full URL in the form http://site.com/page#hello
        </script>
        ```

+ …and much more…

^^All^^ attributes are accessible by using the following methods:

+ ***element*.attributes** - read all attributes and return an iterable collection(can be iterated with `#!js for...of` loop) of objects that belong to a built-in [Attr](https://dom.spec.whatwg.org/#attr) class, with `name` and `value` properties

+ ***element*.hasAttribute("name")** – checks for existence

+ ***element*.getAttribute("name")** – gets the value ^^as string^^ exactly as written in the HTML

    ```js
    document.querySelector("img").getAttribute("width");
    ```

    ```html
    <body something="non-standard">
      <script>
        alert(document.body.getAttribute('Something')); // non-standard; the first letter is uppercase here,
        // and in HTML it’s all lowercase. But that doesn’t matter: attribute names are case-insensitive.
      </script>
    </body>
    ```

+ ***element*.setAttribute("name", "value")** – sets the value ^^as string^^

    ```js
    document.querySelector("img").setAttribute("width", "5px");
    ```

    !!! note "Can be used to change styles by changing value of 'class' atribute."

        But this is the "old school" way as we have more advanced method to manipulate the style. See [==above==](#class).

+ ***element*.removeAttribute("name")** – removes the attribute

#### Property-attribute synchronization

When a standard attribute changes, the corresponding property is auto-updated, and (with some exceptions) vice versa.

In the example below id is modified as an attribute, and we can see the property changed too. And then the same backwards:

```html
<input>

<script>
  let input = document.querySelector('input');

  // attribute => property
  input.setAttribute('id', 'id');
  alert(input.id); // id (updated)

  // property => attribute
  input.id = 'newId';
  alert(input.getAttribute('id')); // newId (updated)
</script>
```

But there are exclusions, for instance:

+ `#!js element.input.value` synchronizes only from attribute → property, but not back

    ```html
    <input>

    <script>
      let input = document.querySelector('input');

      // attribute => property
      input.setAttribute('value', 'text');
      alert(input.value); // text

      // NOT property => attribute
      input.value = 'newValue';
      alert(input.getAttribute('value')); // text (not updated!)
    </script>
    ```

    !!! tip "That “feature” may actually come in handy."

        Because the user actions may lead to `value` changes, and then after them, if we want to recover the “original” value from HTML, it’s in the attribute.

#### Non-standard attributes use cases

+ To pass custom data from HTML to JavaScript.
+ To **“mark”** HTML-elements for JavaScript.

    ```html
    <!-- mark the div to show "name" here -->
    <div show-info="name"></div>
    <!-- and age here -->
    <div show-info="age"></div>

    <script>
      // the code finds an element with the mark and shows what's requested
      let user = {
        name: "Pete",
        age: 25
      };

      for(let div of document.querySelectorAll('[show-info]')) {
        // insert the corresponding info into the field
        let field = div.getAttribute('show-info');
        div.innerHTML = user[field]; // first Pete into "name", then 25 into "age"
      }
    </script>
    ```

+ To style an element.

    ```html
    <!--  For instance, here for the order state the attribute "order-state" is used:-->
    <style>
      /* styles rely on the custom attribute "order-state" */
      .order[order-state="new"] {
        color: green;
      }

      .order[order-state="pending"] {
        color: blue;
      }

      .order[order-state="canceled"] {
        color: red;
      }
    </style>

    <div class="order" order-state="new">
      A new order.
    </div>

    <div class="order" order-state="pending">
      A pending order.
    </div>

    <div class="order" order-state="canceled">
      A canceled order.
    </div>
    ```

    Why would using an attribute be preferable to having classes like `#!css .order-state-new`, `#!css .order-state-pending`, `#!css .order-state-canceled`?</br>
    Because an attribute is more convenient to manage. The state can be changed as easy as:

    ```js
    // a bit simpler than removing old/adding a new class
    div.setAttribute('order-state', 'canceled');
    ```

#### `#!js dataset` DOM property

Possible problem with custom(non-standard) attributes: they can appear in standard specifications in the future and therefore become unevailable for our use. To avoid conflicts, there exist ["data-*"](https://html.spec.whatwg.org/#embedding-custom-non-visible-data-with-the-data-*-attributes) attributes. They are actually a safe way to pass custom data.

All attributes starting with **“data-”** are reserved for programmers’ use.</br>
They are available in the ***element*.dataset.[“data-*“ attribute(with ommited “data-” part) in camelCase]** property.

```html
<style>
  .order[data-order-state="new"] {
    color: green;
  }

  .order[data-order-state="pending"] {
    color: blue;
  }

  .order[data-order-state="canceled"] {
    color: red;
  }
</style>

<div id="order" class="order" data-order-state="new">
  A new order.
</div>

<script>
  // read
  alert(order.dataset.orderState); // new

  // modify
  order.dataset.orderState = "pending"; // we can not only read, but also modify data-attributes
</script>
```

## DOM Events

An **event** is a signal that something has happened(user actions, document events, CSS events etc.). All DOM nodes generate such signals(but events are not limited to DOM).

### Event handlers

**Handler** - is a function that assigned to an event and runs when event happens.

There are 3 ways to assign event handlers:

1. HTML attribute: `on<event>="..."`(`...` - JavaScript code).

    The browser reads it, creates a new function from the attribute content and writes it to the DOM property.

    ```html
    <!-- inside onclick we use single quotes, because the attribute itself is in double quotes -->
    <input value="Click me" onclick="alert('Click!')" type="button">

    <!-- An HTML-attribute is not a convenient place to write a lot of code,
    so we’d better create a JavaScript function and call it there. -->
    <script>
      function countRabbits() {
        for(let i=1; i<=3; i++) {
          alert("Rabbit number " + i);
        }
      }
    </script>

    <input type="button" onclick="countRabbits()" value="Count rabbits!">
    ```

    Accessing the element using `#!js this`

    ```js
    // The value of 'this' inside a handler is the element. The one which has the handler on it.
    <button onclick="alert(this.innerHTML)">Click me</button> // Click me
    ```

    !!! note "HTML attributes are used sparingly."

        Because JavaScript in the middle of an HTML tag looks a little bit odd and alien. Also can’t write lots of code in there.

2. DOM property: ***element*.on<event\> = function**.

    ```html
    <!-- we can’t assign more than one handler of the particular event -->
    <input type="button" id="elem" onclick="alert('Before')" value="Click me">
    <script>
      let elem = document.querySelecor("#elem");
      elem.onclick = function() { // overwrites the existing handler
        alert('After'); // only this will be shown
      };
    </script>
    ```

    Set an existing function as a handler.

    ```js
    function sayThanks() {
      alert('Thanks!');
    }
    // function should be assigned without parentheses
    elem.onclick = sayThanks;
    ```

    ```html
    <!-- On the other hand, in the markup we do need the parentheses -->
    <input type="button" id="button" onclick="sayThanks()">
    ```

    ```js
    /* When the browser reads the attribute, it creates a handler function
    with body from the attribute content. So the markup generates this property: */
    button.onclick = function() {
      sayThanks(); // <-- the attribute content goes here
    };
    ```

    To remove a handler – assign ***element*.on<event\> = null**

3. Methods: ***element*.addEventListener(event, handler[, options])** to add handler,</br>
   ***element*.removeEventListener(event, handler[, options])** to remove handler.

    + `event` - Event name, e.g. `"click"`.
    + `handler` - The handler function.
    + `options` - An additional optional object with properties:

        + `once`: if `true`, then the listener is automatically removed after it triggers.
        + `capture`: the *phase* where to handle the event. See in [==Bubbling and capturing==](#bubbling-and-capturing) point.</br>
           For historical reasons, `options` can also be `false/true`, that’s the same as `{capture: false/true}`.
        + `passive`: if `true`, then the handler will not call `#!js preventDefault()`(trying to do this will throw an error).</br>
        That’s useful for some mobile events, like `touchstart` and `touchmove`, to tell the browser that it should not wait for all handlers to finish before scrolling.</br>
        > For some browsers (Firefox, Chrome), `passive` is `true` by default for `touchstart` and `touchmove` events.

            See more about `#!js preventDefault()` in [==Preventing browser actions==](#preventing-browser-actions) point.

    To remove a handler:

    + we should pass exactly the same function as was assigned

        ```js
        // The handler won’t be removed, because 'removeEventListener' gets another function
        //  – with the same code, but that doesn’t matter, as it’s a different function object.
        elem.addEventListener( "click" , () => alert('Thanks!'));
        // ....
        elem.removeEventListener( "click", () => alert('Thanks!'));

        // Here’s the right way:
        function handler() {
          alert( 'Thanks!' );
        }

        input.addEventListener("click", handler);
        // ....
        input.removeEventListener("click", handler);
        // Please note – if we don’t store the function in a variable, then we can’t remove it.
        // There’s no way to “read back” handlers assigned by 'addEventListener'.
        ```

    + also the *phase* should be the same

        If we `#!js addEventListener(..., true)`, then we should mention the same phase in</br>
        `#!js removeEventListener(..., true)` to correctly remove the handler.

    ***element*.addEventListener(event, handler[, options])** allows to assign multiple handlers to one event.

    ```html
    <input id="elem" type="button" value="Click me"/>

    <script>
      function handler1() {
        alert('Thanks!');
      };

      function handler2() {
        alert('Thanks again!');
      }

      let elem = documnet.querySelecor("#elem");
      elem.onclick = () => alert("Hello");
      elem.addEventListener("click", handler1); // Thanks!
      elem.addEventListener("click", handler2); // Thanks again!
    </script>
    <!-- We can set handlers both using a DOM-property and 'addEventListener'.
    But generally we use only one of these ways. -->
    ```

    For some events, handlers only work with ***element*.addEventListener**

    + `DOMContentLoaded` event - triggers when the document is loaded and DOM is built

        ```js
        // will never run
        document.onDOMContentLoaded = function() {
          alert("DOM built");
        };

        // this way it works
        document.addEventListener("DOMContentLoaded", function() {
          alert("DOM built");
        });
        ```

      + `transitionend` event

    Also ***element*.addEventListener** supports *objects* as event handlers. In that case the method `#!js handleEvent` is called in case of the event.

    ```html
    <button id="elem">Click me</button>

    <script>
      let obj = {
        handleEvent(event) {
          alert(event.type + " at " + event.currentTarget);
        }
      };

      let elem = document.querySelecor("#elem");
      elem.addEventListener('click', obj);
    </script>
    <!-- As we can see, when 'addEventListener' receives an object as the handler,
    it calls 'obj.handleEvent(event)' in case of an event. -->
    ```

    We could also use a class for that:

    ```html
    <button id="elem">Click me</button>

    <script>
      class Menu {
        handleEvent(event) {
          switch(event.type) {
            case 'mousedown':
              elem.innerHTML = "Mouse button pressed";
              break;
            case 'mouseup':
              elem.innerHTML += "...and released.";
              break;
          }
        }
      }

      let menu = new Menu();
      elem.addEventListener('mousedown', menu);
      elem.addEventListener('mouseup', menu);
    </script>
    ```

    Here the same object handles both events. Please note that we need to explicitly setup the events to listen using `#!js addEventListener`. The `#!js menu` object only gets `mousedown` and `mouseup` here, not any other types of events.

    The method `#!js handleEvent` does not have to do all the job by itself. It can call other event-specific methods instead, like this:

    ```html
    <button id="elem">Click me</button>

    <script>
      class Menu {
        handleEvent(event) {
          // mousedown -> onMousedown
          let method = 'on' + event.type[0].toUpperCase() + event.type.slice(1);
          this[method](event);
        }

        onMousedown() {
          elem.innerHTML = "Mouse button pressed";
        }

        onMouseup() {
          elem.innerHTML += "...and released.";
        }
        // Now event handlers are clearly separated, that may be easier to support.
      }

      let menu = new Menu();
      elem.addEventListener('mousedown', menu);
      elem.addEventListener('mouseup', menu);
    </script>
    ```

### Event object

No matter how you assign the handler – it gets an *event object* as the first argument. That object contains the details about what’s happened.

Here’s an example of getting pointer coordinates from the event object:

```html
<input type="button" value="Click me" id="elem">

<script>
  elem.onclick = function(event) {
    // show event type, element and coordinates of the click
    alert(event.type + " at " + event.currentTarget);
    alert("Coordinates: " + event.clientX + ":" + event.clientY);
  };
  // 'event.type' - Event type, here it’s "click".
  /* 'event.currentTarget' - Element that handled the event. That’s exactly the same as 'this',
  unless the handler is an arrow function, or its 'this' is bound(using 'bind') to something else,
  then we can get the element from 'event.currentTarget'. */
  // 'event.clientX / event.clientY' - Window-relative coordinates of the cursor, for pointer events.
</script>
```

!!! note "The event object is also available in HTML handlers."

    ```js
    <input type="button" onclick="alert(event.type)" value="Event type">
    ```

    That’s possible because when the browser reads the attribute, it creates a handler like this: `#!js function(event) { alert(event.type) }`. That is: its first argument is called `event`, and the body is taken from the attribute.

### Bubbling and capturing

Всплытие и погружение

When an event happens – the most nested element where it happens gets labeled as the “target element” (`#!js event.target`). Then:

+ **Phase 1 - Capturing:** the event moves down from the `document` root to `#!js event.target`, ^^calling handlers^^ assigned with `addEventListener(..., true)` on the way (`true` is a shorthand for `{capture: true}`).

    !!! note "*Capture* phase is *invisible* for handlers and they only run on the 2nd and 3rd phases when:"

        they added using `on<event>`-property or using HTML attributes or using two-argument `#!js addEventListener(event, handler)`

    !!! note "The *capturing phase* is used very rarely."

        Usually we handle events on *bubbling*.

+ **Phase 2 - Target:** handlers(on both *capturing* and *bubbling* phases, i.e. this phase is ^^not handled separately^^) are called on the target element itself.

+ **Phase 3 - Bubbling:** the event bubbles up from `#!js event.target` to the root (till the `document` object, and some events even reach `window`), ^^calling handlers^^ assigned using `on<event>`, HTML attributes and `addEventListener` without the 3rd argument or with the 3rd argument `false/{capture:false}`.

    **Almost** all events *bubble*. Here the list of those that don't:

    + `focus` event

Example of both *capturing* and *bubbling* in action:

```html
<style>
  body * {
    margin: 10px;
    border: 1px solid blue;
  }
</style>

<form>FORM
  <div>DIV
    <p>P</p>
  </div>
</form>

<script>
  for(let elem of document.querySelectorAll('*')) {
    elem.addEventListener("click", e => alert(`Capturing: ${elem.tagName}`), true);
    elem.addEventListener("click", e => alert(`Bubbling: ${elem.tagName}`));
  }
</script>
```

The code sets click handlers on every element in the document to see which ones are working.

If you click on `#!html <p>`, then the sequence is:

1. `HTML` → `BODY` → `FORM` → `DIV` -> `P` (*capturing phase*, the first listener):
2. `P` → `DIV` → `FORM` → `BODY` → `HTML` (*bubbling phase*, the second listener).

Please note, the `P` shows up twice, because we’ve set two listeners: *capturing* and *bubbling*. The target triggers at the end of the first and at the beginning of the second phase.

!!! note "Listeners on same element and same phase run in their set order."

    If we have multiple event handlers on the same phase, assigned to the same element with `addEventListener`, they run in the same order as they are created:

    ```js
    elem.addEventListener("click", e => alert(1)); // guaranteed to trigger first
    elem.addEventListener("click", e => alert(2));
    ```

Each handler can access *event object* properties:

+ `#!js event.target` – the deepest element that originated the event.
+ `#!js event.currentTarget`(=`this`) – the current element that handles the event(the one that has the handler on it)
+ `#!js event.eventPhase` – the current phase (capturing=1, target=2, bubbling=3). It’s rarely used, because we usually know it in the handler.

Any event handler can **stop** the event capturing/bubbling by calling:

+ `#!js event.stopPropagation()` - for a single handler of that event

    That is if an element has multiple event handlers on a single event, then even if one of them stops the capturing/bubbling, the other ones still execute.</br>
    In other words, `#!js event.stopPropagation()` ^^stops the move downwards/upwards^^, but on the **current element** ^^all other^^ handlers will run.

+ `#!js event.stopImmediatePropagation()` - for a multiple handlers of that event

    This method ^^stops the capturing/bubbling^^ and prevents ^^handlers^^ on the **current element** from running. After it no other handlers execute.

```html
<!-- here 'body.onclick' doesn’t work if you click on <button> -->
<body onclick="alert(`the bubbling doesn't reach here`)">
  <button onclick="event.stopPropagation()">Click me</button>
</body>
```

!!! note "The `event.stop[Immediate]Propagation()` during the *capturing* also prevents the *bubbling*."

    In other words, normally the event goes first down (“capturing”) and then up (“bubbling”). But if `event.stop[Immediate]Propagation()` is called during the *capturing phase*, then the event travel stops, no *bubbling* will occur.

!!! warning "Don’t stop bubbling without a need!"

    Bubbling is convenient. Don’t stop it without a real need: obvious and architecturally well thought out.</br>
    Всплытие – это удобно. Не прекращайте его без явной нужды, очевидной и архитектурно прозрачной.

    Sometimes `event.stopPropagation()` creates hidden pitfalls that later may become problems.

    For instance:

    1. We create a nested menu. Each submenu handles clicks on its elements and calls `stopPropagation` so that the outer menu won’t trigger.
    2. Later we decide to catch clicks on the whole window, to track users’ behavior (where people click). Some analytic systems do that. Usually the code uses `#!js document.addEventListener('click'…)` to catch all clicks.
    3. Our analytic won’t work over the area where clicks are stopped by `stopPropagation`. Sadly, we’ve got a “dead zone”.

    There’s usually no real need to prevent the bubbling. A task that seemingly requires that may be solved by other means. One of them is to use custom events, we’ll cover them later. Also we can write our data into the `event` object in one handler and read it in another one, so we can pass to handlers on parents information about the processing below.

Bubbling and capturing lay the foundation for “event delegation” – an extremely powerful event handling pattern.

### Event delegation

*Event delegation* is of the most powerful event handling patterns.

It’s often used to add the ^^same handling for many similar elements^^, but not only for that.

^^same handling for many similar elements^^ - if we have a lot of elements handled in a similar way, then instead of assigning a handler to each of them – we put a single handler on their common ancestor.

The algorithm:

1. Put a single handler on the container.
2. In the handler – check the source element `#!js event.target`.
3. If the event happened inside an element that interests us, then handle the event.

Benefits:

+ Simplifies initialization and saves memory: no need to add many handlers.
+ Less code: when adding or removing elements, no need to add/remove handlers.
+ DOM modifications: we can mass add/remove elements with `innerHTML` and the like.

Limitations:

+ The event **must be bubbling**. Some events do not bubble.
+ Low-level handlers should not use `#!js event.stopPropagation()`.
+ The delegation may add CPU load, because the container-level handler reacts on events in any place of the container, no matter whether they interest us or not. But usually the ^^load is negligible^^, so **we don’t take it into account**.

#### Delegation examples

##### basic example: highlight a cell `<td>` on click

```html
<!DOCTYPE HTML>
<html>

<body>
  <style>
    #bagua-table th {
      text-align: center;
      font-weight: bold;
    }

    #bagua-table td {
      width: 150px;
      white-space: nowrap;
      text-align: center;
      vertical-align: bottom;
      padding-top: 5px;
      padding-bottom: 12px;
    }

    #bagua-table .nw {
      background: #999;
    }

    #bagua-table .n {
      background: #03f;
      color: #fff;
    }

    #bagua-table .ne {
      background: #ff6;
    }

    #bagua-table .w {
      background: #ff0;
    }

    #bagua-table .c {
      background: #60c;
      color: #fff;
    }

    #bagua-table .e {
      background: #09f;
      color: #fff;
    }

    #bagua-table .sw {
      background: #963;
      color: #fff;
    }

    #bagua-table .s {
      background: #f60;
      color: #fff;
    }

    #bagua-table .se {
      background: #0c3;
      color: #fff;
    }

    #bagua-table .highlight {
      background: red;
    }
  </style>

  <table id="bagua-table">
    <tr>
      <th colspan="3"><em>Bagua</em> Chart: Direction, Element, Color, Meaning</th>
    </tr>
    <tr>
      <td class="nw"><strong>Northwest</strong>
        <br>Metal
        <br>Silver
        <br>Elders
      </td>
      <td class="n"><strong>North</strong>
        <br>Water
        <br>Blue
        <br>Change
      </td>
      <td class="ne"><strong>Northeast</strong>
        <br>Earth
        <br>Yellow
        <br>Direction
      </td>
    </tr>
    <tr>
      <td class="w"><strong>West</strong>
        <br>Metal
        <br>Gold
        <br>Youth
      </td>
      <td class="c"><strong>Center</strong>
        <br>All
        <br>Purple
        <br>Harmony
      </td>
      <td class="e"><strong>East</strong>
        <br>Wood
        <br>Blue
        <br>Future
      </td>
    </tr>
    <tr>
      <td class="sw"><strong>Southwest</strong>
        <br>Earth
        <br>Brown
        <br>Tranquility
      </td>
      <td class="s"><strong>South</strong>
        <br>Fire
        <br>Orange
        <br>Fame
      </td>
      <td class="se"><strong>Southeast</strong>
        <br>Wood
        <br>Green
        <br>Romance
      </td>
    </tr>

  </table>

  <script>
    let table = document.getElementById('bagua-table');

    let selectedTd;

    // code for basic explanation, see after this codeblock
    table.onclick = function(event) {
      let td = event.target.closest('td'); // (1)
      if (!td) return; // (2)
      if (!table.contains(td)) return; // (3)
      highlight(td); // (4)
    };

    // more advaced code that do the same as 'table.oncklick = ...' block above
    table.onclick = function(event) {
      let target = event.target; // where was the click?
      while (target != this) {
        if (target.tagName == 'TD') {
          highlight(target); // highlight it
          return;
        }
        // while we are not on 'TD' we "level up" our target variable
        // to the next 'parentNode' until it reaches 'TD' node
        target = target.parentNode;
      }
    }

    function highlight(node) {
      if (selectedTd) { // remove the existing highlight if any
        selectedTd.classList.remove('highlight');
      }
      selectedTd = node;
      selectedTd.classList.add('highlight'); // highlight the new td
    }
  </script>

</body>

</html>
```

1. The method ***element*.closest(selector)** returns the nearest ancestor that matches the selector. In our case we look for `#!html <td>` on the way up from the source element.
2. If `#!js event.target` is not inside any `#!html <td>`, then the call returns immediately, as there’s nothing to do.
3. In case of nested tables, `#!js event.target` may be a `#!html <td>`, but lying outside of the current table. So we check if that’s actually **our table’s** `#!html <td>`.
4. And, if it’s so, then highlight it.

As the result, we have a fast, efficient highlighting code, that doesn’t care about the total number of `#!html <td>` in the table.

##### actions in markup

действия в разметке

Let’s say, we want to make a menu with buttons “Save”, “Load”, “Search” and so on. And there’s an object with methods `save`, `load`, `search`… How to match them?</br>
The first idea may be to assign a separate handler to each button. But there’s a more elegant solution. We can add a handler for the whole menu and `data-action` attributes for buttons that has the method to call.</br>
The handler reads the attribute and executes the method.

```html
<div id="menu">
  <button data-action="save">Save</button>
  <button data-action="load">Load</button>
  <button data-action="search">Search</button>
</div>

<script>
  class Menu {
    constructor(elem) {
      this._elem = elem;
      elem.onclick = this.onClick.bind(this); // (*)
    }

    save() {
      alert('saving');
    }

    load() {
      alert('loading');
    }

    search() {
      alert('searching');
    }

    onClick(event) {
      let action = event.target.dataset.action;
      if (action) {
        this[action]();
      }
    };
  }

  new Menu(menu);
</script>
```

Please note that `#!js this.onClick` is bound to `#!js this` in `(*)`. That’s important, because otherwise `#!js this` inside it would reference the DOM element(`#!js elem`), not the `#!js Menu` object, and `#!js this[action]` would not be what we need.

So, what advantages does delegation give us here?

+ We don’t need to write the code to assign a handler to each button. Just make a method and put it in the markup.
+ The HTML structure is flexible, we can add/remove buttons at any time.

We could also use classes `#!css .action-save`, `#!css .action-load`, but an attribute `data-action` is better semantically. And we can use it in CSS rules too.

#### The “behavior” pattern

We can also use event delegation to add “behaviors” to elements **declaratively**, with special attributes and classes.

The pattern has two parts:

1. We add a custom attribute to an element that describes its behavior.
2. A ^^document-wide^^ handler tracks events, and if an event happens on an attributed element – performs the action.

The “behavior” pattern can be an alternative to mini-fragments of JavaScript.

##### example: counter

Here the attribute `data-counter` adds a behavior: “increase value on click” to buttons:

```html
Counter: <input type="button" value="1" data-counter>
One more counter: <input type="button" value="2" data-counter>

<script>
  document.addEventListener('click', function(event) {

    if (event.target.dataset.counter != undefined) { // if the attribute exists...
      event.target.value++;
    }

  });
</script>
```

If we click a button – its value is increased. Not buttons, but the general approach is important here.</br>
There can be as many attributes with `data-counter` as we want. We can add new ones to HTML at any moment. Using the *event delegation* we “extended” HTML, added an attribute that describes a new behavior.

!!! warning "For document-level handlers – always use `#!js addEventListener`."

    When we assign an event handler to the `document` object, we should always use `#!js addEventListener`, not `#!js document.on<event>`, because the latter will cause conflicts: new handlers overwrite old ones.</br>
    For real projects it’s normal that there are many handlers on document set by different parts of the code.

##### example: toggler

A click on an element with the attribute `data-toggle-id` will show/hide the element with the given `id`:

```html
<button data-toggle-id="subscribe-mail">
  Show the subscription form
</button>

<form id="subscribe-mail" hidden>
  Your mail: <input type="email">
</form>

<script>
  document.addEventListener('click', function(event) {
    let id = event.target.dataset.toggleId;
    if (!id) return;

    let elem = document.getElementById(id);

    elem.hidden = !elem.hidden;
  });
</script>
```

Now, to add toggling functionality to an element no need to write JavaScript for every such element. Just use the behavior, i.e. the attribute `data-toggle-id`. The ^^document-level^^ handler makes it work for any element of the page.</br>
We can combine multiple behaviors on a single element as well.

### Browser default actions

There are many default browser actions:

+ `mousedown` – starts the selection (move the mouse to select).
+ `click on` `#!html <input type="checkbox">` – checks/unchecks the input.
+ `contextmenu` – the event happens on a right-click, the action is to show the browser context menu.
+ `submit` – clicking an `#!html <input type="submit">` or hitting ++enter++ inside a form field causes this event to happen, and the browser submits the form after it.
+ `keydown` – pressing a key may lead to adding a character into a field, or other actions.
+ …there are more…

#### Preventing browser actions

All the default actions can be prevented if we want to handle the event exclusively by JavaScript.

To prevent a default action:

+ `#!js event.preventDefault()` - this is the main way

+ `#!js return false` - this way works only for handlers assigned with `on<event>` element method

    !!! note "`#!js return false` is an exception."

        The value returned by an event handler is usually ignored.

        The only exception is `#!js return false` from a handler assigned using `on<event>`.

        In all other cases, `#!js return` value is ignored. In particular, there’s no sense in returning `true`.

```html
<!-- a click on a link doesn’t lead to navigation; the browser doesn’t do anything -->
<a href="/" onclick="return false">Click here</a>
or
<a href="/" onclick="event.preventDefault()">here</a>
```

!!! note "Follow-up events."

    Certain events flow one into another. If we prevent the first event, there will be no second.

    For instance, `mousedown` on an `#!html <input>` field leads to focusing in it, and the `focus` event. If we prevent the `mousedown` event, there’s no focus.

!!! warning "Stay semantic, don’t abuse. Сохраняйте семантику, не злоупотребляйте."

    Technically, by preventing default actions and adding JavaScript we can customize the behavior of any elements. For instance, we can make a link `#!html <a>` work like a button, and a button `#!html <button>` behave as a link (redirect to another URL or so).

    But we should generally keep the semantic meaning of HTML elements. For instance, `#!html <a>` should perform navigation, not a button.

    Besides being “just a good thing”, that makes your HTML better in terms of accessibility.

    Also if we consider the example with `#!html <a>`, then please note: a browser allows us to open such links in a new window (by right-clicking them and other means). And people like that. But if we make a button behave as a link using JavaScript and even look like a link using CSS, then `#!html <a>`-specific browser features still won’t work for it.

    ```html
    <input value="Focus works" onfocus="this.value=''">
    <input onmousedown="return false" onfocus="this.value=''" value="Click me">
    ```

If the default action was prevented, the value of `#!js event.defaultPrevented` becomes `true`, otherwise it’s `false`.

Sometimes we can use `#!js event.defaultPrevented` instead of using `#!js event.stopPropagation()`, to signal other event handlers that the event was handled.

Example: Preventing default actions of `contextmenu` for `#!html <button>` element and also for whole `document`. The problem is that when we click on elem, we get two menus: the button-level and (the event bubbles up) the document-level menu. Here is the solution:

```html
<p>Right-click for the document menu (added a check for event.defaultPrevented)</p>
<button id="elem">Right-click for the button menu</button>

<script>
  elem.oncontextmenu = function(event) {
    event.preventDefault();
    alert("Button context menu");
  };

  document.oncontextmenu = function(event) {
    // solution: check if the default action was prevented?
    // If it is so, then the event was handled, and we don’t need to react on it.
    if (event.defaultPrevented) return;

    event.preventDefault();
    alert("Document context menu");
  };
</script>
```

If we have nested elements, and each of them has a context menu of its own, that would also work. Just make sure to check for `#!js event.defaultPrevented` in each `contextmenu` handler.

### Dispatching custom events(TODO)

Генерация пользовательских событий

TODO: [https://javascript.info/dispatch-events](https://javascript.info/dispatch-events)

## UI Events

### Mouse events

!!! note "Such events may come not only from “mouse devices”."

    But are also from other devices, such as phones and tablets, where they are emulated for compatibility.

Mouse event types:

1. Simple events:

    + `mousedown/mouseup` - Mouse button is clicked/released over an element.
    + `mouseover/mouseout` - Mouse pointer comes over/out from an element.</br>
        They trigger even when we go from the parent element to a child element.</br>
        The browser assumes that the mouse can be only over one element at one time – the deepest one.</br>
        See more on [==mouseover/out==](#mouseoverout) point.

    + `mouseenter/mouseleave` - Mouse pointer enters/leaves the element.</br>
        They only trigger when the mouse comes in and out the element ^^as a whole^^.</br>
        Also they do not bubble.</br>
        See more on [==mouseenter/leave==](#mouseenterleave) point.

    + `mousemove` - Every mouse move over an element triggers that event.

        !!! note "A fast mouse move may skip intermediate elements."

            `mousemove` **doesn't** trigger on every pixel. The browser checks the mouse position from time to time.</br>
            That means that if the visitor is moving the mouse very fast then some DOM-elements may be skipped.

            That’s good for performance, because there may be many intermediate elements. We don’t really want to process in and out of each one.

    + `contextmenu` - Triggers when the **right mouse** button is pressed. There are other ways to open a context menu, e.g. using a special keyboard key, it triggers in that case also, so it’s not exactly the mouse event.

2. Complex events(consist of several simple events):

    + `click` - Triggers after `mousedown` and then `mouseup` over the same element if the **left mouse** button was used.
    + `dblclick` - Triggers after two clicks on the same element within a short timeframe. Rarely used nowadays.

#### Mouse event properties

##### mouse button

+ **event.button** - returns the exact mouse button

    Has following possible values:

    + `0` - Left button (primary)
    + `1` - Middle button (auxiliary)
    + `2` - Right button (secondary)
    + `3` - X1 button (back)
    + `4` - X2 button (forward)

+ **event.buttons** - return all currently pressed buttons as an integer, one bit per button.</br>
  In practice this property is very rarely used, you can find details at [MDN](https://developer.mozilla.org/en-US/docs/Web/api/MouseEvent/buttons) if you ever need it.

+ **event.which** - DEPRECATED! An old non-standard way of getting a button, with possible values:

    + `event.which == 1` – Left button,
    + `event.which == 2` – Middle button,
    + `event.which == 3` – Right button.

##### modifiers: shift, alt, ctrl and meta

+ `shiftKey`: ++shift++
+ `altKey`: ++alt++ (or ++opt++ for Mac)
+ `ctrlKey`: ++ctrl++
+ `metaKey`: ++cmd++ for Mac

They are `true` if the corresponding key was pressed during the event.

For instance, the button below only works on ++alt+shift+++ click:

```html
<button id="button">Alt+Shift+Click on me!</button>

<script>
  button.onclick = function(event) {
    if (event.altKey && event.shiftKey) {
      alert('Hooray!');
    }
  };
</script>
```

!!! tip "Attention: on Mac it’s usually ++cmd++ instead of ++ctrl++."

    Even if we’d like to force Mac users to ++ctrl+++click – that’s kind of difficult. The problem is: a left-click with ++ctrl++ is interpreted as a *right-click* on MacOS, and it generates the contextmenu event, not `click` like Windows/Linux.

    So if we want users of all operating systems to feel comfortable, then together with `ctrlKey` we should check `metaKey`.

    For JS-code it means that we should check `#!js if (event.ctrlKey || event.metaKey)`.

##### coordinates

All mouse events provide coordinates in two flavours:

1. Window-relative: `clientX` and `clientY`.

    Are counted from the ^^current^^ window left-upper corner. When the page is scrolled, they change.

    For instance, if we have a window of the size 500x500, and the mouse is in the left-upper corner, then `clientX` and `clientY` are `0`, no matter how the page is scrolled.</br>
    And if the mouse is in the center, then `clientX` and `clientY` are `250`, no matter what place in the document it is. They are similar to `#!css position:fixed` in that aspect.</br>
    Move the mouse over the input field to see `clientX/clientY` (the example is in the `iframe`, so coordinates are relative to that `iframe`):

    ```html
    <input onmousemove="this.value=event.clientX+':'+event.clientY" value="Mouse over me">
    ```

2. Document-relative: `pageX` and `pageY`.

    Are counted from the left-upper corner ^^of the document^^, and do not change when the page is scrolled.

#### Preventing selection on `mousedown`

Selection cases:

1. **Left mouse holding pressing and moving:** makes the selection, often unwanted.</br>
TODO: There are multiple ways to prevent the selection, that you can read in [https://javascript.info/selection-range](https://javascript.info/selection-range).

2. **Double mouse click:** has a side effect that may be disturbing in some interfaces: it selects text.

    To prevent selection in this case is to prevent the browser action on `mousedown`. It prevent first selection case too.

    ```html
    Before...
    <b ondblclick="alert('Click!')" onmousedown="return false">
      Double-click me
    </b>
    ...After
    ```

    Now the bold element is not selected on double clicks, and pressing the left button on it won’t start the selection.</br>
    The text inside it is still selectable. However, the selection should start not on the text itself, but before or after it. Usually that’s fine for users.

!!! note "Preventing copying."

    If we want to disable selection to protect our page content from copy-pasting, then we can use another event: `oncopy`.

    ```html
    <div oncopy="alert('Copying forbidden!');return false">
      Dear user,
      The copying is forbidden for you.
      If you know JS or HTML, then you can get everything from the page source though.
    </div>
    ```

#### Moving the mouse

##### mouseover/out

The `mouseover` event occurs when a mouse pointer comes over an element, and `mouseout` – when it leaves.

!!! note "If `mouseover` triggered, there must be `mouseout`."

    In case of fast mouse movements, intermediate elements may be ignored, but one thing we know for sure: if the pointer “officially” entered an element (`mouseover` event generated), then upon leaving it we always get `mouseout`.

These event have special property `#!js event.relatedTarget`

For `mouseover`:

+ `#!js event.target` – is the element ^^where^^ the mouse came over.
+ `#!js event.relatedTarget` – is the element ^^from which^^ the mouse came (`relatedTarget` → `target`).

For `mouseout` the reverse:

+ `#!js event.target` – is the element that the mouse ^^left^^.
+ `#!js event.relatedTarget` – is the new under-the-pointer element, that mouse ^^left for^^ (`target` → `relatedTarget`).

!!! note "`#!js event.relatedTarget` can be null."

    That’s normal and just means that the mouse came not from another element, but from out of the window. Or that it left the window.</br>
    If we access `#!js event.relatedTarget.tagName`, then there will be an error.

**`mouseout` when leaving for a child:**

An important feature of `mouseout` – it triggers, when the pointer moves from an element to its ^^descendant^^(just the same as if it was moving ^^out of^^ the parent element itself), e.g. if we’re on `#parent` and then move the pointer deeper into `#child`, we get `mouseout` on `#parent` in this HTML:

```html
<div id="parent">
  <div id="child">...</div>
</div>
```

According to the browser logic: **the mouse cursor may be only over a ^^single^^ element at any time – the most nested one and top by z-index.** So if it goes to another element (**even a descendant**), then it leaves the previous one.

**`mouseover` when leaving for a child:**

The `mouseover` event on a descendant ^^bubbles up^^. So, if `#parent` has `mouseover` handler, it triggers.

In the example below moving the mouse from `#parent` to `#child`, generates two events on `#parent`:

1. `mouseout [target: parent]` (left the parent), then
2. `mouseover [target: child]` (came to the child, bubbled).

```html
<!doctype html>
<html>

<head>
  <meta charset="UTF-8">
</head>

<body>

  <style>
    #parent {
      background: #99C0C3;
      width: 160px;
      height: 120px;
      position: relative;
    }

    #child {
      background: #FFDE99;
      width: 50%;
      height: 50%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    textarea {
      height: 140px;
      width: 300px;
      display: block;
    }
  </style>

  <div id="parent" onmouseover="mouselog(event)" onmouseout="mouselog(event)">parent
    <div id="child">child</div>
  </div>

  <textarea id="text"></textarea>
  <input type="button" onclick="text.value=''" value="Clear">

  <script>
    function mouselog(event) {
      let d = new Date();
      text.value += `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()} | ${event.type} [target: ${event.target.id}]\n`.replace(/(:|^)(\d\D)/, '$10$2');
      text.scrollTop = text.scrollHeight;
    }
  </script>

</body>

</html>
```

If there are some actions upon leaving the parent element, e.g. an animation runs in `#!js parent.onmouseout`, we usually don’t want it when the pointer just goes deeper into `#parent`.</br>
To avoid it, we can check `#!js event.relatedTarget` in the handler and, if the mouse is still inside the element, then ignore such event.</br>
Alternatively we can use other events: `mouseenter` and `mouseleave`, see next point.

##### mouseenter/leave

`mouseenter/mouseleave` like `mouseover/mouseout` trigger when the mouse pointer enters/leaves the element.

But there are two important differences:

1. Transitions inside the element, ^^to/from descendants^^, are **not counted**.
2. Events `mouseenter/mouseleave` **do not bubble**.

So if in the example form previous point above we'll change the events on top element `#!html <div id='parent' ... >`  from `mouseover/mouseout` to `mouseenter/mouseleave`, we'll see that he only generated events are the ones related to moving the pointer in and out of the top element. Nothing happens when the pointer goes to the child and back. Transitions between descendants are ignored.

##### event delegation example

Highlighting `TD` elements as the mouse travels across them:

Beacuse of limitation of "not-bubbling" of the `mouseenter/mouseleave` events we use `mouseover/mouseout` events for "delegation" event handling pattern.

In our case we’d like to handle transitions between table cells `#!html <td>`: entering a cell and leaving it. Other transitions, such as inside the cell or outside of any cells, don’t interest us. Let’s filter them out.

Here’s what we can do:

+ Remember the currently highlighted `#!html <td>` in a variable, let’s call it `currentElem`.
+ On `mouseover` – ignore the event if we’re still inside the current `#!html <td>`.
+ On `mouseout` – ignore if we didn’t leave the current `#!html <td>`.

```html
<!DOCTYPE HTML>
<html>

<head>
  <meta charset="utf-8">
</head>

<body>

  <style>
    #text {
      display: block;
      height: 100px;
      width: 456px;
    }

    #table th {
      text-align: center;
      font-weight: bold;
    }

    #table td {
      width: 150px;
      white-space: nowrap;
      text-align: center;
      vertical-align: bottom;
      padding-top: 5px;
      padding-bottom: 12px;
      cursor: pointer;
    }

    #table .nw {
      background: #999;
    }

    #table .n {
      background: #03f;
      color: #fff;
    }

    #table .ne {
      background: #ff6;
    }

    #table .w {
      background: #ff0;
    }

    #table .c {
      background: #60c;
      color: #fff;
    }

    #table .e {
      background: #09f;
      color: #fff;
    }

    #table .sw {
      background: #963;
      color: #fff;
    }

    #table .s {
      background: #f60;
      color: #fff;
    }

    #table .se {
      background: #0c3;
      color: #fff;
    }

    #table .highlight {
      background: red;
    }
  </style>

  <table id="table">
    <tr>
      <th colspan="3"><em>Bagua</em> Chart: Direction, Element, Color, Meaning</th>
    </tr>
    <tr>
      <td class="nw"><strong>Northwest</strong>
        <br>Metal
        <br>Silver
        <br>Elders
      </td>
      <td class="n"><strong>North</strong>
        <br>Water
        <br>Blue
        <br>Change
      </td>
      <td class="ne"><strong>Northeast</strong>
        <br>Earth
        <br>Yellow
        <br>Direction
      </td>
    </tr>
    <tr>
      <td class="w"><strong>West</strong>
        <br>Metal
        <br>Gold
        <br>Youth
      </td>
      <td class="c"><strong>Center</strong>
        <br>All
        <br>Purple
        <br>Harmony
      </td>
      <td class="e"><strong>East</strong>
        <br>Wood
        <br>Blue
        <br>Future
      </td>
    </tr>
    <tr>
      <td class="sw"><strong>Southwest</strong>
        <br>Earth
        <br>Brown
        <br>Tranquility
      </td>
      <td class="s"><strong>South</strong>
        <br>Fire
        <br>Orange
        <br>Fame
      </td>
      <td class="se"><strong>Southeast</strong>
        <br>Wood
        <br>Green
        <br>Romance
      </td>
    </tr>

  </table>

  <textarea id="text"></textarea>

  <input type="button" onclick="text.value=''" value="Clear">

  <script>
    // <td> under the mouse right now (if any)
    let currentElem = null;

    table.onmouseover = function(event) {
      // before entering a new element, the mouse always leaves the previous one
      // if currentElem is set, we didn't leave the previous <td>,
      // that's a mouseover inside it, ignore the event
      if (currentElem) return;

      let target = event.target.closest('td');

      // we moved not into a <td> - ignore
      if (!target) return;

      // moved into <td>, but outside of our table (possible in case of nested tables)
      // ignore
      if (!table.contains(target)) return;

      // hooray! we entered a new <td>
      currentElem = target;
      onEnter(currentElem);
    };

    table.onmouseout = function(event) {
      // if we're outside of any <td> now, then ignore the event
      // that's probably a move inside the table, but out of <td>,
      // e.g. from <tr> to another <tr>
      if (!currentElem) return;

      // we're leaving the element – where to? Maybe to a descendant?
      let relatedTarget = event.relatedTarget;

      while (relatedTarget) {
        // go up the parent chain and check – if we're still inside currentElem
        // then that's an internal transition – ignore it
        if (relatedTarget == currentElem) return;

        relatedTarget = relatedTarget.parentNode;
      }

      // we left the <td>. really.
      onLeave(currentElem);
      currentElem = null;
    };

    // any functions to handle entering/leaving an element
    function onEnter(elem) {
      elem.style.background = 'pink';

      // show that in textarea
      text.value += `over -> ${currentElem.tagName}.${currentElem.className}\n`;
      text.scrollTop = 1e6;
    }

    function onLeave(elem) {
      elem.style.background = '';

      // show that in textarea
      text.value += `out <- ${elem.tagName}.${elem.className}\n`;
      text.scrollTop = 1e6;
    }
  </script>

</body>

</html>
```

### Drag'n'Drop with mouse events(TODO)

TODO: [https://javascript.info/mouse-drag-and-drop](https://javascript.info/mouse-drag-and-drop)

### Pointer events(TODO)

TODO: [https://javascript.info/pointer-events](https://javascript.info/pointer-events)

### Keyboard events

Pressing a key always generates a keyboard events:

+ `keypress`(legacy) – no need to use anymore!
+ `keydown` – on pressing the key (*auto-repeats*, i.e. triggers again and again if the key is pressed for long)
+ `keyup` – on releasing the key

The only exception is ++fn++ key, because it’s often implemented on lower level than OS.

Main keyboard event properties:

+ `#!js event.keyCode/charCode/which`(legacy) - no need to use anymore!
+ `#!js event.code` – the “key code” specific to the physical location of the key on keyboard. Key codes described in the [UI Events code specification](https://www.w3.org/TR/uievents-code/).

    For instance:

    + Letter keys have codes `Key<letter>`: `KeyA`, `KeyB` etc.

        There are several widespread keyboard layouts, and the specification gives key codes for each of them.</br>
        Read the [alphanumeric section of the spec](https://www.w3.org/TR/uievents-code/#key-alphanumeric-section) for more codes.

    + Digit keys have codes: `Digit<number>`: `Digit0`, `Digit1` etc.

    + Special keys are mostly coded by their names: `Enter`, `Backspace`, `Tab`,`ShiftRight` ,`ShiftLeft` , `F1` etc.

+ `#!js event.key` – the character (`"A"`, `"a"` and so on), for non-character keys, such as ++esc++, usually has the same value as `#!js event.code`.

!!! tip "`#!js event.key` vs. `#!js event.code`"

    To handle ^^keyboard layout-dependant^^ keys → `#!js event.key` is the way to go.</br>
    Because same letters in different layouts may map to different physical keys, leading to different codes.</br>
    See the full list in the [specification](https://www.w3.org/TR/uievents-code/#table-key-code-alphanumeric-writing-system).

    To get a **hotkey** to work even after a ^^language^^ switch → `#!js event.code` may be better.

+ `#!js event.repeat` - for events triggered by *auto-repeat* this property set to `true`(defatul value is `fasle`)

Examples:

+ Preventing default acitons on `keydown`:

    We can cancel most of them, with the exception of OS-based special keys. For instance, on Windows ++alt+f4++ closes the current browser window. And there’s no way to stop it by preventing the default action in JavaScript.

    For instance, the `#!html <input>` below expects a phone number, so it does not accept keys except digits, `+`, `()`, `-`, `Left`, `Right`, `Delete`, `Backspace`:

    ```html
    <script>
    function checkPhoneKey(key) {
      return (key >= '0' && key <= '9') ||
        ['+','(',')','-','ArrowLeft','ArrowRight','Delete','Backspace'].includes(key);
    }
    </script>
    <input onkeydown="return checkPhoneKey(event.key)" placeholder="Phone, please" type="tel">
    ```

    The onkeydown handler here uses checkPhoneKey to check for the key pressed. If it’s valid, then it returns `true`, otherwise `false`.</br>
    As we know, the `false` value returned from the event handler, assigned using a DOM property or an attribute, such as above, prevents the default action, so nothing appears in the `#!html <input>` for keys that don’t pass the test. (The `true` value returned doesn’t affect anything, only returning `false` matters)

+ Text characters limit counter:

    ```html
    <!DOCTYPE html>
    <html lang="en">

    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
    </head>

    <body>

      <style>
        .textarea {
        }

        .textarea__item {
            width: 300px;
            height: 150px;
            padding: 10px;
            font-size: 18px;
            color: #fff;
            background-color: rgb(44, 43, 43);
        }

        .textarea__counter {
        }
      </style>

      <div class="textarea">
        <textarea autocomplete="off" maxlength="30" name="form[]" class="textarea__item"></textarea>
        <div class="textarea__counter">Осталось <span></span> символов</div>
      </div>

      <script>
        const txtItem = document.querySelector('.textarea__item');
        const txtItemLimit = txtItem.getAttribute('maxlength');
        const txtCounter = document.querySelector('.textarea__counter span');
        txtCounter.innerHTML = txtItemLimit;

        txtItem.addEventListener("keyup", txtSetCounter);
        txtItem.addEventListener("keydown", function (event) {
          if (event.repeat) txtSetCounter();
        });

        function txtSetCounter() {
          const txtCounterResult = txtItemLimit - txtItem.value.length;
          txtCounter.innerHTML = txtCounterResult;
        }
      </script>

    </body>

    </html>
    ```

!!! warning "Not 100% reliable."

    In the past, keyboard events were sometimes used to track user input in form fields. That’s not reliable, because the input can come from various sources(e.g. mobile keyboards formally known as IME(Input-Method Editor)). We have `input` and `change` events to handle any input (covered in [TODO: Events: change, input, cut, copy, paste](https://javascript.info/events-change-input)). They trigger after any kind of input, including copy-pasting or speech recognition.

!!! tip "We should use keyboard events when we really want keyboard."

    For example, to react on hotkeys or special keys.

### Scrolling

`scroll` event - allows reacting to a page or element scrolling

May be used for:

+ Show/hide additional controls or information depending on where in the document the user is.
+ Load more data when the user scrolls down till the end of the page.

**BUT:** there is more interesting way to implement these(and many others) functionalitis by using *IntersectionObserver* which allows asynchronously watch for ^^intersection^^ of the element with his parent or visible document area.

```js
// a small function to show the current scroll:
window.addEventListener('scroll', function() {
  document.getElementById('showScroll').innerHTML = window.pageYOffset + 'px';
});
/*
In action:
  - The 'scroll' event works both on the 'window' and on scrollable elements.
*/
```

#### Prevent scrolling

We can’t prevent scrolling by using `#!js event.preventDefault()` in onscroll listener, because it triggers after the scroll has already happened.</br>
But we can prevent scrolling by `#!js event.preventDefault()` on an event that causes the scroll, for instance `keydown` event for ++page-up++ and ++page-down++.</br>
If we add an event handler to these events and `#!js event.preventDefault()` in it, then the scroll won’t start.

**BUT:** There are many ways to initiate a scroll, so it’s ^^more reliable^^ to use CSS, `#!css overflow: hidden;` property.

## Document and resource loading

### Page: `DOMContentLoaded`, `load`, `beforeunload`, `unload`

Page load events:

+ `DOMContentLoaded` - triggers on `document` when the browser fully loaded HTML, and the DOM tree is built, but external resources like ^^pictures `#!html <img>`^^ and ^^stylesheets^^, etc. may not yet have loaded.

    *Usage:* the handler can lookup DOM nodes, initialize the interface.

    We must use `#!js addEventListener` to catch it:

    ```html
    <script>
      function ready() {
        alert('DOM is ready');

        // image is not yet loaded (unless it was cached), so the size is 0x0
        alert(`Image size: ${img.offsetWidth}x${img.offsetHeight}`);
      }
      /*
      The 'DOMContentLoaded' handler runs when the document is loaded,
      so it can see all the elements, including <img> below.
      But it doesn’t wait for the image to load. So 'alert' shows zero sizes.
       */
      document.addEventListener("DOMContentLoaded", ready);
      // not "document.onDOMContentLoaded = ..."
    </script>

    <img id="img" src="https://en.js.cx/clipart/train.gif?speed=1&cache=0">
    ```

    Peculiarities(особенности) regarding  `DOMContentLoaded` event running:

    1. Script such as `#!html <script>...</script>` or `#!html <script src="..."></script>` block DOMContentLoaded.

        When the browser processes an HTML-document and comes across a `#!html <script>` tag, it needs to execute before continuing building the DOM. That’s a precaution, as scripts may want to modify DOM, and even `#!js document.write` into it, so `DOMContentLoaded` has to wait.

        ```html
        <!-- we first see “Library loaded…”, and then “DOM ready!” (all scripts are executed) -->
        <script>
          document.addEventListener("DOMContentLoaded", () => {
            alert("DOM ready!");
          });

        </script>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.3.0/lodash.js"></script>

        <script>
          alert("Library loaded, inline script executed");
        </script>
        ```

        !!! warning "Scripts that don’t block DOMContentLoaded."

            There are two exceptions from this rule:

            1. Scripts with the `async` attribute, don’t block `DOMContentLoaded`. See [TODO: https://javascript.info/script-async-defer](https://javascript.info/script-async-defer)
            2. Scripts that are generated dynamically with `#!js document.createElement('script')` and then added to the webpage also don’t block this event.

    2. Images and other resources may also still continue loading.

        External style sheets don’t affect DOM, so `DOMContentLoaded` does not wait for them.

        **BUT:** If we have a script after the style, then that script must wait until the stylesheet loads:

        ```html
        <link type="text/css" rel="stylesheet" href="style.css">
        <script>
          // the script doesn't execute until the stylesheet is loaded
          alert(getComputedStyle(document.body).marginTop);
        </script>
        ```

        The reason for this is that the script may want to get coordinates and other style-dependent properties of elements, like in the example above. Naturally, it has to wait for styles to load.</br>
        As `DOMContentLoaded` waits for scripts, it now waits for styles before them as well.

      1. Built-in browser autofill.

          Firefox, Chrome and Opera autofill forms on `DOMContentLoaded`.

          For instance, if the page has a form with login and password, and the browser remembered the values, then on `DOMContentLoaded` it may try to autofill them (if approved by the user).

          So if `DOMContentLoaded` is postponed by long-loading scripts, then autofill also awaits – the login/password fields don’t get autofilled immediately, but there’s a delay till the page fully loads. That’s actually the delay until the `DOMContentLoaded` event.

+ `load` - triggers on `window` when the page and all external resources(images, styles etc.) are loaded.

    *Usage:* external resources are loaded, so styles are applied, image sizes are known etc. We rarely use it, because there’s usually no need to wait for so long.

    ```html
    <!-- correctly shows image sizes, because 'window.onload' waits for all images: -->
    <script>
      window.onload = function() { // can also use window.addEventListener('load', (event) => {
        alert('Page loaded');

        // image is loaded at this time
        alert(`Image size: ${img.offsetWidth}x${img.offsetHeight}`);
      };
    </script>

    <img id="img" src="https://en.js.cx/clipart/train.gif?speed=1&cache=0">
    ```

+ `beforeunload` - triggers on `window` when the user wants to leave the page.

    *Usage:* cancel the transition to another page - if we cancel the event, browser asks whether the user really wants to leave(e.g we have unsaved changes).

+ `unload` - triggers on `window` when the user is finally leaving

      *Usage:* the user almost left and in the handler we can only do simple things that do not involve delays or asking a user. Because of that limitation, it’s rarely used. For instanse:

      + we can close related popup windows
      + we can send out a network request with a special `#!js navigator.sendBeacon(url, data)` method (described in the specification [https://w3c.github.io/beacon/](https://w3c.github.io/beacon/)), that contains e.g. the data about how the page is used: mouse clicks, scrolls, viewed page areas, and so on

          `#!js sendBeacon` sends data in background without delaying the  transition to another page: the browser leaves the page, but still performs `#!js sendBeacon`. Here’s how to use it:

          ```js
          let analyticsData = { /* object with gathered data */ };

          window.addEventListener("unload", function() {
            navigator.sendBeacon("/analytics", JSON.stringify(analyticsData));
          });
          ```

          1. the request is sent as POST
          2. we can send not only a string, but also forms and other formats(see [Fetch](https://javascript.info/fetch)), but usually it’s a stringified object
          3. the data is limited by 64kb

          When the `#!js sendBeacon` request is finished, the browser probably has already left the document, so there’s no way to get server response (which is usually empty for analytics).</br>
          There’s also a `keepalive` flag for doing such “after-page-left” requests in fetch method for generic network requests. You can find more information in the chapter [Fetch API](https://javascript.info/fetch-api).

+ `#!js document.readyState` is the current state of the document, changes can be tracked in the `readystatechange` event:
    + `loading` – the document is loading.
    + `interactive` – the document is parsed, happens at about the same time as `DOMContentLoaded`, but before it.
    + `complete` – the document and resources are loaded, happens at about the same time as window.onload, but before it
