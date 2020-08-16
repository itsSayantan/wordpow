const words = require("./words.json");

if (words.length !== Array.from(new Set(words)).length) {
  // length mismatch
  throw new Error(
    "The word that you added might not be unique. Please check the added word."
  );
}
