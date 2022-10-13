const jsdom = require("jsdom");
const request = require('request');
var fs = require('fs');
const reader = require('xlsx');
const spreadsFile = reader.readFile('./Spreads.xlsx');
const picksFile = reader.readFile('./Picks.xlsx');
const scoresFile = reader.readFile('./Scores.xlsx');
const statsFile = reader.readFile('./Stats.xlsx');

let picks = [];
let teams = [];
let stats = [];

function findTeam(team)
{
    return teams.find(obj => {
        return obj.Team === (team+" ");
    })
}

function findStatLine(by)
{
    return stats.find(obj => {
        return obj.By === by;
    })
}

function read(week)
{
    const p = reader.utils.sheet_to_json(picksFile.Sheets["Sheet1"]);
    p.forEach((res) => {
        picks.push(res);
    })
    const st = reader.utils.sheet_to_json(statsFile.Sheets["Sheet1"]);
    st.forEach((res) => {
        stats.push(res);
    })
    const sp = reader.utils.sheet_to_json(spreadsFile.Sheets["Sheet1"]);
    sp.forEach((res) => {
        if(res.Week == week)
        {
            let aTemp = {
                Team: res.AwayTeam,
                Spread: res.AwaySpread,
                Diff: 0,
                Reg: 0,
                W: 0,
                ATS: 0,
                Hit: 0
            };
            let hTemp = {
                Team: res.HomeTeam,
                Spread: res.HomeSpread,
                Diff: 0,
                Reg: 0,
                W: 0,
                ATS: 0,
                Hit: 0
            };
            teams.push(aTemp);
            teams.push(hTemp);
        }
    })
    const sc = reader.utils.sheet_to_json(scoresFile.Sheets["Sheet1"]);
    sc.forEach((res) => {
        if(res.Week == week)
        {
            findTeam(res.Team1).Diff = (Number(res.Team1Score) - Number(res.Team2Score));
            findTeam(res.Team2).Diff = (Number(res.Team2Score) - Number(res.Team1Score));
        }
    })
}

function check(week)
{
    for(const pick of picks)
    {
        if(pick.Week == week)
        {
            if(findTeam(pick.Team).Diff + Number(findTeam(pick.Team).Spread) > 0)
            {
                pick.Hit = '+';
            }
            else if(findTeam(pick.Team).Diff + Number(findTeam(pick.Team).Spread) < 0)
            {
                pick.Hit = 'x';
            }
            else if(findTeam(pick.Team).Diff + Number(findTeam(pick.Team).Spread) == 0)
            {
                pick.Hit = '=';
            }
        }
    }
    const ws = reader.utils.json_to_sheet(picks);
    const wb = reader.utils.book_new()
    reader.utils.book_append_sheet(wb,ws,"Sheet1");
    reader.writeFile(wb,'./Picks.xlsx');
}

function update(week)
{
    //Reg10	W10	ATS10	RW10	RA10	WA10	RWA10	Reg20	W20	ATS20	RW20	RA20	WA20	RWA20

    for(const pick of picks)
    {
        if(pick.Hit == "+")
        {
            findTeam(pick.Team).Hit = 1;
        }
        else if(pick.Hit == "x")
        {
            findTeam(pick.Team).Hit = -1;
        }
        else if(pick.Hit == "=")
        {
            findTeam(pick.Team).Hit = 0;
        }
        if(pick.Week == week)
        {
            if(pick.Type == "Regular:")
            {
                if(Number(pick.By) < 20)
                {
                    findTeam(pick.Team).Reg = 1;
                }
                else
                {
                    findTeam(pick.Team).Reg = 2;
                }
            }
            if(pick.Type == "Weighted:")
            {
                if(Number(pick.By) < 20)
                {
                    findTeam(pick.Team).W = 1;
                }
                else
                {
                    findTeam(pick.Team).W = 2;
                }
            }
            if(pick.Type == "ATS:")
            {
                if(Number(pick.By) < 20)
                {
                    findTeam(pick.Team).ATS = 1;
                }
                else
                {
                    findTeam(pick.Team).ATS = 2;
                }
            }
        }
    }
    console.log(teams);
    for(const team of teams)
    {
        if(team.Reg == 1)
        {
            findStatLine("10+").RegTotal++;
            if(team.Hit == 1)
            {
                findStatLine("10+").RegHits++;
                findStatLine("$").RegHits += 10;
            }
            else if(team.Hit == -1)
            {
                findStatLine("$").RegHits -= 11;
            }
        }
        else if(team.Reg == 2)
        {
            findStatLine("20+").RegTotal++;
            if(team.Hit == 1)
            {
                findStatLine("20+").RegHits++;
                findStatLine("$").RegHits += 20;
            }
            else if(team.Hit == -1)
            {
                findStatLine("$").RegHits -= 22;
            }
        }
        if(team.W == 1)
        {
            findStatLine("10+").WTotal++;
            if(team.Hit == 1)
            {
                findStatLine("10+").WHits++;
                findStatLine("$").WHits += 10;
            }
            else if(team.Hit == -1)
            {
                findStatLine("$").WHits -= 11;
            }
        }
        else if(team.W == 2)
        {
            findStatLine("20+").WTotal++;
            if(team.Hit == 1)
            {
                findStatLine("20+").WHits++;
                findStatLine("$").WHits += 20;
            }
            else if(team.Hit == -1)
            {
                findStatLine("$").WHits -= 22;
            }
        }
        if(team.ATS == 1)
        {
            findStatLine("10+").ATSTotal++;
            if(team.Hit == 1)
            {
                findStatLine("10+").ATSHits++;
                findStatLine("$").ATSHits += 10;
            }
            else if(team.Hit == -1)
            {
                findStatLine("$").ATSHits -= 11;
            }
        }
        else if(team.ATS == 2)
        {
            findStatLine("20+").ATSTotal++;
            if(team.Hit == 1)
            {
                findStatLine("20+").ATSHits++;
                findStatLine("$").ATSHits += 20;
            }
            else if(team.Hit == -1)
            {
                findStatLine("$").ATSHits -= 22;
            }
        }
        if(team.Reg == 2 && team.W == 2)
        {
            findStatLine("20+").RWTotal++;
            if(team.Hit == 1)
            {
                findStatLine("20+").RWHits++;
                findStatLine("$").RWHits += 20;
            }
            else if(team.Hit == -1)
            {
                findStatLine("$").RWHits -= 22;
            }
        }
        else if(team.Reg > 0 && team.W > 0)
        {
            findStatLine("10+").RWTotal++;
            if(team.Hit == 1)
            {
                findStatLine("10+").RWHits++;
                findStatLine("$").RWHits += 10;
            }
            else if(team.Hit == -1)
            {
                findStatLine("$").RWHits -= 11;
            }
        }
        if(team.Reg == 2 && team.ATS == 2)
        {
            findStatLine("20+").RATotal++;
            if(team.Hit == 1)
            {
                findStatLine("20+").RAHits++;
                findStatLine("$").RAHits += 20;
            }
            else if(team.Hit == -1)
            {
                findStatLine("$").RAHits -= 22;
            }
        }
        else if(team.Reg > 0 && team.ATS > 0)
        {
            findStatLine("10+").RATotal++;
            if(team.Hit == 1)
            {
                findStatLine("10+").RAHits++;
                findStatLine("$").RAHits += 10;
            }
            else if(team.Hit == -1)
            {
                findStatLine("$").RAHits -= 11;
            }
        }
        if(team.W == 2 && team.ATS == 2)
        {
            findStatLine("20+").WATotal++;
            if(team.Hit == 1)
            {
                findStatLine("20+").WAHits++;
                findStatLine("$").WAHits += 20;
            }
            else if(team.Hit == -1)
            {
                findStatLine("$").WAHits -= 22;
            }
        }
        else if(team.W > 0 && team.ATS > 0)
        {
            findStatLine("10+").WATotal++;
            if(team.Hit == 1)
            {
                findStatLine("10+").WAHits++;
                findStatLine("$").WAHits += 10;
            }
            else if(team.Hit == -1)
            {
                findStatLine("$").WAHits -= 11;
            }
        }
        if(team.Reg == 2 && team.W == 2 && team.ATS == 2)
        {
            findStatLine("20+").RWATotal++;
            if(team.Hit == 1)
            {
                findStatLine("20+").RWAHits++;
                findStatLine("$").RWAHits += 20;
            }
            else if(team.Hit == -1)
            {
                findStatLine("$").RWAHits -= 22;
            }
        }
        else if(team.Reg > 0 && team.W > 0 && team.ATS > 0)
        {
            findStatLine("10+").RWATotal++;
            if(team.Hit == 1)
            {
                findStatLine("10+").RWAHits++;
                findStatLine("$").RWAHits += 10;
            }
            else if(team.Hit == -1)
            {
                findStatLine("$").RWAHits -= 11;
            }
        }
    }
    const ws = reader.utils.json_to_sheet(stats);
    const wb = reader.utils.book_new()
    reader.utils.book_append_sheet(wb,ws,"Sheet1");
    reader.writeFile(wb,'./Stats.xlsx');
}

function run(week)
{
    read(week);
    check(week);
    update(week);
}

run(5);