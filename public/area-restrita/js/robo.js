let robo = {};

$(document).ready(() => {
    robo.eventos.init();
})

robo.eventos = {
    init: () => {        
        comum.eventos.verificaTokenAcesso();   
        $("#spanNomeUsuarioCabecalho").text(localStorage.getItem('NomeUsuario')); 
         
    },
    
}

robo.var = {
     

}

robo.metodos = {

    listarTodos: async () => {        

        try{                                 
            await $.ajax({
                type: 'GET',
                url: comum.var.urlApiAreaRestrita + '/v1/robo/robo/',
                beforeSend: (request) => { request.setRequestHeader("Authorization", "Bearer "+localStorage.getItem('TokenAcesso')); },
                success: function (response) {                   
                    if (response.status == 200){

                        response.dados.map((elem,i) => { 
                            let tipoInvestimento = elem.tipoInvestimento == undefined ? '' : elem.tipoInvestimento.nome;
                            let modalidadeInvestimento = elem.modalidadeInvestimento == undefined ? '' : elem.modalidadeInvestimento.nome;
                            
                            let dataFormatada = elem.data.substr(0, 10).split('-').reverse().join('/');                                                    
                            $("#datatablesSimple tbody").append(`
                                <tr>
                                    <td>${dataFormatada}</td>  
                                    <td>${modalidadeInvestimento}</td>
                                    <td>${tipoInvestimento}</td>                                   
                                    <td>${elem.titulo}</td>
                                    <td>${elem.descricao}</td>  
                                    <td>${elem.preco}</td> 
                                    <td>${elem.percentual_acerto}</td>                                 
                                    <td align="center">
                                        <div class="btnAcoesEditarExcluir">
                                            <a href="robo-editar.html?id=${elem._id}" style="text-decoration:none !important">
                                                <i class="far fa-edit" title="Editar" style="cursor:pointer"></i>
                                            </a>
                                            &nbsp;
                                            <i class="far fa-trash-alt" data-toggle="modal" data-target="#modalExcluir" onclick="$('#msgExcluir').hide();$('#lblNomeRoboExcluir').text('${elem.titulo}');$('#txtRoboExcluir').val('${elem._id}')" title="Excluir" style="cursor:pointer" ></i>
                                            &nbsp;
                                            <a href="../uploads/${elem.diretorio_download}" target="_blank" style="text-decoration:none !important">
                                                <i class="fas fa-download" title="Download" style="cursor:pointer"></i>
                                            </a>
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
            comum.metodos.mensagemInformativa('msgRobo','Ocorreu um erro inesperado: ' + erro,'erro');
        }

        if (localStorage.getItem('PerfilUsuario') == "Administrador"){
            $('#btnCadastrarRobo').show();
            $('.btnAcoesEditarExcluir').show();
        }
        else{
            $('#btnCadastrarRobo').hide();
            $('.btnAcoesEditarExcluir').hide();
        }
    },

    cadastrar: () => {     
           
        try{  
            var form = $('#formCadastrar')[0];
            var dadosAux = new FormData(form); 
             
            $.ajax({
                type: 'POST',
                url: comum.var.urlApiAreaRestrita + '/v1/robo/robo',
                data: dadosAux,
                enctype: 'multipart/form-data',
                processData: false, // impedir que o jQuery tranforma a "data" em querystring
                contentType: false, // desabilitar o cabeçalho "Content-Type"
                cache: false, // desabilitar o "cache"
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
            var idRobo = location.search.slice(1).split('=')[1];
              
            robo.metodos.listarTipoInvestimento();
            robo.metodos.listarModalidadeInvestimento();

            $.ajax({
                type: 'GET',
                url: comum.var.urlApiAreaRestrita + '/v1/robo/robo/' + idRobo,
                beforeSend: (request) => { request.setRequestHeader("Authorization", "Bearer "+localStorage.getItem('TokenAcesso')); },
                success: function (response) { 
                                     
                    if (response.status == 200){
                        $("#data").val(response.dados.data.substr(0, 10));
                        $("#titulo").val(response.dados.titulo); 
                        $("#descricao").val(response.dados.descricao);
                        $("#preco").val(response.dados.preco); 
                        $("#percentual_acerto").val(response.dados.percentual_acerto); 
                        $("#selectStatus option[value="+response.dados.status+"]").attr('selected','selected'); 
                        $("#tipoInvestimento option[value="+response.dados.tipoInvestimento._id+"]").attr('selected','selected'); 
                        $("#modalidadeInvestimento option[value="+response.dados.modalidadeInvestimento._id+"]").attr('selected','selected');     
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

    atualizar: () => {        
        try{   
            var idRobo = location.search.slice(1).split('=')[1]             
            var form = $('#formAtualizar')[0];
            var dadosAux = new FormData(form); 
                  
            $.ajax({
                type: 'PUT',
                url: comum.var.urlApiAreaRestrita + '/v1/robo/robo/' + idRobo,
                data: dadosAux,
                enctype: 'multipart/form-data',
                processData: false, // impedir que o jQuery tranforma a "data" em querystring
                contentType: false, // desabilitar o cabeçalho "Content-Type"
                cache: false, // desabilitar o "cache"
                beforeSend: (request) => { request.setRequestHeader("Authorization", "Bearer "+localStorage.getItem('TokenAcesso')) },
                success: function (response) {   
                    console.log('ok',response)                
                    if (response.status == 201){
                        comum.metodos.mensagemInformativa('msgEditar',response.mensagem,'sucesso');                                                            
                    }                        
                },
                error: function (xhr, ajaxOptions, error) { 
                    console.log('erro',xhr)                   
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
                url: comum.var.urlApiAreaRestrita + '/v1/robo/robo/' + id,
                beforeSend: (request) => { request.setRequestHeader("Authorization", "Bearer "+localStorage.getItem('TokenAcesso')); },
                success: function (response) { 
                                      
                    if (response.status == 201){                        
                        comum.metodos.mensagemInformativa('msgExcluir',response.mensagem,'sucesso'); 
                        $('#msgExcluir').show();
                        window.setTimeout(()=>{
                            //$('#modalExcluir').modal('hide'); 
                            $("#datatablesSimple tbody").text('');                                                       
                            robo.metodos.listarTodos();
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

    listarTipoInvestimento: () => {        
        try{                                 
            $.ajax({
                type: 'GET',
                url: comum.var.urlApiAreaRestrita + '/v1/tipoInvestimento/tipoInvestimento/',
                beforeSend: (request) => { request.setRequestHeader("Authorization", "Bearer "+localStorage.getItem('TokenAcesso')); },
                success: function (response) {                   
                    if (response.status == 200){
                        $("#tipoInvestimento").find("option").remove(); 
                        $.each(response.dados, function () {
                            $("#tipoInvestimento").append(
                                `<option value="${this._id}">${this.nome}</option>`
                            );
                        });                
                    }                        
                },
                error: function (xhr, ajaxOptions, error) {
                    if (xhr.status == 400){
                        comum.metodos.mensagemInformativa('msgCadastro',xhr.responseJSON.mensagem,'erro');                        
                    }
                    if (xhr.status == 401){
                        window.location.href = './401.html'
                    }
                }
            });
        } 
        catch (erro){
            comum.metodos.mensagemInformativa('msgCadastro','Ocorreu um erro inesperado: ' + erro,'erro');
        }
    },

    listarModalidadeInvestimento: () => {        
        try{                                 
            $.ajax({
                type: 'GET',
                url: comum.var.urlApiAreaRestrita + '/v1/modalidadeInvestimento/modalidadeInvestimento/',
                beforeSend: (request) => { request.setRequestHeader("Authorization", "Bearer "+localStorage.getItem('TokenAcesso')); },
                success: function (response) {                   
                    if (response.status == 200){
                        $("#modalidadeInvestimento").find("option").remove(); 
                        $.each(response.dados, function () {
                            $("#modalidadeInvestimento").append(
                                `<option value="${this._id}">${this.nome}</option>`
                            );
                        });                
                    }                        
                },
                error: function (xhr, ajaxOptions, error) {
                    if (xhr.status == 400){
                        comum.metodos.mensagemInformativa('msgCadastro',xhr.responseJSON.mensagem,'erro');                        
                    }
                    if (xhr.status == 401){
                        window.location.href = './401.html'
                    }
                }
            });
        } 
        catch (erro){
            comum.metodos.mensagemInformativa('msgCadastro','Ocorreu um erro inesperado: ' + erro,'erro');
        }
    },
}