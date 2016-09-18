var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.get('/scrape', function(req,res) {

  url = 'http://www.imdb.com/title/tt0468569/?ref_=nv_sr_1';
  var scrapedData = "";

  request(url, function(error, response, html) {
    if(!error) {
      //if no error use cheerio library on returned html for jQuery functionality
      var $ = cheerio.load(html);
      var title, release, rating;
      var json = {title : "", release : "", rating : ""};

    $('.title_wrapper').filter(function() {
      var data = $(this);
      title = data.children().first().text();
      release = data.children().last().children().last().text();

      json.title = title;
      json.release = release;
    })

    $('.ratingValue').filter(function() {
      var data = $(this);

      rating = data.children().first().children().first().text();
      json.rating = rating;
    });
    }

    res.send(JSON.stringify(json, null, 4))
  })

})

app.listen('1337')
console.log('Listening on port 1337!');

exports = module.exports = app;