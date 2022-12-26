const dbUtils = require("../utils/dbUtils");

async function buscar(pk, filtro) {
  if (filtro) {
    const sql = `
    SELECT 
      * 
    FROM 
      tab_bois AS a 
    WHERE 
      a.id_pk = ${filtro}`;
    const ret = await dbUtils.query(sql);
    return ret;
  }
  const sql = `
  SELECT 
    * 
  FROM 
    tab_bois`;
  const ret = await dbUtils.query(sql);
  return ret;
}

module.exports = {
  buscar,
};
