const acronyms = [
    { acronym: "TCP", fullForm: "Transmission Control Protocol" },
    { acronym: "IP", fullForm: "Internet Protocol" },
    { acronym: "HTTP", fullForm: "Hypertext Transfer Protocol" },
    { acronym: "FTP", fullForm: "File Transfer Protocol" },
    { acronym: "DNS", fullForm: "Domain Name System" },
    { acronym: "SMTP", fullForm: "Simple Mail Transfer Protocol" },
    { acronym: "SSID", fullForm: "Service Set Identifier" },
    { acronym: "DHCP", fullForm: "Dynamic Host Configuration Protocol" },
    { acronym: "VPN", fullForm: "Virtual Private Network" },
    { acronym: "LAN", fullForm: "Local Area Network" },
    { acronym: "WAN", fullForm: "Wide Area Network" },
    { acronym: "MAN", fullForm: "Metropolitan Area Network" },
    { acronym: "SAN", fullForm: "Storage Area Network" },
    { acronym: "NAT", fullForm: "Network Address Translation" },
    { acronym: "OSI", fullForm: "Open Systems Interconnection" },
    { acronym: "MAC", fullForm: "Media Access Control" },
    { acronym: "P2P", fullForm: "Peer-to-Peer" },
    { acronym: "VoIP", fullForm: "Voice over Internet Protocol" },
    { acronym: "QoS", fullForm: "Quality of Service" },
    { acronym: "BGP", fullForm: "Border Gateway Protocol" },
    { acronym: "IETF", fullForm: "Internet Engineering Task Force" },
    { acronym: "IEEE", fullForm: "Institute of Electrical and Electronics Engineers" },
    { acronym: "ISO", fullForm: "International Organization for Standardization" },
    { acronym: "ITU", fullForm: "International Telecommunication Union" },
    { acronym: "ANSI", fullForm: "American National Standards Institute" },
    { acronym: "IAB", fullForm: "Internet Architecture Board" },
    { acronym: "ICANN", fullForm: "Internet Corporation for Assigned Names and Numbers" },
    { acronym: "ISOC", fullForm: "Internet Society" },
    { acronym: "W3C", fullForm: "World Wide Web Consortium" },
    { acronym: "RFC", fullForm: "Request for Comments" },
    { acronym: "ECMA", fullForm: "European Computer Manufacturers Association" },
    { acronym: "OASIS", fullForm: "Organization for the Advancement of Structured Information Standards" },
    { acronym: "IETF", fullForm: "Internet Engineering Task Force" },
    { acronym: "3GPP", fullForm: "3rd Generation Partnership Project" },
    { acronym: "ETSI", fullForm: "European Telecommunications Standards Institute" }
];
let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let attempts = 0;
let userName = "";

function startQuiz() {
    userName = document.getElementById("userName").value;
    if (!userName) {
        alert("Please enter your name to start the quiz.");
        return;
    }
    score = 0;
    currentQuestionIndex = 0;
    attempts = 0;
    questions = shuffleArray(acronyms).slice(0, 10);
    document.getElementById("quizContainer").innerHTML = `
        <div class="question">
            <p id="questionText"></p>
            <input type="text" id="answer" placeholder="Enter the full form">
            <button onclick="submitAnswer()">Submit</button>
            <button onclick="quitQuiz()">Quit Quiz</button>
            <button onclick="showAcronyms()">Show All Acronyms</button>
        </div>
        <p id="scoreBoard"></p>
    `;
    askQuestion();
}

function askQuestion() {
    document.getElementById("questionText").innerText = `What does "${questions[currentQuestionIndex].acronym}" stand for?`;
    document.getElementById("answer").value = "";
    attempts = 0;
}

function submitAnswer() {
    const userAnswer = document.getElementById("answer").value.trim();
    const correctAnswer = questions[currentQuestionIndex].fullForm;
    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
        score++;
        moveToNextQuestion();
    } else {
        attempts++;
        if (attempts >= 2) {
            alert(`The correct answer is: ${correctAnswer}`);
            moveToNextQuestion();
        } else {
            alert("Wrong answer. Try again.");
        }
    }
    updateScoreBoard();
}

function moveToNextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        askQuestion();
    } else {
        document.getElementById("quizContainer").innerHTML = `<p>Quiz completed! ${userName}, your score is ${score} out of 10.</p><button onclick="startQuiz()">Restart Quiz</button>`;
    }
}

function updateScoreBoard() {
    document.getElementById("scoreBoard").innerText = `Score: ${score}`;
}

function quitQuiz() {
    document.getElementById("quizContainer").innerHTML = `<p>Quiz ended. ${userName}, your score is ${score} out of 10.</p><button onclick="startQuiz()">Restart Quiz</button>`;
}

function showAcronyms() {
    const listContainer = document.getElementById("acronymsList");
    listContainer.innerHTML = "<h2>All Acronyms</h2>";
    acronyms.forEach(acronym => {
        const item = document.createElement("div");
        item.innerHTML = `<strong>${acronym.acronym}:</strong> ${acronym.fullForm}`;
        listContainer.appendChild(item);
    });
    listContainer.style.display = "block";
    document.getElementById("clearAcronyms").style.display = "block";
}

function clearAcronymsDisplay() {
    document.getElementById("acronymsList").style.display = "none";
    document.getElementById("clearAcronyms").style.display = "none";
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
