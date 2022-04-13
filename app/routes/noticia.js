const express = require('express');
const router  = express.Router();
const controller = require('../controllers/noticia');
const UsuarioTokenAcesso = require('../models/protecaoTokenAcesso');
const Acesso = new UsuarioTokenAcesso();

//################################################################################
//##########  ##########
//################################################################################

router.get('/noticia', Acesso.verificaTokenAcesso, function(req, res){       
    controller.noticiaListarTodos(req,function(resp){
        res.status(resp.status).json(resp);
    })
});

router.get('/noticia/:id', Acesso.verificaTokenAcesso, function(req, res){       
    controller.noticiaListar(req,function(resp){
        res.status(resp.status).json(resp);
    })
});

router.post('/noticia', Acesso.verificaTokenAcesso, function(req, res){       
    controller.noticiaCadastrar(req,function(resp){
        res.status(resp.status).json(resp);
    })
});

router.put('/noticia/:id', Acesso.verificaTokenAcesso, function(req, res){       
    controller.noticiaAtualizar(req,function(resp){
        res.status(resp.status).json(resp);
    })
});

router.delete('/noticia/:id', Acesso.verificaTokenAcesso, function(req, res){       
    controller.noticiaExcluir(req,function(resp){
        res.status(resp.status).json(resp);
    })
});


module.exports = router;