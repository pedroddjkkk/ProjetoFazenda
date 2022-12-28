const modelBoi = require("./Boi");

async function salvar(req, res) {
    const { tabela, where, registro } = req.body;

    if(tabela === "tab_bois") {
      return await modelBoi.salvar(where, registro); 
    }
}

module.exports = salvar;
