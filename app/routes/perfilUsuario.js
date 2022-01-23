var express = require('express');
var router  = express.Router();
var controller = require('../controllers/perfilUsuario');
var UsuarioTokenAcesso = require('../models/protecaoTokenAcesso');
var Acesso = new UsuarioTokenAcesso();

//################################################################################
//##########  ##########
//################################################################################

router.get('/perfilUsuario', function(req, res){       
    controller.perfilUsuarioListarTodos(req,function(resp){
        res.status(resp.status).json(resp);
    })
});

router.get('/perfilUsuario/:id', function(req, res){       
    controller.perfilUsuarioListar(req,function(resp){
        res.status(resp.status).json(resp);
    })
});

router.post('/perfilUsuario', function(req, res){       
    controller.perfilUsuarioCadastrar(req,function(resp){
        res.status(resp.status).json(resp);
    })
});

router.put('/perfilUsuario/:id', function(req, res){       
    controller.perfilUsuarioAtualizar(req,function(resp){
        res.status(resp.status).json(resp);
    })
});

router.delete('/perfilUsuario/:id', function(req, res){       
    controller.perfilUsuarioExcluir(req,function(resp){
        res.status(resp.status).json(resp);
    })
});


module.exports = router;