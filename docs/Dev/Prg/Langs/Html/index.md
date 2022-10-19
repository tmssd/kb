# Html

Reference: [W3S](https://www.w3schools.com/html/), [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML)

## Html Essentials

### Syntax

#### Common tags

`#!html <head>` - contains machine-readable information (metadata) about the document, like its title(`#!html <title>`), scripts(`#!html <script>`), and style sheets(`#!html <style>`)

`#!html <meta>` - represents Metadata that cannot be represented by other HTML meta-related elements, like `#!html <base>`, `#!html <link />`, `#!html <script>`, `#!html <style>` or `#!html <title>`

`#!html <link />` - specifies relationships between the current document and an external resource. This element is most commonly used to link to CSS, but is also used to establish site icons (both "favicon" style icons and icons for the home screen and apps on mobile devices) among other things.

`#!html <title>` - defines the document's title that is shown in a Browser's title bar or a page's tab. It only contains text; tags within the element are ignored.

`#!html <style>` - contains style information for a document, or part of a document. It contains CSS, which is applied to the contents of the document containing the `#!html <style>` element. But usually we specify stlyles in stanalone files and then connect them to the document using `#!html <link />` tag.

`#!html <body>` - represents the content of an HTML document. There can be only one `#!html <body>` element in a document.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />

    <!-- This line is MUST HAVE in order the resposive design to work!!! -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- Description of the site. MUST HAVE for SEO! -->
    <meta
      name="description"
      content="Omnifood is an AI-powered food subscription that will make you eat healthy again, 365 days per year. It's tailored to your personal tastes and nutritional needs."
    />

    <link rel="icon" href="img/favicon.png" />

    <!-- Enabling ability to set site's shortcut on phone screen  -->
    <!-- iPhone -->
    <link rel="apple-touch-icon" href="img/apple-touch-icon.png" />
    <!-- Android -->
    <link rel="manifest" href="manifest.webmanifest" />

    <!-- Connecting google fonts to the document -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700&display=swap"
      rel="stylesheet"
    />

    <!-- Connecting styles to the document -->
    <link rel="stylesheet" href="css/general.css" />
    <link rel="stylesheet" href="css/style.css" />
    <link rel="stylesheet" href="css/queries.css" />

    <!-- Setting document's title -->
    <title>Omnifood &mdash; Never cook again!</title>
  </head>

  <body>
		.
		.
		.
	  </body>
</html>
```

`#!html <h1>`...`#!html <h6>` - headings, ^^as a good practice:^^ each and every page should only have one `#!html <h1>` heading, i.e. only one primary heading

`#!html <br>` - break<br>
`#!html <hr>` - horizontal line

`#!html <img src="post-img.jpg" alt="HTML code on a screen" width="500" height="200"/>` - image tag

+ `alt` attribute defines what the image is, this is a **must have** for the accessibility
+ we can only set `width` attribute and the image's aspect ratio is automatically maintained
+ when the image set as decoration through the css style:

	!!! tip "use of `role` and `aria-label` attributes for the accessibility"

		```html title="index.html"
		<div
			class="cta-img-box"
			role="img"
			aria-label="Women enjoing food"
		></div>
		```

		```css title="style.css"
		.cta-img-box {
			background-image: url(../img/eating.jpg);
			background-size: cover;
			background-position: center;
		}
		```

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

+ `#!html <main>` - represents the dominant content of the body of a document. The main content area consists of content that is ^^directly^^ related to or expands upon the central topic of a document, or the central functionality of an application. What it does not include is content that is repeated across multiple pages, like e.g. `#!html <header>` or `#!html <footer>` elements.

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

##### Embedded content

+ `#!html <picture>` - contains zero or more `<source />` elements and one `<img />` element to offer alternative versions of an image for different display/device scenarios.

	!!! example "Using image with `.webp` file extension for suitable browsers and `.png` image for all ohther browsers as a fallback"

		```html
		<picture>
			<source srcset="img/hero.webp" type="image/webp" />
			<source srcset="img/hero-min.png" type="image/png" />

			<img
				src="img/hero-min.png"
				class="hero-img"
				alt="Woman enjoying food, meals in storage container, and food bowls on a table"
			/>
		</picture>
		```
