const express = require('express');
const app = express();
const cors = require('cors');
const htmlScrapper = require('./html-scrapper');
const UrlValidator = require('valid-url');

const PORT = 8000;

app.get('/products', cors(), function (req, res) {
  const queries = req.query;

  const urls = Object.keys(queries)
    .map((key) => { return queries[key] })
    .filter((url) => { return UrlValidator.isUri(url) });

  const products = htmlScrapper(urls, function (products) {
    res.json(products);
  });
});

app.listen(PORT, function () {
  console.log('Starting server at PORT:' + PORT);
});
