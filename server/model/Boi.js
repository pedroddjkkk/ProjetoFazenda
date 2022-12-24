const dbUtils = require("../utils/dbUtils");

async function buscar(pk, filtro) {
  const sql = `SELECT * FROM tab_bois`;
  const ret = await dbUtils.query(sql);
  return ret;
}

module.exports = {
  buscar,
};
