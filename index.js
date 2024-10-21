let numberBoxOne = null;
let numberBoxTwo = null;
let operationBox = null;
let answerBox = null;
let possibleAnswerBoxOne = null;
let possibleAnswerBoxTwo = null;
let possibleAnswerBoxThree = null;
let resultLabel = null;
let restartButton = null;
let numbersInPlay = [];
let operations = ["+", "-", "*", "/"];

function initHTMLElements() {
  numberBoxOne = document.getElementById("number-box-1");
  numberBoxTwo = document.getElementById("number-box-2");
  operationBox = document.getElementById("operation-box");
  answerBox = document.getElementById("answer-box");
  possibleAnswerBoxOne = document.getElementById("possible-answer-box-1");
  possibleAnswerBoxTwo = document.getElementById("possible-answer-box-2");
  possibleAnswerBoxThree = document.getElementById("possible-answer-box-3");
  resultLabel = document.getElementById("result-label");
  restartButton = document.getElementById("restart-button");
  resultLabel.style.visibility = "hidden";
}

function setupEventListeners() {
  possibleAnswerBoxOne.addEventListener("click", checkAnswer);
  possibleAnswerBoxTwo.addEventListener("click", checkAnswer);
  possibleAnswerBoxThree.addEventListener("click", checkAnswer);
  restartButton.addEventListener("click", restartGame);
}

function restartGame() {
  location.reload();
}

function checkAnswer(event) {
  const selectedAnswer = parseInt(event.target.textContent);
  const correctAnswer = numbersInPlay[0] + numbersInPlay[1];
  resultLabel.style.visibility = "visible";
  if (selectedAnswer === correctAnswer) {
    answerBox.textContent = correctAnswer;
    event.target.classList.add("correct-answer");
    resultLabel.textContent = "Correct answer, congratulations!";
  } else {
    event.target.classList.add("wrong-answer");
    resultLabel.textContent = "Incorrect answer, try again!";
  }
}

function generatePossibleAnswers() {
  const answer = numbersInPlay[0] + numbersInPlay[1];
  const uniqueRandomNumbers = generateUniqueRandomNumbers(
    answer - 5 >= 2 ? answer - 5 : 2,
    answer + 5,
    2,
    answer
  );
  return shuffleArray([answer, ...uniqueRandomNumbers]);
}

function runGame() {
  numbersInPlay = [getRandomNumber(1, 9), getRandomNumber(1, 9)];
  numberBoxOne.textContent = numbersInPlay[0];
  numberBoxTwo.textContent = numbersInPlay[1];
  // default to addition for now until a "select operation" menu is added
  operationBox.textContent = operations[0];
  answerBox.textContent = "?";
  const possibleAnswers = generatePossibleAnswers();
  possibleAnswerBoxOne.textContent = possibleAnswers[0];
  possibleAnswerBoxTwo.textContent = possibleAnswers[1];
  possibleAnswerBoxThree.textContent = possibleAnswers[2];
}

// Utils
const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

const generateUniqueRandomNumbers = (min, max, count, numToExclude) => {
  const numbers = [];
  while (numbers.length < count) {
    const number = getRandomNumber(min, max);
    if (!numbers.includes(number) && number !== numToExclude) {
      numbers.push(number);
    }
  }
  return numbers;
};

initHTMLElements();
setupEventListeners();
runGame();
