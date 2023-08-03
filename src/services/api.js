import axios from "axios";

const apiConnection = axios.create({
  baseURL: "http://localhost:3001",
});

const get = async (tabela, pk, filtro) => {
  const ret = await apiConnection.post("/buscar", { tabela, pk, filtro })
  return ret;
};

const put = async (tabela, where, registro) => {
  const ret = await apiConnection.post("/salvar", { tabela, where, registro })
  return ret;
};

const del = async (tabela, pk, filtro) => {
  const ret = await apiConnection.post("/excluir", { tabela, pk, filtro })
  return ret;
};

const api = { get, put, del, apiConnection };

export default api;