const rp = require('request-promise');
const cheerio = require('cheerio');
const when = require('when');
const _ = require('lodash');

const slugify = (text) => {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

const preProcessProducts = (products) => {
  let commonKeys = [];

  if (products.length < 1) {
    return { products, commonKeys };
  }

  commonKeys = _.keys(products[0].meta);

  products.map(product => {
    commonKeys = _.intersection(commonKeys, _.keys(product.meta));
  });

  if (commonKeys.length < 1) {
    return { products, commonKeys };
  }

  products = products.map(product => {
    product['common'] = _.pick(product.meta, commonKeys);
    product['meta'] = _.omit(product.meta, commonKeys);

    return product;
  });

  return { products, commonKeys };
}

const HtmlScrapper = (urls, callback) => {
  let payload = [];

  when.reduce(
    urls.map((url) => {
      return parseSingle(url);
    }),
    function (acc, parsed) {
      if (parsed) {
        acc.push(parsed);
      }

      return acc;
    },
    payload
  ).done(function (products) {
    products = preProcessProducts(products);
    callback(products);
  });

};

const parseSingle = (url) => {
  return rp({
    uri: url,
    transform: (body) => {
      return cheerio.load(body)
    }
  }).then(function ($) {
    let payload = {};

    payload['id'] = Math.floor(Math.random() * 100 + 1); //Assign a random id
    payload['name'] = $('#prod_title').text().trim();
    payload['price'] = $('#product_price').text().trim();
    payload['ratings'] = $('.c-rating-total__text-rating-average em').text();
    payload['currencySymbol'] = $('#special_currency_box').text();
    payload['image'] = $('#productImageBox .productImage').data('swapImage');
    payload['meta'] = {};
    payload['common'] = {};

    let description = '';

    $('.prd-attributesList li span').each((_ind, el) => {
      description += $(el).text().trim() + '. ';
    });

    payload['description'] = description.trim();

    $('table.specification-table tbody tr').each((_ind, node) => {
      const
        name = $(node).find(':first-child').text().trim(),
        value = $(node).find(':last-child').text().trim();

      if (name && value) {
        payload['meta'][slugify(name)] = { name, value };
      }
    });

    return payload;
  }, () => ({}));
}

module.exports = HtmlScrapper;
