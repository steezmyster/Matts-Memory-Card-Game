

 /* initializing variables */
const successMessage = "You won the game. Click the reset button to play again.";
var stars = document.getElementsByClassName('fa-star');
var movesCount = 0;
var memoryValues = [];
var memoryTileIds = [];
var cardsFlipped = 0;
const cardsArray = [
     "fa-diamond",
     "fa-paper-plane-o",
     "fa-anchor",
     "fa-bolt",
     "fa-cube",
     "fa-leaf",
     "fa-bicycle",
     "fa-bomb",
     "fa-diamond",
     "fa-paper-plane-o",
     "fa-anchor",
     "fa-bolt",
     "fa-cube",
     "fa-leaf",
     "fa-bicycle",
     "fa-bomb"
 ];

document.querySelector('#resetbutton').innerHTML = '<i class="fa fa-repeat" onclick="newBoard()"></i>';

function newBoard() {
  for (let x = 0; x < stars.length; x++){
    stars[x].classList.remove('outline');
  }
  movesCount = 0;
  document.querySelector('.moves').innerHTML = movesCount;
  cardsFlipped = 0;
  var output = '';
  document.getElementById('deck').innerHTML = "";
  shuffle(cardsArray);
  for (let i = 0; i < cardsArray.length; i++) {
    output += '<li id="card-'+i+'" onclick="memoryFlipTile(this,\''+cardsArray[i]+'\')"></li>';
  }
  	document.getElementById('deck').innerHTML = output;
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function memoryFlipTile(tile,val){
	if(tile.innerHTML == "" && memoryValues.length < 2){
    console.log('movesCount');
    tile.setAttribute("style", "font-size: 33px; background: #02b3e4");
		tile.innerHTML = '<i class="back '+'fa '+val+'"></i>';
		if(memoryValues.length == 0){
			memoryValues.push(val);
			memoryTileIds.push(tile.id);
		} else if(memoryValues.length == 1){
			memoryValues.push(val);
			memoryTileIds.push(tile.id);
      movesCount += 1;
      document.querySelector('.moves').innerHTML = movesCount;
      if (movesCount > 10 && movesCount <= 14) {
        stars[2].classList.add('outline');
      }
      else if (movesCount >= 15 && movesCount <= 17) {
        stars[1].classList.add('outline');
      }
      else if (movesCount >= 18) {
        stars[0].classList.add('outline');
      }
			if(memoryValues[0] == memoryValues[1]){
				cardsFlipped += 2;
				// Clear both arrays
				memoryValues = [];
            	memoryTileIds = [];
				// Check to see if the whole board is cleared
				if(cardsFlipped == cardsArray.length){
					setTimeout(function(){alert(successMessage)}, 700);
				}
			} else {
				function flip2Back(){
				    // Flip the 2 tiles back over
				    var card1 = document.getElementById(memoryTileIds[0]);
				    var card2 = document.getElementById(memoryTileIds[1]);
				    card1.style.background = '#2e3d49';
            	    card1.innerHTML = "";
				    card2.style.background = '#2e3d49';
            	    card2.innerHTML = "";
				    // Clear both arrays
				    memoryValues = [];
            	    memoryTileIds = [];
				}
				setTimeout(flip2Back, 700);
			}
		}
	}
}

newBoard();
