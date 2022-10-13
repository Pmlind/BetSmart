const jsdom = require("jsdom");
const request = require('request');
var fs = require('fs');
const reader = require('xlsx');
const teamsFile = reader.readFile('./Teams.xlsx');
const spreadsFile = reader.readFile('./Spreads.xlsx');
const picksFile = reader.readFile('./Picks.xlsx');

let teams = [];
let spreads = [];
let picks = [];

function read()
{
    const t = reader.utils.sheet_to_json(teamsFile.Sheets["Sheet1"]);
    t.forEach((res) => {
        teams.push(res);
    })
    const sp = reader.utils.sheet_to_json(spreadsFile.Sheets["Sheet1"]);
    sp.forEach((res) => {
        spreads.push(res);
    })
    const p = reader.utils.sheet_to_json(picksFile.Sheets["Sheet1"]);
    p.forEach((res) => {
        picks.push(res);
    })
}

function findTeam(team)
{
    return teams.find(obj => {
        return (obj.Name + " ") === team;
    })
}

function pick(week)
{
    for(const game of spreads)
    {
        var reg;
        var weight;
        var ats;
        let line = {
            Week: 0,
            Type: "",
            Team: "",
            Spread: 0,
            By: 0,
            Inj: "",
            Hit: ""
        };
        if(game.Week == week)
        {
            reg = (findTeam(game.AwayTeam).Score/findTeam(game.AwayTeam).Games) + Number(game.AwaySpread) - (findTeam(game.HomeTeam).Score/findTeam(game.HomeTeam).Games);
            weight = (findTeam(game.AwayTeam).WeightedScore/findTeam(game.AwayTeam).Games) + Number(game.AwaySpread) - (findTeam(game.HomeTeam).WeightedScore/findTeam(game.HomeTeam).Games);
            ats = (findTeam(game.AwayTeam).ATS/findTeam(game.AwayTeam).Games) + Number(game.AwaySpread) - (findTeam(game.HomeTeam).ATS/findTeam(game.HomeTeam).Games);
            if(reg >= 10)
            {
                line.Week = week;
                line.Type = "Regular:";
                line.Team = findTeam(game.AwayTeam).Name;
                line.Spread = Number(game.AwaySpread);
                line.By = reg;
                picks.push(line);
            }
            else if(reg <= -10)
            {
                line.Week = week;
                line.Type = "Regular:";
                line.Team = findTeam(game.HomeTeam).Name;
                line.Spread = Number(game.HomeSpread);
                line.By = (reg * -1);
                picks.push(line);
            }
            line = {
                Week: 0,
                Type: "",
                Team: "",
                Spread: 0,
                By: 0,
                Inj: "",
                Hit: ""
            };
            if(weight >= 10)
            {
                line.Week = week;
                line.Type = "Weighted:";
                line.Team = findTeam(game.AwayTeam).Name;
                line.Spread = Number(game.AwaySpread);
                line.By = weight;
                picks.push(line);
            }
            else if(weight <= -10)
            {
                line.Week = week;
                line.Type = "Weighted:";
                line.Team = findTeam(game.HomeTeam).Name;
                line.Spread = Number(game.HomeSpread);
                line.By = (weight * -1);
                picks.push(line);
            }
            line = {
                Week: 0,
                Type: "",
                Team: "",
                Spread: 0,
                By: 0,
                Inj: "",
                Hit: ""
            };
            if(ats >= 10)
            {
                line.Week = week;
                line.Type = "ATS:";
                line.Team = findTeam(game.AwayTeam).Name;
                line.Spread = Number(game.AwaySpread);
                line.By = ats;
                picks.push(line);
            }
            else if(ats <= -10)
            {
                line.Week = week;
                line.Type = "ATS:";
                line.Team = findTeam(game.HomeTeam).Name;
                line.Spread = Number(game.HomeSpread);
                line.By = (ats * -1);
                picks.push(line);
            }
        }
    }
    const ws = reader.utils.json_to_sheet(picks);
    const wb = reader.utils.book_new()
    reader.utils.book_append_sheet(wb,ws,"Sheet1");
    reader.writeFile(wb,'./Picks.xlsx');
}

function run(week)
{
    read();
    pick(week);
}

run(5);
    