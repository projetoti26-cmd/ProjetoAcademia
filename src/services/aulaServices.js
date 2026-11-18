import db from '../db/db.js';
 
export const findAll = async (idAula, nomeAula, tipoAula, dataAula) => {
  let sql = 'SELECT * FROM aula';
  const conditions = [];
  const values = [];
 
  if (idAula) {
    conditions.push('idAula = ?');
    values.push(idAula);
  }
 
  if (nomeAula) {
    conditions.push('nomeAula = ?');
    values.push(nomeAula);
  }
 
  if (tipoAula) {
    conditions.push('tipoAula = ?');
    values.push(tipoAula);
  }
 
  if (dataAula) {
    conditions.push('dataAula = ?');
    values.push(dataAula);
  }
 
  if (conditions.length > 0) {
    sql += ' WHERE ' + conditions.join(' AND ');
  }
 
  const [rows] = await db.query(sql, values);
  return rows;
 
};
 
export const create = async (newAula) => {
 
  await db.query('INSERT INTO aula SET ?', newAula);
 
  return newAula;
};
 
export const update = async (idAula, newAula) => {
 
  const [result] = await db.query('UPDATE aula SET ? WHERE idAula = ?', [newAula, idAula]);
  return result.affectedRows > 0;
};
 
export const remove = async (idAula) => {
  const [result] = await db.query('DELETE FROM aula WHERE idAula = ?', [idAula]);
  return result.affectedRows > 0;
};
 

 
