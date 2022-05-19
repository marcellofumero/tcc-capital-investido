let painel = {};

$(document).ready(() => {
    painel.eventos.init();
})

painel.eventos = {
    init: () => {        
        comum.eventos.verificaTokenAcesso();   
        // $("#spanNomeUsuarioCabecalho").text(localStorage.getItem('NomeUsuario')); 
        painel.metodos.graficoStatusUsuario();
        //painel.metodos.graficoPerfilUsuario(); 
        painel.metodos.graficoPercentualAcertoRobo();
    },
    
}

painel.var = {
     

}

painel.metodos = {

    graficoStatusUsuario: async () => {        

        Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
        Chart.defaults.global.defaultFontColor = '#292b2c';

        var coluna = [];
        var valor = [];
        
        try{                                 
            await $.ajax({
                type: 'GET',
                url: comum.var.urlApiAreaRestrita + '/v1/usuario/graficoStatus',
                beforeSend: (request) => { request.setRequestHeader("Authorization", "Bearer "+localStorage.getItem('TokenAcesso')); },
                success: function (response) {                   
                    if (response.status == 200){
                        valor = [];
                        coluna = [];
                        
                        response.dados.map((elem,i) => {                                 
                            coluna.push(elem._id);
                            valor.push(elem.quantidade);
                        });                        
                                                                    
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
            comum.metodos.mensagemInformativa('msgErroGrafico','Ocorreu um erro inesperado: ' + erro,'erro');
            console.log('erro catch',erro);
        }
        
        // Pie Chart Example
        var ctx = document.getElementById("myPieChart");
        var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: coluna,
            datasets: [{
            data: valor,
            backgroundColor: ['#007bff', '#dc3545', '#ffc107', '#28a745'],
            }],
        },
        });
    },

    graficoPerfilUsuario: async () => {        

        Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
        Chart.defaults.global.defaultFontColor = '#292b2c';

        var coluna = [];
        var valor = [];
        
        try{                                 
            await $.ajax({
                type: 'GET',
                url: comum.var.urlApiAreaRestrita + '/v1/usuario/graficoPerfil',
                beforeSend: (request) => { request.setRequestHeader("Authorization", "Bearer "+localStorage.getItem('TokenAcesso')); },
                success: function (response) {                   
                    if (response.status == 200){
                        valor = [];
                        coluna = [];
                        
                        response.dados.map((elem,i) => {                                 
                            coluna.push(elem._id);
                            valor.push(elem.quantidade);
                        });                        
                                                
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
            comum.metodos.mensagemInformativa('msgErroGrafico','Ocorreu um erro inesperado: ' + erro,'erro');
            console.log('erro catch',erro);
        }

        // Pie Chart Example
        var ctx = document.getElementById("graficoPerfilUsuários");
        var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: coluna,
            datasets: [{
            data: valor,
            backgroundColor: [ '#ffc107', '#28a745'],
            }],
        },
        });
    },

    graficoPercentualAcertoRobo: async () => {              

        var valorVertical = [];
        var valorHorizontal = [];
        
        try{                                 
            await $.ajax({
                type: 'GET',
                url: comum.var.urlApiAreaRestrita + '/v1/robo/graficoPercentualAcerto',
                beforeSend: (request) => { request.setRequestHeader("Authorization", "Bearer "+localStorage.getItem('TokenAcesso')); },
                success: function (response) {                   
                    if (response.status == 200){
                        valorVertical = [];
                        valorHorizontal = [];
                        
                        response.dados.map((elem,i) => {                                 
                            valorVertical.push(elem.percentual_acerto);
                            valorHorizontal.push(elem.titulo);
                        });                        
                                                
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
            comum.metodos.mensagemInformativa('msgErroGrafico','Ocorreu um erro inesperado: ' + erro,'erro');
            console.log('erro catch',erro);
        }

        // Set new default font family and font color to mimic Bootstrap's default styling
        Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
        Chart.defaults.global.defaultFontColor = '#292b2c';

        // Bar Chart Example
        var ctx = document.getElementById("graficoPercentualAcertoRobo");
        var myLineChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: valorHorizontal,
            datasets: [{
            label: "%",
            backgroundColor: "rgba(2,117,216,1)",
            borderColor: "rgba(2,117,216,1)",
            data: valorVertical,
            }],
        },
        options: {
            scales: {
            xAxes: [{
                time: {
                unit: 'month'
                },
                gridLines: {
                display: false
                },
                ticks: {
                maxTicksLimit: 6
                }
            }],
            yAxes: [{
                ticks: {
                min: 0,
                max: 100,
                maxTicksLimit: 5
                },
                gridLines: {
                display: true
                }
            }],
            },
            legend: {
            display: false
            }
        }
        });


        
    },


}