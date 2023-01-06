const sequelize = require("../utils/dbUtils").sequelize;

const { DataTypes, Model, Op } = require("sequelize");

var Racoes = require("./Racoes").Racoes;
var Pesagens = require("./Pesagens").Pesagens;

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

Boi.belongsTo(Racoes, {
  foreignKey: {
    allowNull: true,
    name: "id_racao",
  },
  as: "racao",
});

Boi.hasMany(Pesagens, {
  foreignKey: {
    allowNull: true,
    name: "id_boi",
  },
  as: "pesagens",
});

Pesagens.afterCreate((pesagem, options) => {
  Boi.update(
    {
      peso: pesagem.peso,
    },
    {
      where: {
        id_pk: pesagem.id_boi,
      },
    }
  );
});

async function buscar(pk, filtro) {
  if (filtro) {
    if (isNaN(filtro)) {
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
  } else if (pk) {
    const ret = await Boi.findAll({
      where: {
        id_pk: pk,
      },
    });

    return ret;
  } else {
    const ret = await Boi.findAll({
      include: [
        {
          model: Racoes,
          required: false,
          as: "racao",
        },
      ],
    });

    return ret;
  }
}

async function salvar(where, registro) {
  if (where) {
    if (registro.new_peso) {
      await Pesagens.create({
        peso: registro.new_peso,
        id_boi: where,
      });
      return (ret = await Boi.update(
        {
          raca: registro.raca,
          id_racao: registro.id_racao,
        },
        {
          where: {
            id_pk: where,
          },
        }
      ));
    } else {
      return (ret = await Boi.update(
        {
          raca: registro.raca,
          peso: registro.peso,
          id_racao: registro.id_racao,
        },
        {
          where: {
            id_pk: where,
          },
        }
      ));
    }
  } else {
    const ret = await Boi.create({
      raca: registro.raca,
      peso: registro.peso,
      id_racao: registro.id_racao,
    });

    return ret;
  }
}

async function excluir(pk, filtro) {
  await Boi.destroy({
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
