var express = require('express');
// var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.get('/', function(req, res) {
  url = 'http://deals.ebay.com/';

  request(url, function(error, response, html) {
    if (!error) {
      //if no error use cheerio library on returned html for jQuery functionality
      var $ = cheerio.load(html);

      var list = {};
      $('.refit-itemcard-detail').filter(function() {
        var item = $(this);
        $('.first').filter(function() {
          var price = $(this);
        list[item.first().children().first().text()] = price.text();
        })
      })
      formattedList = list.toString().replace(/,/g,'<br>');
    res.send(list);
    }
  })
})

app.listen('1337', function() {
  console.log('Listening on port 1337');
});


exports = module.exports = app;