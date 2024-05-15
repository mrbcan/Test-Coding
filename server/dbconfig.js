const config = {
  user: process.env.MSSQL_USER,
  password: process.env.MSSQL_PASSWORD,
  server: process.env.MSSQL_SERVER.toString(),
  database: process.env.MSSQL_DATABASE,
  options: {
    encrypt: true,
    trustServerCertificate: true,
    trustedconnection: true,
    enableArithAbort: true,
    instancename: 'SQLEXPRESS'
  },
  port: parseInt(process.env.MSSQL_PORT, 10)
  
};

  module.exports = config;


