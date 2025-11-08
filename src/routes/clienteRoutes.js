/**
 * Define as rotas para manipulação dos clientes.
 * Importa o controller e conecta as funções as rotas adequadas 
 */

const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

router.get('/', clienteController.listarClientes);
/** Rota GET para listar todos os clientes  */

router.post('/', clienteController.criarClientes);
/** Rota POST para criar um novo cliente */

module.exports = router;
