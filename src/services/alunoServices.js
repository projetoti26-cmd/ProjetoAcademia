import db from '../db/db.js';
 
export const findAll = async (idAluno, nomeAluno, tipoAluno, dataAluno) => {
  let sql = 'SELECT * FROM aluno';
  const conditions = [];
  const values = [];
 
  if (idAluno) {
    conditions.push('idAluno = ?');
    values.push(idAluno);
  }
 
  if (nomeAluno) {
    conditions.push('nomeAluno = ?');
    values.push(nomeAluno);
  }
 
  if (tipoAluno) {
    conditions.push('tipoAluno = ?');
    values.push(tipoAluno);
  }
 
  if (dataAluno) {
    conditions.push('dataAluno = ?');
    values.push(dataAluno);
  }
 
  if (conditions.length > 0) {
    sql += ' WHERE ' + conditions.join(' AND ');
  }
 
  const [rows] = await db.query(sql, values);
  return rows;
 
};
 
export const create = async (newAluno) => {
 
  await db.query('INSERT INTO aluno SET ?', newAluno);
 
  return newAluno;
};
 
export const update = async (idAluno, newAluno) => {
 
  const [result] = await db.query('UPDATE aluno SET ? WHERE idAluno = ?', [newAluno, idAluno]);
  return result.affectedRows > 0;
};
 
export const remove = async (idAluno) => {
  const [result] = await db.query('DELETE FROM aluno WHERE idAluno = ?', [idAluno]);
  return result.affectedRows > 0;
};
   
 

 
