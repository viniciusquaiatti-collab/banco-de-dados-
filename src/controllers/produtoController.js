const { produtoModel } = require("../models/produtoModel");

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

            const {idProduto } = req.query;

            if (idProduto) {
                if (idProduto.length != 36) {
                    return res.status(400).json({erro: "id do produto inválido!"});
                }

                const produto = await produtoModel.buscarUm(idProduto);

                return res.status(200).json(produto);
            }

            const produtos = await produtoModel.buscarTodos();

            res.status(200).json(produtos);


        } catch (error) {
            console.error('Erro ao listar produtos:', error);
            res.status(500).json({ erro: 'Erro ao buscar produtos.' });

        }


    }, 
    
    /**
     * Controlador que cria um novo produto no banco de dados
     * 
     * @async
     * @function criarProduto
     * @param {object} req - Objeto de Requisição (recebido do cliente HTTP) 
     * @param {object} res - Objeto de Resposta (enviado ao cliente HTTP)
     * @returns {Promise<void>} - Retorna uma mensagem de sucesso ou erro em formato JSON 
     * @throws {400} Se algum campo obrigatório nao for preenchido corretamente
     * @throws {500} Se ocorrer qualquer erro interno no servidor.
     * 
     * @example
     * -POST /produtos
     * BODY:
     * {
     *  "nomeProduto": "Camiseta",
     *  "precoProduto": 49.90
     * }
     */
    criarProduto: async (req, res) => {


        try {

            let { nomeProduto, precoProduto } = req.body;

            nomeProduto = nomeProduto.trim();

            if (nomeProduto == undefined || precoProduto == undefined ||
                isNaN(precoProduto)) {
                return res.status(400).json({ erro: "Campos Obrigatórios Não Preenchidos" });

            }

            await produtoModel.inserirProduto(nomeProduto, precoProduto);

            res.status(201).json({ message: "Produto cadastrado com sucesso!" });

        } catch (error) {
            console.error('Erro ao cadastrar produto:', error);
            res.status(500).json({ erro: 'Erro ao cadastrar produto.' });

        }
    },

    atualizarProduto: async (req, res) => {
        try {
            const {idProduto} = req.params;
            const {nomeProduto, precoProduto} = req.body;

            if (idProduto.length != 36) {
                return res.status(400).json({erro: 'id do produto inválido!'});
            }

            const produto = await produtoModel.buscarUm(idProduto);

            if (!produto || produto.length !== 1) {
                return res.status (404).json({erro: 'Produto não encontrado!'});
            }

            const produtoAtual = produto[0];

            const nomeAtualizado = nomeProduto ?? produtoAtual.nomeProduto;
            const precoAtualizado = precoProduto ?? produtoAtual.precoProduto;

            await produtoModel.atualizarProduto(idProduto, nomeAtualizado, precoAtualizado);

            res.status(200).json({mensagem: 'Produto atualizado com sucesso!'});


        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
            res.status(500).json({ erro: 'Erro ao cadastrar produto.' });
        }
    }
}
module.exports = { produtoController }; 