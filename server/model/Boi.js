const sequelize = require("../utils/dbUtils").sequelize;

const { DataTypes, Model, Op } = require("sequelize");

class Boi extends Model {
  otherPublicField;
}

Boi.init(
  {
    id_pk: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    raca: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    peso: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "tab_bois",
    timestamps: true,
    updatedAt: "dr_hr_atualizacao",
    createdAt: "dr_hr_criacao",
  }
);

async function buscar(pk, filtro) {
  if (filtro) {
    if(isNaN(filtro)) {
      const ret = await Boi.findAll({
        where: {
          raca: {
            [Op.like]: `%${filtro}%`,
          },
        },
      });
      return ret;
    } else {
      const ret = await Boi.findAll({
        where: {
          id_pk: filtro,
        },
      });
      return ret;
    }
  } else {
    const ret = await Boi.findAll();
    return ret;
  }
}

async function salvar(where, registro) {
  if(registro.id_pk) {
    const ret = await Boi.update({
      raca: registro.raca,
      peso: registro.peso,
    }, {
      where: {
        id_pk: registro.id_pk,
      }
    });

    return ret;
  } else {
    const ret = await Boi.create({
      raca: registro.raca,
      peso: registro.peso,
    });

    return ret;
  }
}
module.exports = {
  buscar,
  salvar,
};
