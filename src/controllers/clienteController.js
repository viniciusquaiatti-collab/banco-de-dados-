/**
 * Importa o modelo que acessa o banco de dados 
 */
const clienteModel = require('../models/clienteModel');

// Controlador com as funções de regra de negócio
const clienteController = {

    /**
     * Lista todos os clientes cadastrados
     */
    listarClientes: async (req, res) => {
        try {
            const clientes = await clienteModel.buscarTodos();
            res.json(clientes);
        } catch (error) {
            res.status(500).json({ erro: 'Erro ao buscar clientes' });
        }
    },

    /**
     * Cria um novo cliente, verificando se o CPF já está cadastrado
     */
    criarClientes: async (req, res) => {
        const { nomeCliente, cpfCliente } = req.body;

        try {
            // Verifica se já existe um cliente com o mesmo CPF
            const clienteExistente = await clienteModel.buscarPorCPF(cpfCliente);

            if (clienteExistente) {
                // CPF duplicado, retorna erro 409
                return res.status(409).json({ erro: 'CPF já cadastrado!' });
            }

            // Insere corretamente passando parâmetros separados
            await clienteModel.inserir(nomeCliente, cpfCliente);

            res.status(201).json({ mensagem: 'Cliente cadastrado com sucesso!' });

        } catch (error) {
            res.status(500).json({ erro: 'Erro ao cadastrar cliente' });
        }
    },
    criarClientes: async (req, res) => {
    console.log("Recebido do Insomnia:", req.body);
    const { nomeCliente, cpfCliente } = req.body;
    }

}

module.exports = clienteController;