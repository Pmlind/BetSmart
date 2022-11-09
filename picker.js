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

function pick(res,opp)
{
    var picks = [];
    reg = (res.scores/res.games) + res.spread - (opp.scores/opp.games);
    weight = (res.weightedscore/res.games) + res.spread - (opp.weightedscore/opp.games);
    ats = (res.ats/res.games) + res.games - (opp.ats/opp.games);
    console.log(res.spread);
    if(reg >= 10)
    {
        var pick = []
        pick.push(res.week);
        pick.push('Regular:');
        pick.push(res.team);
        pick.push(res.spread);
        pick.push(Math.abs(reg));
        pick.push(0);
        pick.push(null);
        picks.push(pick);
    }
    if(weight >= 10)
    {
        var pick = []
        pick.push(res.week);
        pick.push('Weighted:');
        pick.push(res.team);
        pick.push(res.spread);
        pick.push(Math.abs(weight));
        pick.push(0);
        pick.push(null);
        picks.push(pick);
    }
    if(ats >= 10)
    {
        var pick = []
        pick.push(res.week);
        pick.push('ATS:');
        pick.push(res.team);
        pick.push(res.spread);
        pick.push(Math.abs(ats));
        pick.push(0);
        pick.push(null);
        picks.push(pick);
    }
    return picks;
}

function run(week)
{
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        sql = `SELECT * FROM TEAMS, SPREAD WHERE SPREAD.week = ${week} AND SPREAD.bookmaker = 'caesars-sportsbook' AND TEAMS.names = SPREAD.team;`;
        con.query(sql, function (err, result) {
            if (err) throw err;
            for(const i of result)
            {
                sql = `SELECT * FROM TEAMS WHERE TEAMS.names = '${i.opponent}';`;
                con.query(sql, function (err, result2) {
                    if (err) throw err;
                    for(const x of pick(i, result2[0]))
                    {
                        var sql = "INSERT INTO PICKS (week,picktype,team,spread,spreadby,inj,hit) VALUES (?)";
                        con.query(sql, [x], function (err, result) {
                            if (err) throw err;
                            console.log("Number of records inserted: " + result.affectedRows);
                        });
                    }
                });
            }
        });
    });
    console.log("DONE");
}

run(9);
    