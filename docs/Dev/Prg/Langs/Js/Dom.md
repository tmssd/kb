---
title: DOM
---

# HTML Document Object Model

## DOM Essentials

!!! info ""

    + [W3S Course](https://www.w3schools.com/js/js_htmldom.asp){target=_blank}
    + [MDN: DOM Events](https://developer.mozilla.org/en-US/docs/Web/Events){target=_blank}
    + [Document(JAVASCRIPT.INFO)](https://javascript.info/document){target=_blank}
    + [Event Delegation(JAVASCRIPT.INFO)](https://javascript.info/event-delegation#hide-messages-with-delegation){target=_blank}
    + [Javascript Char Codes (Key Codes)](https://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes){target=_blank}

Document Object Model, or DOM for short, represents all page content as objects that can be modified.

The `document` object is the main “entry point” to the page. We can change or create anything on the page using it.

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

all elements on the web page have a 'syle' attribute

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
