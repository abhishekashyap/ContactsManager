if (process.env.NODE_ENV === 'production') {
    module.exports = {
        mongoURI: '<Your db string here>'
    }
} else {
    module.exports = {
        mongoURI: 'mongodb://localhost/contacts-dev'
    }
}