const sequelize = require("../utils/dbUtils").sequelize;

const { DataTypes, Model } = require("sequelize");

class Pesagens extends Model {
  otherPublicField;
}

Pesagens.init(
  {
    id_pk: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    peso: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "tab_pesagens",
    timestamps: true,
    updatedAt: "dr_hr_atualizacao",
    createdAt: "dr_hr_criacao",
  }
);

module.exports = {
  Pesagens,
};
