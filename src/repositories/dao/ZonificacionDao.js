const { zf, geo } = require("../adapter/Postgres");

//Este archivo contiene todas las consultas al 114
async function getCountOrigenCM() {
  const query = `select count(distinct(concat(dsz.direccion||'-'||dsz.codigo_dane_ciudad))) from direcciones_sin_zonificar dsz where date(dsz.fechahora_registro)=current_date-1 and origen is null;`;
  const { count } = await zf.one(query);
  console.log("getCountOrigenCM:", count);
  return Number(count);
}

async function getCountOrigenTEMP() {
  const query = `select count(distinct(concat(dsz.direccion||'-'||dsz.codigo_dane_ciudad))) from direcciones_sin_zonificar dsz where date(dsz.fechahora_registro)=current_date-1 and origen = 'PETICIONES_PREVIA';`;
  const { count } = await zf.one(query);
  console.log("getCountOrigenTEMP:", count);
  return Number(count);
}

async function getCountOrigenSERVI() {
  const query = `select count(distinct(concat(dsz.direccion||'-'||dsz.codigo_dane_ciudad))) from direcciones_sin_zonificar dsz where date(dsz.fechahora_registro)=current_date-1 and origen = 'SERVI';`;
  const { count } = await zf.one(query);
  console.log("getCountOrigenSERVI:", count);
  return Number(count);
}

async function getCountDirSinResolvCorMap() {
  const query = `select count(distinct (concat(dsr.direccion||'-'||dsr.codigo_dane_ciudad))) from direcciones_sin_resolver dsr where dsr.fecha_registro = current_date -1 and dsr.fecha_procesado is null;`;
  const { count } = await zf.one(query);
  console.log("getCountDirSinResolvCorMap:", count);
  return Number(count);
}

async function getCountPetiResolvZonificacion() {
  const query = `select count(distinct (concat(pz.direccion||'-'||pz.codigo_dane_ciudad))) from peticiones_zonificacion pz where pz.fecha_peticion = current_date -1 and resuelve = true;`;
  const { count } = await zf.one(query);
  console.log("getCountPetiResolvZonificacion:", count);
  return Number(count);
}

async function getCountPetiServiConSubZona() {
  const query = `select count(*) from peticiones_servinformacion ps
    where ps.fecha = to_char(current_date -1, 'MM/DD/YYYY' ) AND (ps.subzona is not null and ps.subzona not in ('', '0'));`;
  const { count } = await zf.one(query);
  console.log("getCountPetiServiConSubZona:", count);
  return Number(count);
}

async function getCountPetiServiSinSubZona() {
  const query = `select count(*) from peticiones_servinformacion ps
    where ps.fecha = to_char(current_date -1, 'MM/DD/YYYY' ) AND (ps.subzona is null or ps.subzona in ('', '0'));`;
  const { count } = await zf.one(query);
  console.log("getCountPetiServiSinSubZona:", count);
  return Number(count);
}

//S
async function getCountPetiServiDirUnicas() {
  const query = `select count(distinct(concat(ps.direccion||'-'||ps.codigo_dane_ciudad))) from peticiones_servinformacion ps
    where ps.fecha = to_char(current_date -1, 'MM/DD/YYYY' );`;
  const { count } = await zf.one(query);
  console.log("getCountPetiServiDirUnicas:", count);
  return Number(count);
}

//getCountOrigenCM();
//getCountOrigenTEMP();
//getCountOrigenSERVI();
//getCountDirSinResolvCorMap();
//getCountPetiResolvZonificacion();
//getCountPetiServiConSubZona();
//getCountPetiServiSinSubZona();
//getCountPetiServiDirUnicas();
module.exports = {
  getCountOrigenCM: getCountOrigenCM,
  getCountOrigenTEMP: getCountOrigenTEMP,
  getCountOrigenSERVI: getCountOrigenSERVI,
  getCountDirSinResolvCorMap: getCountDirSinResolvCorMap,
  getCountPetiResolvZonificacion: getCountPetiResolvZonificacion,
  getCountPetiServiConSubZona: getCountPetiServiConSubZona,
  getCountPetiServiSinSubZona: getCountPetiServiSinSubZona,
  getCountPetiServiDirUnicas: getCountPetiServiDirUnicas,
};
