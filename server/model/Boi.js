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
        a.raca = '${filtro}'`;
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

module.exports = {
  buscar,
};
