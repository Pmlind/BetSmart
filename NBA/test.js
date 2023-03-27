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

const PORT=8080; 

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
var today;

function findAwayTeam(dom, i)
{
    return teams.find(obj => {
        return obj.name === dom.window.document.querySelector('#schedule').rows[i].cells[2].textContent;
    })
}
function findHomeTeam(dom, i)
{
    return teams.find(obj => {
        return obj.name === dom.window.document.querySelector('#schedule').rows[i].cells[4].textContent;
    })
}

function getInjuryReport()
{
    report = "";
    var today = new Date();
    var day = today.toLocaleDateString();
    let hours = today.getHours();
    let minutes = today.getMinutes();
    var time = hours + ":" + minutes;
    return new Promise((resolve, reject) => {
        request('https://www.espn.com/nba/injuries', function (
            error,
            response,
            body
        ){
            const dom = new jsdom.JSDOM(body);
            let table = dom.window.document.getElementsByClassName('ResponsiveTable Table__league-injuries');
            for(const i of table)
            {
                report += i.querySelector('.Table__Title').textContent+"\n";
                players = i.querySelector('.Table__TBODY').querySelectorAll('.Table__TR');
                for(const x of players)
                {
                    report += "\t"+x.querySelector('.col-name').textContent + "\n";
                    report += "\t\t"+x.querySelector('.col-stat').textContent + "\n";
                    /*sql = `INSERT INTO NBAINJURIES(date, time, team, player, status) VALUES("${today}", "${time}", "${i.querySelector('.Table__Title').textContent}", "${x.querySelector('.col-name').textContent}", "${x.querySelector('.col-stat').textContent}");`;
                    con.query(sql, function (err, result) {
                        if (err) throw err;
                        console.log("Number of records inserted: " + result.affectedRows);
                    });*/
                }
            }
            fs.writeFile('./injuryReport.txt', report, err => {
                if (err) {
                    console.error(err);
                    return;
                }
            });
        })
    })
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
            console.log(month, dom.window.document.querySelector('#schedule').rows.length);
            for(var i=1; i<dom.window.document.querySelector('#schedule').rows.length; i++)
            {
                console.log(i);
                if(dom.window.document.querySelector('#schedule').rows[i].cells[3].textContent != "")
                {
                    findAwayTeam(dom, i).games += 1;
                    findHomeTeam(dom, i).games += 1;
                    findAwayTeam(dom, i).score += (parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[3].textContent) - parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[5].textContent));
                    findHomeTeam(dom, i).score += (parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[5].textContent) - parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[3].textContent));
                    findAwayTeam(dom, i).weightedScore += ((parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[3].textContent) - parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[5].textContent) + (findHomeTeam(dom, i).score - findAwayTeam(dom, i).score))/(findHomeTeam(dom, i).games + findAwayTeam(dom, i).games)/2);
                    findHomeTeam(dom, i).weightedScore += ((parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[5].textContent) - parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[3].textContent) + (findAwayTeam(dom, i).score - findHomeTeam(dom, i).score))/(findAwayTeam(dom, i).games + findHomeTeam(dom, i).games)/2);
                    if(i != dom.window.document.querySelector('#schedule').rows.length - 1)
                    {
                        today = dom.window.document.querySelector('#schedule').rows[i+1].cells[0].textContent;
                    }
                }
                if(i == dom.window.document.querySelector('#schedule').rows.length - 1)
                {
                    for(var x=0; x<30; x++)
                    {
                        console.log(teams[x].name, "score: ", (teams[x].score/teams[x].games), month, "Weighted Score:", (teams[x].weightedScore/teams[x].games) + (teams[x].score/teams[x].games));
                    }
                    console.log(dom.window.document.querySelector('#schedule').rows[i].cells[0].textContent);
                }
            }
            //today = 0;
            resolve();
        });
    });
}

async function run() {
    //await parse("october")
    //await parse("november")
    //await parse("december")
    //await parse("january")
	//await parse("february")
    await parse("march")
    //await parse("april")
    //await parse("may")
    //await parse("june")

    var index = 0;
    var team1 = "";
    var spread = "";
    var team2 = "";
    var output = "";
    var rn = new Date();
    var day = rn.toLocaleDateString();
    console.log(day);

    fs.readFile('./input.txt', 'utf8' , (err, data) => {
        if (err) 
        {
            console.error(err);
            return;
        }
        con.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
            for(var i = 0; i < data.length; i++)
            {
                if(data[i] == "\n")
                {
                    team1 = teams.find(obj => {
                        return obj.mascot === team1;
                    });
                    team2 = teams.find(obj => {
                        return obj.mascot === team2;
                    });
                    if((team1.score/team1.games + Number(spread) - team2.score/team2.games) >= 5)
                    {
                        output += "Regular: "+team1.mascot+" "+spread+" by "+(team1.score/team1.games + Number(spread) - team2.score/team2.games)+"\n";
                        sql = `INSERT INTO NBAPICKSTEST(date, picktype, team, spread, spreadby, inj5) VALUES('${today}', 'Regular', '${team1.abreviation}', ${Number(spread)}, ${Math.abs(team1.score/team1.games + Number(spread) - team2.score/team2.games)}, 0);`;
                        con.query(sql, function (err, result) {
                            if (err) throw err;
                            console.log("Number of records inserted: " + result.affectedRows);
                        });
                    }
                    else if((team1.score/team1.games + Number(spread) - team2.score/team2.games) <= -5)
                    {
                        output += "Regular: "+team2.mascot+" "+(Number(spread)-(Number(spread)*2))+" by "+(team1.score/team1.games + Number(spread) - team2.score/team2.games)+"\n";
                        sql = `INSERT INTO NBAPICKSTEST(date, picktype, team, spread, spreadby, inj5) VALUES('${today}', 'Regular', '${team2.abreviation}', ${Number(spread)-(Number(spread)*2)}, ${Math.abs(team1.score/team1.games + Number(spread) - team2.score/team2.games)}, 0);`;
                        con.query(sql, function (err, result) {
                            if (err) throw err;
                            console.log("Number of records inserted: " + result.affectedRows);
                        });
                    }
                    if((team1.weightedScore/team1.games + team1.score/team1.games + Number(spread) - team2.weightedScore/team2.games - team2.score/team2.games) >= 5)
                    {
                        output += "Weighted: "+team1.mascot+" "+spread+" by "+(team1.weightedScore/team1.games + team1.score/team1.games + Number(spread) - team2.weightedScore/team2.games - team2.score/team2.games)+"\n";
                        sql = `INSERT INTO NBAPICKSTEST(date, picktype, team, spread, spreadby, inj5) VALUES('${today}', 'Weighted', '${team1.abreviation}', ${Number(spread)}, ${Math.abs(team1.weightedScore/team1.games + team1.score/team1.games + Number(spread) - team2.weightedScore/team2.games - team2.score/team2.games)}, 0);`;
                        con.query(sql, function (err, result) {
                            if (err) throw err;
                            console.log("Number of records inserted: " + result.affectedRows);
                        });
                    }
                    else if((team1.weightedScore/team1.games + team1.score/team1.games + Number(spread) - team2.weightedScore/team2.games - team2.score/team2.games) <= -5)
                    {
                        output += "Weighted: "+team2.mascot+" "+(Number(spread)-(Number(spread)*2))+" by "+(team1.weightedScore/team1.games + team1.score/team1.games + Number(spread) - team2.weightedScore/team2.games - team2.score/team2.games)+"\n";
                        sql = `INSERT INTO NBAPICKSTEST(date, picktype, team, spread, spreadby, inj5) VALUES('${today}', 'Weighted', '${team2.abreviation}', ${Number(spread)-(Number(spread)*2)}, ${Math.abs(team1.weightedScore/team1.games + team1.score/team1.games + Number(spread) - team2.weightedScore/team2.games - team2.score/team2.games)}, 0);`;
                        con.query(sql, function (err, result) {
                            if (err) throw err;
                            console.log("Number of records inserted: " + result.affectedRows);
                        });
                    }
                    index = 0;
                    team1 = "";
                    spread = "";
                    team2 = "";
                }
                else if(data[i] == " ")
                {
                    index++;
                }
                else if(index == 0)
                {
                    team1 += data[i];
                }
                else if(index == 1)
                {
                    spread += data[i];
                }
                else if(index == 2)
                {
                    team2 += data[i];
                }
            }
            if(output == "")
            {
                output = "No picks :(\n";
            }
            fs.writeFile('./output.txt', output, err => {
                if (err) {
                    console.error(err);
                    return;
                }
            });
            console.log(today);
            getInjuryReport();
        });
    });
};

run();