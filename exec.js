const jsdom = require("jsdom");
const request = require('request');
var http = require('http');
var fs = require('fs');
const { runInContext } = require("vm");
const { resolve } = require("path");

const PORT=8080; 

let teams = [
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Rams",
        "name": "Los Angeles Rams"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Seahawks",
        "name": "Seattle Seahawks"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "49ers",
        "name": "San Francisco 49ers"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Cardinals",
        "name": "Arizona Cardinals"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Chiefs",
        "name": "Kansas City Chiefs"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Raiders",
        "name": "Las Vegas Raiders"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Chargers",
        "name": "Los Angeles Chargers"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Broncos",
        "name": "Denver Broncos"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Buccaneers",
        "name": "Tampa Bay Buccaneers"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Saints",
        "name": "New Orleans Saints"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Falcons",
        "name": "Atlanta Falcons"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Panthers",
        "name": "Carolina Panthers"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Texans",
        "name": "Houston Texans"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Titans",
        "name": "Tennessee Titans"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Colts",
        "name": "Indianapolis Colts"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Jaguars",
        "name": "Jacksonville Jaguars"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Packers",
        "name": "Green Bay Packers"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Vikings",
        "name": "Minnesota Vikings"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Bears",
        "name": "Chicago Bears"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Lions",
        "name": "Detroit Lions"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Browns",
        "name": "Cleveland Browns"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Bengals",
        "name": "Cincinnati Bengals"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Steelers",
        "name": "Pittsburgh Steelers"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Ravens",
        "name": "Baltimore Ravens"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Cowboys",
        "name": "Dallas Cowboys"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Eagles",
        "name": "Philadelphia Eagles"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Giants",
        "name": "New York Giants"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Commanders",
        "name": "Washington Commanders"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Dolphins",
        "name": "Miami Dolphins"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Patriots",
        "name": "New England Patriots"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Bills",
        "name": "Buffalo Bills"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Jets",
        "name": "New York Jets"
    }
];
var today = 0;

function findTeam(team)
{
    return teams.find(obj => {
        return obj.name === team;
    })
}

function parse(week)
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
            gameSum = dom.window.document.querySelector('.game_summaries');
            games = gameSum.querySelectorAll(".teams");
            var diff;
            var winner;
            var loser;
            var temp;
            for (const game of games)
            {
                try
                {
                    winner = findTeam(game.querySelector(".winner").cells[0].textContent);
                    loser = findTeam(game.querySelector(".loser").cells[0].textContent);
                    diff = parseInt(game.querySelector(".winner").cells[1].textContent) - parseInt(game.querySelector(".loser").cells[1].textContent);

                    loser.games++;
                    winner.games++;

                    winner.score += diff;
                    loser.score -= diff;
                    temp = winner.weightedScore;
                    temp += diff + (loser.weightedScore/loser.games) - (winner.weightedScore/winner.games);
                    loser.weightedScore -= diff + (winner.weightedScore/loser.games) - (loser.weightedScore/winner.games);
                    winner.weightedScore = temp;

                    console.log(loser);
                    console.log(winner);
                }
                catch (error) 
                {
                    findTeam(game.querySelectorAll(".draw")[0].cells[0].textContent).games++;
                    findTeam(game.querySelectorAll(".draw")[1].cells[0].textContent).games++;

                    findTeam(game.querySelectorAll(".draw")[0].cells[0].textContent).weightedScore += ((findTeam(game.querySelectorAll(".draw")[1].cells[0].textContent).score - findTeam(game.querySelectorAll(".draw")[0].cells[0].textContent).score))/(findTeam(game.querySelectorAll(".draw")[0].cells[0].textContent).games + findTeam(game.querySelectorAll(".draw")[1].cells[0].textContent).games)/2;
                    findTeam(game.querySelectorAll(".draw")[1].cells[0].textContent).weightedScore += ((findTeam(game.querySelectorAll(".draw")[0].cells[0].textContent).score - findTeam(game.querySelectorAll(".draw")[1].cells[0].textContent).score))/(findTeam(game.querySelectorAll(".draw")[0].cells[0].textContent).games + findTeam(game.querySelectorAll(".draw")[1].cells[0].textContent).games)/2;

                    console.log(findTeam(game.querySelectorAll(".draw")[0].cells[0].textContent));
                    console.log(findTeam(game.querySelectorAll(".draw")[1].cells[0].textContent));
                }
            }
            resolve();
        });
    });
}

async function run() {
    await parse("1")
    await parse("2")

    var index = 0;
    var team1 = "";
    var spread = "";
    var team2 = "";
    var output = "";

    fs.readFile('./input.txt', 'utf8' , (err, data) => {
        if (err) 
        {
            console.error(err);
            return;
        }
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
                if((team1.score/team1.games + Number(spread) - team2.score/team2.games) >= 10)
                {
                    output += "Regular: "+team1.mascot+" "+spread+" by "+(team1.score/team1.games + Number(spread) - team2.score/team2.games)+"\n";
                }
                else if((team1.score/team1.games + Number(spread) - team2.score/team2.games) <= -10)
                {
                    output += "Regular: "+team2.mascot+" "+(Number(spread)-(Number(spread)*2))+" by "+(team1.score/team1.games + Number(spread) - team2.score/team2.games)+"\n";
                }
                if((team1.weightedScore/team1.games + team1.score/team1.games + Number(spread) - team2.weightedScore/team2.games - team2.score/team2.games) >= 10)
                {
                    output += "Weighted: "+team1.mascot+" "+spread+" by "+(team1.weightedScore/team1.games + team1.score/team1.games + Number(spread) - team2.weightedScore/team2.games - team2.score/team2.games)+"\n";
                }
                else if((team1.weightedScore/team1.games + team1.score/team1.games + Number(spread) - team2.weightedScore/team2.games - team2.score/team2.games) <= -10)
                {
                    output += "Weighted: "+team2.mascot+" "+(Number(spread)-(Number(spread)*2))+" by "+(team1.weightedScore/team1.games + team1.score/team1.games + Number(spread) - team2.weightedScore/team2.games - team2.score/team2.games)+"\n";
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
            /*else if(data[i] == "+")
            {
                
            }*/
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
    });
};

run();