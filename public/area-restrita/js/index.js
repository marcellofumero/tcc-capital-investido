let principal = {};

$(document).ready(() => {
    principal.eventos.init();
})

principal.eventos = {
    init: () => {        
        comum.eventos.verificaTokenAcesso();   
        $("#spanNomeUsuarioCabecalho").text(localStorage.getItem('NomeUsuario'));    
    },
    
}

principal.var = {
     

}

principal.metodos = {

    teste: () => {

    }

}