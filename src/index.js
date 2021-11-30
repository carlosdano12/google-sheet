const schedule = require("node-schedule");
require("dotenv").config();
const { accesGoogleSheet } = require("./spreadsheet");

schedule.scheduleJob("0 12 * * *", async () => {
  console.log("me ejecute carnal");
  await accesGoogleSheet();
});
