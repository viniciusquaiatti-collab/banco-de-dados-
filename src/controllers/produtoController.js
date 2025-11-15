const { produtoModel } = require("../models/produtoModel");

const produtoController = {

    listarProdutos: async (req, res) => {
        try {
            const { idProduto } = req.query;

            // Buscar apenas 1 produto
            if (idProduto) {

                if (!idProduto || idProduto.length !== 36) {
                    return res.status(400).json({ erro: "id do produto inválido!" });
                }

                const produto = await produtoModel.buscarUm(idProduto);

                return res.status(200).json(produto);
            }

            // Buscar todos os produtos
            const produtos = await produtoModel.buscarTodos();
            res.status(200).json(produtos);

        } catch (error) {
            console.error('Erro ao listar produtos:', error);
            res.status(500).json({ erro: 'Erro ao buscar produtos.' });
        }
    }, 

    criarProduto: async (req, res) => {
        try {
            let { nomeProduto, precoProduto } = req.body;

            // Valida antes de usar trim()
            if (!nomeProduto || precoProduto === undefined || isNaN(precoProduto)) {
                return res.status(400).json({ erro: "Campos Obrigatórios Não Preenchidos" });
            }

            nomeProduto = nomeProduto.trim();

            await produtoModel.inserirProduto(nomeProduto, precoProduto);

            res.status(201).json({ mensagem: "Produto cadastrado com sucesso!" });

        } catch (error) {
            console.error('Erro ao cadastrar produto:', error);
            res.status(500).json({ erro: 'Erro ao cadastrar produto.' });
        }
    },

    atualizarProduto: async (req, res) => {
        try {
            const { idProduto } = req.params;
            const { nomeProduto, precoProduto } = req.body;

            if (!idProduto || idProduto.length !== 36) {
                return res.status(400).json({ erro: 'id do produto inválido!' });
            }

            const produto = await produtoModel.buscarUm(idProduto);

            if (!produto || produto.length !== 1) {
                return res.status(404).json({ erro: 'Produto não encontrado!' });
            }

            const produtoAtual = produto[0];

            const nomeAtualizado = nomeProduto ?? produtoAtual.nomeProduto;
            const precoAtualizado = precoProduto ?? produtoAtual.precoProduto;

            await produtoModel.atualizarProduto(idProduto, nomeAtualizado, precoAtualizado);

            res.status(200).json({ mensagem: 'Produto atualizado com sucesso!' });

        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
            res.status(500).json({ erro: 'Erro ao atualizar produto.' });
        }
    },

    deletarProduto: async (req, res) => {
        try {
            const { idProduto } = req.params;

            if (!idProduto || idProduto.length !== 36) {
                return res.status(400).json({ erro: 'id do produto inválido!' });
            }

            const produto = await produtoModel.buscarUm(idProduto);

            if (!produto || produto.length !== 1) {
                return res.status(404).json({ erro: 'Produto não encontrado!' });
            }

            await produtoModel.deletarProduto(idProduto);

            res.status(200).json({ mensagem: 'Produto deletado com sucesso!' });

        } catch (error) {
            console.error('Erro ao deletar produto:', error);
            res.status(500).json({ error: 'Erro ao deletar produto' });
        }
    }
}

module.exports = { produtoController };
