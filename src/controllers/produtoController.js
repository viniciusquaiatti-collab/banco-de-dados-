const {produtoModel} = require("../models/produtoModel");

const produtoController = {
    /**
     * Controlador que lista todos os produtos do banco de dados 
     * 
     * @async
     * @function listarProdutos
     * @param {object} req - Objeto da requisicao (recebido do cliente HTTP)
     * @param {object} res - Objeto da Resposta (enviado ao cliente HTTP)
     * @returns {Promise<void>} Retorna uma resposta JSON com a lista de produto.
     * @throws Mostra no console e retonra erro 500 se ocorrer falha ao buscar os produtos.
     */
    listarProdutos: async (req, res) => {
        try {
            const produtos = await produtoModel.buscarTodos();

            res.status(200).json(produtos);

            
        } catch (error) {
            console.error('Erro ao listar produtos:', error);
            res.status(500).json({erro: 'Erro ao buscar produtos.'});
            
        }
        
    }
}

module.exports = {produtoController};