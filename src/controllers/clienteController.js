/**
 * Controlador responsável por manipular as requisições de cliente.
 * Garante respostas detalhadas, status HTTP adequados e validações.
 */

const clienteModel = require('../models/clienteModel');

const clienteController = {
    /**
     * Lista todos os clientes presentes no banco de dados.
     */
    listarClientes: async (req, res) => {
        try {
            const clientes = await clienteModel.buscarTodos();
            res.json(clientes);
        } catch (error) {
            
            //Erro genérico ao buscar clientes
            res.status(500).json({erro: 'Erro ao buscar clientes'});
            
        }
    },

    /**
     * Cria um novo cliente , validando se o CPF já existe antes.
     */
    criarClientes: async (req, res) => {
        const { nomeCliente, cpfCliente } = req.body;

        //Verifica se o CPF já existe 
        const clienteExistente = await clienteModel.buscarPorCPF(cpfCliente);

        if (clienteExistente.length > 0) {
            // CPF duplicado, retorna erro 409
            return res.status(409).json({erro: 'CPF já cadastrado!'});
        }
        try {
            await clienteModel.inserir({nomeCliente, cpfCliente });
            res.status(201).json({ mensagem: 'Cliente cadastrado com sucesso!'})
        } catch (error) {
            //Erro genérico ao inserir cliente
            res.status(500).json({ erro: 'Erro ao cadastrar cliente'});
            
        }
    }
};

module.exports = clienteController;