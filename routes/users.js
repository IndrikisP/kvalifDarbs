const express = require('express');
const router = express.Router();

router.get('/', (req, res) =>{
    var mysql = require('mysql');

    var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "kval_darbs"
    });

    con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    });
    var sql = 'SELECT * from countries';
    var queryResults;
    con.query(sql, function (error, results, fields) {
        if (error) throw error;
        console.log("Queried");
        console.log(JSON.stringify(results));
        res.send(results);
        //res.send(JSON.stringify(queryResults));
      });
    //res.send('User list');
    //res.send(JSON.stringify(queryResults));
});
router.get('/new', (req, res) =>{
    res.send('User new form');
});

router.post('/', (req, res) => {
    res.send('Create User');
});

router.route('/:id').get((req, res) => {
    console.log(req.user);
    res.send(`User Get with id ${req.params.id}`);
}).put((req, res) => {
    res.send(`User put with id ${req.params.id}`);
}).delete((req, res) => {
    res.send(`User delete with id ${req.params.id}`);
});
const users = [{ name: "Janis"}, { name: "Juris"}];
router.param("id", (req, res, next, id) => {
    req.user = users[id];
    next();
});

module.exports = router;