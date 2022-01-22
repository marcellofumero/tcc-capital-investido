var express = require('express');
var router  = express.Router();
var controller = require('../controllers/usuario');
var UsuarioTokenAcesso = require('../models/protecaoTokenAcesso');
var Acesso = new UsuarioTokenAcesso();

//################################################################################
//##########  ##########
//################################################################################

router.get('/usuario', function(req, res){       
    controller.usuarioListarTodos(req,function(resp){
        res.status(resp.status).json(resp);
    })
});

router.get('/usuario/:id', function(req, res){       
    controller.usuarioListar(req,function(resp){
        res.status(resp.status).json(resp);
    })
});

router.post('/usuario', function(req, res){       
    controller.usuarioCadastrar(req,function(resp){
        res.status(resp.status).json(resp);
    })
});

router.put('/usuario/:id', function(req, res){       
    controller.usuarioAtualizar(req,function(resp){
        res.status(resp.status).json(resp);
    })
});

router.delete('/usuario/:id', function(req, res){       
    controller.usuarioExcluir(req,function(resp){
        res.status(resp.status).json(resp);
    })
});


module.exports = router;