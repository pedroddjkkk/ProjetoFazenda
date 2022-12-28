const modelBoi = require("./Boi");
const modelUser = require("./User");
const modelFazendas = require("./Fazendas");

async function salvar(req, res) {
    const { tabela, where, registro } = req.body;

    if(tabela === "tab_bois") {
      return await modelBoi.salvar(where, registro); 
    } 
    else if (tabela === "tab_user") {
      return await modelUser.salvar(where, registro); 
    }
    else if (tabela === "tab_fazendas"){
      return await modelFazendas.salvar(where, registro);
    }
}

module.exports = salvar;
