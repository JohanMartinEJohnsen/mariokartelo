
// Global list to be stored in database
players = []

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
    players.push(dict)
}


function create4Players() {
    players = [];
    for (var i = 0; i < 4; i++) {
      createPlayer("player" + String(i));
    }
  }

function deletePlayer(name){
    for(var i=0;i<players.length;i++){
        if(players[i]['Name'] == name){
            players.splice(i, 1);
            console.log(players)
        }
    }
}

create4Players()
deletePlayer('player0 ')
console.log(players)