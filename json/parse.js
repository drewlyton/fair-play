const fs = require("fs");
const readline = require("readline");

async function processLineByLine(path) {
  const fileStream = fs.createReadStream(path);
  const suit = path.split("/")[1].split("-")[0];
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  console.log(fileStream.path);
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.
  const cards = [];
  let object = {};
  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    if (line?.includes("###")) {
      if (object?.title) {
        object.suit = suit;
        cards.push(object);
        object = {};
      }
      object = getTitleAndTags(line);
    } else if (object.description) {
      object.description = object.description.concat(line);
    } else {
      object.description = line;
    }
  }
  try {
    fs.writeFileSync(`${suit}-suit.json`, JSON.stringify(cards));
    // file written successfully
  } catch (err) {
    console.error(err);
  }
}

function getTitleAndTags(string) {
  const heading = string.split("###")[1].trim();
  const titleAndTags = heading.split("(");
  const title = titleAndTags[0].trim();
  const tags = titleAndTags?.[1]
    ?.substring(0, titleAndTags?.[1]?.indexOf(")"))
    ?.split(";");
  return {
    title,
    tags:
      tags?.map((tag) => tag.trim().toLowerCase().split(" ").join("_")) || [],
  };
}

const suits = ["home", "caregiving", "magic", "out", "wild"];

async function parseAll() {
  suits.forEach(async (suit) => {
    console.log(suit);
    processLineByLine(`../${suit}-suit.md`);
  });
}

parseAll();
