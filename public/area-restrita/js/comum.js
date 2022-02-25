let comum = {};

$(document).ready(() => {
    comum.eventos.init();

    // Example starter JavaScript for disabling form submissions if there are invalid fields
    (() => {
        'use strict';
    
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        const forms = document.querySelectorAll('.needs-validation');
    
        // Loop over them and prevent submission
        Array.prototype.slice.call(forms).forEach((form) => {
        form.addEventListener('submit', (event) => {
            if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
        });
    })();
})

comum.eventos = {
    init: () => {        
        localStorage.setItem('UrlApiAreaRestrita','http://localhost:3000');        
    },

    verificaTokenAcesso: () => {
        if (!localStorage.getItem('TokenAcesso')) {
            window.location.href = './401.html'
        }
    }
}

comum.var = {
    urlApiAreaRestrita: localStorage.getItem('UrlApiAreaRestrita')
}

comum.metodos = {

    logout: () => {
        localStorage.clear();
        window.location.href = './login.html'
    },

    mensagemInformativa: (nomeComponente, mensagem = '', tipo = 'sucesso') => {
        // tipo: sucesso, alerta ou erro
        switch (tipo){
            case "sucesso":
                $("#"+nomeComponente).removeClass('alert-danger');
                $("#"+nomeComponente).removeClass('alert-warning');
                $("#"+nomeComponente).addClass('alert-success');
                $("#"+nomeComponente).text(mensagem);
                $("#"+nomeComponente).show(); 
                break; 
            case "alerta":
                $("#"+nomeComponente).removeClass('alert-danger');
                $("#"+nomeComponente).removeClass('alert-success');
                $("#"+nomeComponente).addClass('alert-warning');
                $("#"+nomeComponente).text(mensagem);
                $("#"+nomeComponente).show(); 
                break;  
            case "erro":
                $("#"+nomeComponente).removeClass('alert-success');
                $("#"+nomeComponente).removeClass('alert-warning');
                $("#"+nomeComponente).addClass('alert-danger');
                $("#"+nomeComponente).text(mensagem);
                $("#"+nomeComponente).show(); 
                break;                     
        }
    }

}