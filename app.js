// Arquivo principal do servidor
const express = require("express");
const app = express();

// Importa as Rotas
const produtoRoutes = require("./src/routes/produtoRoutes");
const clienteRoutes = require("./src/routes/clienteRoutes");

const PORT = 8081;

app.use(express.json());

// Rotas
app.use('/', produtoRoutes);
app.use('/clientes', clienteRoutes);

// Inicia o Servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

module.exports = app;