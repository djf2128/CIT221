const computerNetworkingAcronyms = [
  { acronym: "TCP", fullForm: "Transmission Control Protocol" },
  // Add 19 more computer networking acronyms
];

const standardsOrganizationsAcronyms = [
  { acronym: "IETF", fullForm: "Internet Engineering Task Force" },
  // Add 14 more standards organization acronyms
];

const allAcronyms = [...computerNetworkingAcronyms, ...standardsOrganizationsAcronyms];
let questionsAsked = [];
let score = 0;
let attempts = 0;
let currentQuestion = {};
let userName = "";

function startQuiz() {
  userName = document.getElementById("userName").value;
  if (userName.trim() === "") {
    alert("Please enter your name to start the quiz.");
    return;
  }
  document.getElementById("userInput").style.display = "none";
  document.getElementById("quiz").style.display = "block";
  score = 0;
  attempts = 0;
  questionsAsked = [];
  displayQuestion();
}

function displayQuestion() {
  if (questionsAsked.length >= 10) {
    endQuiz();
    return;
  }
  let randomIndex = Math.floor(Math.random() * allAcronyms.length);
  while (questionsAsked.includes(randomIndex)) {
    randomIndex = Math.floor(Math.random() * allAcronyms.length);
  }
  currentQuestion = allAcronyms[randomIndex];
  questionsAsked.push(randomIndex);
  document.getElementById("question").innerHTML = `What does "${currentQuestion.acronym}" stand for?`;
  document.getElementById("answer").value = "";
  attempts = 0;
}

function submitAnswer() {
  const userAnswer = document.getElementById("answer").value.trim();
  if (userAnswer.toLowerCase() === currentQuestion.fullForm.toLowerCase()) {
    score++;
    document.getElementById("feedback").innerHTML = "Correct!";
    displayQuestion();
  } else {
    attempts++;
    if (attempts >= 2) {
      document.getElementById("feedback").innerHTML = `Incorrect. The correct answer is: ${currentQuestion.fullForm}.`;
      displayQuestion();
    } else {
      document.getElementById("feedback").innerHTML = "Incorrect, try again.";
    }
  }
}

function quitQuiz() {
  document.getElementById("quiz").style.display = "none";
  document.getElementById("userInput").style.display = "block";
  document.getElementById("feedback").innerHTML = "";
  document.getElementById("score").innerHTML = "";
}

function restartQuiz() {
  score = 0;
  attempts = 0;
  questionsAsked = [];
  displayQuestion();
}

function showAcronyms() {
  const listContainer = document.getElementById("acronymsList");
  listContainer.innerHTML = "<h2>All Acronyms</h2>";
  allAcronyms.forEach(acronym => {
    const item = document.createElement("div");
    item.innerHTML = `<strong>${acronym.acronym}:</strong> ${acronym.fullForm}`;
    listContainer.appendChild(item);
  });
  listContainer.style.display = "block";
}

function endQuiz() {
  document.getElementById("quiz").style.display = "none";
  document.getElementById("score").innerHTML = `${userName}, your score is ${score}/10.`;
  document.getElementById("acronymsList").style.display = "none";
}
