const express = require('express'),
    app = express();

const Pool = require('./pool'),
    Mydb = require('./mydb');

const testJson = require('./test/test.json');

const pool = new Pool();

app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.get('/test/:email', (req, res) => {
    testJson.email = req.params.email;
    testJson.aa = req.query.aa;
    res.json(testJson);
});

app.get('/dbtest/:name', (req, res) => {
    let name = req.params.name;
    let mydb = new Mydb(pool);
    mydb.execute(conn => {
        conn.query("select * from node_test where name=?", [name], (err, result) => {
            res.json(result);
        });
    });
});

const server = app.listen(3000, function () {
    console.log("Express's started on port 3000");
});