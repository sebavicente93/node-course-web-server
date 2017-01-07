const express= require('express');
const hbs= require('hbs');
const fs= require('fs');

var app= express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

app.use((req,res,next) =>{
  var now= new Date().toString();
  var log= `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) =>{
    if (err){
      console.log('Unable to append to server log');
    }
  });
  next();
});

app.use((req,res,next) =>{
  res.render('maintenance.hbs');
});

//Make public accessible
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',() => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text) => {
  return text.toUpperCase();
});

app.get('/about',(req,res) => {
  res.render('about.hbs',{
    pageTitle: 'About page'
  });
});

app.get('/',(req,res) => {
  res.render('home.hbs',{
    pageTitle: 'Home page',
    welcomeMessage: 'Hi! Welcome to my page'
  });
});

app.listen(3000,() => {
  console.log('Server is up in port 3000');
});
