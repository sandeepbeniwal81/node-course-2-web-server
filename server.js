var express = require('express');
var hbs = require('express-hbs');
const fs = require('fs');
var app = express();

app.engine('hbs', hbs.express4({
    partialsDir: __dirname + '/views/partials'
  }));

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) =>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.baseUrl} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n',(err) =>{
        if (err) throw err;
        console.log('saved');
    });
    next();
});

// app.use((req,res,next) => {
//     res.render('maintainence.hbs');
// });


app.get('/',(req,res) => {
    res.render('homepage.hbs',{
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to Node JS module'
    });
});

app.get('/about', (req,res) => {
    res.render('about.hbs',{
        pageTitle: 'About Page' 
    });
});

app.get('/bad',(req,res) => {
    errorMessage = ( {errorName : 'Bad request',
        errorDescription : 'Dont Know'
    });
    res.send(errorMessage);
});

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});
