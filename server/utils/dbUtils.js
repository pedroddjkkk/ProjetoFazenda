require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DB, "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

async function tryConnection() {
  try {
    await sequelize.authenticate();
    console.log("Conexão com o banco de dados estabelecida com sucesso.");
  } catch (error) {
    console.error("Erro na conexão com o banco de dados: ", error);
  }
}

module.exports = { tryConnection, sequelize };
