var fs = require('fs');
var mysql = require('mysql');
const readline = require('readline');

var connection = mysql.createConnection({
  host : 'betsmart.c4vgirc2flsl.us-east-1.rds.amazonaws.com',
  port : '3306',
  user : 'admin',
  password : 'Password1',
  database : 'BetSmart'

});

connection.connect(function(err) {
  if(err)
    throw err;
  else {
    console.log('Connected to MySQL');
  }
});


const processByLine = async () => {
  var inserted = 0;
  var maybeUpdated = 0;
  for await (const line of rl) {
    connection.query(line, function(err, result) {
      if(err) {
        lineMinus1 = line.slice(0, -1); //remove the semicolon from the end of the statement
        var table = '';
        var newLine = '';
        if(line.includes('MONEYLINE')) {
          table = 'moneyline';
          var indices = [];
          for(let i = 0; i < lineMinus1.length; ++i)
          {
            if(lineMinus1[i] === '"') indices.push(i);
          }
          newLine = lineMinus1.concat(" ON DUPLICATE KEY UPDATE odds = ", lineMinus1.slice(indices[6]+1, indices[7]), ";");
          console.log(newLine);
          connection.query(newLine, function(e, r) {
            if(e)
            {
              console.log('Error on a duplicate entry');
            }
            else {
              ++maybeUpdated;
            }
          });
        }
        else if(line.includes('SPREAD')) table = 'spread';
        else if(line.includes('TOTAL')) table = 'total';
        if(!(table === 'moneyline')) {
          var indices = [];
          for(let i = 0; i < lineMinus1.length; ++i)
          {
            if(lineMinus1[i] === '"') indices.push(i);
          }
          newLine = lineMinus1.concat(" ON DUPLICATE KEY UPDATE ", table, " = ", lineMinus1.slice(indices[6]+1, indices[7]), ", odds = ", lineMinus1.slice(indices[8]+1, indices[9]), ";");
          console.log(newLine);
          connection.query(newLine, function(er, res) {
            if(er)
            {
              console.log('Error on a duplicate entry');
            }
            else {
              ++maybeUpdated;
            }
          });
        }
      }
      else {
        ++inserted;
      }
    });
  }
}

const fileStream = fs.createReadStream('resources/updateDB.sql');
const rl = readline.createInterface({
  input: fileStream
});
processByLine();
// process currently hangs after inserting all rows into the table;
