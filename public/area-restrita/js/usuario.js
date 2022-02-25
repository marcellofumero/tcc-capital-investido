let usuario = {};

$(document).ready(() => {
    usuario.eventos.init();
})

usuario.eventos = {
    init: () => {        
        comum.eventos.verificaTokenAcesso();   
        $("#spanNomeUsuarioCabecalho").text(localStorage.getItem('NomeUsuario')); 
        // usuario.metodos.listarTodos();  
        // usuario.metodos.listarPerfilUsuario(); 
    },
    
}

usuario.var = {
     

}

usuario.metodos = {

    listarTodos: () => {
        try{                                 
            $.ajax({
                type: 'GET',
                url: comum.var.urlApiAreaRestrita + '/v1/usuario/usuario/',
                beforeSend: (request) => { request.setRequestHeader("Authorization", "Bearer "+localStorage.getItem('TokenAcesso')); },
                success: function (response) {                   
                    if (response.status == 200){

                        response.dados.map((elem,i) => { 
                            let perfil = elem.perfil == undefined ? '' : elem.perfil.nome;
                                                                                  
                            $("#datatablesSimple tbody").append(`
                                <tr>
                                    <td>${elem.nome}</td>
                                    <td>${elem.email}</td>
                                    <td>${perfil}</td>
                                    <td>${elem.status}</td>                            
                                </tr>
                            `); 
                        });                        
                       
                        const datatablesSimple = document.getElementById('datatablesSimple');
                        if (datatablesSimple) {
                            new simpleDatatables.DataTable(datatablesSimple);
                        }                     
                    }                        
                },
                error: function (xhr, ajaxOptions, error) {
                    if (xhr.status == 400){
                        console.log('error 400',xhr)
                    }
                    if (xhr.status == 401){
                        console.log('error 401',xhr)
                        window.location.href = './401.html'
                    }
                }
            });
        } 
        catch (erro){
            console.log('catch',erro)
        }
    },

    criarConta: (nome = null, email = null , password = null, perfil = null,  status = 'Ativo') => {        
        try{                
            const dados = { nome , email , password , perfil , status };
            console.log('criarConta',dados)            
            $.ajax({
                type: 'POST',
                url: comum.var.urlApiAreaRestrita + '/v1/usuario/usuario',
                data: dados,
                success: function (response) {                   
                    if (response.status == 201){
                        comum.metodos.mensagemInformativa('msgCriarConta',response.mensagem,'sucesso');                                                            
                    }                        
                },
                error: function (xhr, ajaxOptions, error) {
                    console.log(xhr)
                    if (xhr.status == 400){
                        comum.metodos.mensagemInformativa('msgCriarConta',xhr.responseJSON.mensagem,'erro');
                    }
                }
            });
        } 
        catch (erro){
            comum.metodos.mensagemInformativa('msgCriarConta','Ocorreu um erro inesperado: ' + erro,'erro');
        }
    },

    listarPerfilUsuario: () => {        
        try{                                 
            $.ajax({
                type: 'GET',
                url: comum.var.urlApiAreaRestrita + '/v1/perfilUsuario/perfilUsuario/',
                beforeSend: (request) => { request.setRequestHeader("Authorization", "Bearer "+localStorage.getItem('TokenAcesso')); },
                success: function (response) {                   
                    if (response.status == 200){
                        $("#selectPerfil").find("option").remove(); 
                        $.each(response.dados, function () {
                            $("#selectPerfil").append(
                                `<option value="${this._id}">${this.nome}</option>`
                            );
                        });                
                    }                        
                },
                error: function (xhr, ajaxOptions, error) {
                    if (xhr.status == 400){
                        comum.metodos.mensagemInformativa('msgCriarConta',xhr.responseJSON.mensagem,'erro');                        
                    }
                    if (xhr.status == 401){
                        window.location.href = './401.html'
                    }
                }
            });
        } 
        catch (erro){
            comum.metodos.mensagemInformativa('msgCriarConta','Ocorreu um erro inesperado: ' + erro,'erro');
        }
    },

}