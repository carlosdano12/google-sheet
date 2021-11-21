const exprees = require("express");
require("dotenv").config();
require("./spreadsheet");
require("./repositories/dao/ZonificacionDao");
const app = exprees();

//routes
app.use(require("./routers/google.router"));
module.exports = app;
