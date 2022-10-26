'use strict';
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');


var spreads = []; //array of spread objects. Gets parsed to json for output to sql table
var totals = [];
var moneylines = [];

const getVegasTable = async (url) => {
  const response = await axios.get(url);
  const $ = cheerio.load(response.data);

  var teams = [];
  var week = ''; //current week being fetched
  var bookies = []; //list of bookies that have displayed odds
  var weekOfGames = []; //array that stores most of the stats data from the page

  //array of arrays
  //each inner array stores a list of spread/offer pairs, with a length twice that of bookies[]
  //1 inner list for each team playing this week
  var odds_spread = []; 
  
  //functions like the above but for Over/Under numeric data pairs
  var odds_total = [];
 
  //functions like the above but for Moneyline offers, only one numberic value per offer, so length = bookies.length
  var odds_moneyline = [];

  var spread_offers = []; //array of objects that have been formed from the previous data
  var total_offers = []; 
  var moneyline_offers = []; 

  
  var weekString = $('.category.font-sf-ui-display-medium.my-auto.pl-3').text().trim(); //the div containing the week
  var secondToLastChar = weekString.charAt((weekString.length - 2));
  if(secondToLastChar === '1') 
  {
    week = weekString.substr((weekString.length - 2), (weekString.length - 1)); //for weeks 10+, Playoff season might break this
  }
  else
  {
    week = weekString.substr(weekString.length - 1); //for weeks 1-9
  }


  $('.d-flex.horizontal-bookmaker.mx-1.overflow-hidden.position-relative > div.bookmaker-rotated.position-absolute').each((_idx, el) => {
    const styleString = $(el).attr('style');
    if(styleString.includes('open_line'))
    {
      bookies.push('open-line');
    }
    else if(styleString.includes('vi_consensus'))
    {
      bookies.push('vi-consensus');
    }
    else //all the bookies besides vegasInsiders own lines
    {
      let index = styleString.indexOf('brand/logo/') + 11; 
      let bookmakerName = '';
      if(index != -1)
      {
        for(; styleString[index] != '/'; ++index)
        {
          bookmakerName += styleString[index];
        }
        bookies.push(bookmakerName);

      }
    }
  });

  //quick fix for the second to last bookie having N/A values not detected by the scraper, leading to uninitialized array values
  let popped = bookies[bookies.length-2];
  bookies[bookies.length-2] = bookies[bookies.length-1];
  bookies.pop();
  console.log('Not showing odds for: ' + popped);

  //grab all the team names
  $('.d-flex.flex-row.hide-scrollbar.odds-slider-all.syncscroll.tracks a.d-flex.flex-column.justify-content-start.text-align-left.text-decoration-none span').each((_idx, el) => {
    const teamName = $(el).text().trim();
    teams.push(teamName);
  });

  //grab the numeric data
  $('.d-flex.flex-row.pr-2.pr-lg-0.px-1').each((_idx, el) => {
    //2 for spreads, 2 for total(over/under), 2 for Moneyline, then next game
    let step = _idx % 6;
    var oddsForTeam = []; 
    if(step == 1 || step == 2) //first 2 for spreads 
    {
      $(el).find('a.text-decoration-none > div > div').each((i, e) => {
        const value = $(e).text().trim();
        oddsForTeam.push(value);
      });
      odds_spread.push(oddsForTeam);
      oddsForTeam = [];
    }
    else if(step == 3 || step == 4) //next 2 for Over/Under totals
    {
      $(el).find('a.text-decoration-none > div > div').each((i, e) => {
        const value = $(e).text().trim();
        oddsForTeam.push(value);
      });
      odds_total.push(oddsForTeam);
      oddsForTeam = [];
    }

    else if(_idx != 0 && (step == 5 || step == 0)) //next 2 for Moneyline
    {
      $(el).find('a.text-decoration-none > div > div').each((i, e) => {
        const value = $(e).text().trim();
        oddsForTeam.push(value);
      });
      odds_moneyline.push(oddsForTeam);
      oddsForTeam = [];
    }

  });

  for(let i = 0; i < odds_spread.length; ++i)
  {
    let oddsObjects = [];
    for(let j = 0; j < (odds_spread[i].length / 2); j++)
    {
      let offer = {
        'bookmaker': bookies[j],
        'spread': odds_spread[i][j*2],
        'odds': odds_spread[i][(j*2)+1]
      };
      oddsObjects.push(offer);
    }
    spread_offers.push(oddsObjects);
    oddsObjects = [];
  }

  for(let i = 0; i < odds_total.length; ++i)
  {
    let oddsObjects = [];
    for(let j = 0; j < (odds_total[i].length / 2); j++)
    {
      let offer = {
        'bookmaker': bookies[j],
        'total': odds_total[i][j*2],
        'odds': odds_total[i][(j*2)+1]
      };
      oddsObjects.push(offer);
    }
    total_offers.push(oddsObjects);
    oddsObjects = [];
  }

  for(let i = 0; i < odds_moneyline.length; ++i)
  {
    let oddsObjects = [];
    for(let j = 0; j < odds_moneyline[i].length; j++)
    {
      let offer = {
        'bookmaker': bookies[j],
        'odds': odds_moneyline[i][j]
      };
      oddsObjects.push(offer);
    }
    moneyline_offers.push(oddsObjects);
    oddsObjects = [];
  }

  for(let i = 0; i < teams.length; i += 2)
  {
    let game = {
      'away_team': teams[i],
      'home_team': teams[i+1],
      'away_spreads': spread_offers[i],
      'home_spreads': spread_offers[i+1],
      'away_totals': total_offers[i],
      'home_totals': total_offers[i+1],
      'away_moneylines': moneyline_offers[i],
      'home_moneylines': moneyline_offers[i+1]
    };
    weekOfGames.push(game);
  }
  
  /* Access weekOfGames as such
   * weekOfGames[i] returns a game object with members away_team, home_team, 
   *
   */

  for(let i = 0; i < weekOfGames.length; ++i)
  {
    for(let j = 0; j < bookies.length; ++j)
    {
      spreads.push({
        'week': week,
        'team': weekOfGames[i].away_team,
        'opponent': weekOfGames[i].home_team,
        'spread': weekOfGames[i].away_spreads[j].spread,
        'odds': weekOfGames[i].away_spreads[j].odds,
        'bookmaker': weekOfGames[i].away_spreads[j].bookmaker
      });
      spreads.push({
        'week': week,
        'team': weekOfGames[i].home_team,
        'opponent': weekOfGames[i].away_team,
        'spread': weekOfGames[i].home_spreads[j].spread,
        'odds': weekOfGames[i].home_spreads[j].odds,
        'bookmaker': weekOfGames[i].home_spreads[j].bookmaker
      });
      totals.push({
        'week': week,
        'team': weekOfGames[i].away_team,
        'opponent': weekOfGames[i].home_team,
        'total': weekOfGames[i].away_totals[j].total,
        'odds': weekOfGames[i].away_totals[j].odds,
        'bookmaker': weekOfGames[i].away_totals[j].bookmaker
      });
      totals.push({
        'week': week,
        'team': weekOfGames[i].home_team,
        'opponent': weekOfGames[i].away_team,
        'total': weekOfGames[i].home_totals[j].total,
        'odds': weekOfGames[i].home_totals[j].odds,
        'bookmaker': weekOfGames[i].home_totals[j].bookmaker
      });
      moneylines.push({
        'week': week,
        'team': weekOfGames[i].away_team,
        'opponent': weekOfGames[i].home_team,
        'odds': weekOfGames[i].away_moneylines[j].odds,
        'bookmaker': weekOfGames[i].away_moneylines[j].bookmaker
      });
      moneylines.push({
        'week': week,
        'team': weekOfGames[i].home_team,
        'opponent': weekOfGames[i].away_team,
        'odds': weekOfGames[i].home_moneylines[j].odds,
        'bookmaker': weekOfGames[i].home_moneylines[j].bookmaker
      });
    }
  }

  return;
};

async function testGetVegasTable() {
  const results = await getVegasTable('https://www.vegasinsider.com/nfl/odds/las-vegas/');
  const writeSpreads = fs.createWriteStream('./resources/weekOfSpreads.json', {encoding: 'utf8'});
  writeSpreads.write(JSON.stringify(spreads));
  const writeTotals = fs.createWriteStream('./resources/weekOfTotals.json', {encoding: 'utf8'});
  writeTotals.write(JSON.stringify(totals));
  const writeMoneylines = fs.createWriteStream('./resources/weekOfMoneylines.json', {encoding: 'utf8'});
  writeMoneylines.write(JSON.stringify(moneylines));
  /*
  for(let i = 0; i < spreads.length; ++i)
  {
    writeStream.write(JSON.stringify(spreads[i]) + '\n');
  }
  */
};

testGetVegasTable();
