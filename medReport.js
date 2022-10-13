const URL = "https://www.espn.com/nfl/injuries";
const jsdom = require("jsdom");
const request = require('request');
var http = require('http');
var fs = require('fs');
const { runInContext } = require("vm");
const { resolve } = require("path");

let teamStatus = [];
//let player = {
//  Team:
//  ,Name:
//  ,Status:
//}

function main()
{
    return new Promise((resolve, reject) => {
        request('https://www.espn.com/nfl/injuries', function (
            error,
            response,
            body
        ){
          console.error('error:', error)
          const dom = new jsdom.JSDOM(body)
          let tempTeam = dom.window.document.getElementsByClassName('Table__Title'[0])
          let tempName = dom.window.document.getElementsByClassName(' Table__TD')

          let tempStatus = dom.window.document.getElementsByClassName('TextStatus')[0].textContent
          let tables = dom.window.document.querySelectorAll('.Table__TBODY')
          let j = 0
          for(const i of tables)
          {
            console.log(j)
            j++
            console.log(dom.window.document.getElementsByClassName('Table__Title'[0]).textContent)
            console.log(i.querySelector('.Table__TD').textContent)
            console.log(i.querySelector('.TextStatus').textContent)
          }
        })
      })
  };

main();
