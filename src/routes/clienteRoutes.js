/**
 * Define as rotas para manipulação dos clientes. 
 */
const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

/**
 *  Rota GET para listar todos os clientes 
 */
router.get('/', clienteController.listarClientes);


/**
 *  Rota POST para criar um novo cliente 
 */
router.post('/', clienteController.criarClientes);


module.exports = router;
