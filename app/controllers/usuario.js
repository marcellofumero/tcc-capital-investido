const config = require('../config/config');
const UsuarioTokenAcesso = require('../models/protecaoTokenAcesso');
const Acesso = new UsuarioTokenAcesso();
const validator = require("email-validator");
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const mailer = require('../functions/mailer');


exports.usuarioListar = async function(req, callback){
    try{
        const { id } = req.params;
        
        const usuario = await Usuario.findById(id).populate('perfil');        
        
        if (usuario){
            callback({status: 200, mensagem: 'Usuário localizado com sucesso.', dados: usuario}); 
        }else{
            callback({status: 200, mensagem: 'Não foi localizado o cadastro do usuário solicitado.'}); 
        }               
    } catch (erro){
        callback({status: 400, mensagem: 'Ocorreu uma falha ao tentar localizar o cadastro do usuário.', erro: erro}); 
    }                              
};  

exports.usuarioListarTodos = async function(req, callback){
    try{        
        const usuario = await Usuario.find().populate('perfil');        
        
        if (usuario){
            callback({status: 200, mensagem: 'Usuários localizados com sucesso.', dados: usuario}); 
        }else{
            callback({status: 200, mensagem: 'Nenhum cadastro de usuário foi localizado.'}); 
        }               
    } catch (erro){
        callback({status: 400, mensagem: 'Ocorreu uma falha ao tentar localizar o cadastro do usuário.', erro: erro}); 
    }                              
};  

exports.usuarioCadastrar = async function(req, callback){
    try{                
        const usuario = await Usuario.create(req.body);
        const token = Acesso.gerarTokenAcesso( usuario.id );

        callback({status: 201, mensagem: 'Usuário cadastrado com sucesso', _id: usuario._id, token: token});        
    } catch (erro){
        callback({status: 400, mensagem: 'Não foi possível realizar o cadastro do usuário.', erro: erro}); 
    }                         
};  

exports.usuarioAtualizar = async function(req, callback){
    try{        
        const { id } = req.params;
        const usuario = await Usuario.findByIdAndUpdate(id, req.body);
        
        if (req.body.password){            
            const usuarioAux = await Usuario.findById(id);
            usuarioAux.password = req.body.password;
            await usuarioAux.save();
        }        

        callback({status: 201, mensagem: 'Usuário atualizado com sucesso', _id: usuario._id});        
    } catch (erro){
        callback({status: 400, mensagem: 'Não foi possível realizar a atualização do usuário.', erro: erro}); 
    }                         
}; 

exports.usuarioAutenticar = async function(req, callback){
    try{
        
        const { email, password } = req.body;                
        const usuario = await Usuario.findOne({ email , status: 'Ativo' }).select('+password').populate('perfil');
        
        if (!usuario){
            callback({status: 400, mensagem: 'Usuário não encontrado.'});
            return;
        }

        if (!await bcrypt.compare(password, usuario.password)){
            callback({status: 400, mensagem: 'Senha inválida para o usuário informado.'});
            return;
        }
        
        usuario.password = undefined;        
        const token = Acesso.gerarTokenAcesso( usuario.id );

        callback({status: 200, mensagem: 'Usuário autenticado com sucesso.', dados: usuario, token: token});
    } catch (erro){
        callback({status: 400, mensagem: 'Ocorreu uma falha ao tentar autenticar o usuário.', erro: erro}); 
    }                              
}; 

exports.usuarioEsqueciSenha = async function(req, callback){
    try{
        const { email } = req.body;
        
        const usuario = await Usuario.findOne({ email });        
        
        if (usuario){
            const token = crypto.randomBytes(20).toString('hex');
            
            const now = new Date();
            now.setHours( now.getHours() + 1 );

            await Usuario.findByIdAndUpdate( usuario.id, {
                '$set': {
                    passwordResetToken: token,
                    passwordResetExpires: now
                }
            });
            const nomeusuario = usuario.nome;
           
            mailer.sendMail({
                to: email,
                from: '<Capital Investido>capitalinvestido@capitalinvestido.com.br',
                subject: 'Recuperação de senha',
                template: 'usuario/esqueci-senha',
                context: { token , nomeusuario },
            }, (erro) => {
                if (erro)
                    callback({status: 400, mensagem: 'Ocorreu uma falha ao tentar enviar o e-mail para redefinir a senha do usuário.', erro: erro});
                else    
                    callback({status: 200, mensagem: 'Foi enviado ao seu e-mail as instruções para realizar a troca de senha!', dados: usuario});     
            });
            
            
        }else{
            callback({status: 400, mensagem: 'Não foi localizado o cadastro do usuário solicitado para resetar a senha.'}); 
        }               
    } catch (erro){
        callback({status: 400, mensagem: 'Ocorreu uma falha ao tentar iniciar o processo para redefinir a senha do usuário.', erro: erro}); 
    }                              
};  

exports.usuarioResetarSenha = async function(req, callback){
    try{
        const { email , token , password } = req.body;
        
        const usuario = await Usuario.findOne({ email })
            .select('+passwordResetToken passwordResetExpires');        
        
        if (!usuario){
            callback({status: 400, mensagem: 'Não foi localizado o cadastro do usuário solicitado para resetar a senha.'}); 
            return;
        }
        
        if (token !== usuario.passwordResetToken){
            callback({status: 400, mensagem: 'Token inválido para redefinição de senha.'}); 
            return;
        }

        const now = Date();

        if (now > usuario.passwordResetExpires){
            callback({status: 400, mensagem: 'O tempo para resetar a senha expirou.'}); 
            return;
        }

        usuario.password = password;

        await usuario.save();

        callback({status: 200, mensagem: 'Senha alterada com sucesso.'}); 
        
        
    } catch (erro){
        callback({status: 400, mensagem: 'Ocorreu uma falha ao tentar redefinir a senha do usuário.', erro: erro}); 
    }                              
};  

exports.usuarioExcluir = async function(req, callback){
    try{        
        const { id } = req.params;
        const usuario = await Usuario.findByIdAndDelete(id, req.body);

        callback({status: 201, mensagem: 'Usuário excluído com sucesso', _id: usuario._id});        
    } catch (erro){
        callback({status: 400, mensagem: 'Não foi possível realizar a exclusão do usuário.', erro: erro}); 
    }                          
}; 

exports.graficoStatus = async function(req, callback){
    try{
               
        const pipeline = [
            {
                '$group': {
                    '_id':  '$status' ,
                    'quantidade':{
                        '$sum':1
                    }
                }
            },
            {
                '$sort': { '_id': 1 }
            }
        ];
        const usuario = await Usuario.aggregate(pipeline);       
        
        if (usuario){
            callback({status: 200, mensagem: 'Dados do relatório gerados com sucesso.', dados: usuario}); 
        }else{
            callback({status: 200, mensagem: 'Não foi possível gerar os dados do relatório.'}); 
        }               
    } catch (erro){
        callback({status: 400, mensagem: 'Ocorreu uma falha ao gerar os dados para o relatório.', erro: erro}); 
    }                              
}; 

exports.graficoPerfil = async function(req, callback){
    try{
               
        const pipeline = [
            {
                '$group': {
                    '_id':  '$perfil' ,
                    'quantidade':{
                        '$sum':1
                    }
                }
            }
        ];
        const usuario = await Usuario.aggregate(pipeline);       
        
        if (usuario){
            callback({status: 200, mensagem: 'Dados do relatório gerados com sucesso.', dados: usuario}); 
        }else{
            callback({status: 200, mensagem: 'Não foi possível gerar os dados do relatório.'}); 
        }               
    } catch (erro){
        callback({status: 400, mensagem: 'Ocorreu uma falha ao gerar os dados para o relatório.', erro: erro}); 
    }                              
}; 

exports.relatorioPdf = async function(req, callback){
    try{

        const usuario = await Usuario.find().populate('perfil'); 
        //console.log(usuario)
        var html = `
            <b1><center>RELATÓRIO DE USUÁRIOS</center></b1>
            <hr>
            <table border=1 width=100%>
                <tr>
                    <td><b>Nome</b></td>
                    <td><b>Perfil</b></td>
                    <td><b>Status</b></td>
                </tr>    
        `;

        for (var f of usuario){
            var html = html + `            
                <tr>
                    <td>${f.nome}</td>
                    <td>${f.perfil.nome}</td>
                    <td>${f.status}</td>
                </tr>    
            `;
        }	
        
        var html = html + `
                </table>    
            `;
        
        var fs = require('fs');
        var pdf = require('html-pdf');
        //var html = fs.readFileSync('./test/businesscard.html', 'utf8');
        
        var options = { format: 'Letter' };

        /*
        pdf.create(html, options).toFile('./businesscard.pdf', function(err, res) {
        if (err) return console.log(err);
        console.log(res); // { filename: '/app/businesscard.pdf' }
        });
        */
        pdf.create(html).toBuffer(function(err, buffer){
            console.log('gerou buffer:', Buffer.isBuffer(buffer));
            callback(buffer);
        });     
        //callback({status: 200, mensagem: 'Dados do relatório gerados com sucesso.', dados: usuario}); 
                       
    } catch (erro){
        callback({status: 400, mensagem: 'Ocorreu uma falha ao gerar os dados para o relatório.', erro: erro}); 
    }                              
}; 