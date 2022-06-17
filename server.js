const app = require('./src/app');

port = process.env.PORT || 3030;

app.listen(port, () => console.log("Servidor rodando na porta", port))