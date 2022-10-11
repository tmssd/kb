# Html

Reference: [W3S](https://www.w3schools.com/html/), [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML)

## Html Essentials

### Syntax

#### Common tags

`#!html <h1>`...`#!html <h6>` - headings, ^^as a good practice:^^ each and every page should only have one `#!html <h1>` heading, i.e. only one primary heading

`#!html <br>` - break<br>
`#!html <hr>` - horizontal line

`#!html <img src="post-img.jpg" alt="HTML code on a screen" width="500" height="200"/>` - image tag

+ `alt` attribute defines what the image is
+ we can only set `width` attribute and the image's aspect ratio is automatically maintained

`#!html <a href="newpage.html">` - anchor tag<br>
`#!html <a href="url" target="_blank">` - open a link in a new tab<br>
`#!html <a href="#">Up</a>` - link that points to nowhere, actually clicking on it take us to the top of the page

`#!html <div>` - allows divide up content to sections, each section can have its own style in css<br>
`#!html <span>` - similar, but inline for specific element

#### Form tag and its accompanying elements

```html
<!-- each field need to have a name attribute -->
<form>
	First name: <input type="text" name="firstname" required>
	Email: <input type="email" name="email">
	Birthday: <input type="date" name="birth">
	Password: <input type="password" minlength="5" name="password">
	Gender: <input type="radio" name="gender" value="male"> male  <input type="radio" name="gender" value="female"> female
	<!-- name allow radio only select once, value allow machine to know which one is click in radio -->
	Pet: <input type="checkbox" name="dog"> dog   <input type="checkbox" name="cat"> cat
	Car:  <!-- dropdown menu -->
	<select name="cars">  <!-- the name can associate with a value-->
		<option value="volvo"> Volvo </option>
		<option value="Audi"> Audi </option>
	</select>
	<input type="submit" value="register">
	<input type="reset">
</form>
```

after submit this form, form automatically use an attribute method="GET" to send the query string to back-end

we might use method="POST" which hide your information in the web link

#### Table tag and its child elements

```html
<table>
  <tr>  <!-- table row -->
    <th>Month</th>  <!-- table header -->
    <th>Savings</th>
  </tr>
  <tr>
    <td>January</td>  <!-- table cell  -->
    <td>$100</td>
    <td>$120</td>
  </tr>
```

#### HTML5 Semantics

!!! info ""

	[HTML elements reference(MDN)](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#main_root)

Adds new semantic elements, i.e. they have a meaning or a purpose attached to them. They don't affect old version websites.<br>
So when we think about a certain HTML element, we should actually not think about what that element looks like as it's rendered on the page.But instead we should think about what that element actually means and what it stands for.<br>
Not all elements are semantic. For instace `#!html <div>` is a generic container element. We should use such elements only when we don't want to attach a certain meaning to a certain part of the page.

Good for:

+ SEO(Search Engine Optimization) - search engine such as Google will be able to understand the structure of our content. And therefore they will be better able to analyze what our content and what our webpage is all about.
+ Accessibilityand especially for people who rely on screen readers to consume on web pages.

##### Content sectioning

+ `#!html <header>` - the top part of a web document(usually includes `#!html <h1>` and `#!html <nav>` in it) or a some smaller unit.

+ `#!html <nav>` - page navigation: couple of links at the top of a page.

+ `#!html <main>` - represents the dominant content of the body of a document. The main content area consists of content that is directly related to or expands upon the central topic of a document, or the central functionality of an application.

+ `#!html <article>` - very common element that we can use for a written article: blog post, etc.

+ `#!html <aside>` - usually used for some secondary information that ^^compliments^^ the information in the main part of the page. For instance if the main part of the page is the `#!html <article>` then the `#!html <aside>` is basically some related posts. *Visually* many times we use the `#!html <aside>` element as a sidebar.

+ `#!html <section>` - represents a generic standalone section of a document, which doesn't have a more specific semantic element to represent it. Sections should always have a heading, with very few exceptions.

+ `#!html <h1>`...`#!html <h6>` - represent six levels of section headings. `<h1>` is the highest section level and `<h6>` is the lowest.

+ `#!html <address>` - indicates that the enclosed HTML provides contact information for a person or people, or for an organization.

+ `#!html <footer>` - content that comes at the very end of the page, e.g.:

	`#!html <footer>Copyright &copy; by The Code Magazine.</footer>` &rarr; Copyright &copy; by The Code Magazine.

	!!! note "HTTP entities"

		`&copy;` is a HTML entity for the copyright sign. See the full list of HTML entities at [HTML Entity Reference by CSS-Tricks](https://css-tricks.com/snippets/html/glyphs/){target=_blank}

##### Text content

+ `#!html <menu>` - semantic alternative to `#!html <ul>`, but treated by browsers (and exposed through the accessibility tree) as no different than `#!html <ul>`. It represents an unordered list of items (which are represented by `#!html <li>` elements).

+ `#!html <blockquote>` - indicates that the enclosed text is an extended quotation. Usually, this is rendered visually by indentation. A URL for the source of the quotation may be given using the `cite` attribute, while a text representation of the source can be given using the `#!html <cite>` element.

+ `#!html <figure>` - represents self-contained content, potentially with an optional caption, which is specified using the `#!html <figcaption>` element. The figure, its caption, and its contents are referenced as a single unit.

	!!! tip "Usage: `#!html <figure>` commonly used for a *product(or any other) carts* components."

+ `#!html <figcaption>` - represents a caption or legend describing the rest of the contents of its parent `#!html <figure>` element.

##### Inline text semantics

+ `#!html <cite>` - used to describe a reference to a cited creative work, and must include the title of that work. The reference may be in an abbreviated form according to context-appropriate conventions related to citation metadata.

+ `#!html <strong>` - important(bold) text, same as deprecated `#!html <b>`<br>

+ `#!html <em>` - emphasized(italic) text, same as deprecated `#!html <i>`
