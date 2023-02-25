const sequelize = require("../utils/dbUtils").sequelize;

const { DataTypes, Model } = require("sequelize");

var Lote = require("./Lote").Lote;

class Fazenda extends Model {
  otherPublicField;
}

Fazenda.init(
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
    endereco: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cnpj: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "tab_fazendas",
    timestamps: true,
    updatedAt: "dr_hr_atualizacao",
    createdAt: "dr_hr_criacao",
  }
);

Fazenda.hasMany(Lote, {
  foreignKey: "id_fazenda",
  sourceKey: "id_pk",
});

async function buscar(pk, filtro) {
  if (pk){
    const ret = await Fazenda.findAll({
      where: {
        id_pk: pk,
      },
    });

    return ret;
  } else {
    const ret = await Fazenda.findAll();
    return ret;
  }
}

async function salvar(where, registro) {
  if (where) {
    const ret = await Fazenda.update(
      {
        nome: registro.nome,
        endereco: registro.endereco,
        telefone: registro.telefone,
        cnpj: registro.cnpj,
      },
      {
        where: {
          id_pk: where,
        },
      }
    );

    return ret;
  } else {
    const ret = await Fazenda.create({
      nome: registro.nome,
      endereco: registro.endereco,
      telefone: registro.telefone,
      cnpj: registro.cnpj,
    });

    return ret;
  }
}

async function excluir(pk, filtro){
  await Fazenda.destroy({
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
