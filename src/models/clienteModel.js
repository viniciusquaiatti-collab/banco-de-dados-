/**
 * Arquivo reponsavel pelo acesso ao banco de dados na tabela Clientes.
 * Importante definir funções para buscar e inserir clientes.
 */

const db = require('../config/db'); // Importa conexão com o banco

const clienteModel = {
    // Busca todos clientes cadastrados 
     this.buscarTodos: async () => {
        const [rows] = await db.query('SELECT * FROM Clientes');
        return rows;
     },

     // Busca cliente pelo CPF(para verificar  duplicidade)
     buscarPorCPF: async (cpfCliente) => {
        const [rows] = await db.query('SELECT * FROM Clientes WHERE cpfCliente = ?', [cpfCliente]);
        return rows [0];
     },

     // Insere um novo cliente na tabela
     inserir: async (nomeCliente, cpfCliente) => {
        const [result] = await db.query(
            'INSERT INTO Clientes (nomeCliente, cpfCliente) VALUES (?, ?)',
            [nomeCliente, cpfCliente]
        );
        return result.insertId; // retorna o ID gerado 
     };
     
};

module.exports = clienteModel;