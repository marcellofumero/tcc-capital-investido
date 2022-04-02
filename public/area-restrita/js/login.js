let login = {};

$(document).ready(() => {
    login.eventos.init()
})

login.eventos = {
    init: () => {

        
    }
}

login.var = {
    urlApiAreaRestrita: localStorage.getItem('UrlApiAreaRestrita') 

}

login.metodos = {

    logar: (email = null, password = null) => {
        try{            
            //const dados = { email , password}
            const dados = {
                "email": email
                ,"password" : password
            }
            
            $.ajax({
                type: 'POST',
                url: localStorage.getItem('UrlApiAreaRestrita') + '/v1/usuario/autenticar',
                data: dados,
                success: function (response) {                   
                    if (response.status == 200){
                        $("#msgLogin").removeClass('alert-danger');
                        $("#msgLogin").addClass('alert-success');
                        $("#msgLogin").text(response.mensagem);
                        $("#msgLogin").show();

                        localStorage.setItem("TokenAcesso",response.token);
                        localStorage.setItem("IdUsuario",response.dados._id);
                        localStorage.setItem("NomeUsuario",response.dados.nome);
                        localStorage.setItem("EmailUsuario",response.dados.email);
                        localStorage.setItem("PerfilUsuario",response.dados.perfil.nome);

                        window.setTimeout(()=>{
                            window.location.href = "index.html"
                        }, 3000);                
                        
                    }                        
                },
                error: function (xhr, ajaxOptions, error) {
                    if (xhr.status == 400){
                        $("#msgLogin").removeClass('alert-success');
                        $("#msgLogin").addClass('alert-danger');
                        $("#msgLogin").text(xhr.responseJSON.mensagem);
                        $("#msgLogin").show();
                        //$( "#msgLogin" ).delay( 800 ).fadeIn( 400 );
                    }
                }
            });
        } 
        catch (erro){
            $("#msgLogin").removeClass('alert-success');
            $("#msgLogin").addClass('alert-danger');
            $("#msgLogin").text('Ocorreu um erro inesperado: ' + erro);
        }
    },

    esqueciSenha: (email = null) => {
        try{            
            const dados = { email };
                        
            $.ajax({
                type: 'POST',
                url: login.var.urlApiAreaRestrita + '/v1/usuario/esqueciSenha',
                data: dados,
                success: function (response) {                   
                    if (response.status == 200){
                        $("#msgEsqueciSenha").removeClass('alert-danger');
                        $("#msgEsqueciSenha").addClass('alert-success');
                        $("#msgEsqueciSenha").text(response.mensagem);
                        $("#msgEsqueciSenha").show();                        
                    }                        
                },
                error: function (xhr, ajaxOptions, error) {
                    if (xhr.status == 400){
                        $("#msgEsqueciSenha").removeClass('alert-success');
                        $("#msgEsqueciSenha").addClass('alert-danger');
                        $("#msgEsqueciSenha").text(xhr.responseJSON.mensagem);
                        $("#msgEsqueciSenha").show();
                    }
                }
            });
        } 
        catch (erro){
            $("#msgEsqueciSenha").removeClass('alert-success');
            $("#msgEsqueciSenha").addClass('alert-danger');
            $("#msgEsqueciSenha").text('Ocorreu um erro inesperado: ' + erro);
        }
    },

    resetarSenha: (email = null , password = null) => {
        try{   
            var token = location.search.slice(1).split('=')[1];         
            const dados = { email , password , token };
                        
            $.ajax({
                type: 'POST',
                url: login.var.urlApiAreaRestrita + '/v1/usuario/resetarSenha',
                data: dados,
                success: function (response) {                   
                    if (response.status == 200){
                        $("#msgResetarSenha").removeClass('alert-danger');
                        $("#msgResetarSenha").addClass('alert-success');
                        $("#msgResetarSenha").text(response.mensagem);
                        $("#msgResetarSenha").show();                        
                    }                        
                },
                error: function (xhr, ajaxOptions, error) {
                    if (xhr.status == 400){
                        $("#msgResetarSenha").removeClass('alert-success');
                        $("#msgResetarSenha").addClass('alert-danger');
                        $("#msgResetarSenha").text(xhr.responseJSON.mensagem);
                        $("#msgResetarSenha").show();
                    }
                }
            });
        } 
        catch (erro){
            $("#msgEsqueciSenha").removeClass('alert-success');
            $("#msgEsqueciSenha").addClass('alert-danger');
            $("#msgEsqueciSenha").text('Ocorreu um erro inesperado: ' + erro);
        }
    },

    criarConta: (nome = null, email = null , password = null, status = 'Ativo', perfil = '6245055321d585c37d128e78') => {        
        try{                
            const dados = { nome , email , password , status };
                        
            $.ajax({
                type: 'POST',
                url: login.var.urlApiAreaRestrita + '/v1/usuario/usuario',
                data: dados,
                success: function (response) {                   
                    if (response.status == 201){
                        $("#msgCriarConta").removeClass('alert-danger');
                        $("#msgCriarConta").addClass('alert-success');
                        $("#msgCriarConta").text(response.mensagem);
                        $("#msgCriarConta").show();    
                        
                        localStorage.setItem("TokenAcesso",response.token);
                        localStorage.setItem("IdUsuario",response._id);
                        localStorage.setItem("NomeUsuario",nome);
                        localStorage.setItem("EmailUsuario",email);

                        window.setTimeout(()=>{
                            window.location.href = "index.html"
                        }, 3000);                
                    }                        
                },
                error: function (xhr, ajaxOptions, error) {
                    console.log(xhr)
                    if (xhr.status == 400){
                        $("#msgCriarConta").removeClass('alert-success');
                        $("#msgCriarConta").addClass('alert-danger');
                        $("#msgCriarConta").text(xhr.responseJSON.mensagem);
                        $("#msgCriarConta").show();
                    }
                }
            });
        } 
        catch (erro){
            $("#msgCriarConta").removeClass('alert-success');
            $("#msgCriarConta").addClass('alert-danger');
            $("#msgCriarConta").text('Ocorreu um erro inesperado: ' + erro);
        }
    }

}