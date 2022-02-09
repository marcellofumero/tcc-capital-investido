//var bcrypt    		= require('bcrypt-nodejs');
var bcrypt = require('bcryptjs');
var jwt       		= require('jsonwebtoken');
var SchemaObject 	= require('node-schema-object');

var UsuarioTokenAcesso = new SchemaObject(
    {
        tokenAcesso: String
    },
	{
		methods:{
            gerarSenha(senha){
				return bcrypt.hashSync(senha, bcrypt.genSaltSync(9));
			},	
            gerarTokenAcesso(CodUsuario){ 
                return jwt.sign({'CodUsuario': CodUsuario}, 'Capital@Investido', { expiresIn: 3600 });                
            },
            verificaTokenAcesso(req, res, next){
                var headerTokenAcesso = req.headers['authorization'];                
                if(typeof headerTokenAcesso != 'undefined'){
                    try {
                        const parts = headerTokenAcesso.split(' ');
                        
                        if (parts.length != 2){
                            return res.status(401).send({status: 401, mensagem: "Token com erro."});
                        }

                        const [ schema, token ] = parts;

                        if (!/^Bearer$/i.test(schema)){
                           return res.status(401).send({status: 401, mensagem: "Token com formatação incorreta."});
                        }
                        
                        var decoded = jwt.verify(token, 'Capital@Investido');
                        
                        return next();
                    } catch(err) {
                        res.status(401).send({status: 401, mensagem: "Token inválido."});
                    }              
                }else {                    
                    res.status(401).send({status: 401, mensagem: "Token não informado."});
                }                               
            },	
            retornaCodigoTokenAcesso(Valor, req){                                
                var headerTokenAcesso = req;
                var decoded = jwt.decode(headerTokenAcesso, {complete: true});
                if (Valor === "CodUsuario"){
                    return decoded.payload.CodUsuario;
                }                
            }				
		}		 	
	} 
);

module.exports = UsuarioTokenAcesso;