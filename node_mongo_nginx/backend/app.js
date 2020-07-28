const express = require('express');
const restful = require('node-restful');
const server = express();
const mongoose = restful.mongoose
const bodyParser = require('body-parser');
const cors = require('cors');

// Banco de Dados
// Configurando mongoose para utilizar a API de promise do node
mongoose.Promise = global.Promise

// Conexão - db é o nome do banco
mongoose.connect('mongodb://db/mydb')

// Teste
server.get('/', (req, res, next) => res.send('Backend'))

// Midlewares
server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())
server.use(cors())

// ODM
const Client = restful.model('cliente', {
    name: {type: String, require: true}
})

// Rest API
Client.methods(['get', 'post', 'put', 'delete'])
Client.updateOptions({new: true, runValidators: true})

// Routes
Client.register(server, '/clients')

// Iniciar servidor
server.listen(3000)