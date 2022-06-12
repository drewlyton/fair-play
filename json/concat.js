const fs = require("fs");
const home = require("./home-suit.json");
const out = require("./out-suit.json");
const caregiving = require("./caregiving-suit.json");
const wild = require("./wild-suit.json");
const magic = require("./magic-suit.json");

async function merge() {
  const all = [].concat(home, out, caregiving, wild, magic);
  try {
    fs.writeFileSync(`all-cards.json`, JSON.stringify(all));
    // file written successfully
  } catch (err) {
    console.error(err);
  }
}

merge();
