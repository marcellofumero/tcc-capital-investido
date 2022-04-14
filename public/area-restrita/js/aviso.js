let aviso = {};

$(document).ready(() => {
    aviso.eventos.init();
})

aviso.eventos = {
    init: () => {        
        comum.eventos.verificaTokenAcesso();   
        $("#spanNomeUsuarioCabecalho").text(localStorage.getItem('NomeUsuario')); 
         
    },
    
}

aviso.var = {
     

}

aviso.metodos = {

    listarTodos: async () => {        

        try{                                 
            await $.ajax({
                type: 'GET',
                url: comum.var.urlApiAreaRestrita + '/v1/aviso/aviso/',
                beforeSend: (request) => { request.setRequestHeader("Authorization", "Bearer "+localStorage.getItem('TokenAcesso')); },
                success: function (response) {                   
                    if (response.status == 200){

                        response.dados.map((elem,i) => { 
                            let dataFormatada = elem.data.substr(0, 10).split('-').reverse().join('/');                                                    
                            $("#datatablesSimple tbody").append(`
                                <tr>
                                    <td>${dataFormatada}</td>                                     
                                    <td>${elem.titulo}</td>
                                    <td>${elem.texto}</td>                                  
                                    <td align="center">
                                        <div class="btnAcoesEditarExcluir">
                                            <a href="aviso-editar.html?id=${elem._id}" style="text-decoration:none !important">
                                                <i class="far fa-edit" title="Editar" style="cursor:pointer"></i>
                                            </a>
                                            &nbsp;
                                            <i class="far fa-trash-alt" data-toggle="modal" data-target="#modalExcluir" onclick="$('#msgExcluir').hide();$('#lblNomeAvisoExcluir').text('${elem.titulo}');$('#txtAvisoExcluir').val('${elem._id}')" title="Excluir" style="cursor:pointer" ></i>
                                        </div>
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
            comum.metodos.mensagemInformativa('msgAviso','Ocorreu um erro inesperado: ' + erro,'erro');
        }

        if (localStorage.getItem('PerfilUsuario') == "Administrador"){
            $('#btnCadastrarAviso').show();
            $('.btnAcoesEditarExcluir').show();
        }
        else{
            $('#btnCadastrarAviso').hide();
            $('.btnAcoesEditarExcluir').hide();
        }
    },

    cadastrar: (data = null , titulo = null , status = 'Ativo' , texto = null) => {        
        try{                
            const dados = { data , titulo , status , texto };  
                
            $.ajax({
                type: 'POST',
                url: comum.var.urlApiAreaRestrita + '/v1/aviso/aviso',
                data: dados,
                beforeSend: (request) => { request.setRequestHeader("Authorization", "Bearer "+localStorage.getItem('TokenAcesso')) },
                success: function (response) {                   
                    if (response.status == 201){
                        comum.metodos.mensagemInformativa('msgCadastro',response.mensagem,'sucesso');                                                            
                    }                        
                },
                error: function (xhr, ajaxOptions, error) {
                    console.log(xhr)
                    if (xhr.status == 400 || xhr.status == 401){
                        comum.metodos.mensagemInformativa('msgCadastro',xhr.responseJSON.mensagem,'erro');
                    }
                }
            });
        } 
        catch (erro){
            comum.metodos.mensagemInformativa('msgCadastro','Ocorreu um erro inesperado: ' + erro,'erro');
        }
    },
    
    obterDadosEdicao: () => {        
        try{                                 
            var idAviso = location.search.slice(1).split('=')[1];
                                                
            $.ajax({
                type: 'GET',
                url: comum.var.urlApiAreaRestrita + '/v1/aviso/aviso/' + idAviso,
                beforeSend: (request) => { request.setRequestHeader("Authorization", "Bearer "+localStorage.getItem('TokenAcesso')); },
                success: function (response) { 
                                     
                    if (response.status == 200){
                        $("#inputData").val(response.dados.data.substr(0, 10));
                        $("#inputTitulo").val(response.dados.titulo); 
                        $("#inputTexto").val(response.dados.texto);   
                        $("#selectStatus option[value="+response.dados.status+"]").attr('selected','selected');     
                    }                        
                },
                error: function (xhr, ajaxOptions, error) {
                    if (xhr.status == 400){
                        comum.metodos.mensagemInformativa('msgEditar',xhr.responseJSON.mensagem,'erro');                        
                    }
                    if (xhr.status == 401){
                        window.location.href = './401.html'
                    }
                }
            });
            
        } 
        catch (erro){
            comum.metodos.mensagemInformativa('msgEditar','Ocorreu um erro inesperado: ' + erro,'erro');
        }
    },

    atualizar: (data = null , titulo = null , status = 'Ativo' , texto = null) => {        
        try{   
            var idAviso = location.search.slice(1).split('=')[1]             
            const dados = { data , titulo , status , texto }; 
                   
            $.ajax({
                type: 'PUT',
                url: comum.var.urlApiAreaRestrita + '/v1/aviso/aviso/' + idAviso,
                data: dados,
                beforeSend: (request) => { request.setRequestHeader("Authorization", "Bearer "+localStorage.getItem('TokenAcesso')) },
                success: function (response) {                   
                    if (response.status == 201){
                        comum.metodos.mensagemInformativa('msgEditar',response.mensagem,'sucesso');                                                            
                    }                        
                },
                error: function (xhr, ajaxOptions, error) {                    
                    if (xhr.status == 400){
                        comum.metodos.mensagemInformativa('msgEditar',xhr.responseJSON.mensagem,'erro');
                    }
                }
            });
            
        } 
        catch (erro){
            comum.metodos.mensagemInformativa('msgEditar','Ocorreu um erro inesperado: ' + erro,'erro');
        }
    },

    excluir: (id) => {        
        try{                                  
            $.ajax({
                type: 'DELETE',
                url: comum.var.urlApiAreaRestrita + '/v1/aviso/aviso/' + id,
                beforeSend: (request) => { request.setRequestHeader("Authorization", "Bearer "+localStorage.getItem('TokenAcesso')); },
                success: function (response) { 
                                      
                    if (response.status == 201){                        
                        comum.metodos.mensagemInformativa('msgExcluir',response.mensagem,'sucesso'); 
                        $('#msgExcluir').show();
                        window.setTimeout(()=>{
                            //$('#modalExcluir').modal('hide'); 
                            $("#datatablesSimple tbody").text('');                                                       
                            aviso.metodos.listarTodos();
                        }, 2000);              
                    }                        
                },
                error: function (xhr, ajaxOptions, error) {
                    if (xhr.status == 400){
                        comum.metodos.mensagemInformativa('msgExcluir',xhr.responseJSON.mensagem,'erro');                        
                    }
                    if (xhr.status == 401){
                        window.location.href = './401.html'
                    }
                }
            });
            
        } 
        catch (erro){
            comum.metodos.mensagemInformativa('msgExcluir','Ocorreu um erro inesperado: ' + erro,'erro');
        }
    },

    
}