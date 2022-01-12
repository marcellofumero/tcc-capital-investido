var bcrypt    		= require('bcrypt-nodejs');
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
            gerarTokenAcesso(CodUsuario, PerfilUsuario){ 
                return jwt.sign({'CodUsuario': CodUsuario, 'PerfilUsuario': PerfilUsuario}, 'Capital@Investido', { expiresIn: 3600 });                
            },
            verificaTokenAcesso(req, res, next){
                var headerTokenAcesso = req.headers['authorization'];                
                if(typeof headerTokenAcesso != 'undefined'){
                    try {
                        var decoded = jwt.verify(headerTokenAcesso, 'Capital@Investido');
                        next();
                    } catch(err) {
                        res.status(401).send();
                    }              
                }else {
                    res.status(401).send();
                }                               
            },	
            retornaCodigoTokenAcesso(Valor, req){                                
                var headerTokenAcesso = req;
                var decoded = jwt.decode(headerTokenAcesso, {complete: true});
                if (Valor === "CodUsuario"){
                    return decoded.payload.CodUsuario;
                }else if (Valor === "PerfilUsuario"){
                    return decoded.payload.PerfilUsuario;
                }                 
            }				
		}		 	
	} 
);

module.exports = UsuarioTokenAcesso;