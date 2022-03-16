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
                                    <td align="center">
                                        <a href="usuario-editar.html?id=${elem._id}" style="text-decoration:none !important">
                                            <i class="far fa-edit" title="Editar" style="cursor:pointer"></i>
                                        </a>
                                        &nbsp;
                                        <i class="far fa-trash-alt" onclick="$('#modalExemplo').modal('show');$('#msgExcluirUsuario').hide();$('#lblNomeUsuarioExcluir').text('${elem.nome}');$('#txtUsuarioExcluir').val('${elem._id}')" title="Excluir" style="cursor:pointer" ></i>
                                        
                                    </td>                          
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
            comum.metodos.mensagemInformativa('msgListaUsuario','Ocorreu um erro inesperado: ' + erro,'erro');
        }
    },

    criarConta: (nome = null, email = null , password = null, perfil = null,  status = 'Ativo') => {        
        try{                
            const dados = { nome , email , password , perfil , status };
                      
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

    obterDadosUsuario: () => {        
        try{                                 
            var idUsuario = location.search.slice(1).split('=')[1];
            usuario.metodos.listarPerfilUsuario();
            if (localStorage.getItem('PerfilUsuario') == "Administrador"){
                $("#selectStatus").removeAttr("disabled");
                $("#selectPerfil").removeAttr("disabled");
            }
            
            $.ajax({
                type: 'GET',
                url: comum.var.urlApiAreaRestrita + '/v1/usuario/usuario/' + idUsuario,
                beforeSend: (request) => { request.setRequestHeader("Authorization", "Bearer "+localStorage.getItem('TokenAcesso')); },
                success: function (response) { 
                                     
                    if (response.status == 200){
                        $("#inputFirstName").val(response.dados.nome);      
                        $("#inputEmail").val(response.dados.email);  
                        $("#selectStatus option[value="+response.dados.status+"]").attr('selected','selected');     
                        $("#selectPerfil option[value="+response.dados.perfil._id+"]").attr('selected','selected');     
                    }                        
                },
                error: function (xhr, ajaxOptions, error) {
                    if (xhr.status == 400){
                        comum.metodos.mensagemInformativa('msgEditarConta',xhr.responseJSON.mensagem,'erro');                        
                    }
                    if (xhr.status == 401){
                        window.location.href = './401.html'
                    }
                }
            });
            
        } 
        catch (erro){
            comum.metodos.mensagemInformativa('msgEditarConta','Ocorreu um erro inesperado: ' + erro,'erro');
        }
    },

    atualizarDadosUsuario: (nome = null, email = null , password = null, perfil = null,  status = 'Ativo') => {        
        try{   
            var idUsuario = location.search.slice(1).split('=')[1]             
            const dados = { nome , email , perfil , status };
            if (password != null && password != '' && password != undefined){
                dados['password'] = password;
            }
            console.log('atualizarDadosUsuario',dados)   
                   
            $.ajax({
                type: 'PUT',
                url: comum.var.urlApiAreaRestrita + '/v1/usuario/usuario/' + idUsuario,
                data: dados,
                success: function (response) {                   
                    if (response.status == 201){
                        comum.metodos.mensagemInformativa('msgEditarConta',response.mensagem,'sucesso');                                                            
                    }                        
                },
                error: function (xhr, ajaxOptions, error) {
                    console.log(xhr)
                    if (xhr.status == 400){
                        comum.metodos.mensagemInformativa('msgEditarConta',xhr.responseJSON.mensagem,'erro');
                    }
                }
            });
            
        } 
        catch (erro){
            comum.metodos.mensagemInformativa('msgEditarConta','Ocorreu um erro inesperado: ' + erro,'erro');
        }
    },

    excluirUsuario: (idUsuario) => {        
        try{                                  
            $.ajax({
                type: 'DELETE',
                url: comum.var.urlApiAreaRestrita + '/v1/usuario/usuario/' + idUsuario,
                beforeSend: (request) => { request.setRequestHeader("Authorization", "Bearer "+localStorage.getItem('TokenAcesso')); },
                success: function (response) { 
                                      
                    if (response.status == 201){                        
                        comum.metodos.mensagemInformativa('msgExcluirUsuario',response.mensagem,'sucesso'); 
                        $('#msgExcluirUsuario').show();
                        window.setTimeout(()=>{
                            $('#modalExemplo').modal('hide'); 
                            $("#datatablesSimple tbody").text('');                                                       
                            usuario.metodos.listarTodos();
                        }, 2000);              
                    }                        
                },
                error: function (xhr, ajaxOptions, error) {
                    if (xhr.status == 400){
                        comum.metodos.mensagemInformativa('msgExcluirUsuario',xhr.responseJSON.mensagem,'erro');                        
                    }
                    if (xhr.status == 401){
                        window.location.href = './401.html'
                    }
                }
            });
            
        } 
        catch (erro){
            comum.metodos.mensagemInformativa('msgExcluirUsuario','Ocorreu um erro inesperado: ' + erro,'erro');
        }
    },

}