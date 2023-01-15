const express = require('express');
  
var parseUrl = require('body-parser');
const bcrypt = require('bcrypt');
const app = express();
const PORT = 3000;
path = require('path');
app.use(express.urlencoded({ extended: false }));
let encodeUrl = parseUrl.urlencoded({ extended: false });
const session = require('express-session');
var async      = require('async');
var dbCredentials = {
    host: "localhost",
    user: "root",
    password: "",
    database: "kval_darbs"
    };


app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'defaultVal',
    cookie: {
        maxAge: 1000 * 60 * 60 * 4,
        sameSite: true,
        secure: false,

    }
}));

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use('/public', express.static(path.join('../public')));
app.get('/', (req, res) =>{
    if(req.session.userName){
        var mysql = require('mysql');
        var testNames = ['COUNTRIES', 'FLAGS', 'CAPITALS', 'GENERAL1', 'GENERAL2', 'GENERAL3'];
        var queries = [];
        for(var i=0; i< testNames.length; i++){
            queries[i] = "SELECT * from test_attempt ta, users u where u.USERNAME = '"+req.session.userName+"' and u.ID = ta.USER_ID and ta.TEST_NAME = '"+testNames[i]+"' order by ta.TIME_LEFT desc";
        }
        // query pooling used to send multiple queries for each type of test results
        var pool = mysql.createPool(dbCredentials);
        var return_data = {};
        function formatReturnObject(return_data, returnObj){
            if(return_data.countries.length > 0){
                var bestScore = 0;
                var maxScoreBest = 0;
                for(var i = 0; i< return_data.countries.length; i++){
                    if(return_data.countries[i].SCORE == return_data.countries[i].MAX_SCORE){
                        bestScore = return_data.countries[i].SCORE;
                        maxScoreBest = return_data.countries[i].MAX_SCORE;
                    }
                    else if(return_data.countries[i].SCORE > bestScore){
                        bestScore = return_data.countries[i].SCORE;
                        maxScoreBest = return_data.countries[i].MAX_SCORE;
                    }
                }
                returnObj["msg1"] = bestScore+" out of "+maxScoreBest+" countries.";
            }
            if(return_data.flags.length > 0){
                var bestScore = 0;
                var maxScoreBest = 0;
                for(var i = 0; i< return_data.flags.length; i++){
                    if(return_data.flags[i].SCORE == return_data.flags[i].MAX_SCORE){
                        bestScore = return_data.flags[i].SCORE;
                        maxScoreBest = return_data.flags[i].MAX_SCORE;
                    }
                    else if(return_data.flags[i].SCORE > bestScore){
                        bestScore = return_data.flags[i].SCORE;
                        maxScoreBest = return_data.flags[i].MAX_SCORE;
                    }
                }
                returnObj["msg2"] = bestScore+" out of "+maxScoreBest+" flags.";
            }
            if(return_data.capitals.length > 0){
                var bestScore = 0;
                var maxScoreBest = 0;
                for(var i = 0; i< return_data.capitals.length; i++){
                    if(return_data.capitals[i].SCORE == return_data.capitals[i].MAX_SCORE){
                        bestScore = return_data.capitals[i].SCORE;
                        maxScoreBest = return_data.capitals[i].MAX_SCORE;
                    }
                    else if(return_data.capitals[i].SCORE > bestScore){
                        bestScore = return_data.capitals[i].SCORE;
                        maxScoreBest = return_data.capitals[i].MAX_SCORE;
                    }
                }
                returnObj["msg3"] = bestScore+" out of "+maxScoreBest+" capitals.";
            }
            if(return_data.general1.length > 0){
                var bestScore = 0;
                var maxScoreBest = 0;
                for(var i = 0; i< return_data.general1.length; i++){
                    if(return_data.general1[i].SCORE == return_data.general1[i].MAX_SCORE){
                        bestScore = return_data.general1[i].SCORE;
                        maxScoreBest = return_data.general1[i].MAX_SCORE;
                    }
                    else if(return_data.general1[i].SCORE > bestScore){
                        bestScore = return_data.general1[i].SCORE;
                        maxScoreBest = return_data.general1[i].MAX_SCORE;
                    }
                }
                returnObj["msg4"] = bestScore+" out of "+maxScoreBest+" questions.";
            }
            if(return_data.general2.length > 0){
                var bestScore = 0;
                var maxScoreBest = 0;
                for(var i = 0; i< return_data.general2.length; i++){
                    if(return_data.general2[i].SCORE == return_data.general2[i].MAX_SCORE){
                        bestScore = return_data.general2[i].SCORE;
                        maxScoreBest = return_data.general2[i].MAX_SCORE;
                    }
                    else if(return_data.general2[i].SCORE > bestScore){
                        bestScore = return_data.general2[i].SCORE;
                        maxScoreBest = return_data.general2[i].MAX_SCORE;
                    }
                }
                returnObj["msg5"] = bestScore+" out of "+maxScoreBest+" questions.";
            }
            if(return_data.general3.length > 0){
                var bestScore = 0;
                var maxScoreBest = 0;
                for(var i = 0; i< return_data.general3.length; i++){
                    if(return_data.general3[i].SCORE == return_data.general3[i].MAX_SCORE){
                        bestScore = return_data.general3[i].SCORE;
                        maxScoreBest = return_data.general3[i].MAX_SCORE;
                    }
                    else if(return_data.general3[i].SCORE > bestScore){
                        bestScore = return_data.general3[i].SCORE;
                        maxScoreBest = return_data.general3[i].MAX_SCORE;
                    }
                }
                returnObj["msg6"] = bestScore+" out of "+maxScoreBest+" questions.";
            }
            return returnObj;
        }
        async.parallel([
        function(parallel_done) {
            pool.query(queries[0], {}, function(err, results) {
                if (err) return parallel_done(err);
                return_data.countries = results;
                parallel_done();
            });
        },
        function(parallel_done) {
            pool.query(queries[1], {}, function(err, results) {
                if (err) return parallel_done(err);
                return_data.flags = results;
                parallel_done();
            });
        },
        function(parallel_done) {
            pool.query(queries[2], {}, function(err, results) {
                if (err) return parallel_done(err);
                return_data.capitals = results;
                parallel_done();
            });
        },
        function(parallel_done) {
            pool.query(queries[3], {}, function(err, results) {
                if (err) return parallel_done(err);
                return_data.general1 = results;
                parallel_done();
            });
        },
        function(parallel_done) {
            pool.query(queries[4], {}, function(err, results) {
                if (err) return parallel_done(err);
                return_data.general2 = results;
                parallel_done();
            });
        },
        function(parallel_done) {
            pool.query(queries[5], {}, function(err, results) {
                if (err) return parallel_done(err);
                return_data.general3 = results;
                parallel_done();
            });
        }
        ], function(err) {
            if (err) console.log(err);
            pool.end();
            var returnObj = {username: req.session.userName};
            returnObj = formatReturnObject(return_data, returnObj);
            res.status(200);
            res.render('index', returnObj);
        });
    }
    else{
        res.status(200);
        res.render('index');
    }
    
    
});

app.get('/countries', (req, res) =>{
    res.status(200);
    res.render('countries', {username: req.session.userName});
});

app.post('/testPost', (req, res) =>{
    var mysql = require('mysql');
    var score = req.body.score;
    var time = req.body.time;
    var timeLeft = req.body.timeLeft;
    var testName = req.body.testName;
    var maxScore = req.body.maxScore;
    if(String(req.session.userName) != "undefined" && String(req.session.userName) != ""){
        var con = mysql.createConnection(dbCredentials);
        con.connect(function(err) {
            if (err) throw err;
            con.query("SELECT * from users where username = '"+req.session.userName+"'", function(err, result){
                if(err){
                    // error
                }
                else{
                    var currentTimestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
                    var sql = "INSERT INTO test_attempt (USER_ID, TEST_NAME, SCORE, MAX_SCORE, TIME, TIME_LEFT, REG_DATE) VALUES ('"+result[0].ID+"', '"+testName+"', '"+score+"', '"+maxScore+"', '"+time+"', '"+timeLeft+"', '"+currentTimestamp+"')";
                    var queryResults;
                    con.query(sql, function (error, results, fields) {
                        if (error) throw error;
                    
                    }); 
                }
            });
            
        });
    }
});

app.get('/capitals', (req, res) =>{
    res.status(200);
    res.render('capitals', {username: req.session.userName});
});

app.get('/flags', (req, res) =>{
    res.status(200);
    res.render('flags', {username: req.session.userName});
});

app.get('/flagsMultiple', (req, res) =>{
    res.status(200);
    res.render('flagsMultiple', {username: req.session.userName});
});

app.get('/capitalsMultiple', (req, res) =>{
    res.status(200);
    res.render('capitalsMultiple', {username: req.session.userName});
});

app.get('/general1', (req, res) =>{
    res.status(200);
    res.render('general1', {username: req.session.userName});
});

app.get('/general2', (req, res) =>{
    res.status(200);
    res.render('general2', {username: req.session.userName});
});

app.get('/general3', (req, res) =>{
    res.status(200);
    res.render('general3', {username: req.session.userName});
});

app.get('/about', (req, res) =>{
    res.status(200);
    res.render('about', {username: req.session.userName});
});

app.get('/register', (req, res) =>{
    res.status(200);
    res.render('register');
});

app.get('/login', (req, res) =>{
    res.status(200);
    res.render('login');
});

app.get('/logout', (req, res) =>{
    req.session.userName = "";
    res.status(200);
    res.redirect('/');
});

app.post('/authRegister', encodeUrl, async (req, res) => {
    var mysql = require('mysql');
    var username = req.body.username;
    var password;
    try{
        const salt = await bcrypt.genSalt();
        password = await bcrypt.hash(req.body.password, salt);
        var con = mysql.createConnection(dbCredentials);
        con.connect(function(err) {
            if (err){
                res.status(200);
                res.render('register', {error: true});
            };
            // checking user already registered or no
            con.query(`SELECT * FROM users WHERE username = '${username}'`, function(err, result){
                if(err){
                    res.status(200);
                    res.render('register', {error: true});
                };
                if(Object.keys(result).length > 0){
                    // error
                    res.status(200);
                    res.render('register', {error: true});;
                }else{
                //creating user page in userPage function
                function generateResultPage(user){
                    req.session.userName = user;
                    res.status(200);
                    res.redirect('/');
                }
                    // inserting new user data
                    var currentTimestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
                    var sql = `INSERT INTO users (username, password, reg_date) VALUES ('${username}', '${password}', '${currentTimestamp}')`;
                    con.query(sql, function (err, result) {
                        if (err){
                            res.status(200);
                            res.render('register', {error: true});
                        }else{
                            // using userPage function for creating user page
                            generateResultPage(username);
                        };
                    });
    
            }
    
            });
        });
    } catch {
        res.status(500).send();
    }
});

app.post('/authLogin', encodeUrl, (req, res) => {
    var mysql = require('mysql');
    var username = req.body.username;
    var password = req.body.password;
    try{
        var con = mysql.createConnection(dbCredentials);
        con.connect(function(err) {
            if (err){
                console.log(err);
            };
            // checking user already registered or no
            con.query(`SELECT * FROM users WHERE username = '${username}'`, async function(err, result){
                if(err){
                    console.log(err);
                };
                if(Object.keys(result).length == 0){
                    // error
                    res.status(200);
                    res.render('login', {error: true});
                }else{
                try{
                    if(await bcrypt.compare(password, result[0].PASSWORD)){
                        req.session.userName = username;
                        res.status(200);
                        res.redirect('/');
                    }
                    else{
                        res.status(200);
                        res.render('login', {error: true});
                    }
                }
                catch {
                    res.status(200);
                    res.render('login', {error: true});
                }
    
            }
    
            });
        });
    } catch {
        res.status(500).send();
    }
});

app.get('/api/:region', (req, res) =>{
    var mysql = require('mysql');
    var con = mysql.createConnection(dbCredentials);

    con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    });
    var sql;
    if(req.params.region != 'World'){
        var region = String(req.params.region);
        sql = "SELECT * from countries where REGION = '"+region+"'";
    }
    else{
        sql = 'SELECT * from countries';
    }
    
    var queryResults;
    con.query(sql, function (error, results, fields) {
        if (error) throw error;
        console.log("Queried");
        res.status(200);
        res.json(JSON.stringify(results));
      });
});

app.get('/tests/:testName', (req, res) =>{
    var mysql = require('mysql');
    var con = mysql.createConnection(dbCredentials);

    con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    });
    var sql = "SELECT * from test_questions where NAME = '"+String(req.params.testName)+"'";
    
    
    var queryResults;
    con.query(sql, function (error, results, fields) {
        if (error) throw error;
        console.log("Queried");
        res.status(200);
        res.json(JSON.stringify(results));
      });
});

const userRouter = require('./routes/users');

app.use('/users', userRouter);

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);