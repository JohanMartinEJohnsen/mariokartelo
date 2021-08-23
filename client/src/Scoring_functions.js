var EloRating = require('elo-rating');




// Functions
/* Function to update score of players
 - Players; is a list of players in winning order
 - Draw; is a list of booleans in case of draw. Set draw = true for the players who are drawed. ex = [false,treu,true,false] for a draw on second place
 - k; is the sensitivity of the scoring function, higher k => bigger scorechanges. Deafult = 40
 returns the list of players with updated ratings
*/
function updateScore(answers, users, draw = null, k = 40){
  
  answers = CreateDictionaryWithScores(answers, users)
  const numPlayers = answers.length;

  if(draw == null){
    draw = []
    for(var i=0;i< numPlayers; i++){
      draw.push(false);
    }
  }
  
  const score = calcScore(answers, draw);
  for(var player = 0; player < numPlayers; player++){
    answers[player].rating = Math.round(answers[player].rating + k * score[player]);
  }
  
  return answers;
}

/* Function to calculate win probabilities
 - Players; is a list of dictionaries sorted from first to last place, the dictionaries must include a key named Rating
 returns the list of probabilities of player with that given index to be placed first. the probabilites should sum to one.
*/
function calcWinProbs(players){
  const winProbs = [];
  var winProbSum = 0;
  const numPlayers = players.length;
  if(numPlayers > 4){
    throw console.error("WinProbability can be calculated for maximum 4 players");
  }
  for(var player = 0; player < numPlayers; player++){
    var winProb = 1;
    for(var oponent = 0; oponent < numPlayers; oponent++){
      if(player !==  oponent){
        winProb *= EloRating.expected(players[player].rating, players[oponent].rating);
      }
    }
    winProbs.push(winProb);
    winProbSum += winProb;
  }

  return winProbs.map(x => x /winProbSum);
}


//Support functions

// Calculates player expected score based on ranking and ranking of oponents
function calcExpectedScore(players){
  const expScores = [];
  const numPlayers = players.length;
  if(numPlayers > 4){
    throw console.error("WinProbability can be calculated for maximum 4 players");
  }

  for(var player = 0; player < numPlayers; player++){
    var expScore = 0;
    for(var oponent = 0; oponent < numPlayers; oponent++){
      if(player !==  oponent){
        expScore += EloRating.expected(players[player].rating, players[oponent].rating);
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
  const numPlayers = players.length;
  var actScores = [];
  if(draw.includes(true)){
    var numTrue = countTrue(draw);
    if(numTrue === 2){
      if(numPlayers === 2){
        actScores = [0.5, 0.5];
      }else if(numPlayers === 3){
        if(draw[0] === true){
          actScores = [2, 0.5, 0.5];
        }else{
          actScores = [1.5, 1.5, 0];
        }
      }else{
        if(draw[0] === true){
          actScores = [2.5, 2.5, 1, 0];
        }else if(draw[3] === true){
          actScores = [3, 2, 0.5, 0.5];
        }else{
          actScores = [3, 1.5, 1.5, 0];
        }
      }
    }else if(numTrue === 3){
      if(numPlayers === 3){
        actScores = [1, 1, 1];
      }else{
        if(draw[0] === true){
          actScores = [2, 2, 2, 0];
        }else{
          actScores = [3, 1, 1, 1];
        }
      }
    }else if(numTrue === 4){
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
  const numPlayers = players.length;
  const expScores = calcExpectedScore(players);
  const actScores = calcActualScore(players, draw);
  const score = [];
  for(var i=0; i < numPlayers; i++){
    score.push(actScores[i] - expScores[i]);
  }
  return score;
}

function CreateDictionaryWithScores(players, users){
  const UsersWithScore = []
  for (var i = 0; i < players.length; i++){
    const player = players[i]
    for (var j = 0; j < users.length; j++){
      if (users[j].name === player){
        UsersWithScore.push({ "name": users[j].name, 'rating': users[j].rating, 'races': users[j].races})
      }

    }
  }
  return UsersWithScore
}

export default updateScore






