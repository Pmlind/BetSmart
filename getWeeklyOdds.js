const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const teams = [];

var weekOfGames = [];
var bookies = [];
var odds = [];
var oddsWithBookies = [];
var finalOdds = [];

const getVegasTable = async (url) => {
  const response = await axios.get(url);
  const $ = cheerio.load(response.data);
  var oddsForTeam = [];



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
        'pointSpread': odds[i][j*2],
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
      'awayTeam': teams[i],
      'homeTeam': teams[i+1],
      'awayOdds': finalOdds[i],
      'homeOdds': finalOdds[i+1]
    };
    weekOfGames.push(game);
  }

  
  return weekOfGames;
};

async function testGetVegasTable() {
  const results = await getVegasTable('https://www.vegasinsider.com/nfl/odds/las-vegas/');
  const writeStream = fs.createWriteStream('./currentWeekGames.json', {encoding: 'utf8'});
  for(let i = 0; i < weekOfGames.length; ++i)
  {
    writeStream.write(JSON.stringify(weekOfGames[i]) + '\n');
  }
  /*
  const writeStream = fs.createWriteStream('./currentWeekGames.txt', {encoding: 'utf8'});
  for(let i = 0; i < weekOfGames.length; ++i)
  {
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
