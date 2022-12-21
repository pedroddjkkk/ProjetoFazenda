import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001'
});

export const Buscar = async (tabela, pk, filtro) => {
    const response = await api.post('/buscar', {tabela, pk, filtro}).then(res => res.data).catch(err => console.log(err));
    return response;
}

export const Salvar = async (tabela, where, registro) => {
    const response = await api.post('/salvar', { tabela: tabela, where: where, registro: registro});
    return response.data;
}
