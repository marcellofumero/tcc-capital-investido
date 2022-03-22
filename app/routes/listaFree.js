const express = require('express');
const router  = express.Router();
const controller = require('../controllers/listaFree');
const UsuarioTokenAcesso = require('../models/protecaoTokenAcesso');
const Acesso = new UsuarioTokenAcesso();

//################################################################################
//##########  ##########
//################################################################################

router.get('/listaFree', Acesso.verificaTokenAcesso, function(req, res){       
    controller.listaFreeListarTodos(req,function(resp){
        res.status(resp.status).json(resp);
    })
});

router.get('/listaFree/:id', Acesso.verificaTokenAcesso, function(req, res){       
    controller.listaFreeListar(req,function(resp){
        res.status(resp.status).json(resp);
    })
});

router.post('/listaFree', Acesso.verificaTokenAcesso, function(req, res){       
    controller.listaFreeCadastrar(req,function(resp){
        res.status(resp.status).json(resp);
    })
});

router.put('/listaFree/:id', Acesso.verificaTokenAcesso, function(req, res){       
    controller.listaFreeAtualizar(req,function(resp){
        res.status(resp.status).json(resp);
    })
});

router.delete('/listaFree/:id', Acesso.verificaTokenAcesso, function(req, res){       
    controller.listaFreeExcluir(req,function(resp){
        res.status(resp.status).json(resp);
    })
});


module.exports = router;