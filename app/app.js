//const db  		= require('./config/db_config');
const config    = require('./config/config');
const express   = require('express');
const bodyParser= require('body-parser');
const app       = module.exports =  express();

var usuario = require('./routes/usuario');

//app.listen(config.web.port);
app.listen(3000, () => {
	console.log('API Capital Investido');
});
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(function(req, res, next){
	res.setHeader('Access-Control-Allow-Origin','*');
	res.setHeader('Access-Control-Allow-Methods', 'GET,POST, PUT, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
	next();
})

app.get('/',function(req,res){
	res.end('Bem-vindo a API do Pode Contar')	
});

app.use('/v1/usuario',usuario);