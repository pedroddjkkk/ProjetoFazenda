import axios from "axios";

const apiConnection = axios.create({
  baseURL: "http://localhost:3002",
});

let api;

api.get = async (tabela, pk, filtro) => {
  const ret = await api.apiConnection("/buscar", { tabela, pk, filtro })
  return ret;
};

api.put = async (tabela, where, registro) => {
  const ret = await api.apiConnection("/salvar", { tabela, where, registro })
  return ret;
};

api.delete = async (tabela, pk, filtro) => {
  const ret = await api.apiConnection("/excluir", { tabela, pk, filtro })
  return ret;
};

export default api;