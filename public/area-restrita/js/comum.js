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
     

}

comum.metodos = {

    logout: () => {
        localStorage.clear();
        window.location.href = './login.html'
    }

}