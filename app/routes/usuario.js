var express = require('express');
var router  = express.Router();
var controller = require('../controllers/usuario');
var UsuarioTokenAcesso = require('../models/protecaoTokenAcesso');
var Acesso = new UsuarioTokenAcesso();

//################################################################################
//##########  ##########
//################################################################################

router.post('/usuario', function(req, res){       
    controller.usuarioCadastrar(req,function(resp){
        res.json(resp);
    })
});


module.exports = router;