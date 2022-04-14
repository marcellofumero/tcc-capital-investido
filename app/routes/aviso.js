const express = require('express');
const router  = express.Router();
const controller = require('../controllers/aviso');
const UsuarioTokenAcesso = require('../models/protecaoTokenAcesso');
const Acesso = new UsuarioTokenAcesso();

//################################################################################
//##########  ##########
//################################################################################

router.get('/aviso', Acesso.verificaTokenAcesso, function(req, res){       
    controller.avisoListarTodos(req,function(resp){
        res.status(resp.status).json(resp);
    })
});

router.get('/aviso/:id', Acesso.verificaTokenAcesso, function(req, res){       
    controller.avisoListar(req,function(resp){
        res.status(resp.status).json(resp);
    })
});

router.post('/aviso', Acesso.verificaTokenAcesso, function(req, res){       
    controller.avisoCadastrar(req,function(resp){
        res.status(resp.status).json(resp);
    })
});

router.put('/aviso/:id', Acesso.verificaTokenAcesso, function(req, res){       
    controller.avisoAtualizar(req,function(resp){
        res.status(resp.status).json(resp);
    })
});

router.delete('/aviso/:id', Acesso.verificaTokenAcesso, function(req, res){       
    controller.avisoExcluir(req,function(resp){
        res.status(resp.status).json(resp);
    })
});


module.exports = router;