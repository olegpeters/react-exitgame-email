var express = require('express'),
    bodyParser      = require('body-parser'),
    methodOverride  = require('method-override'),
    endpoints        = require('./endpoints'),
    app = express(),
    cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride());      // simulate DELETE and PUT
app.use(cors());

app.get('/api/mails', endpoints.findMails);
app.post('/api/forgotten', endpoints.forgotPassword);
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'), function(err) {
        if (err) {
            res.status(500).send(err)
        }
    })
});

app.set('port', process.env.PORT || 80);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});