const express = require('express');
const router  = express.Router();
const controller = require('../controllers/usuario');
const UsuarioTokenAcesso = require('../models/protecaoTokenAcesso');
const Acesso = new UsuarioTokenAcesso();

//################################################################################
//##########  ##########
//################################################################################

router.get('/usuario', Acesso.verificaTokenAcesso, function(req, res){       
    controller.usuarioListarTodos(req,function(resp){
        res.status(resp.status).json(resp);
    })
});

router.get('/usuario/:id', Acesso.verificaTokenAcesso, function(req, res){       
    controller.usuarioListar(req,function(resp){
        res.status(resp.status).json(resp);
    })
});

router.post('/usuario', function(req, res){       
    controller.usuarioCadastrar(req,function(resp){
        res.status(resp.status).json(resp);
    })
});

router.put('/usuario/:id', Acesso.verificaTokenAcesso, function(req, res){       
    controller.usuarioAtualizar(req,function(resp){
        res.status(resp.status).json(resp);
    })
});

router.delete('/usuario/:id', Acesso.verificaTokenAcesso, function(req, res){       
    controller.usuarioExcluir(req,function(resp){
        res.status(resp.status).json(resp);
    })
});

router.post('/autenticar', function(req, res){       
    controller.usuarioAutenticar(req,function(resp){
        res.status(resp.status).json(resp);
    })
});

router.post('/esqueciSenha', function(req, res){       
    controller.usuarioEsqueciSenha(req,function(resp){
        res.status(resp.status).json(resp);
    })
});

router.post('/resetarSenha', function(req, res){       
    controller.usuarioResetarSenha(req,function(resp){
        res.status(resp.status).json(resp);
    })
});

router.get('/graficoStatus', function(req, res){       
    controller.graficoStatus(req,function(resp){
        res.status(resp.status).json(resp);
    })
});

router.get('/graficoPerfil', function(req, res){       
    controller.graficoPerfil(req,function(resp){
        res.status(resp.status).json(resp);
    })
});

router.get('/relatorioPdf', function(req, res){   
    
    controller.relatorioPdf(req,function(resp){
        res.setHeader('Content-type', 'application/pdf');
        res.setHeader('Content-disposition', 'attachment; filename=export-from-html.pdf');
        res.send(resp);
    })
    
    
});

module.exports = router;