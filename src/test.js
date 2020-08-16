const words = require("./words.json");
const l = words.length;
const errorWords = [];

if (l !== Array.from(new Set(words)).length) {
  // length mismatch
  throw new Error(
    "The word that you added might not be unique. Please check the added word."
  );
}

for (let i = 0; i < l; ++i) {
  if (!words[i].match(/^[A-Za-z\-]+$/)) {
    errorWords.push(words[i]);
  }
}

if (errorWords.length > 0) {
  throw new Error(
    `Words can only have english alphabets and the letter '-'. Words are case sensitive. Following words did not meet the criteria. If you added a new word that beongs in this list, please modify or remove it. If not, please raise an issue in the repository issue page with the complete error stack.\nIssue URL: https://github.com/itsSayantan/wordpow/issues\nList of error words: ['${errorWords.join(
      "', '"
    )}']`
  );
}
