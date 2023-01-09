const express = require('express');
  
var parseUrl = require('body-parser');
const bcrypt = require('bcrypt');
const app = express();
const PORT = 3000;
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

// const redirectLogin = (req, res, next) =>{
//     if(!req.session.userId){
//         res.redirect('login');
//     }
//     else{
//         next();
//     }
// }

// const redirectHome = (req, res, next) =>{
//     if(!req.session.userId){
//         res.redirect('login');
//     }
//     else{
//         next();
//     }
// }

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.get('/', (req, res) =>{
    if(req.session.userName){
        var mysql = require('mysql');
        var testNames = ['COUNTRIES', 'FLAGS', 'CAPITALS', 'GENERAL1', 'GENERAL2', 'GENERAL3'];
        var queries = [];
        for(var i=0; i< testNames.length; i++){
            queries[i] = "SELECT * from test_attempt ta, users u where u.USERNAME = '"+req.session.userName+"' and u.ID = ta.USER_ID and ta.TEST_NAME = '"+testNames[i]+"' order by ta.TIME_LEFT desc";
        }
        var pool = mysql.createPool(dbCredentials);
        var return_data = {};
        function formatReturnObject(return_data, returnObj){
            console.log(return_data.countries.length);
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
            console.log(return_data.capitals.length);
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
    console.log(score+" "+time+" "+testName+" "+maxScore);
    console.log(String(req.session.userName));
    if(String(req.session.userName) != "undefined" && String(req.session.userName) != ""){
        var con = mysql.createConnection(dbCredentials);
        con.connect(function(err) {
            if (err) throw err;
            con.query("SELECT * from users where username = '"+req.session.userName+"'", function(err, result){
                if(err){
                    // error
                }
                else{
                    console.log(result[0].ID);
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
    req.session.userName = null;
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


// migration for populating the database with the country data

// app.get('/populateDB', (req, res) =>{
//     var mysql = require('mysql');

//     var con = mysql.createConnection(dbCredentials);

//     con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     });
//     var sql = "INSERT INTO countries (NAME, ISO, CAPITAL, REGION) VALUES ('Afghanistan', 'AF', 'Kabul', 'Asia'),";
//     sql+= "('Albania', 'AL', 'Tirana', 'Europe'),";
//     sql+= "('Algeria', 'DZ', 'Algiers', 'Africa'),";
//     sql+= "('Andorra', 'AD', 'Andorra la Vella', 'Europe'),";
//     sql+= "('Angola', 'AO', 'Luanda', 'Africa'),";
//     sql+= "('Antigua and Barbuda', 'AG', 'St. Johns', 'North America'),";
//     sql+= "('Argentina', 'AR', 'Buenos Aires', 'South America'),";
//     sql+= "('Armenia', 'AM', 'Yerevan', 'Asia'),";
//     sql+= "('Australia', 'AU', 'Canberra', 'Oceania'),";
//     sql+= "('Austria', 'AT', 'Vienna', 'Europe'),";
//     sql+= "('Azerbaijan', 'AZ', 'Baku', 'Asia'),";
//     sql+= "('Bahamas', 'BS', 'Nassau', 'North America'),";
//     sql+= "('Bahrain', 'BH', 'Manama', 'Asia'),";
//     sql+= "('Bangladesh', 'BS', 'Dhaka', 'Asia'),";
//     sql+= "('Barbados', 'BB', 'Bridgetown', 'North America'),";
//     sql+= "('Belarus', 'BY', 'Minsk', 'Europe'),";
//     sql+= "('Belgium', 'BE', 'Brussels', 'Europe'),";
//     sql+= "('Belize', 'BZ', 'Belmopan', 'North America'),";
//     sql+= "('Benin', 'BJ', 'Porto-Novo', 'Africa'),";
//     sql+= "('Bhutan', 'BT', 'Thimphu', 'Asia'),";
//     sql+= "('Bolivia', 'BO', 'La Paz', 'South America'),";
//     sql+= "('Bosnia and Herzegovina', 'BA', 'Sarajevo', 'Europe'),";
//     sql+= "('Botswana', 'BW', 'Gaborone', 'Africa'),";
//     sql+= "('Brazil', 'BR', 'Brasilia', 'South America'),";
//     sql+= "('Brunei', 'BN', 'Bandar Seri Begawan', 'Asia'),";
//     sql+= "('Bulgaria', 'BG', 'Sofia', 'Europe'),";
//     sql+= "('Burkina Faso', 'BF', 'Ouagadougou', 'Africa'),";
//     sql+= "('Burundi', 'BI', 'Gitega', 'Africa'),";
//     sql+= "('Cambodia', 'KH', 'Phnom Penh', 'Asia'),";
//     sql+= "('Cameroon', 'CM', 'Yaounde', 'Africa'),";
//     sql+= "('Canada', 'CA', 'Ottawa', 'North America'),";
//     sql+= "('Cape Verde', 'CV', 'Praia', 'Africa'),";
//     sql+= "('Central African Republic', 'CF', 'Bangui', 'Africa'),";
//     sql+= "('Chad', 'TD', 'NDjamena', 'Africa'),";
//     sql+= "('Chile', 'CL', 'Santiago', 'South America'),";
//     sql+= "('China', 'CL', 'Beijing', 'Asia'),";
//     sql+= "('Colombia', 'CO', 'Bogota', 'South America'),";
//     sql+= "('Comoros', 'KM', 'Moroni', 'Africa'),";
//     sql+= "('Congo', 'CG', 'Brazzaville', 'Africa'),";
//     sql+= "('Costa Rica', 'CR', 'San Jose', 'North America'),";
//     sql+= "('Croatia', 'HR', 'Zagreb', 'Europe'),";
//     sql+= "('Cuba', 'CU', 'Havana', 'North America'),";
//     sql+= "('Cyprus', 'CY', 'Nicosia', 'Europe'),";
//     sql+= "('Czech Republic', 'CZ', 'Prague', 'Europe'),";
//     sql+= "('Democratic Republic of the Congo', 'CD', 'Kinshasa', 'Africa'),";
//     sql+= "('Denmark', 'DK', 'Copenhagen', 'Europe'),";
//     sql+= "('Djibouti', 'DJ', 'Djibouti City', 'Africa'),";
//     sql+= "('Dominica', 'DM', 'Roseau', 'North America'),";
//     sql+= "('Dominican Republic', 'DO', 'Santo Domingo', 'North America'),";
//     sql+= "('East Timor', 'TL', 'Dili', 'Asia'),";
//     sql+= "('Ecuador', 'EC', 'Quito', 'South America'),";
//     sql+= "('Egypt', 'EG', 'Cairo', 'Africa'),";
//     sql+= "('El Salvador', 'SV', 'San Salvador', 'North America'),";
//     sql+= "('Equatorial Guinea', 'GQ', 'Malabo', 'Africa'),";
//     sql+= "('Eritrea', 'ER', 'Asmara', 'Africa'),";
//     sql+= "('Estonia', 'EE', 'Tallinn', 'Europe'),";
//     sql+= "('Eswatini', 'SZ', 'Mbabane', 'Africa'),";
//     sql+= "('Ethiopia', 'ET', 'Addis Ababa', 'Africa'),";
//     sql+= "('Fiji', 'FJ', 'Suva', 'Oceania'),";
//     sql+= "('Finland', 'FI', 'Helsinki', 'Europe'),";
//     sql+= "('France', 'FR', 'Paris', 'Europe'),";
//     sql+= "('Gabon', 'GA', 'Libreville', 'Africa'),";
//     sql+= "('Georgia', 'GE', 'Tbilisi', 'Europe'),";
//     sql+= "('Germany', 'DE', 'Berlin', 'Europe'),";
//     sql+= "('Ghana', 'GH', 'Accra', 'Africa'),";
//     sql+= "('Greece', 'GR', 'Athens', 'Europe'),";
//     sql+= "('Grenada', 'GD', 'St. Georges', 'North America'),";
//     sql+= "('Guatemala', 'GT', 'Guatemala City', 'North America'),";
//     sql+= "('Guinea', 'GN', 'Conakry', 'Africa'),";
//     sql+= "('Guinea-Bissau', 'GW', 'Bissau', 'Africa'),";
//     sql+= "('Guyana', 'GY', 'Georgetown', 'South America'),";
//     sql+= "('Haiti', 'HT', 'Port-au-prince', 'North America'),";
//     sql+= "('Honduras', 'HN', 'Tegucigalpa', 'North America'),";
//     sql+= "('Hungary', 'HU', 'Budapest', 'Europe'),";
//     sql+= "('Iceland', 'IS', 'Reykjavik', 'Europe'),";
//     sql+= "('India', 'IN', 'New Delhi', 'Asia'),";
//     sql+= "('Indonesia', 'ID', 'Jakarta', 'Asia'),";
//     sql+= "('Iran', 'IR', 'Tehran', 'Asia'),";
//     sql+= "('Iraq', 'IQ', 'Baghdad', 'Asia'),";
//     sql+= "('Ireland', 'IE', 'Dublin', 'Europe'),";
//     sql+= "('Israel', 'IL', 'Jerusalem', 'Europe'),";
//     sql+= "('Italy', 'IT', 'Rome', 'Europe'),";
//     sql+= "('Ivory Coast', 'CI', 'Yamoussoukro', 'Africa'),";
//     sql+= "('Jamaica', 'JM', 'Kingston', 'North America'),";
//     sql+= "('Japan', 'JP', 'Tokyo', 'Asia'),";
//     sql+= "('Jordan', 'JO', 'Amman', 'Africa'),";
//     sql+= "('Kazakhstan', 'KZ', 'Astana', 'Asia'),";
//     sql+= "('Kenya', 'KE', 'Nairobi', 'Africa'),";
//     sql+= "('Kiribati', 'KI', 'South Tarawa', 'Oceania'),";
//     sql+= "('Kosovo', 'XK', 'Pristina', 'Europe'),";
//     sql+= "('Kuwait', 'KW', 'Kuwait City', 'Asia'),";
//     sql+= "('Kyrgyzstan', 'KG', 'Bishkek', 'Asia'),";
//     sql+= "('Latvia', 'LV', 'Riga', 'Europe'),";
//     sql+= "('Laos', 'LA', 'Vientiane', 'Asia'),";
//     sql+= "('Lebanon', 'LB', 'Beirut', 'Asia'),";
//     sql+= "('Lesotho', 'LS', 'Maseru', 'Africa'),";
//     sql+= "('Liberia', 'LR', 'Monrovia', 'Africa'),";
//     sql+= "('Libya', 'LY', 'Tripoli', 'Africa'),";
//     sql+= "('Liechtenstein', 'LI', 'Vaduz', 'Europe'),";
//     sql+= "('Lithuania', 'LT', 'Vilnius', 'Europe'),";
//     sql+= "('Luxembourg', 'LU', 'Luxembourg', 'Europe'),";
//     sql+= "('Madagascar', 'MG', 'Antananarivo', 'Africa'),";
//     sql+= "('Malawi', 'MW', 'Lilongwe', 'Africa'),";
//     sql+= "('Malaysia', 'MY', 'Kuala Lumppur', 'Asia'),";
//     sql+= "('Maldives', 'MV', 'Male', 'Asia'),";
//     sql+= "('Mali', 'ML', 'Barnako', 'Africa'),";
//     sql+= "('Malta', 'MT', 'Valletta', 'Europe'),";
//     sql+= "('Marshall Islands', 'MH', 'Majuro', 'Oceania'),";
//     sql+= "('Mauritania', 'MR', 'Nouakchott', 'Africa'),";
//     sql+= "('Mauritius', 'MU', 'Port Louis', 'Africa'),";
//     sql+= "('Mexico', 'MX', 'Mexico City', 'North America'),";
//     sql+= "('Micronesia', 'FM', 'Palikir', 'Oceania'),";
//     sql+= "('Moldova', 'MD', 'Chisinau', 'Europe'),";
//     sql+= "('Monaco', 'MC', 'Monaco', 'Europe'),";
//     sql+= "('Mongolia', 'MN', 'Ulaanbaatar', 'Asia'),";
//     sql+= "('Montenegro', 'ME', 'Podgorica', 'Europe'),";
//     sql+= "('Morocco', 'MA', 'Rabat', 'Africa'),";
//     sql+= "('Mozambique', 'MZ', 'Maputo', 'Africa'),";
//     sql+= "('Myanmar', 'MM', 'Naypyidaw', 'Asia'),";
//     sql+= "('Namibia', 'NA', 'Windhoek', 'Africa'),";
//     sql+= "('Nauru', 'NR', 'Yaren', 'Oceania'),";
//     sql+= "('Nepal', 'NP', 'Kathmandu', 'Asia'),";
//     sql+= "('Netherlands', 'NL', 'Amsterdam', 'Europe'),";
//     sql+= "('New Zealand', 'NZ', 'Wellington', 'Oceania'),";
//     sql+= "('Nicaragua', 'NI', 'Managua', 'North America'),";
//     sql+= "('Niger', 'NE', 'Abuja', 'Africa'),";
//     sql+= "('Nigeria', 'NG', 'Alofi', 'Africa'),";
//     sql+= "('North Korea', 'KP', 'Pyongyang', 'Asia'),";
//     sql+= "('North Macedonia', 'MK', 'Skopje', 'Europe'),";
//     sql+= "('Norway', 'NO', 'Oslo', 'Europe'),";
//     sql+= "('Oman', 'OM', 'Muscat', 'Asia'),";
//     sql+= "('Pakistan', 'PK', 'Islamabad', 'Asia'),";
//     sql+= "('Palau', 'PW', 'Ngerulmud', 'Oceania'),";
//     sql+= "('Palestine', 'PS', 'Jerusalem', 'Asia'),";
//     sql+= "('Panama', 'PA', 'Panama City', 'North America'),";
//     sql+= "('Papua New Guinea', 'PG', 'Port Moresby', 'Oceania'),";
//     sql+= "('Paraguay', 'PY', 'Asuncion', 'South America'),";
//     sql+= "('Peru', 'PE', 'Lima', 'South America'),";
//     sql+= "('Philippines', 'PH', 'Manila', 'Asia'),";
//     sql+= "('Poland', 'PL', 'Warsaw', 'Europe'),";
//     sql+= "('Portugal', 'PT', 'Lisbon', 'Europe'),";
//     sql+= "('Qatar', 'QA', 'Doha', 'Asia'),";
//     sql+= "('Romania', 'RO', 'Bucharest', 'Europe'),";
//     sql+= "('Russia', 'RU', 'Moscow', 'Europe'),";
//     sql+= "('Rwanda', 'RW', 'Kigali', 'Africa'),";
//     sql+= "('Saint Kitts and Nevis', 'KN', 'Basseterre', 'North America'),";
//     sql+= "('Saint Lucia', 'LC', 'Castries', 'North America'),";
//     sql+= "('Saint Vincent and the Grenadines', 'VC', 'Kingstown', 'North America'),";
//     sql+= "('Samoa', 'WS', 'Apia', 'Oceania'),";
//     sql+= "('San Marino', 'SM', 'San Marino', 'Europe'),";
//     sql+= "('Sao Tome and Principe', 'ST', 'Sao Tome', 'Africa'),";
//     sql+= "('Saudi Arabia', 'SA', 'Riyadh', 'Asia'),";
//     sql+= "('Senegal', 'SN', 'Dakar', 'Africa'),";
//     sql+= "('Serbia', 'RS', 'Belgrade', 'Europe'),";
//     sql+= "('Seychelles', 'SC', 'Victoria', 'Africa'),";
//     sql+= "('Sierra Leone', 'SL', 'Freetown', 'Africa'),";
//     sql+= "('Singapore', 'SG', 'Singapore', 'Asia'),";
//     sql+= "('Slovakia', 'SK', 'Bratislava', 'Europe'),";
//     sql+= "('Slovenia', 'SI', 'Ljubljana', 'Europe'),";
//     sql+= "('Solomon Islands', 'SB', 'Honiara', 'Oceania'),";
//     sql+= "('Somalia', 'SO', 'Mogadishu', 'Africa'),";
//     sql+= "('South Africa', 'ZA', 'Cape Town', 'Africa'),";
//     sql+= "('South Korea', 'KR', 'Seoul', 'Asia'),";
//     sql+= "('South Sudan', 'SS', 'Juba', 'Africa'),";
//     sql+= "('Spain', 'ES', 'Madrid', 'Europe'),";
//     sql+= "('Sri Lanka', 'LK', 'Sri Jayawardenepura Kotte', 'Asia'),";
//     sql+= "('Sudan', 'SD', 'Khartourn', 'Africa'),";
//     sql+= "('Suriname', 'SR', 'Paramaribo', 'South America'),";
//     sql+= "('Sweden', 'SE', 'Stockholm', 'Europe'),";
//     sql+= "('Switzerland', 'CH', 'Bern', 'Europe'),";
//     sql+= "('Syria', 'SY', 'Damascus', 'Asia'),";
//     sql+= "('Taiwan', 'TW', 'Taipei', 'Asia'),";
//     sql+= "('Tajikistan', 'TJ', 'Dushanbe', 'Asia'),";
//     sql+= "('Tanzania', 'TZ', 'Dodoma', 'Africa'),";
//     sql+= "('Thailand', 'TH', 'Bangkok', 'Asia'),";
//     sql+= "('Gambia', 'GM', 'Banjul', 'Africa'),";
//     sql+= "('Togo', 'TG', 'Lome', 'Africa'),";
//     sql+= "('Tonga', 'TO', 'Nukualofa', 'Oceania'),";
//     sql+= "('Trinidad and Tobago', 'TT', 'Port of Spain', 'North America'),";
//     sql+= "('Tunisia', 'TN', 'Tunis', 'Africa'),";
//     sql+= "('Turkey', 'TR', 'Ankara', 'Europe'),";
//     sql+= "('Turkmenistan', 'TM', 'Ashgabat', 'Asia'),";
//     sql+= "('Tuvalu', 'TV', 'Funafuti', 'Oceania'),";
//     sql+= "('Uganda', 'UG', 'Kampala', 'Africa'),";
//     sql+= "('Ukraine', 'UA', 'Kyiv', 'Europe'),";
//     sql+= "('United Arab Emirates', 'AE', 'Abu Dhabi', 'Asia'),";
//     sql+= "('United Kingdom', 'GB', 'London', 'Europe'),";
//     sql+= "('Uruguay', 'UY', 'Montevideo', 'South America'),";
//     sql+= "('Uzbekistan', 'UZ', 'Tashkent', 'Asia'),";
//     sql+= "('Vanuatu', 'VU', 'Port Vila', 'Oceania'),";
//     sql+= "('Vatican city', 'VA', 'Vatican City', 'Europe'),";
//     sql+= "('Venezuela', 'VE', 'Caracas', 'South America'),";
//     sql+= "('Vietnam', 'VN', 'Hanoi', 'Asia'),";
//     sql+= "('Yemen', 'YE', 'Sana', 'Asia'),";
//     sql+= "('Zambia', 'ZM', 'Lusaka', 'Africa'),";
//     sql+= "('Zimbabwe', 'ZW', 'Harare', 'Africa');";
    
//     var queryResults;
//     con.query(sql, function (error, results, fields) {
//         if (error) throw error;
//         console.log("Queried");
//         console.log(results);
//         res.status(200);
//         res.render('index');

//       });
// });

const userRouter = require('./routes/users');

app.use('/users', userRouter);

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);