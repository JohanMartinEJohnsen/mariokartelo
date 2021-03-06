var EloRating = require('elo-rating');


// Demo 

players = create4Players()
players[1]['Rating'] = 1400
console.log(players)
console.log(calcWinProbs(players));
console.log(updateScore(players));



// Functions


/* Function to update score of players
 - Players; is a list of dictionaries sorted from first to last place, the dictionaries must include a key named Rating
 - Draw; is a list of booleans in case of draw. Set draw = true for the players who are drawed. ex = [false,treu,true,false] for a draw on second place
 - k; is the sensitivity of the scoring function, higher k => bigger scorechanges. Deafult = 40
 returns the list of players with updated ratings
*/
function updateScore(players, draw = null, k = 40){
  numPlayers = players.length;
  if(draw == null){
    draw = []
    for(var i=0;i< numPlayers; i++){
      draw.push(false);
    }
  }
  
  score = calcScore(players, draw);
  for(var player=0; player < numPlayers; player++){
    players[player]['Rating'] = players[player]['Rating'] + k * score[player];
  }
  return players;
}

/* Function to calculate win probabilities
 - Players; is a list of dictionaries sorted from first to last place, the dictionaries must include a key named Rating
 returns the list of probabilities of player with that given index to be placed first. the probabilites should sum to one.
*/
function calcWinProbs(players){
  winProbs = [];
  winProbSum = 0;
  numPlayers = players.length;
  if(numPlayers > 4){
    print("WinProbability can be calculated for maximum 4 players");
    return -1;
  }
  for(var player = 0; player < numPlayers; player++){
    winProb = 1;
    for(var oponent = 0; oponent < numPlayers; oponent++){
      if(player !=  oponent){
        winProb *= EloRating.expected(players[player]['Rating'], players[oponent]['Rating']);
      }
    }
    winProbs.push(winProb);
    winProbSum += winProb;
  }

  return winProbs.map(x => x /winProbSum);
}



//Test functions

// Creates a new player with a score of 1000
function createPlayer(name) {
  name = name.split(" ");
  firstName = name[0];
  if (name.length == 1){
    lastName = ""
  }else{
    lastName = name[name.length -1];
  }
      
  var dict = {
      "Name": firstName + " " + lastName,
      "Rating": 1000
    };
    return dict   
}

// calls createPlayer 4 times
function create4Players() {
  players = [];
  for (var i = 0; i < 4; i++) {
    players.push(createPlayer("player" + String(i)));
  }
  return players;
}
 



//Support functions

// Calculates player expected score based on ranking and ranking of oponents
function calcExpectedScore(players){
  expScores = [];
  numPlayers = players.length;
  if(numPlayers > 4){
    print("WinProbability can be calculated for maximum 4 players");
    return -1;
  }

  for(var player = 0; player < numPlayers; player++){
    expScore = 0;
    for(var oponent = 0; oponent < numPlayers; oponent++){
      if(player !=  oponent){
        expScore += EloRating.expected(players[player]['Rating'], players[oponent]['Rating']);
      }
    }
    expScores.push(expScore);
  }
  return expScores;
}

// Calculates number of true boleans in an array
function countTrue(array){
  var numTrue = 0;
  for(var i = 0; i < array.length; i++){
    if(array[i]){
      numTrue++;
    }
  }
  return numTrue
}

// Calculates player score based on results from match
function calcActualScore(players, draw){
  numPlayers = players.length;
  actScores = [];
  if(draw.includes(true)){
    var numTrue = countTrue(draw);
    if(numTrue == 2){
      if(numPlayers == 2){
        actScores = [0.5, 0.5];
      }else if(numPlayers == 3){
        if(draw[0] == true){
          actScores = [2, 0.5, 0.5];
        }else{
          actScores = [1.5, 1.5, 0];
        }
      }else{
        if(draw[0] == true){
          actScores = [2.5, 2.5, 1, 0];
        }else if(draw[3] == true){
          actScores = [3, 2, 0.5, 0.5];
        }else{
          actScores = [3, 1.5, 1.5, 0];
        }
      }
    }else if(numTrue == 3){
      if(numplayers == 3){
        actScores = [1, 1, 1];
      }else{
        if(draw[0] == true){
          actScores = [2, 2, 2, 0];
        }else{
          actScores = [3, 1, 1, 1];
        }
      }
    }else if(numTrue == 4){
      actScores = [1.5, 1.5, 1.5, 1.5];
    }else{
      console.log("There has to be a draw between at least two players, and no more than 4 players");
      return -1;
    }
  }else{
    for(var player = 0; player < numPlayers; player++){
      actScores.push(numPlayers - player - 1);
    }
  }
  return actScores;
}

// Calculates player score based on actual and expected score
function calcScore(players, draw){
  numPlayers = players.length;
  expScores = calcExpectedScore(players);
  actScores = calcActualScore(players, draw);
  score = [];
  for(var i=0; i < numPlayers; i++){
    score.push(actScores[i] - expScores[i]);
  }
  return score;
}









