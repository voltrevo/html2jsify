# Turn crummy HTML into beautiful Javascript

    npm install html2jsify

## How?

some.html

    <div><h1>dude!</h1></div>

app.js

    'use strict'

    var html = require('./some.html')

    // html is a function which returns a dom node

    console.log(html())

Then

    browserify -t html2jsify app.js
