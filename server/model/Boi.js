const dbUtils = require("../utils/dbUtils");

async function buscar(pk, filtro) {
  if (filtro) {
    var sql;
    if (isNaN(filtro)) {
      sql = `
      SELECT 
        * 
      FROM 
        tab_bois AS a 
      WHERE 
        a.raca like '${filtro}'`;
    } else {
      sql = `
      SELECT 
        * 
      FROM 
        tab_bois AS a 
      WHERE 
        a.id_pk = ${filtro}`;
    }
    const ret = await dbUtils.query(sql);
    return ret;
  } else {
    sql = `
    SELECT 
      * 
    FROM 
      tab_bois`;
    const ret = await dbUtils.query(sql);
    return ret;
  }
}

async function salvar(where, registro) {
  const sql = `
  INSERT INTO
    tab_bois
  SET
    peso = ${registro.peso},
    raca = '${registro.raca}'`;
  const ret = await dbUtils.query(sql);
  return ret;
}
module.exports = {
  buscar,
  salvar,
};
