const fs = require("fs");
const home = require("./home-suit.json");
const out = require("./out-suit.json");
const caregiving = require("./caregiving-suit.json");
const wild = require("./wild-suit.json");
const magic = require("./magic-suit.json");

const homeNoKids = require("./home-suit-no-kids.json");
const outNoKids = require("./out-suit-no-kids.json");
const caregivingNoKids = require("./caregiving-suit-no-kids.json");
const wildNoKids = require("./wild-suit-no-kids.json");
const magicNoKids = require("./magic-suit-no-kids.json");

async function merge() {
  const all = [].concat(home, out, caregiving, wild, magic);
  const noKids = [].concat(
    homeNoKids,
    outNoKids,
    caregivingNoKids,
    wildNoKids,
    magicNoKids
  );
  try {
    fs.writeFileSync(`all-cards.json`, JSON.stringify(all));
    fs.writeFileSync(`all-cards-no-kids.json`, JSON.stringify(noKids));
    // file written successfully
  } catch (err) {
    console.error(err);
  }
}

merge();
