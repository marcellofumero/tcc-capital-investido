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
        localStorage.setItem('UrlApiAreaRestrita','https://capital-investido.herokuapp.com');     
        // localStorage.setItem('UrlApiAreaRestrita','http://localhost:3000');  
        comum.metodos.executaPermissao();      
    },

    verificaTokenAcesso: () => {
        if (!localStorage.getItem('TokenAcesso')) {
            window.location.href = './401.html';
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
    },
    
    direcionaDadosPessoais: () => {
        window.location.href = 'usuario-editar.html?id=' + localStorage.getItem('IdUsuario');
    },

    executaPermissao: () => {
        switch (localStorage.getItem('PerfilUsuario'))  {
            case "Perfil Vip":
                $('#menuAdministracao').hide();
                $('#painelGraficoUsuarios').hide();
                break;
            case "Perfil Free":
                $('#menuAdministracao').hide();
                $('#painelGraficoUsuarios').hide();
                $('#menuListaTradeVip').hide();
                break;                    
        } 
    },

    executaPermissaoPagina: () => {
        if (localStorage.getItem('PerfilUsuario') != "Administrador"){
            window.location.href = './401.html';
        }
    }

}