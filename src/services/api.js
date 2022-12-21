const axios = require('axios');

const Buscar = async (tabela, pk, filtro) => {
    const response = await axios.post('http://localhost:3001/buscar', { tabela: tabela, pk: pk, filtro: filtro});
    return response.data;
}

const Salvar = async (tabela, where, registro) => {
    const response = await axios.post('http://localhost:3001/salvar', { tabela: tabela, where: where, registro: registro});
    return response.data;
}

module.exports = {
    Buscar,
    Salvar
};