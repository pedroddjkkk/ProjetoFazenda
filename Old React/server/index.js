const modelBuscar = require("./model/Buscar");
const modelSalvar = require("./model/Salvar");
const modelExcluir = require("./model/Excluir");
const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const cors = require("cors");
var dbUtils = require("./utils/dbUtils");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());

app.use(bodyParser.json())

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.use(express.static(path.join(__dirname, "client", "build")));

try {
  app.post("/buscar", async (req, res) => {
    const ret = await modelBuscar(req, res);
    res.send(ret);
  });
} catch (error) {
  console.log("Erro na rota buscar: ", error);
}

try {
  app.post("/salvar", async (req, res) => {
    const ret = await modelSalvar(req, res);
    res.send(ret);
  });
} catch (error) {
  console.log("Erro na rota salvar: ", error);
}

try {
  app.post("/excluir", async (req, res) => {
    await modelExcluir(req, res);
  });
} catch (error) {
  console.log("Erro na rota excluir: ", error);
}

dbUtils.tryConnection();

dbUtils.sequelize.sync({alter: true})
