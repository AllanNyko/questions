const express = require('express');
const app = express();
require('dotenv').config()


app.use(express.static('public'));
app.set('view engine', 'ejs')


app.get('/', (req, res) => {
  res.render('index')
});

app.listen(3000, (error) => {
  console.log('Server OKay');
});