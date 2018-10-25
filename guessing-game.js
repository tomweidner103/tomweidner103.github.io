/* 

Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "testem".

In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.

*/

let gameButt = document.getElementById("newGame");
let winning = document.getElementById("winning");
let hintButt = document.getElementById("hint");

function generateWinningNumber() {
  return Math.ceil(Math.random() * 100);
}
function shuffle(arr) {
  let m = arr.length,
    t,
    i;
  //while there are remaining elements to shuffle
  while (m) {
    //pick a remaining element
    i = Math.floor(Math.random() * m--);
    //and swap with the current element
    t = arr[m];
    arr[m] = arr[i];
    arr[i] = t;
  }
  return arr;
}
let numGames = 0;
let wins = 0;
let losses = 0;
class Game {
  constructor(name) {
    this.count = 0;
    this.name = name;
    this.playersGuess = null;
    this.pastGuesses = [];
    this.winningNumber = generateWinningNumber();
    document.getElementById("header").innerHTML = this.name;
  }
  difference() {
    return Math.abs(this.playersGuess - this.winningNumber);
  }
  isLower() {
    if (
      this.pastGuesses.length === 4 &&
      this.playersGuess < this.winningNumber
      ) {
        return `Higher!`;
      }
      if (
        this.pastGuesses.length === 4 &&
        this.playersGuess > this.winningNumber
        ) {
          return `Lower!`;
        } else {
          return "";
        }
      }
      playersGuessSubmission(num) {
        let nums = parseInt(num, 10);
        if (typeof nums === "number" && nums > 0 && nums <= 100) {
          this.playersGuess = nums;
          return this.checkGuess();
        }
        throw alert(`That is an invalid guess.`);
      }
      checkGuess() {
        let feedback = "";
        if (this.playersGuess === this.winningNumber) {
          this.pastGuesses.push(this.playersGuess);
          wins++;
          feedback = `You Win!`;
        } else if (this.pastGuesses.includes(this.playersGuess)) {
          feedback = `You have already guessed that number.`;
        } else {
          this.pastGuesses.push(this.playersGuess);
          if (this.pastGuesses.length === 5) {
            losses++;
            console.log(losses);
            feedback = `You Lose. Winning number: 
            ${this.winningNumber}`;
          } else {
            let diff = this.difference();
            if (diff < 10) feedback = `You're burning up!`;
            else if (diff < 25) feedback = `You're lukewarm.`;
            else if (diff < 50) feedback = `You're a bit chilly.`;
            else feedback = `You're ice cold!`;
          }
        }
        let percent;
        if(wins === 0 && losses === 0){
          percent = 0;
          document.getElementById("win").innerHTML = `Wins: ${wins} \nLosses: ${losses} \nPercentage: ${percent}%`;
        }else{
          percent = Math.round(((wins)/(wins+losses))*100);
        document.getElementById("win").innerHTML = `Wins: ${wins} \nLosses: ${losses} \nPercentage: ${percent}%`;}
  
        document.querySelector(
          `#guess_list li:nth-child(${this.pastGuesses.length})`
          ).innerHTML = this.playersGuess;
          winning.innerHTML = this.isLower();
        
          return feedback;
        }
      
        provideHint() {
          let count = this.count++;
    if (count < 1) {
      let result = [];
      result.push(
        this.winningNumber,
        generateWinningNumber(),
        generateWinningNumber()
      );
      shuffle(result);
      return result;
    }
    return "No Mas!";
  }
}
gameButt.addEventListener("click", playGame);

function newGame() {
  numGames++;
  return new Game(`Game ${numGames}`);
}

let game;
function playGame() {
  game = newGame();
  document.getElementById("hintArray").innerHTML = "";
  document.getElementById("input").innerHTML = "Are you Ready?";
  document.getElementById("winning").innerHTML = "";
  document.getElementById("one").innerHTML = "#";
  document.getElementById("two").innerHTML = "#";
  document.getElementById("three").innerHTML = "#";
  document.getElementById("four").innerHTML = "#";
  document.getElementById("five").innerHTML = "#";

}
hintButt.addEventListener("click", function() {
  document.getElementById("hintArray").innerHTML = game.provideHint();
});

const button = document.getElementById("guesses");
button.addEventListener('keypress', function(event){
  const keyWord = event.key;
  event.preventDefault();
  if (keyWord === "Enter"){
    let playersGuess = document.getElementById("guess").value;
    document.getElementById("guess").value = "";
    let answer = game.playersGuessSubmission(playersGuess);
    document.getElementById("input").innerHTML = answer;
  }
});

button.addEventListener("click", function() {
  let playersGuess = document.getElementById("guess").value;
  document.getElementById("guess").value = "";
  let answer = game.playersGuessSubmission(playersGuess);
  document.getElementById("input").innerHTML = answer;
});

