DROP TABLE IF EXISTS PICKS;
CREATE TABLE IF NOT EXISTS PICKS (
        week INT(2) NOT NULL,
        picktype VARCHAR(20),
        team VARCHAR(40) NOT NULL,
        spread DECIMAL(3,1),
        spreadby DECIMAL(5,3),
        inj VARCHAR(10),
        hit VARCHAR(5),
        PRIMARY KEY (team,picktype)
);
INSERT INTO PICKS (week, picktype, team, spread, spreadby, hit)
VALUES('5', 'ATS:', 'New York Giants', '8.5', '15.25', '+');
INSERT INTO PICKS (week, picktype, team, spread, spreadby, hit)
VALUES('5', 'ATS:', 'Cleveland Browns', '2.5', '13', '+');
INSERT INTO PICKS (week, picktype, team, spread, spreadby, hit)
VALUES('5', 'ATS:', 'Seattle Seahawks', '4.5', '15.5', 'x');
INSERT INTO PICKS (week, picktype, team, spread, spreadby, hit)
VALUES('5', 'ATS:', 'Atlanta Falcons', '9.5', '13.5', '+');
INSERT INTO PICKS (week, picktype, team, spread, spreadby, hit)
VALUES('5', 'Regular:', 'Dallas Cowboys', '5.5', '13.75', '+');
INSERT INTO PICKS (week, picktype, team, spread, spreadby, hit)
VALUES('5', 'Weighted:', 'Dallas Cowboys', '5.5', '11.45833333', '+');
INSERT INTO PICKS (week, picktype, team, spread, spreadby, hit)
VALUES('5', 'ATS:', 'Dallas Cowboys', '5.5', '13.75', '+');

DROP TABLE IF EXISTS SCORES;
CREATE TABLE IF NOT EXISTS SCORES (
        week INT(2) NOT NULL,
        team1 VARCHAR(40) NOT NULL,
        team1scores INT(4),
        team2 VARCHAR(40) NOT NULL,
        team2scores INT(4),
        PRIMARY KEY (week, team1, team2)
);
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('1', 'Buffalo Bills','31','Los Angeles Rams','10');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('1', 'New Orleans Saints','27','Atlanta Falcons','26');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('1', 'Cleveland Browns','26','Carolina Panthers','24');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('1', 'Chicago Bears','19','San Francisco 49ers','10');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('1', 'Pittsburgh Steelers','23','Cincinnati Bengals','20');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('1', 'Philadelphia Eagles','38','Detroit Lions','35');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('1', 'Indianapolis Colts','20','Houston Texans','20');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('1', 'Miami Dolphins','20','New England Patriots','7');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('1', 'Baltimore Ravens','24','New York Jets','9');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('1', 'Washington Commanders','28','Jacksonville Jaguars','22');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('1', 'Kansas City Chiefs','44','Arizona Cardinals','21');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('1', 'Minnesota Vikings','23','Green Bay Packers','7');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('1', 'New York Giants','21','Tennessee Titans','20');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('1', 'Los Angeles Chargers','24','Las Vegas Raiders','19');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('1', 'Tampa Bay Buccaneers','19','Dallas Cowboys','3');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('1', 'Seattle Seahawks','17','Denver Broncos','16');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('2', 'Kansas City Chiefs','27','Los Angeles Chargers','24');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('2', 'New York Jets','31','Cleveland Browns','30');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('2', 'Detroit Lions','36','Washington Commanders','27');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('2', 'Jacksonville Jaguars','24','Indianapolis Colts','0');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('2', 'Tampa Bay Buccaneers','20','New Orleans Saints','10');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('2', 'New York Giants','19','Carolina Panthers','16');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('2', 'New England Patriots','17','Pittsburgh Steelers','14');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('2', 'Miami Dolphins','42','Baltimore Ravens','38');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('2', 'Los Angeles Rams','31','Atlanta Falcons','27');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('2', 'San Francisco 49ers','27','Seattle Seahawks','7');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('2', 'Dallas Cowboys','20','Cincinnati Bengals','17');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('2', 'Denver Broncos','16','Houston Texans','9');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('2', 'Arizona Cardinals','29','Las Vegas Raiders','23');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('2', 'Green Bay Packers','27','Chicago Bears','10');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('2', 'Buffalo Bills','41','Tennessee Titans','7');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('2', 'Philadelphia Eagles','24','Minnesota Vikings','7');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('3', 'Cleveland Browns','29','Pittsburgh Steelers','17');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('3', 'Carolina Panthers','22','New Orleans Saints','14');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('3', 'Chicago Bears','23','Houston Texans','20');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('3', 'Indianapolis Colts','20','Kansas City Chiefs','17');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('3', 'Miami Dolphins','21','Buffalo Bills','19');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('3', 'Minnesota Vikings','28','Detroit Lions','24');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('3', 'Baltimore Ravens','37','New England Patriots','26');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('3', 'Cincinnati Bengals','27','New York Jets','12');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('3', 'Tennessee Titans','24','Las Vegas Raiders','22');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('3', 'Philadelphia Eagles','24','Washington Commanders','8');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('3', 'Jacksonville Jaguars','38','Los Angeles Chargers','10');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('3', 'Los Angeles Rams','20','Arizona Cardinals','12');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('3', 'Atlanta Falcons','27','Seattle Seahawks','23');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('3', 'Green Bay Packers','14','Tampa Bay Buccaneers','12');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('3', 'Denver Broncos','11','San Francisco 49ers','10');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('3', 'Dallas Cowboys','23','New York Giants','16');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('4', 'Cincinnati Bengals','27','Miami Dolphins','15');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('4', 'Minnesota Vikings','28','New Orleans Saints','25');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('4', 'Atlanta Falcons','23','Cleveland Browns','20');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('4', 'Tennessee Titans','24','Indianapolis Colts','17');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('4', 'Dallas Cowboys','25','Washington Commanders','10');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('4', 'Seattle Seahawks','48','Detroit Lions','45');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('4', 'Los Angeles Chargers','34','Houston Texans','24');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('4', 'New York Giants','20','Chicago Bears','12');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('4', 'Philadelphia Eagles','29','Jacksonville Jaguars','21');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('4', 'New York Jets','24','Pittsburgh Steelers','20');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('4', 'Buffalo Bills','23','Baltimore Ravens','20');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('4', 'Arizona Cardinals','26','Carolina Panthers','16');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('4', 'Green Bay Packers','27','New England Patriots','24');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('4', 'Las Vegas Raiders','32','Denver Broncos','23');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('4', 'Kansas City Chiefs','41','Tampa Bay Buccaneers','31');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('4', 'San Francisco 49ers','24','Los Angeles Rams','9');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('5', 'Indianapolis Colts','12','Denver Broncos','9');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('5', 'New York Giants','27','Green Bay Packers','22');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('5', 'Buffalo Bills','38','Pittsburgh Steeler','3');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('5', 'Los Angeles Chargers','30','Cleveland Browns','28');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('5', 'Houston Texans','13','Jacksonville Jaguars','6');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('5', 'Minnesota Vikings','29','Chicago Bears','22');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('5', 'New Orleans Saints','39','Seattle Seahawks','32');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('5', 'New England Patriots','29','Detroit Lions ','0');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('5', 'New York Jets','40','Miami Dolphins','17');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('5', 'Tampa Bay Buccaneers','21','Atlanta Falcons','15');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('5', 'Tennessee Titans','21','Washington Commanders','17');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('5', 'San Francisco 49ers','37','Carolina Panthers','15');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('5', 'Philadelphia Eagles','20','Arizona Cardinals','17');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('5', 'Dallas Cowboys','22','Los Angeles Rams','10');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('5', 'Baltimore Ravens','19','Cincinnati Bengals','17');
INSERT INTO SCORES (week, team1, team1scores, team2, team2scores)
VALUES('5', 'Kansas City Chiefs','30','Las Vegas Raiders','29');

DROP TABLE IF EXISTS SPREADS;
CREATE TABLE IF NOT EXISTS SPREADS (
        week INT(2) NOT NULL,
        away VARCHAR(40) NOT NULL,
        awayspread DECIMAL(3,1),
        home VARCHAR(40) NOT NULL,
        homespread DECIMAL(3,1),
        PRIMARY KEY (week, away, home)
);
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('1','Buffalo Bills','-2.5','Los Angeles Rams','+2.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('1','New Orleans Saints','-4.5','Atlanta Falcons','+4.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('1','Cleveland Browns','+0.5','Carolina Panthers','-0.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('1','San Francisco 49ers','-6.5','Chicago Bears','+6.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('1','Pittsburgh Steelers','+6.5','Cincinnati Bengals','-6.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('1','Philadelphia Eagles','-3.5','Detroit Lions','+3.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('1','Indianapolis Colts','-7.5','Houston Texans','+7.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('1','New England Patriots','+3.5','Miami Dolphins','-3.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('1','Baltimore Ravens','-7.5','New York Jets','+7.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('1','Jacksonville Jaguars','+2.5','Washington Commanders','-2.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('1','New York Giants','+5.5','Tennessee Titans','-5.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('1','Kansas City Chiefs','-5.5','Arizona Cardinals','+5.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('1','Las Vegas Raiders','+3.5','Los Angeles Chargers','-3.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('1','Green Bay Packers','-1.5','Minnesota Vikings','+1.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('1','Tampa Bay Buccaneers','-2.5','Dallas Cowboys','+2.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('1','Denver Broncos','-6.5','Seattle Seahawks','+6.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('2','Los Angeles Chargers','4.0','Kansas City Chiefs','-4.0');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('2','Miami Dolphins','+3.5','Baltimore Ravens','-3.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('2','New York Jets','+6.5','Cleveland Browns','-6.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('2','Washington Commanders','+0.5','Detroit Lions','-0.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('2','Indianapolis Colts','-3.5','Jacksonville Jaguars','+3.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('2','Tampa Bay Buccaneers','-2.5','New Orleans Saints','+2.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('2','Carolina Panthers','-1.5','New York Giants','+1.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('2','New England Patriots','-2.5','Pittsburgh Steelers','+2.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('2','Atlanta Falcons','+9.5','Los Angeles Rams','-9.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('2','Seattle Seahawks','+8.5','San Francisco 49ers','-8.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('2','Cincinnati Bengals','-6.5','Dallas Cowboys','+6.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('2','Houston Texans','+10.5','Denver Broncos','-10.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('2','Arizona Cardinals','+5.5','Las Vegas Raiders','-5.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('2','Chicago Bears','+10.5','Green Bay Packers','-10.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('2','Tennessee Titans','+9.5','Buffalo Bills','-9.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('2','Minnesota Vikings','+2.5','Philadelphia Eagles','-2.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('3','Pittsburgh Steelers','+3.5','Cleveland Browns','-3.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('3','New Orleans Saints','-2.5','Carolina Panthers','+2.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('3','Houston Texans','+2.5','Chicago Bears','-2.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('3','Kansas City Chiefs','-5.5','Indianapolis Colts','+5.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('3','Buffalo Bills','-4.5','Miami Dolphins','+4.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('3','Detroit Lions','+6.5','Minnesota Vikings','-6.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('3','Baltimore Ravens','-2.5','New England Patriots','+2.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('3','Cincinnati Bengals','-6.5','New York Jets','+6.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('3','Las Vegas Raiders','-1.5','Tennessee Titans','+1.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('3','Philadelphia Eagles','-6.5','Washington Commanders','+6.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('3','Jacksonville Jaguars','+3.5','Los Angeles Chargers','-3.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('3','Los Angeles Rams','-3.5','Arizona Cardinals','+3.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('3','Atlanta Falcons','+1.5','Seattle Seahawks','-1.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('3','Green Bay Packers','+1.5','Tampa Bay Buccaneers','-1.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('3','San Francisco 49ers','-1.5','Denver Broncos','+1.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('3','Dallas Cowboys','+0.5','New York Giants','-0.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('4','Miami Dolphins','+4.5','Cincinnati Bengals','-4.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('4','Minnesota Vikings','-3.5','New Orleans Saints','+3.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('4','Cleveland Browns','-1.5','Atlanta Falcons','+1.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('4','Buffalo Bills','-3.5','Baltimore Ravens','+3.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('4','Washington Commanders','+3.5','Dallas Cowboys','-3.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('4','Seattle Seahawks','+3.5','Detroit Lions','-3.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('4','Los Angeles Chargers','-5.5','Houston Texans','+5.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('4','Tennessee Titans','+3.5','Indianapolis Colts','-3.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('4','Chicago Bears','+2.5','New York Giants','-2.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('4','Jacksonville Jaguars','+6.5','Philadelphia Eagles','-6.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('4','New York Jets','+3.5','Pittsburgh Steelers','-3.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('4','Arizona Cardinals','+0.5','Carolina Panthers','-0.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('4','New England Patriots','+9.5','Green Bay Packers','-9.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('4','Denver Broncos','+2.5','Las Vegas Raiders','-2.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('4','Kansas City Chiefs','+0.5','Tampa Bay Buccaneers','-0.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('4','Los Angeles Rams','+1.5','San Francisco 49ers','-1.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('5','Indianapolis Colts','+3.5','Denver Broncos','-3.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('5','New York Giants','+8.5','Green Bay Packers','-8.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('5','Pittsburgh Steelers','+13.','Buffalo Bills ','13.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('5','Los Angeles Chargers','-2.5','Cleveland Browns','+2.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('5','Houston Texans','+6.5','Jacksonville Jaguars','-6.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('5','Chicago Bears','+7.5','Minnesota Vikings','-7.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('5','Detroit Lions','+3.5','New England Patriots','-3.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('5','Seattle Seahawks','+4.5','New Orleans Saints','-4.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('5','Miami Dolphins','-3.5','New York Jets','+3.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('5','Atlanta Falcons','+9.5','Tampa Bay Buccaneers','-9.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('5','Tennessee Titans','-1.5','Washington Commanders','+1.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('5','San Francisco 49ers','-6.5','Carolina Panthers','+6.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('5','Philadelphia Eagles','-5.5','Arizona Cardinals','+5.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('5','Dallas Cowboys','+5.5','Los Angeles Rams','-5.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('5','Cincinnati Bengals','+3.5','Baltimore Ravens','-3.5');
INSERT INTO SPREADS (week, away, awayspread, home, homespread)
VALUES ('5','Las Vegas Raiders','+7.5','Kansas City Chiefs','-7.5');

DROP TABLE IF EXISTS TEAMS;
CREATE TABLE IF NOT EXISTS TEAMS (
        games INT(2) NOT NULL,
        scores INT(4) NOT NULL,
        weightedscore DECIMAL(5,3),
        ats INT(4),
        mascot VARCHAR(20),
        names VARCHAR(40),
        PRIMARY KEY (names)
);
INSERT INTO TEAMS (games, scores, weightedscore,ats,mascot,names)
VALUES ('5','-36','-1.41666666','-23.5','Rams','Los Angeles Rams');
INSERT INTO TEAMS (games, scores, weightedscore,ats,mascot,names)
VALUES('5','-27','-21.6666666','5.5','Seahawks','Seattle Seahawks');
INSERT INTO TEAMS (games, scores, weightedscore,ats,mascot,names)
VALUES('5','47','40.16666667','14.5','49ers','San Francisco 49ers');
INSERT INTO TEAMS (games, scores, weightedscore,ats,mascot,names)
VALUES('5','-18','24.08333333','9.5','Cardinals','Arizona Cardinals');
INSERT INTO TEAMS (games, scores, weightedscore,ats,mascot,names)
VALUES('5','34','-17.9166666','6.5','Chiefs','Kansas City Chiefs');
INSERT INTO TEAMS (games, scores, weightedscore,ats,mascot,names)
VALUES('5','-5','-19.0833333','12.5','Raiders','Las Vegas Raiders');
INSERT INTO TEAMS (games, scores, weightedscore,ats,mascot,names)
VALUES('5','-14','23.83333333','-31.5','Chargers','Los Angeles Chargers');
INSERT INTO TEAMS (games, scores, weightedscore,ats,mascot,names)
VALUES('5','-5','-14.6666666','-37.5','Broncos','Denver Broncos');
INSERT INTO TEAMS (games, scores, weightedscore,ats,mascot,names)
VALUES('5','20','-10.8333333','7.5','Buccaneers','Tampa Bay Buccaneers');
INSERT INTO TEAMS (games, scores, weightedscore,ats,mascot,names)
VALUES('5','-13','10.66666667','-35.5','Saints','New Orleans Saints');
INSERT INTO TEAMS (games, scores, weightedscore,ats,mascot,names)
VALUES('5','-4','-23.33333333','18.5','Falcons','Atlanta Falcons');
INSERT INTO TEAMS (games, scores, weightedscore,ats,mascot,names)
VALUES('5','-29','-29.33333333','-31.5','Panthers','Carolina Panthers');
INSERT INTO TEAMS (games, scores, weightedscore,ats,mascot,names)
VALUES('5','-13','-5.333333333','24.5','Texans','Houston Texans');
INSERT INTO TEAMS (games, scores, weightedscore,ats,mascot,names)
VALUES('5','-22','14','-49.5','Titans','Tennessee Titans');
INSERT INTO TEAMS (games, scores, weightedscore,ats,mascot,names)
VALUES('5','-25','-3.5','-62.5','Colts','Indianapolis Colts');
INSERT INTO TEAMS (games, scores, weightedscore,ats,mascot,names)
VALUES('5','31','11.16666667','43.5','Jaguars','Jacksonville Jaguars');
INSERT INTO TEAMS (games, scores, weightedscore,ats,mascot,names)
VALUES('5','1','30.25','-6.5','Packers','Green Bay Packers');
INSERT INTO TEAMS (games, scores, weightedscore,ats,mascot,names)
VALUES('5','13','-7.916666667','20.5','Vikings','Minnesota Vikings');
INSERT INTO TEAMS (games, scores, weightedscore,ats,mascot,names)
VALUES('5','-20','-39.08333333','12.5','Bears','Chicago Bears');
INSERT INTO TEAMS (games, scores, weightedscore,ats,mascot,names)
VALUES('5','-30','-38.58333333','-12.5','Lions','Detroit Lions');
INSERT INTO TEAMS (games, scores, weightedscore,ats,mascot,names)
VALUES('5','8','-20.66666667','10.5','Browns','Cleveland Browns');
INSERT INTO TEAMS (games, scores, weightedscore,ats,mascot,names)
VALUES('5','19','4.833333333','-13.5','Bengals','Cincinnati Bengals');
INSERT INTO TEAMS (games, scores, weightedscore,ats,mascot,names)
VALUES('5','-51','-54.16666667','-18.5','Steelers','Pittsburgh Steelers');
INSERT INTO TEAMS (games, scores, weightedscore,ats,mascot,names)
VALUES('5','21','19.33333333','-16.5','Ravens','Baltimore Ravens');
INSERT INTO TEAMS (games, scores, weightedscore,ats,mascot,names)
VALUES('5','21','29.91666667','33.5','Cowboys','Dallas Cowboys');
INSERT INTO TEAMS (games, scores, weightedscore,ats,mascot,names)
VALUES('5','47','37.08333333','29.5','Eagles','Philadelphia Eagles');
INSERT INTO TEAMS (games, scores, weightedscore,ats,mascot,names)
VALUES('5','10','-1.916666667','37.5','Giants','New York Giants');
INSERT INTO TEAMS (games, scores, weightedscore,ats,mascot,names)
VALUES('5','-38','-29.16666667','-50.5','Commanders','Washington Commanders');
INSERT INTO TEAMS (games, scores, weightedscore,ats,mascot,names)
VALUES('5','-16','-6.333333333','-33.5','Dolphins','Miami Dolphins');
INSERT INTO TEAMS (games, scores, weightedscore,ats,mascot,names)
VALUES('5','5','45.25','22.5','Patriots','New England Patriots');
INSERT INTO TEAMS (games, scores, weightedscore,ats,mascot,names)
VALUES('5','91','21.66666667','78.5','Bills','Buffalo Bills');
INSERT INTO TEAMS (games, scores, weightedscore,ats,mascot,names)
VALUES('5','-2','32.66666667','35.5','Jets','New York Jets');
