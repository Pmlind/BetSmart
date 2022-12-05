/* Author: Jack Gould
 * For all lines in a given week of football, use the odds to calculate implied and actual probability of outcomes
 * Updates the moneyline table in database with these two figures and the overround as calculated for that bet
 */
var mysql = require('mysql');

var con = mysql.createConnection({
    host: 'betsmart.c4vgirc2flsl.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'Password1',
    database: 'BetSmart'
});

const week = 13;

function findImpliedP(odds)
{
  if(odds < 0)
    return (odds / (odds - 100));
  else
    return (100 / (odds + 100));
}

function run(week)
{
  con.connect(function(err) {
    if(err) throw err;
    console.log("Connected");
    var sql = `SELECT * FROM MONEYLINE WHERE MONEYLINE.week = ${week};`;
    con.query(sql, function(err, result) {
      if(err) throw err;
      for(let i of result)
      {
        sql = `SELECT * FROM MONEYLINE WHERE MONEYLINE.week = ${week} AND MONEYLINE.bookmaker = "${i.bookmaker}" AND "${i.team}" IN(team, opponent);`;
        con.query(sql, function(err, result2) {
          if(err) throw err;
          var odds = [];
          for(let x of result2)
          {
            let o = {
              'num': x.odds,
              'team': x.team,
              'impliedP': findImpliedP(x.odds),
              'actualP': 0.0
            };
            odds.push(o);
          }

          var overround = odds[0].impliedP + odds[1].impliedP;
          odds[0].actualP = odds[0].impliedP / overround;
          odds[1].actualP = odds[1].impliedP / overround;

          let implied1 = odds[0].impliedP.toFixed(5);
          let implied2 = odds[1].impliedP.toFixed(5);

          let actual1 = odds[0].actualP.toFixed(5);
          let actual2 = odds[1].actualP.toFixed(5);

          let oRound = overround.toFixed(5);
          
          sql = `UPDATE MONEYLINE SET impliedP = ${implied1}, adjustedP = ${actual1}, overround = ${oRound} WHERE MONEYLINE.week = ${week} AND MONEYLINE.bookmaker = "${i.bookmaker}" AND MONEYLINE.team = "${odds[0].team}";`;
          con.query(sql, function(err, result3) {
            if(err) throw err;
            console.log(i.team);
          });
          sql = `UPDATE MONEYLINE SET impliedP = ${implied2}, adjustedP = ${actual2}, overround = ${oRound} WHERE MONEYLINE.week = ${week} AND MONEYLINE.bookmaker = "${i.bookmaker}" AND MONEYLINE.team = "${odds[1].team}";`;
          con.query(sql, function(err, result3) {
            if(err) throw err;
            console.log(i.team);
          });
        });
      }
    });
  });
}

run(week);


