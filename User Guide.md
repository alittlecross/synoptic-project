# BCS Digital Industries Apprenticeship

## Software Developer Synoptic Project - Quiz Manager

### User Guide

#### Environmental Variables

APORT=[will default to 3000 if not set differently]  

DBCDATABASE=[quiz_manager or db name of your choice]  
DBCHOST=[will default to 127.0.0.1 if not set differently]  
DBCPASSWORD=[optional]  
DBCPORT=[will default to 5432 if not set differently]  
DBCUSER=[optional]  

SESSIONSECRET=[advised]

#### Getting Started

In the location of your choice, in Terminal:

`mkdir [your folder name] && cd [your folder name]`

Assuming you have Node.js and NPM installed, in that location, in Terminal:

`npm install`

#### Database Setup

Assuming you have Postgres installed, in Terminal:

`psql postgres`

Once Postgres is running, in Terminal:

`CREATE DATABASE [quiz_manager or db name of your choice];`

To close Postgress, in Terminal:

`\q`

To create the scructure of the database, in Terminal:

`npm run migrations`

The database will be created without data. To populate some seed data, in Terminal:

`npm run seeds`
