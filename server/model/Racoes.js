const sequelize = require("../utils/dbUtils").sequelize;

const { DataTypes, Model, Op } = require("sequelize");

class Racoes extends Model {
  otherPublicField;
}

Racoes.init(
  {
    id_pk: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "tab_racoes",
    timestamps: true,
    updatedAt: "dr_hr_atualizacao",
    createdAt: "dr_hr_criacao",
  }
);

async function buscar(pk, filtro) {
  if (pk) {
    const ret = await Racoes.findAll({
      where: {
        id_pk: pk,
      },
    });
    return ret;
  } else {
    const ret = await Racoes.findAll();
    return ret;
  }
}

async function salvar(where, registro) {
  if (where) {
    const ret = await Racoes.update(
      {
        nome: registro.nome,
      },
      {
        where: {
          id_pk: where,
        },
      }
    );

    return ret;
  } else {
    const ret = await Racoes.create({
      nome: registro.nome,
    });

    return ret;
  }
}

async function excluir(pk, filtro) {
  await Racoes.destroy({
    where: {
      id_pk: pk,
    },
  });
}

module.exports = {
  buscar,
  salvar,
  excluir,
};
