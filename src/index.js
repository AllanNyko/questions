"use strict";
const express = require('express');
const app = express();
require('dotenv').config();
const connection = require('../database/database.js');
connection.authenticate().then( () => console.log('Server MYSQL Okay')).catch((erro)=>{
console.log('Erro na conex: '+ erro);
})

app.use(express.static('public'));
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('index');
});
app.listen(3000, (error) => {
    console.log('Server OKay');
});
