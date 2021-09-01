const axios = require("axios");
const cheerio = require("cheerio");

const url = "https://marketstack.com/";

const fetchFunc = async (url) => {
  let jsonObjArr = [];
  const html = await axios.get(url);
  const $ = await cheerio.load(html.data);
  const items = $(".item");
  items.each((i, node) => {
    const title = $(node).find(".heading").text().split("\n");
    const description = $(node).find("p").text().split(".");
    for (i = 0; i < title.length; i++) {
      jsonObjArr.push({
        title: title[i],
        description: description[i],
      });
    }
    //print jsonobj
    console.log(jsonObjArr);
  });
};

fetchFunc(url);
