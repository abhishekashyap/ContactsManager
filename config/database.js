if (process.env.NODE_ENV === 'production') {
    module.exports = {
        mongoURI: '<Your database string here>'
    }
} else {
    module.exports = {
        mongoURI: 'mongodb://localhost/contacts-dev'
    }
}