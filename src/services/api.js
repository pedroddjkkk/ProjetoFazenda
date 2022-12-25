import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

export const apiBuscar = async (tabela, pk, filtro) => {
  const ret = await api.post("/buscar", { tabela, pk, filtro })
  return ret;
};

export const apiSalvar = async (tabela, where, registro) => {
  const response = await api.post("/salvar", {
    tabela: tabela,
    where: where,
    registro: registro,
  });
  return response.data;
};
