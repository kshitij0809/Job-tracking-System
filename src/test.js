const rp = require('request-promise');
const cheerio = require('cheerio');
const options = {
  uri: `https://equiv.in/jobs/2a781887-b13a-46b9-9ff8-9a0d1fb1f085`,
  transform: function (body) {
    return cheerio.load(body);
  }
};

rp(options)
  .then(($) => {
    console.log($.classes());
  })
  .catch((err) => {
    console.log(err);
  });
