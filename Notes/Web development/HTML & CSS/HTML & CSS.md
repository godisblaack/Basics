# HTML & CSS notes

## HTML basics
Link: Location/URL (Uniform resource locator)/location of a page.

Hyperlink: An element that user can click on to navigateto the target page.
```html
&lt; Less than
&gt; Greater than
&nbsp; Non-breaking space
```

## Anchor tag
```html
<a href="<link>" download> <!-- Keyword download make the content downloadable. -->

<a href="/<link>"> <!-- / represent the root address of the project. -->

<h2 id="section-css">CSS</h2>
<a href="#section-css">Clickable content</a>
<!-- #<idName> is used to jump to the element having that id, and it makes the content clickable. -->

<a href="<link>" target="_blank">Text</a> 
<!-- target="_blank" will cause the link to open in the new tab. -->

<a href="#">Jump to the top</a>
<!-- The # represents a URL fragment that refers to the top of the page in HTML. -->

<a href="mailto:example@gmail.com"></a>
<!-- mailto: will open the mail client with the email address prepopulated. -->
```

## Images
```html
<style>
    img {
        object-fit: cover;
    }
</style>
<img src="images/test.jpg" alt="A test image.">
```

## Videos
```html
<style>
    video {
        width: 500px;
    }
</style>
<video controls autoplay loop src="video/test.mp4">
    Your browser doesn't support videos.
</video>
    <!-- Keyword control, autoplay and loop is an boolean attribute. The presence of the keyword means it is true and the absence of the keyword means that it is flase, so setting its value is irrelevant. We don't set this to true or false like controls="true" because writing the keyword controls means controls="true", and if we don't write then it means  controls="false". -->
```

## Audios
It is exaclty like video tag.
```html
<audio></audio>
```

## Lists
### Unordered list
```html
<style>
    ul {
        /* This is the styling for the bullets in bullet point of list. */
        list-style-type: none/square/circle; 
    }
</style>
<!-- ul: unordered list
li: list item -->
<ul>
    <li></li>
    <li></li>
    <li></li>
</ul>

<!-- Shortcut to generate the same code as above -->
 ul>li*3
```

### Ordered list
```html
<!-- ol: ordered list
li: list item -->
<ol>
    <li></li>
    <li></li>
    <li></li>
</ol>

<!--Zen coding: Shortcut to generate the same code as above -->
 ol>li*3
```
### Discription list
```html
<!-- dl: discription list
dt: discription term
dd: discription detail -->
<dl>
    <dt>HTML</dt>
    <dd>Hypertext Markup Language</dd>
    <dt>CSS</dt>
    <dd>Cascading stylesheets</dd>
</dl>
```

### Table
```html
<!-- tr: table rows
td: table data 
th: table header
thead: table head
tbody: table body
tfoot: table footer -->
<style>
    /* The border style will be applied to both table and td element. This is what following DRY (Don't Repeat Yourself) principle mean. */
    table, 
    td,
    th {
        border: 1px solid grey;
        border-collapse: collapse;
        padding: 5px;
    }
    /* The header and footer cell contents are by default bold and align to the center whereas the body cell contents are by default not bold and align to the left. */
    tfoot {
        text-align: left;
    }
</style>
<table>
    <thead>
        <tr>
            <!-- Colspan span attribute determines that how many columns this cell should expands to. The default value is 1, but here we are saying 2.-->
            <th colspan="2">Expenses</th>
        </tr>
        <tr>
            <th>Category</th>
            <th>Amount</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Marketing</td>
            <td>$100</td>
        </tr>
        <tr>
            <td>Accounting</td>
            <td>$200</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <th>Total</th>
            <th>$300</th>
        </tr>
    </tfoot>
</table>
```

## div: Container element
```html
<!-- div are `block level element`, so it will take the whole width of the HTML page. -->
<style>
    .product {
        background-color: yellow;
    }

    .highlight {
        background-color: yellow;
    }
</style>
<div class="product">
    <p>text</p>
    <a href="#">Link</a>
</div>

<p><div class="highlight">text</div></p>
```

## span
```html
<!-- span are 'inline level element', so it will not take the whole width of the HTML page. -->
<style>
    .highlight {
        background-color: yellow;
    }
</style>
<p><span class="highlight">text</span></p>
```

## Semantic elements
### Article, time, datetime, mark, and figcaption
```html
<!-- An article can be an any independent, self-contained piece of container. -->
<article>
    <!-- Keyword time does have any visual characteristics. Keyword datetime is added for the search engine to find the element. The format of the date is YYYY-MM-DD and for the time is 24 hour clock. -->
    <p><time datetime="2000-01-01 4:00">1 January 2000 4:00 am </time></p>
    <!-- keyword mark in an inline element, it highlights the text with yellow backgound color. -->
     <p><mark>text</mark></p>
     <figure>
        <img src="" alt="" />
        <figcaption>caption</figcaption>
     </figure>
</article>
```

## Structuring a web page
```html
    <html>
        <head></head>
        <body>
            <header>
                <nav>
                    <ul>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </nav>
            </header>
            <main>
                <!-- Every section must have a heading, if we validate our page without it then we will get an error. -->
                <section>
                    <h2></h2>
                    <article></article>
                    <article></article>
                    <article></a rticle>
                </section>
                <section></section>
            </main>
            <!-- The aside tag is used when the we have to siderbar content which is not related to the main content directly. e.g.: Advertising etc. -->
            <aside></aside>
            <footer>
                <nav>
                    <ul>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </nav>
            </footer>
        </body>
    </html>
```

## Providing CSS
- Embedded stylesheet
- External stylesheet
- Inline stylesheet

### Embedded stylesheet
```html
<style>
    p {
        color: orange;
    }
</style>
<body>
    <p>text</p>
</body>
```

### External stylesheet
```css
<style>
    p {
        color: orange;
    }
</style>
```
```html
<head>
    <!-- The link element is know as self closing element. We can use the link element as <link></link>, but it is longer, so we go with <link rel="" href="" /> -->
    <link rel="stylesheet" href="/css/styles.css." />
</head>
```

### Inline stylesheet
```html
<body>
    <p style="color: blue;">text</p>
</body>
<!-- This style is not prefered. We should avoid this as much as possible. Instead of this we can give that element a class or id, and define the style in the css file. -->
```