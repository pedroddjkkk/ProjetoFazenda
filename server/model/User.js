const dbUtils = require("../utils/dbUtils");

async function buscar(pk, filtro) {
    const sql = `SELECT * FROM tab_user WHERE email = '${filtro.email}' AND password = '${filtro.password}'`;
    const ret = await dbUtils.query(sql);
    return ret;
}

module.exports = {
    buscar,
};
