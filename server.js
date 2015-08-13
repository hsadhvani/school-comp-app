var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var app = express();

app.listen(process.env.PORT || 3000, function () {
    console.log("Server listening on port 3000");
});

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

app.get("*", function (req,res) {
    res.redirect("/#"+req.url);
})

