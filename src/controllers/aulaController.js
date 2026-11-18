import * as aulaServices from '../services/aulaServices.js';
import Joi from 'joi';
 
export const aulaCreateSchema = Joi.object({
    idAula: Joi.string().required().max(20),
    idProfessor: Joi.string().required().max(100),
    nomeAula: Joi.string().email().required().max(50),
    horarioInicio: Joi.string().required().max(20),
    horarioFim: Joi.string().required().max(20),
    tipoAula: Joi.string().required().max(6),
    dataAula: Joi.date().required().max(20),
    idPlano: Joi.string().required().max(100),
})

 
export const aulaUpdateSchema = Joi.object({
    idAula: Joi.string().max(40),
    idProfessor: Joi.string().max(50),
    nomeAula: Joi.string().email().max(50),
    horarioInicio: Joi.string().max(30),
    horarioFim: Joi.string().max(30),
    tipoAula: Joi.string().max(20),
    dataAula: Joi.date().max(20),
    idPlano: Joi.string().max(100)
})

 
export const listarAula = async (req, res) => {
    try {
        const { idAula, nomeAula, tipoAula, dataAula } = req.query;
        const aula = await aulaServices.findAll(idAula, nomeAula, tipoAula, dataAula);
        res.json(aula);
    } catch (err) {
        console.error('Erro ao buscar aula:', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
 
export const adicionarAula = async (req, res) => {
  try {
    const novaAula = await aulaServices.create(req.body);
    res.status(201).json({ message: 'Aula adicionada com sucesso', data: novaAula });
  } catch (err) {
    console.error('Erro ao adicionar aula:', err);
    if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: 'Aula já cadastrada.' });
    }
    res.status(500).json({ error: 'Erro ao adicionar aula' });
  }
};
 
export const atualizarAula = async (req, res) => {
  try {
    const { idAula } = req.params;
    const updated = await aulaServices.update(idAula, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Aula não encontrada' });
    }
    res.status(200).json({ message: 'Aula atualizada com sucesso' });
  } catch (err) {
    console.error('Erro ao atualizar aula:', err);
    res.status(500).json({ error: 'Erro ao atualizar aula' });
  }
};
 
export const deletarAula = async (req, res) => {
  try {
    const { idAula } = req.params;
    const deleted = await aulaServices.remove(idAula);
    if (!deleted) {
      return res.status(404).json({ error: 'Aula não encontrada' });
    }
    res.status(200).json({ message: 'Aula deletada com sucesso' });
  } catch (err) {
    console.error('Erro ao deletar aula:', err);
    res.status(500).json({ error: 'Erro ao deletar aula' });
  }
};
 