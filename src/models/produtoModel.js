const { sql, getConnection } = require("../config/db");

const produtoModel = {

    // Busca todos os produtos
    buscarTodos: async () => {
        try {
            const pool = await getConnection();
            const result = await pool.request().query('SELECT * FROM Produtos');
            return result.recordset;
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
            throw error;
        }
    },

    // Insere produto
    inserirProduto: async (nomeProduto, precoProduto) => {
        try {
            const pool = await getConnection();

            const querySQL = `
                INSERT INTO Produtos (nomeProduto, precoProduto)
                VALUES (@nomeProduto, @precoProduto)
            `;

            await pool.request()
                .input("nomeProduto", sql.VarChar(100), nomeProduto)
                .input("precoProduto", sql.Decimal(10, 2), precoProduto)
                .query(querySQL);

        } catch (error) {
            console.error("Erro ao inserir produto:", error);
            throw error;
        }
    },

    // Busca um único produto
    buscarUm: async (idProduto) => {
        try {
            const pool = await getConnection();

            const querySQL = `
                SELECT * FROM Produtos
                WHERE idProduto = @idProduto
            `;

            const result = await pool.request()
                .input('idProduto', sql.UniqueIdentifier, idProduto)
                .query(querySQL);

            return result.recordset;

        } catch (error) {
            console.error("Erro ao buscar produto:", error);
            throw error;
        }
    },

    // Atualiza produto
    atualizarProduto: async (idProduto, nomeProduto, precoProduto) => {
        try {
            const pool = await getConnection();

            const querySQL = `
                UPDATE Produtos 
                SET nomeProduto = @nomeProduto,
                    precoProduto = @precoProduto
                WHERE idProduto = @idProduto
            `;

            await pool.request()
                .input('idProduto', sql.UniqueIdentifier, idProduto)
                .input('nomeProduto', sql.VarChar(100), nomeProduto)
                .input('precoProduto', sql.Decimal(10, 2), precoProduto)
                .query(querySQL);

        } catch (error) {
            console.error("Erro ao atualizar o produto:", error);
            throw error;
        }
    },

    // Deleta produto
    deletarProduto: async (idProduto) => {
        try {
            const pool = await getConnection();

            const querySQL = `
                DELETE FROM Produtos
                WHERE idProduto = @idProduto
            `;

            await pool.request()
                .input('idProduto', sql.UniqueIdentifier, idProduto)
                .query(querySQL);

        } catch (error) {
            console.error("Erro ao deletar o produto:", error);
            throw error;
        }
    }

};

module.exports = { produtoModel };
