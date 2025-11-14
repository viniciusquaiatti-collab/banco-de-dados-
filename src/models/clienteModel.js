// Importa o módulo de conexão com o banco de dados SQL SERVER 
const { sql, getConnection } = require('../config/db');

// Objeto que agrupa todas as funções relacionadas ao cliente 
const clienteModel = {

   /**
    * Busca todos os clientes cadastrados no banco de dados.
    * @returns {Promise<Array>} Retorna a lista de clientes 
    */
   buscarTodos: async () => {
      try {
         const pool = await getConnection();
         const result = await pool.request().query('SELECT * FROM Clientes');
         return result.recordset;

      } catch (error) {
         console.error('Erro ao buscar todos os clientes:', error);
         throw error;
      }
   },

   /**
    * Busca um cliente específico pelo CPF (para verificar duplicidade).
    * @param {string} cpfCliente - CPF do cliente a ser verificado
    * @returns {Promise<object|null>} Retorna o cliente encontrado ou null se não existir
    */
   buscarPorCPF: async (cpfCliente) => {
      try {
         const pool = await getConnection();
         
         const result = await pool.request()
            .input('cpfCliente', sql.VarChar, cpfCliente)
            .query('SELECT * FROM Clientes WHERE cpfCliente = @cpfCliente');

         return result.recordset[0] || null;

      } catch (error) {
         console.error('Erro ao buscar cliente por CPF:', error);
         throw error;
      }
   },

   /**
    * Insere um novo cliente na tabela de Clientes.
    * @param {string} nomeCliente - Nome do Cliente
    * @param {string} cpfCliente - CPF do cliente
    * @returns {Promise<number>} Retorna o ID gerado pelo banco
    */
   inserir: async (nomeCliente, cpfCliente) => {
      try {
         const pool = await getConnection();

         const result = await pool.request()
            .input('nomeCliente', sql.VarChar, nomeCliente)
            .input('cpfCliente', sql.VarChar, cpfCliente)
            .query(`
               INSERT INTO Clientes (nomeCliente, cpfCliente)
               OUTPUT INSERTED.idCliente
               VALUES (@nomeCliente, @cpfCliente)
            `);

         return result.recordset[0].idCliente;

      } catch (error) {
         console.error('Erro ao inserir cliente:', error);
         throw error;
      }
   }
};

// Exporta o Objeto para ser usado em outros arquivos 
module.exports = clienteModel;