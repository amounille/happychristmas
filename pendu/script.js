var [wins, losses, abortions] = [0, 0, 0];
  var gameInProcess, answer, maskedAnswer, wrongGuesses;
  const masthead = document.querySelector("h1");
  const commonWords = ["guirnalda"];
  hideAll("#tally span");
  document.querySelector("#new-game").addEventListener("click", newGame);


function newGame() {
  if (gameInProcess == true)  
    aborted();
  gameInProcess = true; 
  masthead.innerText = "Good luck\n(You need it)";
  masthead.setAttribute("status", "normal"); //no color
  answer = newRandomWord();
  console.log("Hey you're cheating! " + 'Close the console! The answer is "' + answer + '"'); 
  wrongGuesses = 0;
  resetKeypad();
  maskedAnswer = []; //maskedAnswer is the mixture of letters and underscores
  for (var i of answer)
    maskedAnswer.push("_");
  updateDisplayWord(); //display the maskedAnswer
  hang(); //draw graph
}

function newRandomWord() {
  return commonWords[Math.floor(Math.random() * commonWords.length)];
}

function verifyGuess() { //the onclick event
  var guessedLetter = this.innerText.toLowerCase();
  //when it's a match:
  if (answer.toLowerCase().includes(guessedLetter)) {
    //update the displayed word
    for (var i in maskedAnswer) {
      if (answer[i] == guessedLetter)
        maskedAnswer[i] = answer[i];
    }
    updateDisplayWord();
    if (maskedAnswer.includes("_") == false)  //won
      escaped();
    //change color and make the mouse no-drop
    this.classList.toggle("correct-letter", true);
    this.removeEventListener("click", verifyGuess);
  } else {
    //when it's not a match:
    this.classList.toggle("incorrect-letter", true); //change color and make the mouse no-drop
    this.removeEventListener("click", verifyGuess);
    wrongGuesses++;
    hang();
  }
}

function updateDisplayWord() {
  var display = "";
  for (var i of maskedAnswer)
    display += i + " ";
  display.slice(0, -1);
  document.querySelector("#guessing").textContent = display;
}

function aborted() { //add 1 to the tally Abortions
  abortions++;
  document.querySelector("#abortions").innerText = abortions;
  unhideAll(".abortions");
}

function hang() { //draw the hangman
  switch (wrongGuesses) {
    case 0:
      hideAll("svg *");
      break;
    case 1:
      unhideAll(".gallows");
      break;
    case 2:
      unhide("#head");
      break;
    case 3:
      unhide("#body");
      break;
    case 4:
      unhide("#left-arm");
      break;
    case 5:
      unhide("#right-arm");
      break;
    case 6:
      unhide("#left-leg");
      break;
    case 7:
      unhide("#right-leg");
      hanged();
      break;
    default:
      newGame();
  }
}


function hanged() { //lost
  gameInProcess = false;
  masthead.innerText = "You are Mort ahahaahah !";
  masthead.setAttribute("status", "hanged");
  losses++;
  removeAllListeners();
  unhideAll(".losses");
  document.querySelector("#losses").innerText = losses;
  // show correct answer
  var display = "";
  for (var i of answer)
    display += i + " ";
  display.slice(0, -1);
  document.querySelector("#guessing").textContent = display;
}

function escaped() { //won
  gameInProcess = false;
  masthead.innerText = "You won this \n( give a kiss to your husband to have the surprise )";
  masthead.setAttribute("status", "escaped");
  wins++;
  removeAllListeners();
  unhideAll(".wins");
  document.querySelector("#wins").innerText = wins;
}

function removeAllListeners() { //prevent user from continue clicking after game's over
  for (let i of document.querySelectorAll("#keypad a")) {
    i.removeEventListener("click", verifyGuess);
    i.classList.toggle("finished", true);
  }
}

function resetKeypad() {
  for (var i of document.querySelectorAll("#keypad div")) //clear the keypad
    i.innerText = "";
  populateRow(1, "QWERTYUIOP");
  populateRow(2, "ASDFGHJKL");
  populateRow(3, "ZXCVBNM");
}

function populateRow(rowNumber, rowLetters) { //draw the keyboard and attach listeners
  for (let i of rowLetters) {
    let key = document.createElement("a");
    key.id = i.toLowerCase();
    key.append(i);
    key.addEventListener("click", verifyGuess);
    document.querySelector("#keypad--row" + rowNumber).append(key);
  }
}

function unhide(targetElement) {
  document.querySelector(targetElement).classList.toggle("hidden", false);
}

function hideAll(targetElements) {
  for (let i of document.querySelectorAll(targetElements))
    i.classList.toggle("hidden", true);
}

function unhideAll(targetElements) {
  for (let i of document.querySelectorAll(targetElements))
    i.classList.toggle("hidden", false);
}


