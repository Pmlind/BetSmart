const jsdom = require("jsdom");
const request = require('request');
var http = require('http');
var fs = require('fs');
const { runInContext } = require("vm");
const { resolve } = require("path");
var mysql = require('mysql');

var con = mysql.createConnection({
    host: 'betsmart.c4vgirc2flsl.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'Password1',
    database: 'BetSmart'
});

function regular()
{
    var w = 0;
    var l = 0;
    sql = `SELECT picktype, inj5, hit, inj10 FROM NBAPICKS WHERE hit IS NOT NULL;`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
        var picks = result;
    });
}

function weighted()
{

}

function combo()
{

}

function overall()
{

}

function run()
{
    /*con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        sql = `UPDATE NBASTATSTEST SET won = 0, lost = 0 WHERE picktype = 'Combo5';`;
        con.query(sql, function (err, result) {
            if (err) throw err;
            //console.log(result);
        });
    });*/
}

regular();