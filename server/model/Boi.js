const sequelize = require("../utils/dbUtils").sequelize;

const { DataTypes, Model, Op } = require("sequelize");

var Racoes = require("./Racoes").Racoes;
var Pesagens = require("./Pesagens").Pesagens;
var Lote = require("./Lote").Lote;

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

Boi.belongsTo(Lote, {
  foreignKey: {
    allowNull: true,
    name: "id_lote",
  },
  as: "lote",
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

Boi.afterCreate((boi, options) => {
  Pesagens.create({
    peso: boi.peso,
    id_boi: boi.id_pk,
  });
});

async function buscar(pk, filtro) {
  if (filtro) {
    const ret = await Boi.findAll({
      where: {
        id_lote: filtro,
      },
      include: [
        {
          model: Racoes,
          required: false,
          as: "racao",
        },
        {
          model: Pesagens,
          required: false,
          as: "pesagens",
        },
      ],
    });

    for (const boi of ret) {
      boi.dataValues.gmd = await calcularGMDBovino(boi.id_pk);
    }

    return ret;
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
        {
          model: Pesagens,
          required: false,
          as: "pesagens",
        },
      ],
    });

    for (const boi of ret) {
      ret.dataValues.gmd = await calcularGMDBovino(boi.id_pk);
    }

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
      id_lote: registro.id_lote,
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

async function buscarBoisLote(pk, filtro) {
  const ret = await Boi.findAll({
    where: {
      id_lote: pk,
    },
    include: [
      {
        model: Racoes,
        required: false,
        as: "racao",
      },
      {
        model: Pesagens,
        required: false,
        as: "pesagens",
      },
    ],
  });

  return ret;
}

async function calcularGMDBovino(id){
  const pesagemNova = await Pesagens.findOne({
    where: {
      id_boi: id,
    },
    order: [
      ['dr_hr_criacao', 'DESC']
    ]
  })

  const pesagemAntiga = await Pesagens.findOne({
    where: {
      id_boi: id,
    },
    order: [
      ['dr_hr_criacao', 'ASC']
    ]
  })

  const dataUltimaPesagem = new Date(pesagemNova.dr_hr_criacao);
  const dataPrimeiraPesagem = new Date(pesagemAntiga.dr_hr_criacao);
  const diffEmDias = Math.floor((dataUltimaPesagem - dataPrimeiraPesagem) / (1000 * 60 * 60 * 24));
  const diffEmKg = pesagemNova.peso - pesagemAntiga.peso;
  const gmd = diffEmKg / diffEmDias;

  if(isNaN(gmd)){
    return 0;
  }
  
  return gmd.toFixed(2);
}

module.exports = {
  buscar,
  salvar,
  excluir,
  buscarBoisLote,
};
