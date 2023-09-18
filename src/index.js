"use strict";
const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const connection = require('../database/database.js');

connection.authenticate().then(() => console.log('=== Server MYSQL Okay')).catch((erro) => {
    console.log('Erro na conex: ' + erro);
});

const Pergunta = require('../database/model/Pergunta.js');
const Resposta = require('../database/model/Resposta.js');


app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    Pergunta.findAll({ raw: true }).then((perguntas) => {
        //console.log(perguntas);
        res.render('index', { perguntas: perguntas })

    })
});

app.get('/perguntar', (req, res) => {

    res.render('salvarpergunta');
});


app.get('/pergunta/:id', (req, res) => {
    const id = req.params.id
    Pergunta.findOne({
        where: { id: id }
    }).then((pergunta) => {
            if (pergunta != undefined) {
                Resposta.findAll({ where: { perguntaId: id }, order:[['id','DESC']] }).then((resposta) => {
                    res.render('pergunta', {
                        pergunta: pergunta,
                        resposta: resposta
                    });
                })
            } else {
                res.send('Encontramos um erro: ID não existe.')
            }
        })
});


app.post('/responder', (req, res) => {
    const corpo = req.body.corpo;
    const perguntaId = req.body.perguntaId;
    console.log(req.body);
    Resposta.create({
        perguntaId: perguntaId,
        corpo: corpo,
    }).then(() => {
        res.redirect('/pergunta/' + perguntaId)
    }).catch(e => console.log(e))
});

app.post('/salvarpergunta', (req, res) => {
    const titulo = req.body.titulo;
    const descricao = req.body.descricao;
    console.log(req.body);
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect('/')
    })
});


app.listen(3000, (error) => {
    console.log('Server OKay');
});
