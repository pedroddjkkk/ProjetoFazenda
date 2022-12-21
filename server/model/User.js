const dbUtils = require("../utils/dbUtils");

async function buscar(pk, filtro) {
    const ret = dbUtils.query("SELECT * FROM tab_user", function (err, rows) {
        if (err) {
            console.log(err);
        } else {
            console.log(rows);
            return rows;
        }
    });
}

module.exports = {
    buscar,
};
