'use strict';
'use strict';

const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const methodOverride = require('method-override');

const app = express();

// Body parser middleware
// Body parser in this case allows us to access whatever is submitted through the form
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', exphbs()); // Initializing the handlebars view engine
app.set('view engine', 'handlebars'); // Setting the view engine to handlebars

// Method override middleware
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.render('home');
});

app.post('/', (req, res) => {
    console.log(req.body);
    res.render('home');
});

const PORT = 3000;
app.listen(`${PORT}`);