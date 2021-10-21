const express = require('express');

const Usuario = require('../models/usuario');

const router = express.Router();

router.post('/register', async(req, res) => {
    try{
        const usuario = await Usuario.create(req.body);

        return res.send({ usuario });
    } catch (err){
        return res.status(400).send({ error: 'Falha ao cadastrar usuário'});
    }
});

module.exports = app => app.use('/auth', router);