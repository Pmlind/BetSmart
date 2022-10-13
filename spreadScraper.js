const jsdom = require("jsdom");
const request = require('request');
const reader = require('xlsx');

const file = reader.readFile('./Spreads.xlsx');
let data = [];
function read()
{
    const temp = reader.utils.sheet_to_json(file.Sheets["Sheet1"]);
    temp.forEach((res) => {
        data.push(res)
    })
}

function parse(week, url)
{
    return new Promise((resolve, reject) => {
        request(url, function (
            error,
            response,
            body
        ){
            console.error('error:', error)
            const dom = new jsdom.JSDOM(body);
            gamesSet = dom.window.document.querySelectorAll(".gnt_ar_b_ul")[1];
            games = gamesSet.querySelectorAll(".gnt_ar_b_ul_li");
            for(const game of games)
            {
                index = "awayTeam";
                let line = {
                    Week: week,
                    AwayTeam: "",
                    AwaySpread: "",
                    HomeTeam: "",
                    HomeSpread: ""
                };
                for(const c of game.textContent)
                {
                    if(index == "awayTeam")
                    {
                        if(c == "(")
                        {
                            index = "awaySpread";
                        }
                        else
                        {
                            line.AwayTeam += c;
                        }
                    }
                    else if(index == "awaySpread")
                    {
                        if(c == ")")
                        {
                            
                        }
                        else if(c == " " || c == "v")
                        {
                            index = "vs";
                        }
                        else
                        {
                            line.AwaySpread += c;
                        }
                    }
                    else if(index == "vs")
                    {
                        if(c == "v" || c == "s" || c == ".")
                        {
                            
                        }
                        else if(c == " ")
                        {
                            index = "homeTeam";
                        }
                    }
                    else if(index == "homeTeam")
                    {
                        if(c == "(")
                        {
                            index = "homeSpread";
                        }
                        else
                        {
                            line.HomeTeam += c;
                        }
                    }
                    else if(index == "homeSpread")
                    {
                        if(c == ")")
                        {
                            index = "end";
                        }
                        else
                        {
                            line.HomeSpread += c;
                        }
                    }
                    else if(index == "end")
                    {
                        break;
                    }
                }
                data.push(line);
            }
            resolve();
        });
    });
}

async function run() {
    read();
    //await parse(5, "https://www.usatoday.com/story/sports/nfl/2022/10/05/nfl-week-5-odds-moneylines-point-spreads-over-under/8180929001/");
    console.log(data);
    const ws = reader.utils.json_to_sheet(data);
    const wb = reader.utils.book_new()
    reader.utils.book_append_sheet(wb,ws,"Sheet1");
    reader.writeFile(wb,'./Spreads.xlsx');
};

run();