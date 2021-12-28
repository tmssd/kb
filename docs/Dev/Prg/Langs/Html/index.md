# Html

Reference: [W3S](https://www.w3schools.com/html/), [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML)

## Html Essentials

### Syntax

```html
<!-- the first one is better -->
<strong> <!-- important text --> = <b>
<em> <!-- emphasized text --> = <i>

<br> break
<hr> horizontal line
alt=   define what the image is
<a href="newpage.html">   anchor tag


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

`<div>` allows divide up content to sections, each section can have its own style in css

`<span>` similar, but inline for specific element

`<a href="url" target="_blank">` open a link in a new tab/browser window

table elements

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

HTML5 latest evolution, not affect old version website

add new semantic element for crawler understand information `<header>`, `<nav>`,`<footer>`
