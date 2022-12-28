const modelBuscar = require("./model/buscar");
const modelSalvar = require("./model/salvar");
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

app.post("/buscar", async (req, res) => {
  const ret = await modelBuscar(req, res);
  res.send(ret);
});

app.post("/salvar", async (req, res) => {
  const ret = await modelSalvar(req, res);
  res.send(ret);
});

dbUtils.tryConnection();

dbUtils.sequelize.sync({alter: true})
