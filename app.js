const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', exphbs()); // Initializing the handlebars view engine
app.set('view engine', 'handlebars'); // Setting the view engine to handlebars

app.get('/', (req, res) => {
    res.render('home');
});



const PORT = 3000;
app.listen(`${PORT}`);