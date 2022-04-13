let modalidadeinvestimento = {};

$(document).ready(() => {
    modalidadeinvestimento.eventos.init();
})

modalidadeinvestimento.eventos = {
    init: () => {        
        comum.eventos.verificaTokenAcesso();   
        $("#spanNomeUsuarioCabecalho").text(localStorage.getItem('NomeUsuario')); 
         
    },
    
}

modalidadeinvestimento.var = {
     

}

modalidadeinvestimento.metodos = {

    listarTodos: () => {
        try{                                 
            $.ajax({
                type: 'GET',
                url: comum.var.urlApiAreaRestrita + '/v1/modalidadeInvestimento/modalidadeInvestimento/',
                beforeSend: (request) => { request.setRequestHeader("Authorization", "Bearer "+localStorage.getItem('TokenAcesso')); },
                success: function (response) {                   
                    if (response.status == 200){

                        response.dados.map((elem,i) => { 
                                                                                   
                            $("#datatablesSimple tbody").append(`
                                <tr>
                                    <td>${elem.nome}</td>                                    
                                    <td align="center">
                                        <a href="modalidade-investimento-editar.html?id=${elem._id}" style="text-decoration:none !important">
                                            <i class="far fa-edit" title="Editar" style="cursor:pointer"></i>
                                        </a>
                                        &nbsp;
                                        <i class="far fa-trash-alt" data-toggle="modal" data-target="#modalExcluir" onclick="$('#msgExcluir').hide();$('#lblNomeModalidadeInvestimentoExcluir').text('${elem.nome}');$('#txtModalidadeInvestimentoExcluir').val('${elem._id}')" title="Excluir" style="cursor:pointer" ></i>
                                        
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
            comum.metodos.mensagemInformativa('msgListaModalidadeInvestimento','Ocorreu um erro inesperado: ' + erro,'erro');
        }
    },

    cadastrar: (nome = null) => {        
        try{                
            const dados = { nome };        
            $.ajax({
                type: 'POST',
                url: comum.var.urlApiAreaRestrita + '/v1/modalidadeInvestimento/modalidadeInvestimento',
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
            var idModalidadeInvestimento = location.search.slice(1).split('=')[1];
                        
            $.ajax({
                type: 'GET',
                url: comum.var.urlApiAreaRestrita + '/v1/modalidadeInvestimento/modalidadeInvestimento/' + idModalidadeInvestimento,
                beforeSend: (request) => { request.setRequestHeader("Authorization", "Bearer "+localStorage.getItem('TokenAcesso')); },
                success: function (response) { 
                                     
                    if (response.status == 200){
                        $("#inputNome").val(response.dados.nome);      
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

    atualizar: (nome = null) => {        
        try{   
            var idModalidadeInvestimento = location.search.slice(1).split('=')[1]             
            const dados = { nome };
                   
            $.ajax({
                type: 'PUT',
                url: comum.var.urlApiAreaRestrita + '/v1/modalidadeInvestimento/modalidadeInvestimento/' + idModalidadeInvestimento,
                data: dados,
                beforeSend: (request) => { request.setRequestHeader("Authorization", "Bearer "+localStorage.getItem('TokenAcesso')) },
                success: function (response) {                   
                    if (response.status == 201){
                        comum.metodos.mensagemInformativa('msgEditar',response.mensagem,'sucesso');                                                            
                    }                        
                },
                error: function (xhr, ajaxOptions, error) {
                    console.log(xhr)
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

    excluir: (idModalidadeInvestimento) => {             
        try{                                  
            $.ajax({
                type: 'DELETE',
                url: comum.var.urlApiAreaRestrita + '/v1/modalidadeInvestimento/modalidadeInvestimento/' + idModalidadeInvestimento,
                beforeSend: (request) => { request.setRequestHeader("Authorization", "Bearer "+localStorage.getItem('TokenAcesso')); },
                success: function (response) { 
                                      
                    if (response.status == 201){                        
                        comum.metodos.mensagemInformativa('msgExcluir',response.mensagem,'sucesso'); 
                        $('#msgExcluir').show();
                        window.setTimeout(()=>{
                            //$('#modalExcluir').modal('hide'); 
                            $("#datatablesSimple tbody").text('');                                                       
                            modalidadeinvestimento.metodos.listarTodos();
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