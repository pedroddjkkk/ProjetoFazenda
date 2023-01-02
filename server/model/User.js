const sequelize = require("../utils/dbUtils").sequelize;

const { DataTypes, Model } = require("sequelize");

class User extends Model {
  otherPublicField;
}

User.init(
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
    login: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "tab_user",
    timestamps: true,
    updatedAt: "dr_hr_atualizacao",
    createdAt: "dr_hr_criacao",
  }
);

async function buscar(pk, filtro) {
  if (filtro) {
    const ret = await User.findAll({
      where: {
        email: filtro.email,
        password: filtro.password,
      },
    });

    return ret;
  } else if (pk) {
    const ret = await User.findAll({
      where: {
        id_pk: pk,
      },
    });

    return ret;
  } else {
    const ret = await User.findAll();
    return ret;
  }
}

async function salvar(where, registro) {
  if (where) {
    const ret = await User.update(
      {
        nome: registro.nome,
        login: registro.login,
        password: registro.senha,
        email: registro.email,
      },
      {
        where: {
          id_pk: where,
        },
      }
    );

    return ret;
  } else {
    const ret = await User.create({
      nome: registro.nome,
      login: registro.login,
      password: registro.senha,
      email: registro.email,
    });

    return ret;
  }
}

async function excluir(pk, filtro) {
  const ret = await User.destroy({
    where: {
      id_pk: pk,
    },
  });

  return ret;
}

module.exports = {
  buscar,
  salvar,
  excluir,
};
