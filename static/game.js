io.on('connection', function(socket) {
});b
function selectMove() {
    //generate a random number 0, 1, or 2 to decide what move to make for the AI
    var move = Math.floor(Math.random() * Math.floor(3));
    if(move === 0){
        //rock
        console.log('the boss has selected rock');
    }
    if(move == 1){
        //paper
        console.log('the boss has selected paper');
    }
    if(move == 2){
        //scissors
        console.log('the boss has selected scissors');
    }
}
setInterval(function(){
    //select a move every 3 seconds        
    selectMove();
    }, 3000);
		
var playerId;

var players = {};
var playerId = Math.random();
SOCKET_LIST[playerId] = socket;
players[playerId] = {id:playerId, score:0, move:null};
//inform client of player's id
socket.emit('setPlayerId', playerId);
//0 is selection, 1 is results
var gameState = 0;
//the ai's move selection
var botSelection = 0;
function selectMove () {
    //generate a random number 0, 1, or 2 to decide what move to make for the AI
    var botSelection = Math.floor(Math.random() * Math.floor(3));
    //game is in result state
    gameState = 1;
    //send the ai's move to all connected players
    for(var i in players){
        var playerWin = playerWinCheck(players[i].move);
        if(playerWin){
            players[i].score += 1;
        }
        players[i].socket.emit('gameResultState', botSelection, playerWin, players);
    }
}
function playerWinCheck (move){
    var playerWins = false;
    //player chose rock
    if(move === 0){
    //rock beats scissors
      if(botSelection == 2){
        playerWins = true;
        }
    }
    //player chose paper
    if(move == 1){
    //paper beats rock
      if(botSelection === 0){
        playerWins = true;
        }
    }
    //player chose scissors
    if(move == 2){
        //scissors beats paper
      if(botSelection == 1){
        playerWins = true;
        }
    }
    return playerWins;
}
setInterval(function(){
            //select a move every 3 seconds
            selectMove();
            }, 3000);
socket.on('playerMove',function(data){
  Object.keys(SOCKET_LIST).forEach(function eachKey(key) {
    if(SOCKET_LIST[key] == socket){
      console.log('player selected: ' + data);
      var thisPlayer = players[key];
      thisPlayer.move = data;
    }
});});
