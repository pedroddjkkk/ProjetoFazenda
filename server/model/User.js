const dbUtils = require("../utils/dbUtils");

async function buscar(pk, filtro) {
  if (filtro) {
    const sql = `
    SELECT 
      * 
    FROM 
      tab_user 
    WHERE 
      email = '${filtro.email}' 
    AND 
      password = md5('${filtro.password}')`;
    const ret = await dbUtils.query(sql);
    return ret;
  } else {
    const sql = `
    SELECT 
      * 
    FROM 
      tab_user`;
    const ret = await dbUtils.query(sql);
    return ret;
  }
}

async function salvar(where, registro) {
  const sql = `
  INSERT INTO
    tab_user
  SET
    nome = '${registro.nome}',
    login = '${registro.login}',
    password = md5('${registro.senha}'),
    email = '${registro.email}'`;
  const ret = await dbUtils.query(sql);
  return ret;
}

module.exports = {
  buscar,
  salvar,
};
