const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('viewEngine','hbs');


app.use(express.static(__dirname + "/public"));

app.use((request,respone, next)=>{
    var now = new Date().toString();
    var log = now+":"+request.method+":"+request.url;

    console.log(now+request.method+request.url);
    fs.appendFile('server.log',log+ '\n', (Error)=>{
        if(Error){
            console.log("Unable to server log");
        }
    });
    next();

});

hbs.registerHelper('getCurrentyear', ()=>{
    return new Data().getFullYear();
});

hbs.registerHelper('screamIt',(Text)=>{
return "WELCOME";

});

app.get('/',(request,response) =>{
//response.send('<h1>Hello express</h1>');

response.render("home.hbs", {
    pageTitle: 'welcome to home page',
    header : 'hOME Page',
    currentyear: new Date().getFullYear()
});



}); 

app.get('/about',(request, response)=>{
//response.send("About Page");
response.render('about.hbs',{
    pageTitle : 'About Page',
    currentyear: new Date().getFullYear()
});
});

app.get('/bad', (request, respone)=>{
respone.send({
errorMessage : "Not found"

});

});

app.listen(8080, ()=>{
    console.log("Server is running in 8080 port")
});
