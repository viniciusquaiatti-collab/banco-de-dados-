const sql = require("mssql");

const config = {
    user: "sa",
    password: "123456789",
    server: "localhost",
    database: "LojaEspricio",
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

/**
 * Cria e retorna uma conexao com o banco de dados SQL SERVER
 * 
 * @async
 * @function getConnection
 * @returns {Promise<object>} Retorna o objeto de conexao (pool) com o banco de dados 
 * @throws mostra no console se ocorrer erro na conexão 
 */
async function getConnection(){
     try {
        const pool = await sql.connect(config);

        return pool;

     } catch (error) {
        console.error('Erro na conexao SQL Server:', error);
     }
    
};

// (async () => {
//     const pool = await getConnection();

//     const result = await pool.request().query("SELECT * FROM Produtos");
    
//     console.log(result.recordset);
// })()

module.exports ={sql, getConnection};