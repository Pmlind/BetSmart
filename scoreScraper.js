const jsdom = require("jsdom");
const request = require('request');
const reader = require('xlsx');

const file = reader.readFile('./Scores.xlsx');
let data = [];
function read()
{
    const temp = reader.utils.sheet_to_json(file.Sheets["Sheet1"]);
    temp.forEach((res) => {
        data.push(res)
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
            gameSum = dom.window.document.querySelector(".game_summaries");
            games = gameSum.querySelectorAll(".teams");
            for (const game of games)
            {
                let line = {
                    Week: week,
                    Team1: "",
                    Team1Score: "",
                    Team2: "",
                    Team2Score: ""
                };
                try
                {
                    line.Team1 = game.querySelector(".winner").cells[0].textContent;
                    line.Team2 = game.querySelector(".loser").cells[0].textContent;
                    line.Team1Score = game.querySelector(".winner").cells[1].textContent;
                    line.Team2Score = game.querySelector(".loser").cells[1].textContent;
                }
                catch (error) 
                {
                    line.Team1 = game.querySelectorAll(".draw")[0].cells[0].textContent;
                    line.Team2 = game.querySelectorAll(".draw")[1].cells[0].textContent;
                    line.Team1Score = game.querySelectorAll(".draw")[0].cells[1].textContent;
                    line.Team2Score = game.querySelectorAll(".draw")[0].cells[1].textContent;
                }
                data.push(line);
            }
            resolve();
        });
    });
}

async function run() {
    read();
    await parse(1);
    await parse(2);
    await parse(3);
    await parse(4);
    await parse(5);
    console.log(data);
    const ws = reader.utils.json_to_sheet(data);
    const wb = reader.utils.book_new()
    reader.utils.book_append_sheet(wb,ws,"Sheet1");
    reader.writeFile(wb,'./Scores.xlsx');
};

run();