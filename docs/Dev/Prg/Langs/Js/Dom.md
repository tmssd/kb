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

### Changing inside nodes

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

+ **more nodes's properties**

    DOM nodes also have other properties depending on their class. For instance:

    + `#!js value` – the value for `#!html <input>`, `#!html <select>` and `#!html <textarea>` (classes: `HTMLInputElement`, `HTMLSelectElement`…).

    + `#!js href` – the “href” for `#!html <a href="...">` (`HTMLAnchorElement` class).

    + `#!js id` – the value of “id” attribute, for all elements (`HTMLElement` class).

    + …and much more…

    !!! tip "HTML attributes vs. DOM properties"

        Most standard HTML attributes have the corresponding DOM property, and we can access it like that.

        If we want to know the full list of supported properties for a given class, we can find them in the specification. For instance, HTMLInputElement is documented at [https://html.spec.whatwg.org/#htmlinputelement](https://html.spec.whatwg.org/#htmlinputelement).

        Or if we’d like to get them fast or are interested in a concrete browser specification – we can always output the element using `console.dir(element)` and read the properties. Or explore “DOM properties” in the Elements tab of the browser developer tools.

        !!! warning "However, HTML attributes and DOM properties are not always the same, see below."

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

        | CSS property            | => | `#!js style` object property     |
        | ----------------------- | -- | -------------------------------- |
        | `background-color`      | => | elem.style.backgroundColor       |
        | `z-index`               | => | elem.style.zIndex                |
        | `border-left-width`     | => | elem.style.borderLeftWidth       |
        | `-moz-border-radius`    | => | element.style.MozBorderRadius    |
        | `-webkit-border-radius` | => | element.style.WebkitBorderRadius |

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

+ *element*.getAttribute

    get the **value** of the attribute

    ```js
    document.querySelector("img").getAttribute("width");
    ```

+ *element*.setAttribute

    can be used to change styles by changing value of 'class' atribute

    ```js
    document.querySelector("img").setAttribute("width", "5px");
    ```

## DOM Events
