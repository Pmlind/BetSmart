const jsdom = require("jsdom");
const request = require('request');
var http = require('http');
var fs = require('fs');
const { runInContext } = require("vm");
const { resolve } = require("path");
var mysql = require('mysql');

var con = mysql.createConnection({
    host: 'betsmart.c4vgirc2flsl.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'Password1',
    database: 'BetSmart'
});

let months = [
    {
        "name": "january",
        "days": 31,
        "number": "01"
    },
    {
        "name": "february",
        "days": 28,
        "number": "02"
    },
    {
        "name": "march",
        "days": 31,
        "number": "03"
    },
    {
        "name": "april",
        "days": 30,
        "number": "04"
    },
    {
        "name": "october",
        "days": 31,
        "number": "10"
    },
    {
        "name": "november",
        "days": 30,
        "number": "11"
    },
    {
        "name": "december",
        "days": 31,
        "number": "12"
    }
]

var games = []

function findGames(date, team)
{
    const filteredGames = games.filter(item => item.date === date);
    for(const i of filteredGames)
    {
        if(i.awayTeam == team || i.homeTeam == team)
        {
            return i;
        }
    }
}

function findMonth(monthName)
{
    return months.find(obj => {
        return obj.name === monthName;
    })
}

function parse(month, day)
{
    var url = 'https://www.ncaa.com/scoreboard/basketball-men/d1/2023/'+month+'/'+day;
    return new Promise((resolve, reject) => {
        request(url, function (
            error,
            response,
            body
        ){
            const dom = new jsdom.JSDOM(body);
            var table = dom.window.document.getElementsByClassName('gamePod gamePod-type-game status-final');
            if(table[0] == undefined)
            {
                var table = dom.window.document.getElementsByClassName('gamePod gamePod-type-game status-finalhas-live-video');
            }
            console.log(month, day);
            var game;
            var away;
            var home;
            for(const i of table)
            {
                if(table.length < 1)
                {
                    break;
                }
                game = i.querySelector(".gamePod-game-teams").querySelectorAll("li");
                away = game[0];
                home = game[1];
                var obj = {
                    "date": "",
                    "awayTeam": "",
                    "awayScore": 0,
                    "homeTeam": "",
                    "homeScore": 0
                };
                if(month[0] == '0')
                {
                    month = month[1];
                }
                if(day[0] == '0')
                {
                    day = day[1];
                }
                obj.date = month+'/'+day+'/2023';
                obj.awayTeam = away.querySelector('.gamePod-game-team-name').textContent;
                obj.awayScore = parseInt(away.querySelector('.gamePod-game-team-score').textContent);
                obj.homeTeam = home.querySelector('.gamePod-game-team-name').textContent;
                obj.homeScore = parseInt(home.querySelector('.gamePod-game-team-score').textContent);
                games.push(obj);
            }
            resolve();
        });
    });
}

async function iterator(month)
{
    var monthObj = findMonth(month);
    var day = 0;
    for(var x = 1; x <= monthObj.days; x++)
    {
        if(x < 10)
        {
            day = '0'+x;
        }
        else 
        {
            day = x;
        }
        await parse(monthObj.number, day);
    }
}

async function run()
{
    var game;
    var diff;
    //await iterator("october")
    //await iterator("november")
    //await iterator("december")
    //await iterator("january")
	//await iterator("february")
    //await iterator("march")
    await iterator("april")
    //await iterator("may")
    //await iterator("june")
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        sql = `SELECT id, date, picktype, team, spread, spreadby FROM NCAABPICKSTEST WHERE hit IS NULL;`;
        con.query(sql, function (err, result) {
            if (err) throw err;
            for(const i of result)
            {

                game = findGames(i.date, i.team);
                if(game != undefined)
                {
                    if(i.team == game.awayTeam)
                    {
                        diff = (game.awayScore + i.spread - game.homeScore);
                    }
                    else if(i.team == game.homeTeam)
                    {
                        diff = (game.homeScore + i.spread - game.awayScore);
                    }
                    if(diff != 0)
                    {
                        sql = `UPDATE NCAABPICKSTEST SET hit = ${diff > 0} WHERE id = ${i.id};`;
                        con.query(sql, function (err, res) {
                            if (err) throw err;
                        });
                    }
                }
            }
        });
    });
}

run();