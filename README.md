# Mariocart elo rating system

This Project has been developed by:
```
Gulleik L Olsen          gulleik.olsen@startntnu.no        Software Engineer @ Gutta Consulting
Johan M E Johnsen        johan.johnsen@startntnu.no        Software Engineer @ Gutta Consulting
Erling F Olweus          erling.olweus@startntnu.no        Software Engineer @ Gutta Consulting
```


## Project description
**This website was created to provide a ranking system for mario cart in Start NTNU**  
The project has been implemented with the following criteria:

  - **Players skill should be calculated using the Elo Algorithm**  
     One can read about the ELO algorithm here: https://en.wikipedia.org/wiki/Elo_rating_system.
  - **The website should be intuitive, minimalistic and easy to use**  
     The basics.
  - **All players should be able to change their main on the website**  
     In the first itteration this will be the only possible way to edit your profile

This is an react app runnning with a node backend. The project users a mongodb server which is to be hosted in atlas, the backend connects to this server using express. 

## Usage
**Prerequisites for running the program**
- Download and install node.js
- run npm install package.json file (install everything needed)
- create and start a mongoose server (https://mongoosejs.com/)
- Create a config folder in the root directory where you add a dev.env file.
   - Add PORT and MONGODB_URL to this file and set those values
- run npm run dev from the root directory in order to start the dev server.
- run "npm start" in order to start the frontend.


## Our system

### APP.js
The main application

### Scoring_functions.js
Functions for editing a player score based on a match

### datagreier.js
Johan / erling vet

