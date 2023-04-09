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

function regular(picks)
{
    const regs = picks.filter(item => item.picktype === "Regular");
    var w5Star = 0;
    var w5 = 0;
    var l5Star = 0;
    var l5 = 0;
    var w10Star = 0;
    var w10 = 0;
    var l10Star = 0;
    var l10 = 0;
    for(const i of regs)
    {
        if(i.spreadby >= 10)
        {
            if(i.inj10 == 0)
            {
                if(i.hit == 1) w10++;
                else l10++;
            }
            if(i.hit == 1) w10Star++;
            else l10Star++;
        }
        if(i.inj5 == 0)
        {
            if(i.hit == 1) w5++;
            else l5++;
        }
        if(i.hit == 1) w5Star++;
        else l5Star++;
    }
    sql = `UPDATE NBASTATS SET won = ${w5Star}, lost = ${l5Star} WHERE picktype = 'Reg5*';`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Reg5*")
    });
    sql = `UPDATE NBASTATS SET won = ${w5}, lost = ${l5} WHERE picktype = 'Reg5';`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Reg5")
    });
    sql = `UPDATE NBASTATS SET won = ${w10Star}, lost = ${l10Star} WHERE picktype = 'Reg10*';`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Reg10*")
    });
    sql = `UPDATE NBASTATS SET won = ${w10}, lost = ${l10} WHERE picktype = 'Reg10';`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Reg10")
    });
    sql = `UPDATE NBASTATS SET won = won + ${w5}, lost = lost + ${l5} WHERE picktype = 'OVR';`;
    con.query(sql, function (err, result) {
        if (err) throw err;
    });
}

function weighted(picks)
{
    const ws = picks.filter(item => item.picktype === "Weighted");
    var w5Star = 0;
    var w5 = 0;
    var l5Star = 0;
    var l5 = 0;
    var w10Star = 0;
    var w10 = 0;
    var l10Star = 0;
    var l10 = 0;
    for(const i of ws)
    {
        if(i.spreadby >= 10)
        {
            if(i.inj10 == 0)
            {
                if(i.hit == 1) w10++;
                else l10++;
            }
            if(i.hit == 1) w10Star++;
            else l10Star++;
        }
        if(i.inj5 == 0)
        {
            if(i.hit == 1) w5++;
            else l5++;
        }
        if(i.hit == 1) w5Star++;
        else l5Star++;
    }
    sql = `UPDATE NBASTATS SET won = ${w5Star}, lost = ${l5Star} WHERE picktype = 'W5*';`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("W5*")
    });
    sql = `UPDATE NBASTATS SET won = ${w5}, lost = ${l5} WHERE picktype = 'W5';`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("W5")
    });
    sql = `UPDATE NBASTATS SET won = ${w10Star}, lost = ${l10Star} WHERE picktype = 'W10*';`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("W10*")
    });
    sql = `UPDATE NBASTATS SET won = ${w10}, lost = ${l10} WHERE picktype = 'W10';`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("W10")
    });
    sql = `UPDATE NBASTATS SET won = won + ${w5}, lost = lost + ${l5} WHERE picktype = 'OVR';`;
    con.query(sql, function (err, result) {
        if (err) throw err;
    });
}

function combo(picks)
{
    var w5Star = 0;
    var w5 = 0;
    var l5Star = 0;
    var l5 = 0;
    var w10Star = 0;
    var w10 = 0;
    var l10Star = 0;
    var l10 = 0;
    var last = 0;
    for(const i of picks)
    {
        if(last != 0)
        {
            if(i.date == last.date && i.team == last.team && i.spread == last.spread)
            {
                if(i.spreadby >= 10 && last.spreadby >= 10)
                {
                    if(i.inj10 == 0 && last.inj10 == 0)
                    {
                        if(i.hit == 1) w10++;
                        else l10++;
                    }
                    if(i.hit == 1) w10Star++;
                    else l10Star++;
                }
                if(i.inj5 == 0 && last.inj5 == 0)
                {
                    if(i.hit == 1) w5++;
                    else l5++;
                }
                if(i.hit == 1) w5Star++;
                else l5Star++;
            }
        }
        last = i;
    }
    sql = `UPDATE NBASTATS SET won = ${w5Star}, lost = ${l5Star} WHERE picktype = 'Combo5*';`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Combo5*")
    });
    sql = `UPDATE NBASTATS SET won = ${w5}, lost = ${l5} WHERE picktype = 'Combo5';`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Combo5")
    });
    sql = `UPDATE NBASTATS SET won = ${w10Star}, lost = ${l10Star} WHERE picktype = 'Combo10*';`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Combo10*")
    });
    sql = `UPDATE NBASTATS SET won = ${w10}, lost = ${l10} WHERE picktype = 'Combo10';`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Combo10")
    });
    sql = `UPDATE NBASTATS SET won = won - ${w5}, lost = lost - ${l5} WHERE picktype = 'OVR';`;
    con.query(sql, function (err, result) {
        if (err) throw err;
    });
}

function run()
{
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        sql = `SELECT date, picktype, team, spreadby, inj5, inj10, hit FROM NBAPICKS WHERE hit IS NOT NULL;`;
        con.query(sql, function (err, result) {
            if (err) throw err;
            sql = `UPDATE NBASTATS SET won = 0, lost = 0 WHERE picktype = 'OVR';`;
            con.query(sql, function (err, result) {
                if (err) throw err;
            });
            regular(result);
            weighted(result);
            combo(result);
        });
    });
}

run();