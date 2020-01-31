const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send("check");
})

const PORT = 3000;
app.listen(`${PORT}`);