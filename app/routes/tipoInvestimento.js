const express = require('express');
const router  = express.Router();
const controller = require('../controllers/tipoInvestimento');
const UsuarioTokenAcesso = require('../models/protecaoTokenAcesso');
const Acesso = new UsuarioTokenAcesso();

//################################################################################
//##########  ##########
//################################################################################

router.get('/tipoInvestimento', Acesso.verificaTokenAcesso, function(req, res){       
    controller.tipoInvestimentoListarTodos(req,function(resp){
        res.status(resp.status).json(resp);
    })
});

router.get('/tipoInvestimento/:id', Acesso.verificaTokenAcesso, function(req, res){       
    controller.tipoInvestimentoListar(req,function(resp){
        res.status(resp.status).json(resp);
    })
});

router.post('/tipoInvestimento', Acesso.verificaTokenAcesso, function(req, res){       
    controller.tipoInvestimentoCadastrar(req,function(resp){
        res.status(resp.status).json(resp);
    })
});

router.put('/tipoInvestimento/:id', Acesso.verificaTokenAcesso, function(req, res){       
    controller.tipoInvestimentoAtualizar(req,function(resp){
        res.status(resp.status).json(resp);
    })
});

router.delete('/tipoInvestimento/:id', Acesso.verificaTokenAcesso, function(req, res){       
    controller.tipoInvestimentoExcluir(req,function(resp){
        res.status(resp.status).json(resp);
    })
});


module.exports = router;