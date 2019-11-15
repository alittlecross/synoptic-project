# Quiz Manager

## Environmental Variables

APORT=[will default to 3000 if not set differently]  

DBCDATABASE=[quiz_manager or db name of your choice]  
DBCHOST=[will default to 127.0.0.1 if not set differently]  
DBCPASSWORD=[optional]  
DBCPORT=[will default to 5432 if not set differently]  
DBCUSER=[optional]  

SESSIONSECRET=[advised]

## Getting Started

In the location of your choice, in Terminal:

`git clone git@github.com:alittlecross/synoptic-project.git`

Assuming you have Node.js and NPM installed, in that location, in Terminal:

`npm install`

## Database Setup

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

## Usage

See '4.user-guide.mp4' in the documentation folder.

## Running Unit Tests

In Terminal:

`npm test`

## Running Feature Tests

<details>
<summary>PREREQUISITES</summary>

You must use Node.js version 10.x or above. Visit [Node.js](https://nodejs.org/en/) and choose the version for your system.

You must have the Java Development Kit installed. Visit [Oracle](https://www.oracle.com/technetwork/java/javase/downloads/jdk12-downloads-5295953.html) and choose the version for your system.

**Note:** if prompted by your system to install JDK, do not install the version your system recommends; please follow the link above.

</details>

**Note** there must be an instance of the application running in another Terminal window.

In Terminal:

`npm run wdio`

## Branding, Logo, and Colors

So as to make it easy to change, the brand name on each page is only writen in one location, in the _branding.ejs file in the /server/views folder.

The logo is saved in the /server/public folder.

CSS properties relating to style have been grouped together at the top of the main.css file in the /server/public folder.
