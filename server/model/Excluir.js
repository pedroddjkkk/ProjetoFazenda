const modelUser = require("./User");
const modelBoi = require("./Boi");
const modelFazendas = require("./Fazendas");

async function excluir(req, res) {
    const { tabela, pk, filtro } = req.body;

    if (tabela === "tab_user") {
      return await modelUser.excluir(pk, filtro); 
    } 
    else if (tabela === "tab_bois") {
      return await modelBoi.excluir(pk, filtro); 
    }
    else if (tabela === "tab_fazendas"){
      return await modelFazendas.excluir(pk, filtro);
    }
}

module.exports = excluir;
