const { geo } = require("../adapter/Postgres");

//Este archivo contiene todas las consultas al 30
async function getCountTotalGuias() {
  const query = `select count(distinct(gr.codigo_remision)) from generacion_rotulos gr where gr.fecha_registro= current_date - 1;`;
  const { count } = await geo.one(query);
  console.log("getCountTotalGuias:", count);
  return Number(count);
}

async function getCountDirDistintas() {
  const query = `select count(distinct(concat(gr.direccion_destinatario||'-'||gr.codigo_ciudad_destino))) from generacion_rotulos gr where fecha_registro = current_date - 1;`;
  const { count } = await geo.one(query);
  console.log("getCountDirDistintas:", count);
  return Number(count);
}

async function getCountDirDistintasDyDD() {
  const query = `select count(distinct(concat(gr.direccion_destinatario||'-'||gr.codigo_ciudad_destino))) from generacion_rotulos gr where fecha_registro = current_date - 1 and gr.tipoguia=1 and gr.tipo_poblacion_destino in('D','DD');`;
  const { count } = await geo.one(query);
  console.log("getCountDirDistintasDyDD:", count);
  return Number(count);
}

async function getCountDirZonificoDyDD() {
  const query = `select count(distinct(concat(gr.direccion_destinatario||'-'||gr.codigo_ciudad_destino))) from generacion_rotulos gr where fecha_registro = current_date - 1 and gr.tipoguia=1 and gr.tipo_poblacion_destino in('D','DD') and gr.zona_reparto <> '0'and gr.subzona_reparto <> '0';`;
  const { count } = await geo.one(query);
  console.log("getCountDirZonificoDyDD:", count);
  return Number(count);
}

async function getCountPetResolvMsAsync() {
  const query = `select count(distinct(concat(gr.direccion_destinatario||'-'||gr.codigo_ciudad_destino))) from generacion_rotulos gr where fecha_registro = current_date - 1 and gr.tipoguia=1 and gr.tipo_poblacion_destino in('D','DD') and gr.zona_reparto <> '0'and gr.subzona_reparto <> '0' and last_app like '%geo%';`;
  const { count } = await geo.one(query);
  console.log("getCountPetResolvMsAsync:", count);
  return Number(count);
}

// getCountTotalGuias();
// getCountDirDistintas();
// getCountDirDistintasDyDD();
// getCountDirZonificoDyDD();
// getCountPetResolvMsAsync();

module.exports = {
  getCountTotalGuias: getCountTotalGuias,
  getCountDirDistintas: getCountDirDistintas,
  getCountDirDistintasDyDD: getCountDirDistintasDyDD,
  getCountDirZonificoDyDD: getCountDirZonificoDyDD,
  getCountPetResolvMsAsync: getCountPetResolvMsAsync,
};
