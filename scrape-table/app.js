const axios = require("axios");
const cheerio = require("cheerio");
const pretty = require("pretty");
const url = "https://finance.yahoo.com/quote/LCID";

const scrapeHtml = async (url) => {
  const html = await axios(url);
  const $ = await cheerio.load(html.data);
  const items = $("#quote-summary");
  const tableObj = {};
  const tdArr = [];
  items.each((i, el) => {
    const tr = $(el).find("table tbody tr");
    tr.each((index, element) => {
      const tdFirst = $(element).find("td").eq(0).text();
      const tdSecond = $(element).find("td").eq(1).text();
      tableObj[`${tdFirst}`] = tdSecond;
    });
    console.log(tableObj.Open);
  });
};

scrapeHtml(url);
