const express = require('express');
const router  = express.Router();
const controller = require('../controllers/modalidadeInvestimento');
const UsuarioTokenAcesso = require('../models/protecaoTokenAcesso');
const Acesso = new UsuarioTokenAcesso();

//################################################################################
//##########  ##########
//################################################################################

router.get('/modalidadeInvestimento', Acesso.verificaTokenAcesso, function(req, res){       
    controller.modalidadeInvestimentoListarTodos(req,function(resp){
        res.status(resp.status).json(resp);
    })
});

router.get('/modalidadeInvestimento/:id', Acesso.verificaTokenAcesso, function(req, res){       
    controller.modalidadeInvestimentoListar(req,function(resp){
        res.status(resp.status).json(resp);
    })
});

router.post('/modalidadeInvestimento', Acesso.verificaTokenAcesso, function(req, res){       
    controller.modalidadeInvestimentoCadastrar(req,function(resp){
        res.status(resp.status).json(resp);
    })
});

router.put('/modalidadeInvestimento/:id', Acesso.verificaTokenAcesso, function(req, res){       
    controller.modalidadeInvestimentoAtualizar(req,function(resp){
        res.status(resp.status).json(resp);
    })
});

router.delete('/modalidadeInvestimento/:id', Acesso.verificaTokenAcesso, function(req, res){       
    controller.modalidadeInvestimentoExcluir(req,function(resp){
        res.status(resp.status).json(resp);
    })
});


module.exports = router;