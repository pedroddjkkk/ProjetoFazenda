const sequelize = require("../utils/dbUtils").sequelize;

const { DataTypes, Model } = require("sequelize");

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
    var sql;
    if (isNaN(filtro)) {
      sql = `
      SELECT 
        * 
      FROM 
        tab_bois AS a 
      WHERE 
        a.raca like '${filtro}'`;
    } else {
      sql = `
      SELECT 
        * 
      FROM 
        tab_bois AS a 
      WHERE 
        a.id_pk = ${filtro}`;
    }
    const ret = await dbUtils.query(sql);
    return ret;
  } else {
    sql = `
    SELECT 
      * 
    FROM 
      tab_bois`;
    const ret = await dbUtils.query(sql);
    return ret;
  }
}

async function salvar(where, registro) {
  const sql = `
  INSERT INTO
    tab_bois
  SET
    peso = ${registro.peso},
    raca = '${registro.raca}'`;
  const ret = await dbUtils.query(sql);
  return ret;
}
module.exports = {
  buscar,
  salvar,
};
