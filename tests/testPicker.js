const jsdom = require("jsdom");
const request = require('request');
var fs = require('fs');
var mysql = require('mysql');

var con = mysql.createConnection({
    host: 'betsmart.c4vgirc2flsl.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'Password1',
    database: 'BetSmart'
});

function test(week)
{
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        sql = `SELECT * FROM PICKS WHERE PICKS.week = ${week};`;
        con.query(sql, function (err, picks) {
            if (err) throw err;
            for(var i of picks)
            {
                sql = `SELECT * FROM SPREAD WHERE SPREAD.team = '${i.team}' AND SPREAD.bookmaker = 'caesars-sportsbook';`;
                con.query(sql, function (err, spread) {
                    sql = `SELECT * FROM TEAMS WHERE TEAMS.names = '${i.team}' OR TEAMS.names = '${spread.opponent}';`;
                    con.query(sql, function (err, teams) {
                        if (err) throw err;
                        if(i.picktype == 'Regular:')
                        {
                            if(teams[0].names == i.team)
                            {
                                if(teams.scores != 0)
                                {
                                    console.log(`PICK TEST PASSED`);
                                }
                                else 
                                {
                                    console.log("PICK TEST FAILED");
                                }
                            }
                        }
                        if(i.picktype == 'Weighted:')
                        {
                            if(teams[0].names == i.team)
                            {
                                if(teams.scores != 0)
                                {
                                    console.log(`PICK TEST PASSED`);
                                }
                                else 
                                {
                                    console.log("PICK TEST FAILED");
                                }
                            }
                        }
                        if(i.picktype == 'ATS:')
                        {
                            if(teams[0].names == i.team)
                            {
                                if(teams.scores != 0)
                                {
                                    console.log(`PICK TEST PASSED`);
                                }
                                else 
                                {
                                    console.log("PICK TEST FAILED");
                                }
                            }
                        }
                    });
                });
            }
        });
    });
}

test(6);