const { GoogleSpreadsheet } = require("google-spreadsheet");

const credenciales = require("../credenciales.json");

let googleID = "11cnM3Ya3xiPW47oNzt_xmos63uQKqRhDVvK-xRfd66E";

const {
  getCountOrigenCM,
  getCountOrigenTEMP,
  getCountOrigenSERVI,
  getCountDirSinResolvCorMap,
  getCountPetiResolvZonificacion,
  getCountPetiServiConSubZona,
  getCountPetiServiSinSubZona,
  getCountPetiServiDirUnicas,
} = require("./repositories/dao/ZonificacionDao");

async function accesGoogleSheet() {
  const document = new GoogleSpreadsheet(googleID);
  await document.useServiceAccountAuth(credenciales);
  await document.loadInfo();
  let i = 13;
  const sheet = document.sheetsByIndex[0];
  await sheet.loadCells(`A${i}:S${i}`);
  const rows = await sheet.getRows();

  //se obtienen las celdas
  const origenCM = sheet.getCellByA1("F" + i);
  const origenTEMP = sheet.getCellByA1("G" + i);
  const origenSERVI = sheet.getCellByA1("H" + i);
  const dirSinResolvCorMap = sheet.getCellByA1("I" + i);
  const petResolvZoni = sheet.getCellByA1("L" + i);
  const petiServiConSubZona = sheet.getCellByA1("O" + i);
  const petiServiSinSubZona = sheet.getCellByA1("P" + i);
  const petiServiDirUnicas = sheet.getCellByA1("S" + i);

  //se actualizan los valores  de las celdas
  origenCM.value = await getCountOrigenCM();
  origenTEMP.value = await getCountOrigenTEMP();
  origenSERVI.value = await getCountOrigenSERVI();
  dirSinResolvCorMap.value = await getCountDirSinResolvCorMap();
  petResolvZoni.value = await getCountPetiResolvZonificacion();
  petiServiConSubZona.value = await getCountPetiServiConSubZona();
  petiServiSinSubZona.value = await getCountPetiServiSinSubZona();
  await sheet.saveUpdatedCells();
  console.log(sheet.getCellByA1("H" + i).value);
  console.log("La base de datos de virus ah sido actualizada...");
  console.log("\x1b[40m", "SOS UN CRACK!!!!!");
}

accesGoogleSheet();
//save();

module.exports = {
  accesGoogleSheet: accesGoogleSheet,
};
