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

let teams = [
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Hawks",
        "name": "Atlanta Hawks",
        "abreviation": "ATL"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Celtics",
        "name": "Boston Celtics",
        "abreviation": "BOS"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Nets",
        "name": "Brooklyn Nets",
        "abreviation": "BKN"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Hornets",
        "name": "Charlotte Hornets",
        "abreviation": "CHA"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Bulls",
        "name": "Chicago Bulls",
        "abreviation": "CHI"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Cavs",
        "name": "Cleveland Cavaliers",
        "abreviation": "CLE"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Mavs",
        "name": "Dallas Mavericks",
        "abreviation": "DAL"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Nuggets",
        "name": "Denver Nuggets",
        "abreviation": "DEN"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Pistons",
        "name": "Detroit Pistons",
        "abreviation": "DET"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Warriors",
        "name": "Golden State Warriors",
        "abreviation": "GSW"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Rockets",
        "name": "Houston Rockets",
        "abreviation": "HOU"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Pacers",
        "name": "Indiana Pacers",
        "abreviation": "IND"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Clippers",
        "name": "Los Angeles Clippers",
        "abreviation": "LAC"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Lakers",
        "name": "Los Angeles Lakers",
        "abreviation": "LAL"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Grizzlies",
        "name": "Memphis Grizzlies",
        "abreviation": "MEM"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Heat",
        "name": "Miami Heat",
        "abreviation": "MIA"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Bucks",
        "name": "Milwaukee Bucks",
        "abreviation": "MIL"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Twolves",
        "name": "Minnesota Timberwolves",
        "abreviation": "MIN"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Pelicans",
        "name": "New Orleans Pelicans",
        "abreviation": "NOP"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Knicks",
        "name": "New York Knicks",
        "abreviation": "NYK"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "OKC",
        "name": "Oklahoma City Thunder",
        "abreviation": "OKC"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Magic",
        "name": "Orlando Magic",
        "abreviation": "ORL"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "6ers",
        "name": "Philadelphia 76ers",
        "abreviation": "PHI"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Suns",
        "name": "Phoenix Suns",
        "abreviation": "PHX"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Blazers",
        "name": "Portland Trail Blazers",
        "abreviation": "POR"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Kings",
        "name": "Sacramento Kings",
        "abreviation": "SAC"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Spurs",
        "name": "San Antonio Spurs",
        "abreviation": "SAS"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Raptors",
        "name": "Toronto Raptors",
        "abreviation": "TOR"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Jazz",
        "name": "Utah Jazz",
        "abreviation": "UTA"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Wizards",
        "name": "Washington Wizards",
        "abreviation": "WAS"
    }
];

var games = []

function getTeamName(abr)
{
    return teams.find(obj => {
        return obj.abreviation === abr;
    })
}

function findGames(date, abr)
{
    const filteredGames = games.filter(item => item.date === date);
    for(const i of filteredGames)
    {
        if(i.awayTeam == getTeamName(abr).name || i.homeTeam == getTeamName(abr).name)
        {
            return i;
        }
    }
}

function parse(month)
{
    var url = 'https://www.basketball-reference.com/leagues/NBA_2023_games-'+month+'.html';
    return new Promise((resolve, reject) => {
        request(url, function (
            error,
            response,
            body
        ){
            console.error('error:', error)
            const dom = new jsdom.JSDOM(body);
            for(var i=1; i<dom.window.document.querySelector('#schedule').rows.length; i++)
            {
                console.log(i);
                if(dom.window.document.querySelector('#schedule').rows[i].cells[3].textContent != "")
                {
                    var game = {
                        "date": "",
                        "awayTeam": "",
                        "awayScore": 0,
                        "homeTeam": "",
                        "homeScore": 0
                    };
                    game.date = dom.window.document.querySelector('#schedule').rows[i].cells[0].textContent;
                    game.awayTeam = dom.window.document.querySelector('#schedule').rows[i].cells[2].textContent;
                    game.awayScore = Number(dom.window.document.querySelector('#schedule').rows[i].cells[3].textContent);
                    game.homeTeam = dom.window.document.querySelector('#schedule').rows[i].cells[4].textContent;
                    game.homeScore = Number(dom.window.document.querySelector('#schedule').rows[i].cells[5].textContent);
                    games.push(game);
                }
            }
            resolve();
        });
    });
}

async function run()
{
    var game;
    var diff;
    //await parse("october")
    //await parse("november")
    //await parse("december")
    //await parse("january")
	//await parse("february")
    await parse("march")
    //await parse("april")
    //await parse("may")
    //await parse("june")
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        sql = `SELECT id, date, picktype, team, spread, spreadby FROM NBAPICKS WHERE hit IS NULL;`;
        con.query(sql, function (err, result) {
            if (err) throw err;
            for(const i of result)
            {
                game = findGames(i.date, i.team);
                if(game != undefined)
                {
                    if(getTeamName(i.team).name == game.awayTeam)
                    {
                        diff = (game.awayScore + i.spread - game.homeScore);
                    }
                    else if(getTeamName(i.team).name == game.homeTeam)
                    {
                        diff = (game.homeScore + i.spread - game.awayScore);
                    }
                    if(diff != 0)
                    {
                        sql = `UPDATE NBAPICKS SET hit = ${diff > 0} WHERE id = ${i.id};`;
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