import * as alunoServices from '../services/alunoServices.js';
import Joi from 'joi';
 
export const alunoCreateSchema = Joi.object({
    idAluno: Joi.string().required().max(20),
    nome: Joi.string().required.max(100),
    email: Joi.string().email().required().max(50),
    telefone: Joi.string().required.max(20),
    cpf: Joi.string().length(11).required(),
    dataNascimento: Joi.date().required().max(6)
})
 
export const alunoUpdateSchema = Joi.object({
    idAluno: Joi.string().required().max(20),
    nome: Joi.string().required.max(100),
    email: Joi.string().email().required().max(50),
    telefone: Joi.string().required.max(20),
    cpf: Joi.string().length(11).required(),
    dataNascimento: Joi.date().required().max(6)
}).min(1);
 
export const listarAluno = async (req, res) => {
    try {
        const { cpf, nome, email } = req.query;
        const aluno = await alunoServices.findAll(cpf, nome, email);
        res.json(aluno);
    } catch (err) {
        console.error('Erro ao buscar aluno:', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
 
export const adicionarAluno = async (req, res) => {
  try {
    const novoAluno = await alunoServices.create(req.body);
    res.status(201).json({ message: 'Aluno adicionado com sucesso', data: novoAluno });
  } catch (err) {
    console.error('Erro ao adicionar aluno:', err);
    if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: 'CPF já cadastrado.' });
    }
    res.status(500).json({ error: 'Erro ao adicionar Aluno' });
  }
};
 
export const atualizarAluno = async (req, res) => {
  try {
    const { cpf } = req.params;
    const updated = await alunoServices.update(cpf, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Aluno não encontrado' });
    }
    res.status(200).json({ message: 'Aluno atualizado com sucesso' });
  } catch (err) {
    console.error('Erro ao atualizar Aluno:', err);
    res.status(500).json({ error: 'Erro ao atualizar Aluno' });
  }
};
 
export const deletarAluno = async (req, res) => {
  try {
    const { cpf } = req.params;
    const deleted = await alunoServices.remove(cpf);
    if (!deleted) {
      return res.status(404).json({ error: 'ALuno não encontrado' });
    }
    res.status(200).json({ message: 'Aluno deletado com sucesso' });
  } catch (err) {
    console.error('Erro ao deletar aluno:', err);
    res.status(500).json({ error: 'Erro ao deletar aluno' });
  }
};
 