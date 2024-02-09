CREATE DATABASE IF NOT EXISTS essoccercoachluffy;

USE essoccercoachluffy;

CREATE TABLE teams(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR (40) NOT NULL,
    PRIMARY KEY (id)
);

DESCRIBE teams;

INSERT INTO teams VALUES
    (1, 'Royal Beauport U15FPLSJQ'),
    (2, 'Royal Beauport U14FLDP');

CREATE TABLE users(
    id INT NOT NULL AUTO_INCREMENT,
    firstName VARCHAR(30) NOT NULL,
    lastName VARCHAR(30) NOT NULL,
    email VARCHAR(60) NOT NULL,
    positon ENUM('GK', 'DFC', 'MC', 'ATT'),
    numberPlayer INT,
    birthDate DATE,
    teamId INT,
    PRIMARY KEY (id),
    FOREIGN KEY (teamId)
        REFERENCES teams (id) 
        ON UPDATE RESTRICT 
        ON DELETE CASCADE 
);

DESCRIBE users;

ALTER TABLE users ADD type ENUM('player', 'coach', 'admin');

INSERT INTO users VALUES
    (1, 'Edgar', 'Silvera', 'easo02@hormail.fr', 'DFC', 10, '1993-12-31', 1, 'admin'),
    (2, 'Farid', 'Silvera', 'easo02@hormail.fr', 'DFC', 10, '1993-12-31', 1, 'player');

CREATE TABLE activities(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50),
    type ENUM('game', 'practice', 'other'),
    dateActivity DATETIME,
    teamId INT,
    userCreateId INT,
    EPR INT,
    PRIMARY KEY (id),
    FOREIGN KEY (teamId)
        REFERENCES teams (id) 
        ON UPDATE RESTRICT 
        ON DELETE CASCADE,
    FOREIGN KEY (userCreateId)
        REFERENCES users (id) 
        ON UPDATE RESTRICT 
        ON DELETE CASCADE
);

DESCRIBE activities;

CREATE TABLE userActivity(
    id INT NOT NULL AUTO_INCREMENT,
    activityId INT,
    userId INT,
    EPR INT,
    notes VARCHAR(255),
    PRIMARY KEY (id),
    FOREIGN KEY (activityId)
        REFERENCES activities (id) 
        ON UPDATE RESTRICT 
        ON DELETE CASCADE,
    FOREIGN KEY (userId)
        REFERENCES users (id) 
        ON UPDATE RESTRICT 
        ON DELETE CASCADE
);

DESCRIBE userActivity;

CREATE TABLE userTeam(
    id INT NOT NULL AUTO_INCREMENT,
    teamId INT,
    userId INT,
    PRIMARY KEY (id),
    FOREIGN KEY (teamId)
        REFERENCES teams (id) 
        ON UPDATE RESTRICT 
        ON DELETE CASCADE,
    FOREIGN KEY (userId)
        REFERENCES users (id) 
        ON UPDATE RESTRICT 
        ON DELETE CASCADE
);

DESCRIBE userTeam;

ALTER TABLE userTeam ADD access ENUM('player', 'coach', 'admin');
