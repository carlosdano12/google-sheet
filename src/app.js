const exprees = require("express");

require("./spreadsheet");

const app = exprees();

//routes
app.use(require("./routers/google.router"));
module.exports = app;
