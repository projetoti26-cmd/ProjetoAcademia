
const express = require('express');
const router = express.Router();

// Ajuste o caminho conforme a localização do seu arquivo de conexão
const db = require('../db/db');

// GET: Listar todas as aulas
router.get('/', async (req, res) => {
    try {
        const [aulas] = await db.query(`
            SELECT
                idAula,
                idProfessor,
                nome AS nomeProfessor,
                nomeAula,
                horarioInicio,
                horarioFim,
                tipoAula,
                dataAula,
                dPlano
            FROM aulas a
            INNER JOIN professor p
                ON a.idProfessor = p.idProfessor
            ORDER BY a.dataAula, a.horarioInicio
        `);

        res.status(200).json(aulas);
    } catch (error) {
        console.error('Erro ao listar aulas:', error);
        res.status(500).json({
            mensagem: 'Erro ao listar aulas.'
        });
    }
});

// GET: Buscar uma aula pelo ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const [aulas] = await db.query(
            'SELECT * FROM aulas WHERE idAula = ?',
            [id]
        );

        if (aulas.length === 0) {
            return res.status(404).json({
                mensagem: 'Aula não encontrada.'
            });
        }

        res.status(200).json(aulas[0]);
    } catch (error) {
        console.error('Erro ao buscar aula:', error);
        res.status(500).json({
            mensagem: 'Erro ao buscar aula.'
        });
    }
});

// POST: Cadastrar uma nova aula
router.post('/', async (req, res) => {
    try {
        const {
            idProfessor,
            nomeAula,
            horarioInicio,
            horarioFim,
            tipoAula,
            dataAula,
            idPlano
        } = req.body;

        if (
            !idProfessor ||
            !nomeAula ||
            !horarioInicio ||
            !horarioFim ||
            !tipoAula ||
            !dataAula
        ) {
            return res.status(400).json({
                mensagem: 'Preencha todos os campos obrigatórios.'
            });
        }

        if (horarioFim <= horarioInicio) {
            return res.status(400).json({
                mensagem: 'O horário final deve ser posterior ao inicial.'
            });
        }

        const [resultado] = await db.query(
            `INSERT INTO aulas
            (idProfessor, nomeAula, horarioInicio, horarioFim,
             tipoAula, dataAula, idPlano)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                idProfessor,
                nomeAula,
                horarioInicio,
                horarioFim,
                tipoAula,
                dataAula,
                idPlano || null
            ]
        );

        res.status(201).json({
            mensagem: 'Aula cadastrada com sucesso.',
            idAula: resultado.insertId
        });
    } catch (error) {
        console.error('Erro ao cadastrar aula:', error);

        if (error.code === 'ER_NO_REFERENCED_ROW_2') {
            return res.status(400).json({
                mensagem: 'O professor ou plano informado não existe.'
            });
        }

        res.status(500).json({
            mensagem: 'Erro ao cadastrar aula.'
        });
    }
});

// PUT: Atualizar uma aula
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const {
            idProfessor,
            nomeAula,
            horarioInicio,
            horarioFim,
            tipoAula,
            dataAula,
            idPlano
        } = req.body;

        if (
            !idProfessor ||
            !nomeAula ||
            !horarioInicio ||
            !horarioFim ||
            !tipoAula ||
            !dataAula
        ) {
            return res.status(400).json({
                mensagem: 'Preencha todos os campos obrigatórios.'
            });
        }

        if (horarioFim <= horarioInicio) {
            return res.status(400).json({
                mensagem: 'O horário final deve ser posterior ao inicial.'
            });
        }

        const [resultado] = await db.query(
            `UPDATE aulas
             SET idProfessor = ?,
                 nomeAula = ?,
                 horarioInicio = ?,
                 horarioFim = ?,
                 tipoAula = ?,
                 dataAula = ?,
                 idPlano = ?
             WHERE idAula = ?`,
            [
                idProfessor,
                nomeAula,
                horarioInicio,
                horarioFim,
                tipoAula,
                dataAula,
                idPlano || null,
                id
            ]
        );

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensagem: 'Aula não encontrada.'
            });
        }

        res.status(200).json({
            mensagem: 'Aula atualizada com sucesso.'
        });
    } catch (error) {
        console.error('Erro ao atualizar aula:', error);
        res.status(500).json({
            mensagem: 'Erro ao atualizar aula.'
        });
    }
});

// DELETE: Excluir uma aula
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const [resultado] = await db.query(
            'DELETE FROM aulas WHERE idAula = ?',
            [id]
        );

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensagem: 'Aula não encontrada.'
            });
        }

        res.status(200).json({
            mensagem: 'Aula excluída com sucesso.'
        });
    } catch (error) {
        console.error('Erro ao excluir aula:', error);

        if (error.code === 'ER_ROW_IS_REFERENCED_2') {
            return res.status(409).json({
                mensagem:
                    'Não é possível excluir esta aula porque existem inscrições vinculadas.'
            });
        }

        res.status(500).json({
            mensagem: 'Erro ao excluir aula.'
        });
    }
});

module.exports = router;
    
