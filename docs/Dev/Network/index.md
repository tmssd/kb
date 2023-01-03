# Network

## Internet

### History

+ Before www, there was internet, computer connect each other, but hard to communicate each other
+ In 1989 www invented by Tim Berners-Lee: a protocol (common language computer can speak)
+ Internet is a phone, www is an application
+ In 1991 first website was created

### What happens when you click a website?

Click google ⮕

ISP (internet service provider)  ⮕

DNS (domain name server) like a phone book store the address of google.com IP address  ⮕

send back to browser

Browser send IP address ⮕

google servers (like a computer, store file)  ⮕

server send HTML CSS Javascript file to the browser

**How to transmit data:**

Router ⮕ Modem of the house ⮕ ISP ⮕internet backbone (physical cable) ⮕ servers

**How to make visit website fast:**

+ Location of server (nearer faster)
+ How many trips
+ Size of file

### Internet Protocols

#### HTTP, HTTPS

Reference: [W3S](https://www.w3schools.com/tags/ref_httpmethods.asp){target=_blank}

HTTP(Hypertext Transfer Protocol) works as a request-response protocol between a client and server.

Example: A client (browser) sends an HTTP **request** to the server; then the server returns a **response** to the client.

**Request consist of:**

+ *Headers*

+ *Body*

+ *Method*

    Most used methods are:

      + GET
      + POST(add)
      + PUT(update)
      + DELETE - browser can use query strings (the string after the `?` of website link in the address bar) or the body to send request

**Response consist of:**

+ *Headers*

+ *Status*

    [List of all HTTP Status Messages(W3S)](https://www.w3schools.com/tags/ref_httpmessages.asp){target=_blank}

!!! note ""
    HTTPS: communication between client(browser) and server is **encryted**.

#### JSON, XML

They are data formats used for communication between client and server when HTTP protocol is used.

*XML:* HTML like syntax.

*JSON:* object like syntax.

```js
// JSON object methods in Javascript
var obj = JSON.parse({"name":"Bob","age":29})
var myJSON = JSON.stringify(obj)
```

#### AJAX

+ A way browser make request to server.
+ Without AJAX everytime need to update the page, need to refresh the whole page.
+ Now it can only update a small proportion dynamically.

Usage example in Javascript:

+ Old way: XML HTTP request
+ New: jQuery
+ Newer: `#!js fetch('url').then()`

    ```js
    // fetch can have its own json convert
    .then(response => response.json())
    ```
