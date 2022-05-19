const express = require('express');
const router  = express.Router();
const controller = require('../controllers/robo');
const UsuarioTokenAcesso = require('../models/protecaoTokenAcesso');
const Acesso = new UsuarioTokenAcesso();
const multer  = require('multer');
// Configuração de armazenamento
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        // Extração da extensão do arquivo original:
        const extensaoArquivo = file.originalname.split('.')[1];

        // Cria um código randômico que será o nome do arquivo
        /*
        const novoNomeArquivo = require('crypto')
            .randomBytes(64)
            .toString('hex');
        */
        const novoNomeArquivo = file.originalname.split('.')[0];
        // Indica o novo nome do arquivo:
        cb(null, `${novoNomeArquivo}.${extensaoArquivo}`)
    }
});

const upload = multer({ storage });
// const upload = multer({ dest: 'uploads/' });

//################################################################################
//##########  ##########
//################################################################################

router.get('/robo', Acesso.verificaTokenAcesso, function(req, res){       
    controller.roboListarTodos(req,function(resp){
        res.status(resp.status).json(resp);
    })
});

router.get('/robo/:id', Acesso.verificaTokenAcesso, function(req, res){       
    controller.roboListar(req,function(resp){
        res.status(resp.status).json(resp);
    })
});

router.post('/robo', Acesso.verificaTokenAcesso, upload.single('arquivo') , function(req, res){       
    controller.roboCadastrar(req,function(resp){
        res.status(resp.status).json(resp);
    })
});

router.put('/robo/:id', Acesso.verificaTokenAcesso , upload.single('arquivo') , function(req, res){       
    controller.roboAtualizar(req,function(resp){
        res.status(resp.status).json(resp);
    })
});

router.delete('/robo/:id', Acesso.verificaTokenAcesso, function(req, res){       
    controller.roboExcluir(req,function(resp){
        res.status(resp.status).json(resp);
    })
});

router.get('/graficoPercentualAcerto', function(req, res){       
    controller.graficoPercentualAcerto(req,function(resp){
        res.status(resp.status).json(resp);
    })
});


module.exports = router;