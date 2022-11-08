DROP TABLE IF EXISTS USERPICKS;
CREATE TABLE IF NOT EXISTS USERPICKS (
	username VARCHAR(30) NOT NULL,
    week INT NOT NULL,
    pickteam VARCHAR (45) NOT NULL,
    betamount INT,
    hit INT,
    gain INT,
    balance INT,
    PRIMARY KEY (username, week, pickteam)
);

INSERT INTO USERPICKS (username, week, pickteam, betamount, hit, gain, balance)
VALUES ('firstacc','1','Kansas City Chiefs','100','1','50','150');
INSERT INTO USERPICKS (username, week, pickteam, betamount, hit, gain, balance)
VALUES ('firstacc','2','Kansas City Chiefs','150','1','75','225');
INSERT INTO USERPICKS (username, week, pickteam, betamount, hit, gain, balance)
VALUES ('firstacc','3','Kansas City Chiefs','200','0','-100','125');
INSERT INTO USERPICKS (username, week, pickteam, betamount, hit, gain, balance)
VALUES ('firstacc','4','Kansas City Chiefs','120','1','60','185');
INSERT INTO USERPICKS (username, week, pickteam, betamount, hit, gain, balance)
VALUES ('firstacc','5','Kansas City Chiefs','150','1','75','260');
INSERT INTO USERPICKS (username, week, pickteam, betamount, hit, gain, balance)
VALUES ('firstacc','6','Kansas City Chiefs','260','0','-130','130');
INSERT INTO USERPICKS (username, week, pickteam, betamount, hit, gain, balance)
VALUES ('firstacc','7','Kansas City Chiefs','130','1','70','200');
