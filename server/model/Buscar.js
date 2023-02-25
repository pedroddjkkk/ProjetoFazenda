const modelUser = require("./User");
const modelBoi = require("./Boi");
const modelFazendas = require("./Fazendas");
const modelRacoes = require("./Racoes");
const modelLotes = require("./Lote");

async function buscar(req, res) {
    const { tabela, pk, filtro } = req.body;

    if (tabela === "tab_user") {
      return await modelUser.buscar(pk, filtro); 
    } 
    else if (tabela === "tab_bois") {
      return await modelBoi.buscar(pk, filtro); 
    }
    else if (tabela === "tab_fazendas"){
      return await modelFazendas.buscar(pk, filtro);
    }
    else if (tabela === "tab_racoes"){
      return await modelRacoes.buscar(pk, filtro);
    }
    else if (tabela === "tab_lotes"){
      return await modelLotes.buscar(pk, filtro);
    }
}

module.exports = buscar;
