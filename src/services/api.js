import axios from "axios";

const api = axios.create({
  baseURL: "http://172.21.102.57:3001",
});

export const apiBuscar = async (tabela, pk, filtro) => {
  const ret = await api.post("/buscar", { tabela, pk, filtro })
  return ret;
};

export const apiSalvar = async (tabela, where, registro) => {
  const ret = await api.post("/salvar", { tabela, where, registro })
  return ret;
};

export const apiExcluir = async (tabela, pk, filtro) => {
  const ret = await api.post("/excluir", { tabela, pk, filtro })
  return ret;
};
