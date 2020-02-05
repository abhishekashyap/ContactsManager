'use strict';

const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

// Load contacts model
require('./models/contact')
const Contact = mongoose.model('contacts');

// Load config
const db = require('./config/database');

/* After installing MongoDB, setup MongoDB by using:
 $ mongod --directoryperdb --dbpath /path/to/db
 Create directory as data/db for storing */
mongoose.connect(db.mongoURI, {
    // To remove warnings
    useNewUrlParser: true
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

// Handlebars middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
})); // Initializing the handlebars view engine
app.set('view engine', 'handlebars'); // Setting the view engine to handlebars

// Method override middleware
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    Contact.find()
        // .sort({name: 'desc'})
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
        avatar: '',
        dob: req.body.dob,
        gender: req.body.gender,
        existing: req.body.existing,
        comments: req.body.comments
    }

    if (newContact.gender == 'male') {
        fetch('https://avatar-links.herokuapp.com/svg?gender=man')
            .then((resData) => resData.text())
            .then((img) => {
                newContact.avatar = img;
            })
            .then(() => {
                new Contact(newContact)
                    .save()
                    .then(contacts => res.redirect('/'));
            });
    } else {
        fetch('https://avatar-links.herokuapp.com/svg?gender=girl')
            .then((resData) => resData.text())
            .then((img) => {
                newContact.avatar = img;
            })
            .then(() => {
                new Contact(newContact)
                    .save()
                    .then(contacts => res.redirect('/'));
            });
    }
});

app.delete('/:id', (req, res) => {
    Contact.deleteOne({ _id: req.params.id })
        .then(() => {
            console.log('Deleted entry');
            res.redirect('/');
        })
});

app.listen(`${PORT}`, () => console.log(`Connected on localhost:${PORT}`));