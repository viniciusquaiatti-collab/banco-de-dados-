/** Arquivo principal do servidor.
 *  Faz a conexão do app com as rotas de cliente.
 */

const express = require("express");
const app = express();
const { produtoRoutes } = require ("./src/routes/produtoRoutes");
const PORT = 8081;

app.use(express.json());
const clienteRoutes = require('./src/routes/clienteRoutes');

app.use('/', produtoRoutes);

app.use('/clientes', clienteRoutes); // Todas as rotas de clientes usam o prefixo /clientes

module.exports = app;

app.listen(PORT, ()=> {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});