# Turn crummy HTML into beautiful Javascript

    npm install html2jsify

## How?

some.html

    <div><h1>dude!</h1></div>

app.js

    var html = require('./some.html');
    console.log(html());

Then

    # browserify -t html2jsify app.js
