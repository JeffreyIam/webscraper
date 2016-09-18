var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.get('/scrape', function(req,res) {

  url = 'https://www.amazon.com/Keurig-K50B-Single-Serve-Coffeemaker/dp/B01DUUC15I/ref=sr_1_1?s=apparel&ie=UTF8&qid=1474183792&sr=1-1&nodeID=7141123011&keywords=keurig';
  var scrapedData = "";

  request(url, function(error, response, html) {
    if(!error) {
      //if no error use cheerio library on returned html for jQuery functionality
      var $ = cheerio.load(html);
      var title, release, rating;
      var json = {title : "", price : "", availability : ""};

    $('#titleSection').filter(function() {
      var data = $(this);
      title = data.children().first().children().first().text().replace(/\n/g, "");

      release = data.children().last().children().last().text();

      json.title = title;
      json.release = release;
    })

    $('#price').filter(function() {
      var data = $(this);

      var price = data.children().first().children().first().children().last().text().replace(/\n|\t/g,"");
      json.price = price;
    });
    }

    $('#availability').filter(function() {
      var data = $(this);

      var availability = data.first().text()
      console.log(availability)
      json.availability = availability;

    })

    var results = "Title: " + json.title + '<br>' + "Price: " + json.price + '<br>' + "Availability: " + json.availability;

    res.send(results)
  })

})

app.listen('1337')
console.log('Listening on port 1337!');

exports = module.exports = app;