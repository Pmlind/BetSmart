const jsdom = require("jsdom");
const request = require('request');
var fs = require('fs');
const reader = require('xlsx');
var mysql = require('mysql');

var con = mysql.createConnection({
    host: 'betsmart.c4vgirc2flsl.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'Password1',
    database: 'BetSmart'
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!")
    /*sql = `SELECT * FROM PICKS, SCORES WHERE (PICKS.week = ${week} AND SCORES.week = ${week}) AND (PICKS.team = SCORES.team1 OR PICKS.team = SCORES.team2);`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
    });*/
});

/*if(teams[0].ats - 10 + spread.spread >= teams[1].ats)
{
    console.log(`PICK TEST PASSED`);
}*/