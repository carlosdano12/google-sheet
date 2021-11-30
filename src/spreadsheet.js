const { GoogleSpreadsheet } = require("google-spreadsheet");
const { saveCount } = require("./saveCount");

const credenciales = require("../credenciales.json");

let googleID = "1btSma5oDW6z03lP0W3YRdOEUD4d0_aM4Ax05VDD_b4Q";

const {
  getCountTotalGuias,
  getCountDirDistintas,
  getCountDirDistintasDyDD,
  getCountDirZonificoDyDD,
  getCountPetResolvMsAsync,
} = require("./repositories/dao/CoordiMapsDao");
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
  try {
    const document = new GoogleSpreadsheet(googleID);
    await document.useServiceAccountAuth(credenciales);
    await document.loadInfo();
    const count = require("../count.json");
    let i = count.count + 1;
    const sheet = document.sheetsByIndex[0];
    await sheet.loadCells(`A${i}:S${i}`);
    const rows = await sheet.getRows();

    //se obtienen las celdas
    const totalGuias = sheet.getCellByA1("B" + i);
    const totalDirDistintas = sheet.getCellByA1("C" + i);
    const totalDirDistintasDyDD = sheet.getCellByA1("D" + i);
    const totalDirZonificoDyDD = sheet.getCellByA1("E" + i);
    const petResolvMsAsync = sheet.getCellByA1("M" + i);
    const origenCM = sheet.getCellByA1("F" + i);
    const origenTEMP = sheet.getCellByA1("G" + i);
    const origenSERVI = sheet.getCellByA1("H" + i);
    const dirSinResolvCorMap = sheet.getCellByA1("I" + i);
    const petResolvZoni = sheet.getCellByA1("L" + i);
    const petiServiConSubZona = sheet.getCellByA1("O" + i);
    const petiServiSinSubZona = sheet.getCellByA1("P" + i);
    const petiServiDirUnicas = sheet.getCellByA1("S" + i);

    //se actualizan los valores  de las celdas con las consultas al 30
    totalGuias.value = await getCountTotalGuias();
    totalDirDistintas.value = await getCountDirDistintas();
    totalDirDistintasDyDD.value = await getCountDirDistintasDyDD();
    totalDirZonificoDyDD.value = await getCountDirZonificoDyDD();
    petResolvMsAsync.value = await getCountPetResolvMsAsync();

    //se actualizan los valores  de las celdas con las consultas al 114
    origenCM.value = await getCountOrigenCM();
    origenTEMP.value = await getCountOrigenTEMP();
    origenSERVI.value = await getCountOrigenSERVI();
    dirSinResolvCorMap.value = await getCountDirSinResolvCorMap();
    petResolvZoni.value = await getCountPetiResolvZonificacion();
    petiServiConSubZona.value = await getCountPetiServiConSubZona();
    petiServiSinSubZona.value = await getCountPetiServiSinSubZona();
    petiServiDirUnicas.value = await getCountPetiServiDirUnicas();

    await sheet.saveUpdatedCells();
    await saveCount(i);

    console.log("La base de datos de virus ah sido actualizada...");
    console.log("\x1b[40m", "SOS UN CRACK!!!!!");
  } catch (err) {
    console.log("error al tratar de actalizar el drive", err);
  }
}

module.exports = {
  accesGoogleSheet: accesGoogleSheet,
};
