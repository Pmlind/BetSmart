'use strict';
const axios = require('axios');
const cheerio = require('cheerio');
var fs = require('fs');

const teams = [];

//My variables and their naming schemes are massively confusing, need to fix

var week = 0;
var weekOfGames = [];
var bookies = [];
var odds = [];
var oddsWithBookies = [];
var finalOdds = [];
var spreads = [];

const getVegasTable = async (url) => {
  const response = await axios.get(url);
  const $ = cheerio.load(response.data);
  var oddsForTeam = [];

  $('.category.font-sf-ui-display-medium.my-auto.pl-3').each((_idx, el) => {
    var weekString = $(el).text().trim();
    var secondToLastChar = weekString.charAt((weekString.length - 2));
    if(secondToLastChar === '1')
    {
      week = weekString.substr((weekString.length - 2), (weekString.length - 1));
    }
    else
    {
      week = weekString.substr(weekString.length - 1);
    }
  });



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
    else
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

  $('.d-flex.flex-row.hide-scrollbar.odds-slider-all.syncscroll.tracks a.d-flex.flex-column.justify-content-start.text-align-left.text-decoration-none span').each((_idx, el) => {
    const teamName = $(el).text().trim();
    teams.push(teamName);
  });
  $('.odds-comparison-border > div.d-flex.flex-row.pr-2.pr-lg-0.px-1').each((i, el) => {
    if(i != 0)
    {
      $(el).find('a > div > div').each((index, element) => {
        const oddsValue = $(element).text().trim();
        oddsForTeam.push(oddsValue);
    });
    odds.push(oddsForTeam);
    oddsForTeam = [];

    }
  });

  for(let i = 0; i < odds.length; ++i)
  {
    for(let j = 0; j < (odds[i].length / 2); j++)
    {
      let offer = {
        'bookmaker': bookies[j],
        'spread': odds[i][j*2],
        'odds': odds[i][(j*2)+1]
      };
      oddsWithBookies.push(offer);
    }
    finalOdds.push(oddsWithBookies);
    oddsWithBookies = [];
  }

  for(let i = 0; i < teams.length; i += 2)
  {
    let game = {
      'away_team': teams[i],
      'home_team': teams[i+1],
      'away_spread': finalOdds[i],
      'home_spread': finalOdds[i+1]
    };
    weekOfGames.push(game);
  }

  for(let i = 0; i < weekOfGames.length; ++i)
  {
    for(let j = 0; j < bookies.length; ++j)
    {
      let spread1 = {
        'week': week,
        'team': weekOfGames[i].away_team,
        'opponent': weekOfGames[i].home_team,
        'spread': weekOfGames[i].away_spread[j].spread,
        'odds': weekOfGames[i].away_spread[j].odds,
        'bookmaker': weekOfGames[i].away_spread[j].bookmaker
      }
      let spread2 = {
        'week': week,
        'team': weekOfGames[i].home_team,
        'opponent': weekOfGames[i].away_team,
        'spread': weekOfGames[i].home_spread[j].spread,
        'odds': weekOfGames[i].home_spread[j].odds,
        'bookmaker': weekOfGames[i].home_spread[j].bookmaker
      }
      spreads.push(spread1);
      spreads.push(spread2);
    }
  }

  
  return spreads;
};

async function testGetVegasTable() {
  const results = await getVegasTable('https://www.vegasinsider.com/nfl/odds/las-vegas/');
  const writeStream = fs.createWriteStream('./weekOfSpreads.json', {encoding: 'utf8'});
  writeStream.write(JSON.stringify(spreads));
  /*
  for(let i = 0; i < spreads.length; ++i)
  {
    writeStream.write(JSON.stringify(spreads[i]) + '\n');
  }
  */
  /*
  const writeStream = fs.createWriteStream('./currentWeekGames.txt', {encoding: 'utf8'});
  for(let i = 0; i < weekOfGames.length; ++i)
  {
    writeStream.write("WEEK " + week + '\n');
    writeStream.write("GAME " + (i+1) + '\n');
    writeStream.write("Away Team: " + weekOfGames[i].awayTeam + '\n');
    writeStream.write("Home Team: " + weekOfGames[i].homeTeam + '\n');
    writeStream.write("Away Team Odds: " + '\n');
    for(let j = 0; j < bookies.length; ++j)
    {
      writeStream.write('\t' + JSON.stringify(weekOfGames[i].awayOdds[j]) + '\n');
    }
    writeStream.write("Home Team Odds: " + '\n');
    for(let j = 0; j < bookies.length; ++j)
    {
      writeStream.write('\t' + JSON.stringify(weekOfGames[i].homeOdds[j]) + '\n');
    }
  }
  */
};

testGetVegasTable();
