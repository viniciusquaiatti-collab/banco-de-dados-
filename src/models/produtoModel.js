const { sql, getConnection } = require("../config/db");

const produtoModel = {
    /**
     * Busca todos os produtos no banco de dados.
     * @async
     * @function buscarTodos
     * @returns {Promisse<Array>} Retorna uma lista com todos os produtos.
     * @throws Mostra no console e propaga o erro caso a busca falhe.
     *
     */
    buscarTodos: async () => {
        try {

            const pool = await getConnection();

            const querySQL = 'SELECT * FROM Produtos';

            const result = await pool.request()
                .query(querySQL);

            return result.recordset;

        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
            throw error; // Reverberar o erro para a função que o chamar
        }
    },

    /**
     * Insere um novo produto no banco de dados 
     *
     * @async
     * @function inserirProduto
     * @param {string} nomeProduto - Nome do produto a ser cadastrado
     * @param {number} precoProduto - Preco do Produto
     * @returns {Promise<void>} - Nao retorna nada, apenas executa a inserção
     * @throws - Mostra no Console e propaga o erroc aso a inserção falhe.
     */

    inserirProduto: async (nomeProduto, precoProduto) => {
        try {

            const pool = await getConnection();

            const querySQL = `
            INSERT INTO Produtos (nomeProduto, precoProduto)
            VALUES (@nomeProduto, @precoProduto)
            `

            await pool.request()
                .input("nomeProduto", sql.VarChar(100), nomeProduto)
                .input("precoProduto", sql.Decimal(10, 2), precoProduto)
                .query(querySQL);


        } catch (error) {
            console.error("Erro ao inserir Produto", error);
            throw error;

        }


    },

    /**
     * Busca um produto no Banco de dados 
     * @async
     * @function
     * @param {string} idProduto - Id do produto em UUID no banco de dados 
     * @returns {Promise<Array>} Retorna uma Lista com um produto caso encontre o banco de dados.
     * @throws - Mostra no console e propaga o erro caso a busca falhe.
     */
    buscarUm: async (idProduto) => {
        try {
            const pool = await getConnection();

            const querySQL = `
            SELECT * FROM Produtos
            WHERE idProduto = @idProduto
            
            `; // SELECT ( seleciona) * (Todas as colunas)  FROM Produtos (da tabela de produtos)  WHERE idProdutos = 123

            const result = await pool.request()
            .input('idProduto', sql.UniqueIdentifier, idProduto)
            .query(querySQL);

            return result.recordset;

        } catch (error) {
            console.error("Erro ao buscar produto", error);
            throw error;

        }

    },

    atualizarProduto: async (idProduto, nomeProduto, precoProduto) => {
        try {
            const pool = await getConnection();

            const querySQL =`
            UPDATE Produtos 
            SET nomeProduto = @nomeProduto, 
                precoProduto = @precoProduto
                WHERE idProduto = @idProduto 
        `;

        await pool.request()
            .input('idProduto', sql.UniqueIdentifier, idProduto)
            .input('nomeProduto', sql.VarChar(100), nomeProduto)
            .input('precoProduto', sql.Decimal(10,2), precoProduto)

        } catch (error) {
            console.error("Erro ao atualizar o produto:", error);
            throw error;
        }
    },

    /**
     *  Atualiza um Produto ao banco de Dados 
     * 
     * @async
     * @function atualizarProduto
     * @param {string} idProduto - Id do produto em UUID no banco de dados
     * @param {string} nomeProduto - Nome do produto a ser atualizado 
     * @param {number} precoProduto - Preço do produto a ser atualizado
     * @returns {Promise<void>} - Não retorna nada, apenas executa a atualização 
     * @throws - Mostra no console e propaga o erro caso a atualização falhe.
     */
}

module.exports = { produtoModel };