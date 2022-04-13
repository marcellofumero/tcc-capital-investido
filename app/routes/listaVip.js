const express = require('express');
const router  = express.Router();
const controller = require('../controllers/listaVip');
const UsuarioTokenAcesso = require('../models/protecaoTokenAcesso');
const Acesso = new UsuarioTokenAcesso();

//################################################################################
//##########  ##########
//################################################################################

router.get('/listaVip', Acesso.verificaTokenAcesso, function(req, res){       
    controller.listaVipListarTodos(req,function(resp){
        res.status(resp.status).json(resp);
    })
});

router.get('/listaVip/:id', Acesso.verificaTokenAcesso, function(req, res){       
    controller.listaVipListar(req,function(resp){
        res.status(resp.status).json(resp);
    })
});

router.post('/listaVip', Acesso.verificaTokenAcesso, function(req, res){       
    controller.listaVipCadastrar(req,function(resp){
        res.status(resp.status).json(resp);
    })
});

router.put('/listaVip/:id', Acesso.verificaTokenAcesso, function(req, res){       
    controller.listaVipAtualizar(req,function(resp){
        res.status(resp.status).json(resp);
    })
});

router.delete('/listaVip/:id', Acesso.verificaTokenAcesso, function(req, res){       
    controller.listaVipExcluir(req,function(resp){
        res.status(resp.status).json(resp);
    })
});


module.exports = router;