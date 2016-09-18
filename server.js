var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.get('/scrape', function(req,res) {

})

app.listen('1337')
console.log('Listening on port 1337!');

exports = module.exports = app;