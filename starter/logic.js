// logic.js

// Define variables for elements
const startButton = document.getElementById("start");
const questionsContainer = document.getElementById("questions");
const endScreen = document.getElementById("end-screen");
const finalScoreElement = document.getElementById("final-score");
const initialsInput = document.getElementById("initials");
const submitButton = document.getElementById("submit");
const feedbackElement = document.getElementById("feedback");
const timeElement = document.getElementById("time");

// Other variables
let currentQuestionIndex = 0;
let time = 60; // Set your desired time limit in seconds
let timerInterval;

// Your question data
// You may want to define your questions in your questions.js file and import it here

// Event listener for start button
startButton.addEventListener("click", startQuiz);

// Event listener for submit button
submitButton.addEventListener("click", saveScore);

// Function to start the quiz
function startQuiz() {
  // Hide start screen and show questions
  document.getElementById("start-screen").classList.add("hide");
  questionsContainer.classList.remove("hide");

  // Reset variables
  currentQuestionIndex = 0;
  time = 60;

  // Start timer
  startTimer();

  // Display the first question
  showQuestion();
}

// Function to display a question
function showQuestion() {
  const currentQuestion = questions[currentQuestionIndex];

  // Check if there are still questions
  if (currentQuestionIndex < questions.length) {
    // Display question title
    document.getElementById("question-title").textContent = currentQuestion.title;

    // Display choices
    const choicesContainer = document.getElementById("choices");
    choicesContainer.innerHTML = "";
    currentQuestion.choices.forEach((choice, index) => {
      const choiceButton = document.createElement("button");
      choiceButton.textContent = `${index + 1}. ${choice}`;
      choiceButton.addEventListener("click", () => checkAnswer(index));
      choicesContainer.appendChild(choiceButton);
    });
  } else {
    // If no more questions, end the quiz
    endQuiz();
  }
}

// Function to check the answer
// Function to check the answer
function checkAnswer(choiceIndex) {
  const currentQuestion = questions[currentQuestionIndex];

  // Check if the answer is correct
  if (choiceIndex === currentQuestion.correct) {
    feedbackElement.textContent = "Correct!";
  } else {
    feedbackElement.textContent = "Incorrect! -10 seconds";
    time -= 10; // Deduct 10 seconds for incorrect answers
  }

  // Move to the next question
  currentQuestionIndex++;

  // Display the next question
  showQuestion();
}

/*function checkAnswer(choiceIndex) {
  const currentQuestion = questions[currentQuestionIndex];

  // Check if the answer is correct
  if (choiceIndex === currentQuestion.correct) {
    feedbackElement.textContent = "Correct!";
  } else {
    feedbackElement.textContent = "Incorrect! -10 seconds";
    time -= 10; // Deduct 10 seconds for incorrect answers
  }

  // Move to the next question
  currentQuestionIndex++;

  // Display the next question
  showQuestion();
}*/

// Function to start the timer
function startTimer() {
  timerInterval = setInterval(function () {
    timeElement.textContent = time;

    if (time <= 0) {
      clearInterval(timerInterval);
      endQuiz();
    } else {
      time--;
    }
  }, 1000);
}

// Function to end the quiz
function endQuiz() {
  // Stop the timer
  clearInterval(timerInterval);

  // Hide questions and show end screen
  questionsContainer.classList.add("hide");
  endScreen.classList.remove("hide");

  // Display final score
  finalScoreElement.textContent = time;

  // Optionally, you can display a message based on the score
  if (time > 0) {
    feedbackElement.textContent = "Well done!";
  } else {
    feedbackElement.textContent = "Time's up!";
  }
}

// Function to save the score
function saveScore() {
  const initials = initialsInput.value.trim();

  if (initials !== "") {
    // Save the score (you may want to implement a function for this)
    // For example: saveScoreToLocalStorage(initials, time);

    // Redirect to highscores page
    window.location.href = "highscores.html";
  } else {
    alert("Please enter your initials.");
  }
}
