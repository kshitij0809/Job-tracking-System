const rp = require('request-promise');
const cheerio = require('cheerio');
const options = {
  headers: {'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98'},
  uri: `https://www.naukri.com/job-listings-HR-Generalist-Cox-and-Kings-limited-Bengaluru-KH-Road-3-to-6-years-020119003400?src=seo_srp&sid=15464226729338&xp=2&px=1`,
  transform: function (body) {
    return cheerio.load(body);
  }
};

rp(options)
  .then(($) => {
    console.log($.html());
  })
  .catch((err) => {
    console.log(err);
  });
