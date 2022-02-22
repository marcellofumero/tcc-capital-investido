let usuario = {};

$(document).ready(() => {
    usuario.eventos.init();
})

usuario.eventos = {
    init: () => {        
        comum.eventos.verificaTokenAcesso();   
        $("#spanNomeUsuarioCabecalho").text(localStorage.getItem('NomeUsuario')); 
        usuario.metodos.listarTodos();   
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
                            $("#datatablesSimple tbody").append(`
                                <tr>
                                    <td>${elem.nome}</td>
                                    <td>${elem.email}</td>
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

}