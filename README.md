# Epicdemic by Set C Studios
Team 29, COMP 2800, Winter Term B 2020

Made by 
* Jon Andre Briones (Term 2, CST)
* Brian Li (Term 2, CST)
* Mengdi (Mandy) Jin (Term 1, CST)
* Andi Hung (Term 1, CST)

## Table of Contents
- [Technology used <a name="technology-used"></a>](#technology-used--a-name--technology-used----a-)
- [Node packages to install <a name="node-packages-to-install"></a>](#node-packages-to-install--a-name--node-packages-to-install----a-)
- [Set-up <a name="set-up"></a>](#set-up--a-name--set-up----a-)
- [Phaser <a name="phaser"></a>](#phaser--a-name--phaser----a-)
- [Testing <a name="testing"></a>](#testing--a-name--testing----a-)

<small><i><a href='http://ecotrust-canada.github.io/markdown-toc/'>Table of contents generated with markdown-toc</a></i></small>


## Technology used <a name="technology-used"></a> 
* Phaser 3 (game framework)
* Node.js (server framework)
* MySQL (database)
* Visual Studio Code (text editor)
* Heroku (hosting)

## Node packages to install <a name="node-packages-to-install"></a>
* Bcrypt
* Body-parser
* Connect-flash
* Cookie-parser
* MySQL
* Ejs (viewer)
* Express
* Morgan
* Passport

## Set-up <a name="set-up"></a>
1. Download Node.js at this <a href="https://nodejs.org/en/download/">link</a> and install
1. Download <a href="https://code.visualstudio.com/">Visual Studio Code</a> or any text editor/IDE of your choice 
1. Clone the repository onto your machine and in command line navigate to the repository
1. Execute `npm install` in command line to install all dependencies
1. Run the web app locally by executing `node server.js` in command line
1. Open a web browser (Firefox or Chrome is recommended)
1. Navigate to the local web page by entering `localhost:5000` into your browser's URL bar
1. You may change database credentials by navigating to `config/database.js` and entering your own SQL server info there
1. App may be hosted by the user in any way they wish, we used <a href="https://id.heroku.com/login">Heroku</a> and set our <a href="https://github.com/">GitHub</a> repo to automatically deploy to Heroku. A guide to auto-deploying onto Heroku from GitHub can be found <a href="https://devcenter.heroku.com/articles/github-integration">here</a>

## Phaser <a name="phaser"></a>
<a href="https://phaser.io/">Phaser</a> is a free software 2D game framework for making HTML5 games for desktop and mobile, developed by Photon Storm. The game is coded in JavaScript and run through a web browser.
<a href="https://phaser.io/learn">Here</a> is a link to Phaser's starting tutorial if you'd like to learn the basics.

## Testing <a name="testing"></a>
Tests on the website were done by checking database values after logins and registrations.

Tests were run manually in the game by checking if each scene worked with all of its objects. 

A list of tests done were done <a href="https://docs.google.com/spreadsheets/d/1loZcIsb8LnUG1y6_IrD0UHc3pTqBbnQSmxRWetOtO9c/edit?usp=sharing">here</a>