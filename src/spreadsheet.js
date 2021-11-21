const { GoogleSpreadsheet } = require("google-spreadsheet");

const credenciales = require("../credenciales.json");

let googleID = "11cnM3Ya3xiPW47oNzt_xmos63uQKqRhDVvK-xRfd66E";

async function accesGoogleSheet() {
  const document = new GoogleSpreadsheet(googleID);
  await document.useServiceAccountAuth(credenciales);
  await document.loadInfo();
  let i = 4;
  const sheet = document.sheetsByIndex[0];
  await sheet.loadCells(`A${i}:J${i}`);
  const rows = await sheet.getRows();
  //   rows[2]["Guías (Direcciones) totales del día"] = "soy yo";
  //   rows[2]["Direcciones (distintas) del día"] = "soy yo2";
  //   rows[2]["Direcciones (distintas) del día DD y D"] = "soy yo3";
  //   rows[2]["Direcciones zonificadas (DD y D)"] = "soy yo4";
  //   rows[2]["Direcciones sin zonificar (sin zonaHub y equipo)"] = "soy yo5";
  //   rows[2].save();
  console.log(sheet.getCellByA1("H" + i).value);
}

async function save() {
  const document = new GoogleSpreadsheet(googleID);
  await document.useServiceAccountAuth(credenciales);
  await document.loadInfo();

  const sheet = document.sheetsByIndex[0];
  await sheet.addRow({
    ["Guías (Direcciones) totales del día"]:
      "Guías (Direcciones) totales del día",
    c: "holaC",
  });
  console.log("ingo guardada");
}

accesGoogleSheet();
//save();

module.exports = {
  accesGoogleSheet: accesGoogleSheet,
};
