var express = require('express'),
    bodyParser      = require('body-parser'),
    methodOverride  = require('method-override'),
    endpoints        = require('./endpoints'),
    app = express(),
    cors = require('cors');

var proxy = require('http-proxy-middleware');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride());      // simulate DELETE and PUT
app.use(cors());

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
// app.all('*/*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     next();
// });

app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});