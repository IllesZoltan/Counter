const express = require('express');
const app = express();
const port = 3000;

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('mydb.db');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const countPath = "C:/Users/Salaida/Desktop/CODING/Junior_Webfejlesztő/Selfie_Projects/Counter/static/counter.html"


let currentNr = ""                              // -- Tároló


app.get('/start', (req,res) => {
    res.sendFile(countPath)
})

app.post('/count', (req, res) => {              // -- Eltárolja

    const {a} = req.body;
    currentNr = a
    res.redirect('/current')
})

app.get('/current', (req, res) => {             // -- Kiolvassa
    console.log('current nr. ',currentNr);
    res.send()
})

app.listen(port, () => {
    console.log('The API is lstening to port: ' + port);

    db.serialize(() => {
        db.run("CREATE TABLE IF NOT EXISTS Counter (' CurrentNr INGTEGER)");
    })
    
    db.close();
})