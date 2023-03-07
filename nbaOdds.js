const URL = "https://sportsbook.draftkings.com/leagues/basketball/nba?wpsrc=Organic%20Search&wpaffn=Google&wpkw=https%3A%2F%2Fsportsbook.draftkings.com%2Fleagues%2Fbasketball%2Fnba&wpcn=leagues&wpscn=basketball%2Fnba";
const jsdom = require("jsdom");
const request = require('request');
var http = require('http');
var fs = require('fs');
const { runInContext } = require("vm");
const { resolve } = require("path");

//Tables
//parlay-card-10-a --> sportsbook-table__body

//Team Name
//event-cell__name-text

//Spread
//sportsbook-outcome-cell__line

//Odds
//sportsbook-odds american default-color

function main()
{
    return new Promise((resolve, reject) => {
        request('https://sportsbook.draftkings.com/leagues/basketball/nba?wpsrc=Organic%20Search&wpaffn=Google&wpkw=https%3A%2F%2Fsportsbook.draftkings.com%2Fleagues%2Fbasketball%2Fnba&wpcn=leagues&wpscn=basketball%2Fnba', function (
            error,
            response,
            body
        ){
          console.error('error:', error)
          const dom = new jsdom.JSDOM(body)
          //Iteratively go through each game and set these values to it
          let tempTeam = dom.window.document.getElementsByClassName('event-cell__name-text')
          let tempSpread = dom.window.document.getElementsByClassName('sportsbook-outcome-cell__line')
          let tempOdds = dom.window.document.getElementsByClassName('sportsbook-odds american default-color')
          let tables = dom.window.document.getElementsByClassName('sportsbook-table__body')
          
          let j = 0
          for(const i of tables)
          {
            console.log(j)
            j++
            console.log(dom.window.document.getElementsByClassName('event-cell__name-text').textContent)
            console.log(i.querySelector('.sportsbook-outcome-cell__line').textContent)
            console.log(i.querySelector('.sportsbook-odds american default-color').textContent)
          }
        })
      })
  };

main();
