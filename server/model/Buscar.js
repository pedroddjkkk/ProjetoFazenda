const modelUser = require("./User");

async function buscar(req, res) {
    const { tabela, pk, filtro } = req.body;

    if (tabela === "tab_user") {
        const ret = await modelUser.buscar(pk, filtro);
        console.log(ret);
        return ret;
    }
}

module.exports = buscar;
