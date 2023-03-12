require("dotenv").config();
const { Sequelize } = require("sequelize");

let sequelize;
if(true) {
  sequelize = new Sequelize("postgres://root:Xinelo24@@localhost:5432/fazenda");
} else {
  sequelize = new Sequelize(process.env.DB || "fazenda", process.env.DB_USER || "root", process.env.DB_PASSWORD || "", {
    host: process.env.DB_HOST || "localhost",
    dialect: process.env.DB_DIALECT || "mysql",
    port: process.env.DB_PORT || 3306,
  });
}


async function tryConnection() {
  try {
    await sequelize.authenticate();
    console.log("Conexão com o banco de dados estabelecida com sucesso.");
  } catch (error) {
    console.error("Erro na conexão com o banco de dados: ", error);
  }
}

module.exports = { tryConnection, sequelize };
