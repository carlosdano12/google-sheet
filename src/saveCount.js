const fs = require("fs");

async function saveCount(count) {
  fs.writeFileSync(
    "count.json",
    JSON.stringify({
      count,
    }),
    "utf8",
    function (err) {
      if (err) {
        console.log("ocurrio un error al guardar el count");
      }
      console.log("actualizado el count");
    }
  );
}

module.exports = {
  saveCount: saveCount,
};
