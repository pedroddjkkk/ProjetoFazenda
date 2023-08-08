require("dotenv").config();
const { Sequelize } = require("sequelize");

if (process.env.NODE_ENV === "production") {
  console.log("Conectando ao banco de dados em produção");
}

const sequelize = new Sequelize(
  process.env.DB || "fazenda",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: process.env.DB_DIALECT || "mysql",
    dialectOptions: {
      ssl: { sslmode: "require" },
    },
  }
);

async function tryConnection() {
  try {
    await sequelize.authenticate();
    console.log("Conexão com o banco de dados estabelecida com sucesso.");
  } catch (error) {
    console.error("Erro na conexão com o banco de dados: ", error);
  }
}

module.exports = { tryConnection, sequelize };
