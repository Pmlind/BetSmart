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

var scores = [];
var teams = [];

function scoreScraper(week)
{
    var url = `https://www.pro-football-reference.com/years/2022/week_${week}.htm`;
    return new Promise((resolve, reject) => {
        request(url, function (
            error,
            response,
            body
        ){
            console.error('error:', error)
            const dom = new jsdom.JSDOM(body);
            gameSum = dom.window.document.querySelector(".game_summaries");
            games = gameSum.querySelectorAll(".teams");
            for (const game of games)
            {
                let line = []
                line.push(week)
                try
                {
                    line.push(game.querySelector(".winner").cells[0].textContent);
                    line.push(Number(game.querySelector(".winner").cells[1].textContent));
                    line.push(game.querySelector(".loser").cells[0].textContent);
                    line.push(Number(game.querySelector(".loser").cells[1].textContent));
                }
                catch (error) 
                {
                    line.push(game.querySelectorAll(".draw")[0].cells[0].textContent);
                    line.push(Number(game.querySelectorAll(".draw")[0].cells[1].textContent));
                    line.push(game.querySelectorAll(".draw")[1].cells[0].textContent);
                    line.push(Number(game.querySelectorAll(".draw")[0].cells[1].textContent));
                }
                scores.push(line)
            }
            resolve();
        });
    });
}

function check(picks)
{
    hits = [];
    for(const pick of picks)
    {
        if(pick.team == pick.team1)
        {
            if((Number(pick.team1scores) - Number(pick.team2scores)) + Number(pick.spread) > 0)
            {
                hits.push(1);
            }
            else if((Number(pick.team1scores) - Number(pick.team2scores)) + Number(pick.spread) < 0)
            {
                hits.push(0);
            }
            else if((Number(pick.team1scores) - Number(pick.team2scores)) + Number(pick.spread) == 0)
            {
                hits.push(null);
            }
        }
        else if(pick.team == pick.team2)
        {
            if((Number(pick.team2scores) - Number(pick.team1scores)) + Number(pick.spread) > 0)
            {
                hits.push(1);
            }
            else if((Number(pick.team2scores) - Number(pick.team1scores)) + Number(pick.spread) < 0)
            {
                hits.push(0);
            }
            else if((Number(pick.team2scores) - Number(pick.team1scores)) + Number(pick.spread) == 0)
            {
                hits.push(null);
            }
        }
    }
    return hits;
}

function update(pick, type)
{
    sql = `UPDATE STATS SET `
    if(type == "Regular:")
    {
        sql += `RegTotal = RegTotal + 1 `;
        if(pick.hit == 1)
        {
            sql += `, RegHits = RegHits + 1 `;
        }
        if(pick.spreadby >= 20)
        {
            sql += `WHERE spreadby = '20+'`;
        }
        else
        {
            sql += `WHERE spreadby = '10+'`;
        }
    }
    else if(type == "Weighted:")
    {
        sql += `WTotal = WTotal + 1 `;
        if(pick.hit == 1)
        {
            sql += `, WHits = WHits + 1 `;
        }
        if(pick.spreadby >= 20)
        {
            sql += `WHERE spreadby = '20+'`;
        }
        else
        {
            sql += `WHERE spreadby = '10+'`;
        }
    }
    else if(type == "ATS:")
    {
        sql += `ATSTotal = ATSTotal + 1 `;
        if(pick.hit == 1)
        {
            sql += `, ATSHits = ATSHits + 1 `;
        }
        if(pick.spreadby >= 20)
        {
            sql += `WHERE spreadby = '20+'`;
        }
        else
        {
            sql += `WHERE spreadby = '10+'`;
        }
    }
    else if(type == "RW1")
    {
        sql += `RWTotal = RWTotal + 1 `;
        if(pick.hit == 1)
        {
            sql += `, RWHits = RWHits + 1 `;
        }
        sql += `WHERE spreadby = '10+'`;
    }
    else if(type == "RW2")
    {
        sql += `RWTotal = RWTotal + 1 `;
        if(pick.hit == 1)
        {
            sql += `, RWHits = RWHits + 1 `;
        }
        sql += `WHERE spreadby = '20+'`;
    }
    else if(type == "RA1")
    {
        sql += `RATotal = RATotal + 1 `;
        if(pick.hit == 1)
        {
            sql += `, RAHits = RAHits + 1 `;
        }
        sql += `WHERE spreadby = '10+'`;
    }
    else if(type == "RA2")
    {
        sql += `RATotal = RATotal + 1 `;
        if(pick.hit == 1)
        {
            sql += `, RAHits = RAHits + 1 `;
        }
        sql += `WHERE spreadby = '20+'`;
    }
    else if(type == "WA1")
    {
        sql += `WATotal = WATotal + 1 `;
        if(pick.hit == 1)
        {
            sql += `, WAHits = WAHits + 1 `;
        }
        sql += `WHERE spreadby = '10+'`;
    }
    else if(type == "WA2")
    {
        sql += `WATotal = WATotal + 1 `;
        if(pick.hit == 1)
        {
            sql += `, WAHits = WAHits + 1 `;
        }
        sql += `WHERE spreadby = '20+'`;
    }
    else if(type == "RWA1")
    {
        sql += `RWATotal = RWATotal + 1 `;
        if(pick.hit == 1)
        {
            sql += `, RWAHits = RWAHits + 1 `;
        }
        sql += `WHERE spreadby = '10+'`;
    }
    else if(type == "RWA2")
    {
        sql += `RWATotal = RWATotal + 1 `;
        if(pick.hit == 1)
        {
            sql += `, RWAHits = RWAHits + 1 `;
        }
        sql += `WHERE spreadby = '20+'`;
    }
    sql += "; ";
    return sql;
}

function updateTeams(team, game, opponent)
{
    var sql = `UPDATE TEAMS SET `;
    var diff;
    var weight;
    var ats;
    if(team.names == game.team1)
    {
        diff = game.team1scores - game.team2scores;
    }
    else if(team.names == game.team2)
    {
        diff = game.team2scores - game.team1scores;
    }
    sql += `scores = scores + ${diff} `;
    if(team.games == 0)
    {
        weight = diff;
    }
    else
    {
        weight = diff + (opponent.scores/opponent.games) - (team.scores/team.games);
    }
    sql += `, weightedscore = weightedscore + ${weight} `;
    ats = diff + team.spread;
    sql += `, ATS = ATS + ${ats}, games = games +1 WHERE TEAMS.names = '${team.team}';`
    return sql;
}

async function run(week)
{
    //read();
    await scoreScraper(week);
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "INSERT INTO SCORES (week,team1,team1scores,team2,team2scores) VALUES ?";
        con.query(sql, [scores], function (err, result) {
            if (err) throw err;
            console.log("Number of records inserted: " + result.affectedRows);
        });
        sql = `SELECT * FROM PICKS, SCORES WHERE (PICKS.week = ${week} AND SCORES.week = ${week}) AND (PICKS.team = SCORES.team1 OR PICKS.team = SCORES.team2);`;
        con.query(sql, function (err, result) {
            if (err) throw err;
            var hits = check(result);
            for(const i in hits)
            {
                sql = `UPDATE PICKS SET hit = ${hits[i]} WHERE (week = ${week} AND picktype = '${result[i].picktype}') AND team = '${result[i].team}';`
                con.query(sql, function (err, result) {
                    if (err) throw err;
                    console.log("Number of records inserted: " + result.affectedRows);
                });
                if(!teams.includes(result[i].team))
                {
                    teams.push(result[i].team);
                }
            }
            for(const i of teams)
            {
                sql = `SELECT * FROM PICKS WHERE PICKS.week = ${week} AND PICKS.team = '${i}';`;
                con.query(sql, function (err, result) {
                    if (err) throw err;
                    if(result.length == 1)
                    {
                        sql = update(result[0], result[0].picktype);
                        con.query(sql, function (err, result) {
                            if (err) throw err;
                            console.log("Number of records inserted: " + result.affectedRows);
                        });
                    }
                    else if(result.length == 2)
                    {
                        for(const x of result)
                        {
                            sql = update(x, x.picktype);
                            con.query(sql, function (err, result) {
                                if (err) throw err;
                                console.log("Number of records inserted: " + result.affectedRows);
                            });
                            console.log(sql);
                        }
                        if(result[0].picktype == 'Regular:' && result[1].picktype == 'Weighted:')
                        {
                            if(result[0].spreadby >= 20 && result[1].spreadby >= 20)
                            {
                                sql = update(result[0], 'RW2');
                            }
                            else
                            {
                                sql = update(result[0], 'RW1');
                            }
                        }
                        else if(result[0].picktype == 'Regular:' && result[1].picktype == 'ATS:')
                        {
                            if(result[0].spreadby >= 20 && result[1].spreadby >= 20)
                            {
                                sql = update(result[0], 'RA2');
                            }
                            else
                            {
                                sql = update(result[0], 'RA1');
                            }
                        }
                        else if(result[0].picktype == 'Weighted:' && result[1].picktype == 'ATS:')
                        {
                            if(result[0].spreadby >= 20 && result[1].spreadby >= 20)
                            {
                                sql = update(result[0], 'WA2');
                            }
                            else
                            {
                                sql = update(result[0], 'WA1');
                            }
                        }
                        con.query(sql, function (err, result) {
                            if (err) throw err;
                            console.log("Number of records inserted: " + result.affectedRows);
                        });
                    }
                    else if(result.length == 3)
                    {
                        for(const x of result)
                        {
                            sql = update(x, x.picktype);
                            con.query(sql, function (err, result) {
                                if (err) throw err;
                                console.log("Number of records inserted: " + result.affectedRows);
                            });
                            console.log(sql)
                        }
                        if(result[0].spreadby >= 20 && result[1].spreadby >= 20 && result[2].spreadby >= 20)
                        {
                            sql = update(result[0], 'RWA2');
                        }
                        else
                        {
                            sql = update(result[0], 'RWA1');
                        }
                        con.query(sql, function (err, result) {
                            if (err) throw err;
                            console.log("Number of records inserted: " + result.affectedRows);
                        });
                    }
                    console.log(sql);
                });
            }
        });
        /*sql = `UPDATE TEAMS SET games = 0,  scores = 0, weightedscore = 0, ats = 0;`;
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Number of records inserted: " + result.affectedRows);
        });*/
        sql = `SELECT * FROM TEAMS,SPREAD WHERE SPREAD.week = ${week} AND SPREAD.bookmaker = 'caesars-sportsbook' AND SPREAD.team = TEAMS.names;`;
        con.query(sql, function (err, result) {
            if (err) throw err;
            for(const x of result)
            {
                sql = `SELECT * FROM SCORES WHERE SCORES.week = ${x.week} AND (SCORES.team1 = '${x.names}' OR SCORES.team2 = '${x.names}');`;
                con.query(sql, function (err, result2) {
                    if (err) throw err;
                    sql = `SELECT * FROM TEAMS WHERE TEAMS.names = '${x.opponent}';`;
                    con.query(sql, function (err, result3) {
                        if (err) throw err;
                        if(result2.length > 0)
                        {
                            sql = updateTeams(x,result2[0],result3[0]);
                            console.log(sql);
                            con.query(sql, function (err, result3) {
                                if (err) throw err;
                                //console.log(sql);
                            });
                        }
                    });
                });
            }
        });
    });
    //con.end();
}

run(8);