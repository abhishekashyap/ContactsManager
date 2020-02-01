'use strict';

const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const methodOverride = require('method-override');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// Load contacts model
require('./models/contact')
const Contact = mongoose.model('contacts');

/* After installing MongoDB, setup MongoDB by using:
 $ mongod --directoryperdb --dbpath /path/to/db
 Create directory as data/db for storing */
mongoose.connect('mongodb://localhost/contacts-dev', {
    // To remove warnings
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('MongoDB connected!');
    })
    .catch(err => console.log(err))

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
    Contact.find()
    .sort({name: 'desc'})
    .then(contacts => {
        res.render('home', {
            contacts: contacts
        })
    })
});

app.post('/', (req, res) => {
    console.log(req.body);

    const newContact = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        dob: req.body.dob,
        contactType: req.body.contactType,
        existing: req.body.existing,
        comments: req.body.comments
    }

    new Contact(newContact)
        .save()
        .then(contacts => {
            res.render('home', {
                contacts: contacts
            });
        });
});

app.listen(`${PORT}`, () => console.log(`Connected on localhost:${PORT}`));