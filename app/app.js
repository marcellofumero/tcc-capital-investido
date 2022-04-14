//const db  		= require('./config/db_config');
const config    = require('./config/config');
const express   = require('express');
const bodyParser= require('body-parser');
const cors = require('cors');
const app       = module.exports =  express();

var usuario = require('./routes/usuario');
var perfilUsuario = require('./routes/perfilUsuario');
var tipoInvestimento = require('./routes/tipoInvestimento');
var listaFree = require('./routes/listaFree');
var listaVip = require('./routes/listaVip');
var modalidadeInvestimento = require('./routes/modalidadeInvestimento');
var noticia = require('./routes/noticia');
var aviso = require('./routes/aviso');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());

app.use((req, res, next) => {
	
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');	
    app.use(cors());
    next();
});

app.get('/',function(req,res){
	res.end('Bem-vindo a API do Capital Investido')	
});

app.use('/v1/usuario',usuario);
app.use('/v1/perfilUsuario',perfilUsuario);
app.use('/v1/tipoInvestimento',tipoInvestimento);
app.use('/v1/listaFree',listaFree);
app.use('/v1/listaVip',listaVip);
app.use('/v1/modalidadeInvestimento',modalidadeInvestimento);
app.use('/v1/noticia',noticia);
app.use('/v1/aviso',aviso);

//app.listen(config.web.port);
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log('API Capital Investido');
});