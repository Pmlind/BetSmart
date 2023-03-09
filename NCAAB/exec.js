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

const PORT=8080; 

let months = [
    {
        "name": "january",
        "days": 31,
        "number": "01"
    },
    {
        "name": "february",
        "days": 28,
        "number": "02"
    },
    {
        "name": "march",
        "days": 31,
        "number": "03"
    },
    {
        "name": "april",
        "days": 30,
        "number": "04"
    },
    {
        "name": "october",
        "days": 31,
        "number": "10"
    },
    {
        "name": "november",
        "days": 30,
        "number": "11"
    },
    {
        "name": "december",
        "days": 31,
        "number": "12"
    }
]

let teams = [
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Abilene Christian University",
        "nickname": "Abilene Christian"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Air Force Academy",
        "nickname": "Air Force"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Alabama A&M University",
        "nickname": "Alabama A&M"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Alabama St. University",
        "nickname": "Alabama St."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Albany St. University",
        "nickname": "Albany St."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Alcorn St. University",
        "nickname": "Alcorn"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "American University",
        "nickname": "American"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Appalachian St. University",
        "nickname": "App State"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Arizona St. University",
        "nickname": "Arizona St."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "University of Arizona",
        "nickname": "Arizona"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Arkansas St. University",
        "nickname": "Arkansas St."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "University of Arkansas",
        "nickname": "Arkansas"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "University of Arkansas at Little Rock",
        "nickname": "Little Rock"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "S'western Assemblies",
        "nickname": "S'western Assemblies"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "University of Arkansas at Pine Bluff",
        "nickname": "Ark.-Pine Bluff"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Army West Point",
        "nickname": "Army West Point"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Auburn University",
        "nickname": "Auburn"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Austin Peay St. University",
        "nickname": "Austin Peay"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Baylor University",
        "nickname": "Baylor"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Ball St.",
        "nickname": "Ball St."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Belmont University",
        "nickname": "Belmont"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Bellarmine",
        "nickname": "Bellarmine"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Bethune-Cookman University",
        "nickname": "Bethune-Cookman"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Binghamton University",
        "nickname": "Binghamton"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Boise St. University",
        "nickname": "Boise St."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Boston College",
        "nickname": "Boston College"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Boston University",
        "nickname": "Boston U."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Bowling Green St. University",
        "nickname": "Bowling Green"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Bradley University",
        "nickname": "Bradley"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Brigham Young University",
        "nickname": "BYU"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Brown University",
        "nickname": "Brown"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Bryant University",
        "nickname": "Bryant"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Bucknell University",
        "nickname": "Bucknell"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Butler University",
        "nickname": "Butler"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "California Baptist University",
        "nickname": "California Baptist"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "California St. University Bakersfield",
        "nickname": "CSU Bakersfield"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "California St. University Fullerton",
        "nickname": "Cal St. Fullerton"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "California St. University Northridge",
        "nickname": "CSUN"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Campbell University",
        "nickname": "Campbell"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Canisius College",
        "nickname": "Canisius"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Central Arkansas",
        "nickname": "Central Ark."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Central Connecticut St. University",
        "nickname": "Central Conn. St."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Central Michigan University",
        "nickname": "Central Mich."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Charleston Southern University",
        "nickname": "Charleston So."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Chicago St. University",
        "nickname": "Chicago St."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Cincinnati",
        "nickname": "Cincinnati"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Citadel",
        "nickname": "The Citadel"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Clemson University",
        "nickname": "Clemson"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Cleveland St. University",
        "nickname": "Cleveland St."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Coastal Carolina University",
        "nickname": "Coastal Carolina"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Colgate University",
        "nickname": "Colgate"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "College of Charleston",
        "nickname": "Col. of Charleston"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "College of the Holy Cross",
        "nickname": "Holy Cross"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Colorado St. University",
        "nickname": "Colorado St."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Columbia University",
        "nickname": "Columbia"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Coppin St. University",
        "nickname": "Coppin St."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Cornell University",
        "nickname": "Cornell"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Creighton University",
        "nickname": "Creighton"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Dartmouth College",
        "nickname": "Dartmouth"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Davidson College",
        "nickname": "Davidson"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Dayton",
        "nickname": "Dayton"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Delaware St. University",
        "nickname": "Delaware St."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Delaware",
        "nickname": "Delaware"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Denver",
        "nickname": "Denver"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "DePaul University",
        "nickname": "DePaul"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Detroit Mercy",
        "nickname": "Detroit Mercy"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Drake University",
        "nickname": "Drake"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Drexel University",
        "nickname": "Drexel"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Duke University",
        "nickname": "Duke"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Duquesne University",
        "nickname": "Duquesne"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Eastern Illinois University",
        "nickname": "Eastern Ill."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Eastern Kentucky University",
        "nickname": "Eastern Ky."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Eastern Michigan University",
        "nickname": "Eastern Mich."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Eastern Washington University",
        "nickname": "Eastern Wash."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Elon University",
        "nickname": "Elon"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Evansville",
        "nickname": "Evansville"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Fairfield University",
        "nickname": "Fairfield"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Fairleigh Dickinson University",
        "nickname": "Fairleigh Dickinson"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Florida A&M University",
        "nickname": "Florida A&M"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Florida Tech",
        "nickname": "Florida Tech"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Florida Atlantic University",
        "nickname": "Fla. Atlantic"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Florida Gulf Coast University",
        "nickname": "FGCU"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Florida International University",
        "nickname": "FIU"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Florida St. University",
        "nickname": "Florida St."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Fordham University",
        "nickname": "Fordham"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Fresno St.",
        "nickname": "Fresno St."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Furman",
        "nickname": "Furman"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Gardner-Webb University",
        "nickname": "Gardner-Webb"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "George Mason University",
        "nickname": "George Mason"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "George Washington University",
        "nickname": "George Washington"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Georgetown University",
        "nickname": "Georgetown"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Georgia Institute of Technology",
        "nickname": "Georgia Tech"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Georgia Southern University",
        "nickname": "Ga. Southern"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Georgia St. University",
        "nickname": "Georgia St."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Gonzaga University",
        "nickname": "Gonzaga"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Grambling St. University",
        "nickname": "Grambling St."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Grambling University",
        "nickname": "Grambling"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Grand Canyon University",
        "nickname": "Grand Canyon"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Green Bay",
        "nickname": "Green Bay"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Hampton University",
        "nickname": "Hampton"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Hartford",
        "nickname": "Hartford"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Harvard University",
        "nickname": "Harvard"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Hawaii",
        "nickname": "Hawaii"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "High Point University",
        "nickname": "High Point"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Hofstra University",
        "nickname": "Hofstra"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Houston Baptist University",
        "nickname": "Houston Christian"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Houston",
        "nickname": "Houston"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Howard",
        "nickname": "Howard"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Idaho",
        "nickname": "Idaho"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Idaho St.",
        "nickname": "Idaho St."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Illinois",
        "nickname": "Illinois"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Illinois St.",
        "nickname": "Illinois St."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Incarnate Word",
        "nickname": "UIW"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Indiana",
        "nickname": "Indiana"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Indiana St.",
        "nickname": "Indiana St."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Indiana University - Purdue University Indianapolis",
        "nickname": "IUPUI"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Iona College",
        "nickname": "Iona"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Iowa",
        "nickname": "Iowa"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Iowa St.",
        "nickname": "Iowa St."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Jackson St.",
        "nickname": "Jackson St."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Jacksonville",
        "nickname": "Jacksonville"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Jacksonville St.",
        "nickname": "Jacksonville St."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "James Madison",
        "nickname": "James Madison"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Kansas",
        "nickname": "Kansas"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Kansas St.",
        "nickname": "Kansas St."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Kennesaw St.",
        "nickname": "Kennesaw St."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Kent St.",
        "nickname": "Kent St."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Kentucky",
        "nickname": "Kentucky"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "La Salle",
        "nickname": "La Salle"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Lafayette",
        "nickname": "Lafayette"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Lamar",
        "nickname": "Lamar University"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Lehigh",
        "nickname": "Lehigh"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Liberty",
        "nickname": "Liberty"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Lipscomb",
        "nickname": "Lipscomb"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Little Rock",
        "nickname": "Little Rock"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Long Beach St.",
        "nickname": "Long Beach St."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Long Island",
        "nickname": "LIU"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Longwood",
        "nickname": "Longwood"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Louisiana",
        "nickname": "Louisiana"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Louisiana Monroe",
        "nickname": "ULM"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Louisiana Tech",
        "nickname": "Louisiana Tech"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Louisiana St.",
        "nickname": "LSU"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Louisville",
        "nickname": "Louisville"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Loyola Chicago",
        "nickname": "Loyola Chicago"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Loyola Maryland",
        "nickname": "Loyola Maryland"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Loyola Marymount",
        "nickname": "LMU (CA)"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Maine",
        "nickname": "Maine"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Manhattan",
        "nickname": "Manhattan"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Marist",
        "nickname": "Marist"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Marquette",
        "nickname": "Marquette"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Marshall",
        "nickname": "Marshall"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Maryland",
        "nickname": "Maryland"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Maryland Eastern Shore",
        "nickname": "UMES"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Massachusetts",
        "nickname": "Massachusetts"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Massachusetts Lowell",
        "nickname": "UMass Lowell"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "McNeese St.",
        "nickname": "McNeese"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Memphis",
        "nickname": "Memphis"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Mercer",
        "nickname": "Mercer"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Miami",
        "nickname": "Miami (FL)"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Ohio",
        "nickname": "Ohio"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Miami (OH)",
        "nickname": "Miami (OH)"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Michigan",
        "nickname": "Michigan"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Michigan St.",
        "nickname": "Michigan St."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Middle Tennessee",
        "nickname": "Middle Tenn."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "East Tennessee State University",
        "nickname": "ETSU"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Merrimack College",
        "nickname": "Merrimack"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Mississippi St. University",
        "nickname": "Mississippi St."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Mississippi Valley St. University",
        "nickname": "Mississippi Val."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Missouri St. University",
        "nickname": "Missouri St."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Monmouth University",
        "nickname": "Monmouth"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Montana St. University",
        "nickname": "Montana St."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Morehead St. University",
        "nickname": "Morehead St."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Morgan St. University",
        "nickname": "Morgan St."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Mount Saint Mary's University",
        "nickname": "Mount St. Mary's"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Murray St. University",
        "nickname": "Murray St."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Navy",
        "nickname": "Navy"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Nebraska",
        "nickname": "Nebraska"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "New Hampshire",
        "nickname": "New Hampshire"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "New Mexico",
        "nickname": "New Mexico"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "New Mexico St.",
        "nickname": "New Mexico St."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "New Orleans",
        "nickname": "New Orleans"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Niagara",
        "nickname": "Niagara"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Nicholls",
        "nickname": "Nicholls"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "NJIT",
        "nickname": "NJIT"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Norfolk St.",
        "nickname": "Norfolk St."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "North Alabama",
        "nickname": "North Ala."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "North Carolina",
        "nickname": "North Carolina"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "North Carolina A&T",
        "nickname": "N.C. A&T"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "North Carolina Central",
        "nickname": "N.C. Central"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "North Carolina Central",
        "nickname": "East Carolina"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "North Dakota St. University",
        "nickname": "North Dakota St."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Northeastern University",
        "nickname": "Northeastern"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Northern Arizona University",
        "nickname": "Northern Ariz."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Northern Illinois University",
        "nickname": "NIU"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Northern Kentucky University",
        "nickname": "Northern Ky."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Northwestern St. University of Louisiana",
        "nickname": "Northwestern St."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Northwestern University",
        "nickname": "Northwestern"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Ohio St. University",
        "nickname": "Ohio St."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Oklahoma St. University",
        "nickname": "Oklahoma St."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Old Dominion University",
        "nickname": "Old Dominion"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Oregon St. University",
        "nickname": "Oregon St."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Oral Roberts University",
        "nickname": "Oral Roberts"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Oakland",
        "nickname": "Oakland"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Oregon University",
        "nickname": "Oregon"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Pacific",
        "nickname": "Pacific"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Purdue",
        "nickname": "Purdue"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Purdue Fort Wayne",
        "nickname": "Purdue Fort Wayne"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Pennsylvania",
        "nickname": "Penn"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Pennsylvania St.",
        "nickname": "Penn St."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Pepperdine",
        "nickname": "Pepperdine"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Pittsburgh",
        "nickname": "Pittsburgh"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Portland",
        "nickname": "Portland"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Portland St.",
        "nickname": "Portland St."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Prairie View A&M",
        "nickname": "Prairie View"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Presbyterian College",
        "nickname": "Presbyterian"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Providence",
        "nickname": "Providence"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Quinnipiac University",
        "nickname": "Quinnipiac"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Queens (NC)",
        "nickname": "Queens (NC)"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Radford",
        "nickname": "Radford"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Rhode Island",
        "nickname": "Rhode Island"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Rice",
        "nickname": "Rice"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Richmond",
        "nickname": "Richmond"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Rider",
        "nickname": "Rider"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Robert Morris",
        "nickname": "Robert Morris"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Rutgers",
        "nickname": "Rutgers"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Sacramento St.",
        "nickname": "Sacramento St."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Saint Francis (PA)",
        "nickname": "Saint Francis (PA)"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Saint Joseph's",
        "nickname": "Saint Joseph's"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Saint Louis",
        "nickname": "Saint Louis"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Sam Houston St.",
        "nickname": "Sam Houston"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Samford",
        "nickname": "Samford"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "San Diego",
        "nickname": "San Diego"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "San Diego St.",
        "nickname": "San Diego St."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "San Francisco",
        "nickname": "San Francisco"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "San Jose St.",
        "nickname": "San Jose St."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Santa Clara",
        "nickname": "Santa Clara"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Seattle",
        "nickname": "Seattle U"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Seton Hall",
        "nickname": "Seton Hall"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Siena",
        "nickname": "Siena"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "South Alabama",
        "nickname": "South Alabama"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "South Carolina",
        "nickname": "South Carolina"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "South Carolina St.",
        "nickname": "South Carolina St."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Sacred Heart University",
        "nickname": "Sacred Heart"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Saint Mary's College of California",
        "nickname": "Saint Mary's (CA)"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Saint Peter's University",
        "nickname": "Saint Peter's"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Princeton",
        "nickname": "Princeton"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Savannah St. University",
        "nickname": "Savannah St."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "South Dakota St. University",
        "nickname": "South Dakota St."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Southeast Missouri St. University",
        "nickname": "Southeast Mo. St."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Southeastern Louisiana University",
        "nickname": "Southeastern La."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Southern Illinois University Carbondale",
        "nickname": "Southern Ill."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Southern Illinois University Edwardsville",
        "nickname": "SIUE"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Southern Methodist University",
        "nickname": "SMU"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Southern University & A&M College",
        "nickname": "Southern U."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Southern Utah University",
        "nickname": "Southern Utah"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Saint Bonaventure University",
        "nickname": "St. Bonaventure"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Saint Francis College (NY)",
        "nickname": "St. Francis Brooklyn"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Saint John's University",
        "nickname": "St. John's (NY)"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Stanford University",
        "nickname": "Stanford"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Stephen F Austin St. University",
        "nickname": "SFA"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Stetson University",
        "nickname": "Stetson"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Stonehill College",
        "nickname": "Stonehill"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Lindenwood",
        "nickname": "Lindenwood"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Stony Brook University",
        "nickname": "Stony Brook"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "University at Albany",
        "nickname": "UAlbany"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "University at Buffalo",
        "nickname": "Buffalo"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Syracuse University",
        "nickname": "Syracuse"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Tarleton St.",
        "nickname": "Tarleton St."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Temple",
        "nickname": "Temple"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Tennessee",
        "nickname": "Tennessee"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Tennessee St.",
        "nickname": "Tennessee St."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Tennessee Tech",
        "nickname": "Tennessee Tech"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "University of Texas Austin",
        "nickname": "Texas"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Texas A&M",
        "nickname": "Texas A&M"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Texas A&M University Commerce",
        "nickname": "Tex. A&M-Commerce"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Texas A&M-Corpus Christi",
        "nickname": "A&M-Corpus Christi"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Texas Southern",
        "nickname": "Texas Southern"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Texas St.",
        "nickname": "Texas St."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Texas Tech",
        "nickname": "Texas Tech"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Toledo",
        "nickname": "Toledo"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Towson",
        "nickname": "Towson"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Troy",
        "nickname": "Troy"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Tulane",
        "nickname": "Tulane"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Tulsa",
        "nickname": "Tulsa"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "UC Davis",
        "nickname": "UC Davis"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Texas Christian University",
        "nickname": "TCU"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "US Military Acadamy",
        "nickname": "Military"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "University of Akron",
        "nickname": "Akron"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "University of Alabama",
        "nickname": "Alabama"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "University of Alabama - Birmingham",
        "nickname": "UAB"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "University of California Berkeley",
        "nickname": "California"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "UC Irvine",
        "nickname": "UC Irvine"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "UCLA",
        "nickname": "UCLA"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "UC Riverside",
        "nickname": "UC Riverside"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "UC San Diego",
        "nickname": "UC San Diego"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "UC Santa Barbara",
        "nickname": "UC Santa Barbara"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "University of Central Florida",
        "nickname": "UCF"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "University of Colorado Boulder",
        "nickname": "Colorado"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Farleigh",
        "nickname": "FDU"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "University of Connecticut",
        "nickname": "UConn"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "University of Florida",
        "nickname": "Florida"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "University of Georgia",
        "nickname": "Georgia"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "University of Illinois at Chicago",
        "nickname": "UIC"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "University of Maryland Baltimore County",
        "nickname": "UMBC"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "University of Massachusetts Amherst",
        "nickname": "Amherst"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "University of Minnesota",
        "nickname": "Minnesota"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "University of Mississippi",
        "nickname": "Ole Miss"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "University of Missouri",
        "nickname": "Missouri"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "University of Missouri Kansas City",
        "nickname": "Kansas City"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "University of Montana",
        "nickname": "Montana"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "University of Nebraska Omaha",
        "nickname": "Omaha"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "University of Nevada Las Vegas",
        "nickname": "UNLV"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "University of Nevada Reno",
        "nickname": "Nevada"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "University of North Carolina Greensboro",
        "nickname": "UNC Greensboro"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Cal Poly Slo",
        "nickname": "Cal Poly"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "University of North Carolina Wilmington",
        "nickname": "UNCW"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "University of North Carolina Asheville",
        "nickname": "UNC Asheville"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "NC State",
        "nickname": "NC State"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "University of North Carolina at Chapel Hill",
        "nickname": "Chapel Hill"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "University of North Carolina at Charlotte",
        "nickname": "Charlotte"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "University of North Dakota",
        "nickname": "North Dakota"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "University of North Florida",
        "nickname": "North Florida"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "University of North Texas",
        "nickname": "North Texas"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "University of Northern Colorado",
        "nickname": "Northern Colo."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "University of Northern Iowa",
        "nickname": "UNI"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Notre Dame",
        "nickname": "Notre Dame"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "University of Oklahoma",
        "nickname": "Oklahoma"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "University of South Carolina UpSt.",
        "nickname": "USC Upstate"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "University of South Dakota",
        "nickname": "South Dakota"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "University of South Florida",
        "nickname": "South Fla."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "University of Southern California",
        "nickname": "Southern California"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "University of Southern Indiana",
        "nickname": "Southern Ind."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "University of Southern Mississippi",
        "nickname": "Southern Miss."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "University of Saint Thomas Minnesota",
        "nickname": "St. Thomas (MN)"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "University of Tennessee Chattanooga",
        "nickname": "Chattanooga"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "University of Tennessee Martin",
        "nickname": "UT Martin"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "University of Texas Arlington",
        "nickname": "UT Arlington"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "University of Texas El Paso",
        "nickname": "UTEP"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "University of Texas Rio Grande Valley",
        "nickname": "UTRGV"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "University of Texas San Antonio",
        "nickname": "UTSA"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "University of Utah",
        "nickname": "Utah"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "University of Vermont",
        "nickname": "Vermont"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "University of Virginia",
        "nickname": "Virginia"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "University of Washington",
        "nickname": "Washington"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "University of Wisconsin",
        "nickname": "Wisconsin"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "University of Wisconsin Milwaukee",
        "nickname": "Milwaukee"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "University of Wyoming",
        "nickname": "Wyoming"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Utah St.",
        "nickname": "Utah St."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Utah Tech",
        "nickname": "Utah Tech"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Utah Valley",
        "nickname": "Utah Valley"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Valparaiso University",
        "nickname": "Valparaiso"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Vanderbilt",
        "nickname": "Vanderbilt"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Villanova",
        "nickname": "Villanova"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Virginia Commonwealth University",
        "nickname": "VCU"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Virginia Military Institute",
        "nickname": "VMI"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Virginia Tech",
        "nickname": "Virginia Tech"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Park (AZ)",
        "nickname": "Park (AZ)"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Wagner",
        "nickname": "Wagner"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Wake Forest",
        "nickname": "Wake Forest"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Washington St.",
        "nickname": "Washington St."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Weber St.",
        "nickname": "Weber St."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "West Virginia",
        "nickname": "West Virginia"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Western Carolina",
        "nickname": "Western Caro."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Western Illinois",
        "nickname": "Western Ill."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Western Kentucky",
        "nickname": "Western Ky."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Western Michigan",
        "nickname": "Western Mich."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Wichita St.",
        "nickname": "Wichita St."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "William & Mary",
        "nickname": "William & Mary"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Winthrop",
        "nickname": "Winthrop"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Wofford",
        "nickname": "Wofford"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Wright St.",
        "nickname": "Wright St."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Regent",
        "nickname": "Regent"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Xavier",
        "nickname": "Xavier"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Yale",
        "nickname": "Yale"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Calumet Colorado",
        "nickname": "Calumet Col."
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "West Coast Baptist",
        "nickname": "West Coast Baptist"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "St. Xavier",
        "nickname": "St. Xavier"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "name": "Youngstown St.",
        "nickname": "Youngstown St."
    }
];
var today = 0;

function findTeam(teamName)
{
    return teams.find(obj => {
        return obj.nickname === teamName;
    })
}
function findMonth(monthName)
{
    return months.find(obj => {
        return obj.name === monthName;
    })
}

function parse(month, day)
{
    var url = 'https://www.ncaa.com/scoreboard/basketball-men/d1/2023/'+month+'/'+day+'/all-conf';
    return new Promise((resolve, reject) => {
        request(url, function (
            error,
            response,
            body
        ){
            console.error('error:', error)
            const dom = new jsdom.JSDOM(body);
            //console.log(month, dom.window.document.getElementsByClassName('gamePod_content-pod_container'));
            var table = dom.window.document.getElementsByClassName('gamePod gamePod-type-game status-final');
            console.log(month, day);
            var game;
            var away;
            var home;
            for(const i of table)
            {
                if(table.length < 1)
                {
                    break;
                }
                game = i.querySelector(".gamePod-game-teams").querySelectorAll("li");
                away = game[0];
                home = game[1];
                findTeam(away.querySelector('.gamePod-game-team-name').textContent).games += 1;
                findTeam(home.querySelector('.gamePod-game-team-name').textContent).games += 1;
                findTeam(away.querySelector('.gamePod-game-team-name').textContent).score += parseInt(away.querySelector('.gamePod-game-team-score').textContent) - parseInt(home.querySelector('.gamePod-game-team-score').textContent);
                findTeam(home.querySelector('.gamePod-game-team-name').textContent).score += parseInt(home.querySelector('.gamePod-game-team-score').textContent) - parseInt(away.querySelector('.gamePod-game-team-score').textContent);
                findTeam(away.querySelector('.gamePod-game-team-name').textContent).weightedScore += ((parseInt(away.querySelector('.gamePod-game-team-score').textContent) - parseInt(home.querySelector('.gamePod-game-team-score').textContent) + (findTeam(home.querySelector('.gamePod-game-team-name').textContent).score - findTeam(away.querySelector('.gamePod-game-team-name').textContent).score))/(findTeam(home.querySelector('.gamePod-game-team-name').textContent).games + findTeam(away.querySelector('.gamePod-game-team-name').textContent).games)/2);
                findTeam(home.querySelector('.gamePod-game-team-name').textContent).weightedScore += ((parseInt(home.querySelector('.gamePod-game-team-score').textContent) - parseInt(away.querySelector('.gamePod-game-team-score').textContent) + (findTeam(away.querySelector('.gamePod-game-team-name').textContent).score - findTeam(home.querySelector('.gamePod-game-team-name').textContent).score))/(findTeam(away.querySelector('.gamePod-game-team-name').textContent).games + findTeam(home.querySelector('.gamePod-game-team-name').textContent).games)/2);
            }
            resolve();
        });
    });
}

async function iterator(month)
{
    var monthObj = findMonth(month);
    var day = 0;
    for(var x = 1; x <= monthObj.days; x++)
    {
        if(x < 10)
        {
            day = '0'+x;
        }
        else 
        {
            day = x;
        }
        await parse(monthObj.number, day);
    }
}

async function run() {
    //await iterator("october")
    //await iterator("november")
    //await iterator("december")
    //await iterator("january")
	await iterator("february")
    //await iterator("march")
    //await iterator("april")
    //await iterator("may")
    //await iterator("june")

    var index = 0;
    var team1 = "";
    var spread = "";
    var team2 = "";
    var output = "";
    var today = new Date();
    var day = today.toLocaleDateString();
    console.log(day);

    fs.readFile('./input.txt', 'utf8' , (err, data) => {
        if (err) 
        {
            console.error(err);
            return;
        }
        con.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
            for(var i = 0; i < data.length; i++)
            {
                if(data[i] == "\n")
                {
                    console.log(team1);
                    team1 = teams.find(obj => {
                        return obj.nickname === team1;
                    });
                    console.log(team1)
                    console.log(team2)
                    team2 = teams.find(obj => {
                        return obj.nickname === team2;
                    });
                    console.log(team2)
                    if((team1.score/team1.games + Number(spread) - team2.score/team2.games) >= 5)
                    {
                        output += "Regular: "+team1.nickname+" "+spread+" by "+(team1.score/team1.games + Number(spread) - team2.score/team2.games)+"\n";
                        sql = `INSERT INTO NCAABPICKSTEST(date, picktype, team, spread, spreadby, inj5) VALUES('${day}', 'Regular', '${team1.nickname}', ${Number(spread)}, ${Math.abs(team1.score/team1.games + Number(spread) - team2.score/team2.games)}, 0);`;
                        con.query(sql, function (err, result) {
                            if (err) throw err;
                            console.log("Number of records inserted: " + result.affectedRows);
                        });
                    }
                    else if((team1.score/team1.games + Number(spread) - team2.score/team2.games) <= -5)
                    {
                        output += "Regular: "+team2.nickname+" "+(Number(spread)-(Number(spread)*2))+" by "+(team1.score/team1.games + Number(spread) - team2.score/team2.games)+"\n";
                        sql = `INSERT INTO NCAABPICKSTEST(date, picktype, team, spread, spreadby, inj5) VALUES('${day}', 'Regular', '${team2.nickname}', ${Number(spread)-(Number(spread)*2)}, ${Math.abs(team1.score/team1.games + Number(spread) - team2.score/team2.games)}, 0);`;
                        con.query(sql, function (err, result) {
                            if (err) throw err;
                            console.log("Number of records inserted: " + result.affectedRows);
                        });
                    }
                    if((team1.weightedScore/team1.games + team1.score/team1.games + Number(spread) - team2.weightedScore/team2.games - team2.score/team2.games) >= 5)
                    {
                        output += "Weighted: "+team1.nickname+" "+spread+" by "+(team1.weightedScore/team1.games + team1.score/team1.games + Number(spread) - team2.weightedScore/team2.games - team2.score/team2.games)+"\n";
                        sql = `INSERT INTO NCAABPICKSTEST(date, picktype, team, spread, spreadby, inj5) VALUES('${day}', 'Weighted', '${team1.nickname}', ${Number(spread)}, ${Math.abs(team1.weightedScore/team1.games + team1.score/team1.games + Number(spread) - team2.weightedScore/team2.games - team2.score/team2.games)}, 0);`;
                        con.query(sql, function (err, result) {
                            if (err) throw err;
                            console.log("Number of records inserted: " + result.affectedRows);
                        });
                    }
                    else if((team1.weightedScore/team1.games + team1.score/team1.games + Number(spread) - team2.weightedScore/team2.games - team2.score/team2.games) <= -5)
                    {
                        output += "Weighted: "+team2.nickname+" "+(Number(spread)-(Number(spread)*2))+" by "+(team1.weightedScore/team1.games + team1.score/team1.games + Number(spread) - team2.weightedScore/team2.games - team2.score/team2.games)+"\n";
                        sql = `INSERT INTO NCAABPICKSTEST(date, picktype, team, spread, spreadby, inj5) VALUES('${day}', 'Weighted', '${team2.nickname}', ${Number(spread)-(Number(spread)*2)}, ${Math.abs(team1.weightedScore/team1.games + team1.score/team1.games + Number(spread) - team2.weightedScore/team2.games - team2.score/team2.games)}, 0);`;
                        con.query(sql, function (err, result) {
                            if (err) throw err;
                            console.log("Number of records inserted: " + result.affectedRows);
                        });
                    }
                    index = 0;
                    team1 = "";
                    spread = "";
                    team2 = "";
                }
                else if(data[i+1] == "+" || data[i+1] == "-")
                {
                    index++;
                }
                else if(index == 0)
                {
                    team1 += data[i];
                }
                else if(index == 1)
                {
                    if(data[i] == " ")
                    {
                        index++;
                    }
                    else
                    {
                        spread += data[i];
                    }
                }
                else if(index == 2)
                {
                    team2 += data[i];
                }
            }
            if(output == "")
            {
                output = "No picks :(\n";
            }
            fs.writeFile('./output.txt', output, err => {
                if (err) {
                    console.error(err);
                    return;
                }
            });
        });
    });
};

run();