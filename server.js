const express = require('express');
const hbs=require('hbs');
var app = express();
const fs=require('fs');

hbs.registerPartials(__dirname+'/views/partials')
app.set('view engine','hbs');



app.use((req,res,next)=>{
	var now=new Date().toString();
	
	var log=`${now}:${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log',log+'\n');
   next();
});

// app.use((req,res,next)=>{
//    res.render('maintenance.hbs');
// });
app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear', ()=>{
	return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text)=>{
	return text.toUpperCase();
});

app.get('/', (req, res) => {
    // res.send('Hello Express');
    res.render('home.hbs',{
    	message:'Welcome to page',
    	pageTitle:'Home Page'
    });
});
app.get('/about', (req, res) => {
    res.render('about.hbs',{
    	pageTitle:'About Page'
    });

});
app.listen(3000);
