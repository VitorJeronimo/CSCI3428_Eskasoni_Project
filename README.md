# CSCI3428 - Saint Mary's University: Eskasoni Project
This project is a version of a Mi’kmaw Scattergories game called *Aij?*, 
developed for the Mi’kmaw community at Eskasoni.

## About *Aij?*
The project is based on the Scattergories game, which is a competitive game that
requires players to actively recall words, strengthening the connections to
those words.

*Aij?* is presented 100% in the Mi'kmaw language and it is aimed towards
people from any age group that are trying to learn the language.

Our goal is to encourage students in the Mi'kmaw community to immerse themselves
into the language and spend more time working on their vocabulary, while also having
fun!

## Installation
- Requires [NodeJS](https://nodejs.org/en/download/) v14+

Clone this repository with `git clone https://github.com/VitorJeronimo/CSCI3428_Eskasoni_Project.git` or download the source code from https://github.com/VitorJeronimo/CSCI3428_Eskasoni_Project
> Before proceeding, don't forget to change the hostname on`client/src/App.js` and `server/server.js` to `http://localhost:PORT`, or the address to your server.

After that, go to the project's directory and run the `build_app.sh` script to install all required dependencies and build the application.
```
cd CSCI3428_Eskasoni_Project
chmod +x build_app.sh
./build_app.sh
npm start
```
The app will be available on `localhost:PORT` if you chose to run it locally, or `YOUR_SERVER_ADDRESS:PORT` if you are running the app on a production server.

