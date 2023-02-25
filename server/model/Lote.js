const sequelize = require("../utils/dbUtils").sequelize;

const { DataTypes, Model } = require("sequelize");

class Lote extends Model {
  otherPublicField;
}

Lote.init(
  {
    id_pk: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    tableName: "tab_lotes",
    timestamps: true,
    updatedAt: "dr_hr_atualizacao",
    createdAt: "dr_hr_criacao",
  }
);

async function buscar(pk, filtro) {
  if (pk){
    const ret = await Lote.findAll({
      where: {
        id_pk: pk,
      },
    });

    return ret;
  } else {
    const ret = await Lote.findAll();
    return ret;
  }
}

async function salvar(where, registro) {
  if (where) {
    const ret = await Lote.update(
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
    const ret = await Lote.create({
      nome: registro.nome,
    });

    return ret;
  }
}

async function excluir(pk, filtro){
  await Lote.destroy({
    where: {
      id_pk: pk,
    },
  });
}

module.exports = {
  buscar,
  salvar,
  excluir,
  Lote,
};
