var express = require('express'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  endpoints = require('./endpoints'),
  app = express(),
  cors = require('cors'),
  path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(methodOverride());      // simulate DELETE and PUT
app.use(cors());

app.use(express.static("dist"));

app.get('/api/mails', endpoints.findMails);
app.post('/api/forgotten', endpoints.forgotPassword);

app.get('/*', function (req, res) {
  res.sendFile('index.html',  { root: path.join(__dirname, '../../dist') }, function (err) {
    if (err) {
      res.status(500).send(err)
    }
  })
});

app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});