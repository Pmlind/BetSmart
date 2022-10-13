const jsdom = require("jsdom");
const request = require('request');
//var http = require('http');
var fs = require('fs');
//const { runInContext } = require("vm");
//const { resolve } = require("path");
const reader = require('xlsx');
const teamsFile = reader.readFile('./Teams.xlsx');
const scoresFile = reader.readFile('./Scores.xlsx');
const spreadsFile = reader.readFile('./Spreads.xlsx');

//const PORT=8080; 

let teams = [];
let scores = [];
let spreads = [];

function read(week)
{
    const t = reader.utils.sheet_to_json(teamsFile.Sheets["Sheet1"]);
    t.forEach((res) => {
        teams.push(res);
    })
    const sc = reader.utils.sheet_to_json(scoresFile.Sheets["Sheet1"]);
    sc.forEach((res) => {
        scores.push(res);
    })
    const sp = reader.utils.sheet_to_json(spreadsFile.Sheets["Sheet1"]);
    sp.forEach((res) => {
        let aTemp = {
            Week: week,
            Team: res.AwayTeam,
            Spread: res.AwaySpread
        };
        let hTemp = {
            Week: week,
            Team: res.HomeTeam,
            Spread: res.HomeSpread
        };
        spreads.push(aTemp);
        spreads.push(hTemp);
    })
}

function findTeam(team)
{
    return teams.find(obj => {
        return obj.Name === team;
    })
}

function findSpread(team, week)
{
    return spreads.find(obj => {
        return (obj.Team === (team+" ") && obj.Week === week);
    })
}

function reset(week)
{
    read(week);
    for(const t of teams)
    {
        t.Games = 0;
        t.Score = 0;
        t.WeightedScore = 0;
        t.ATS = 0;
    }
}

function parse(week)
{
    read(week);
    var team1;
    var team2;
    var diff;
    for (const game of scores)
    {
        if(game.Week == week)
        {
            team1 = findTeam(game.Team1);
            team2 = findTeam(game.Team2);
            diff = (Number(game.Team1Score) - Number(game.Team2Score));
            if(team1.Games == 0 || team2.Games == 0)
            {
                team1.WeightedScore += diff;
                team2.WeightedScore -= diff;
            }
            else
            {
                team1.WeightedScore += diff + (team2.Score/team2.Games) - (team1.Score/team1.Games);
                team2.WeightedScore -= diff + (team2.Score/team2.Games) - (team1.Score/team1.Games);
            }
            team1.ATS += diff + Number(findSpread(team1.Name, week).Spread);
            team2.ATS -= diff - Number(findSpread(team2.Name, week).Spread);
            team1.Score += diff;
            team2.Score -= diff;
            team1.Games++;
            team2.Games++;
        }
    }
}

async function run() {
    //reset(1);
    parse(5);
    const ws = reader.utils.json_to_sheet(teams);
    const wb = reader.utils.book_new()
    reader.utils.book_append_sheet(wb,ws,"Sheet1");
    reader.writeFile(wb,'./Teams.xlsx');
};

run();