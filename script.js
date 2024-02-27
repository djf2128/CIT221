const acronyms = [
        { acronym: "HTTP", fullForm: "Hypertext Transfer Protocol" },
        { acronym: "TCP", fullForm: "Transmission Control Protocol" },
        { acronym: "IP", fullForm: "Internet Protocol" },
        { acronym: "FTP", fullForm: "File Transfer Protocol" },
        { acronym: "DNS", fullForm: "Domain Name System" },
        { acronym: "DHCP", fullForm: "Dynamic Host Configuration Protocol" },
        { acronym: "SMTP", fullForm: "Simple Mail Transfer Protocol" },
        { acronym: "SNMP", fullForm: "Simple Network Management Protocol" },
        { acronym: "SSH", fullForm: "Secure Shell" },
        { acronym: "TLS", fullForm: "Transport Layer Security" },
        { acronym: "UDP", fullForm: "User Datagram Protocol" },
        { acronym: "VPN", fullForm: "Virtual Private Network" },
        { acronym: "LAN", fullForm: "Local Area Network" },
        { acronym: "WAN", fullForm: "Wide Area Network" },
        { acronym: "NAT", fullForm: "Network Address Translation" },
        { acronym: "OSI", fullForm: "Open Systems Interconnection" },
        { acronym: "BGP", fullForm: "Border Gateway Protocol" },
        { acronym: "MPLS", fullForm: "Multiprotocol Label Switching" },
        { acronym: "SIP", fullForm: "Session Initiation Protocol" },
        { acronym: "VoIP", fullForm: "Voice over Internet Protocol" },
        // Standards Organization Acronyms
        { acronym: "IETF", fullForm: "Internet Engineering Task Force" },
        { acronym: "IEEE", fullForm: "Institute of Electrical and Electronics Engineers" },
        { acronym: "W3C", fullForm: "World Wide Web Consortium" },
        { acronym: "ISO", fullForm: "International Organization for Standardization" },
        { acronym: "ITU", fullForm: "International Telecommunication Union" },
        { acronym: "ANSI", fullForm: "American National Standards Institute" },
        { acronym: "ACM", fullForm: "Association for Computing Machinery" },
        { acronym: "IAB", fullForm: "Internet Architecture Board" },
        { acronym: "ICANN", fullForm: "Internet Corporation for Assigned Names and Numbers" },
        { acronym: "3GPP", fullForm: "3rd Generation Partnership Project" },
        { acronym: "ETSI", fullForm: "European Telecommunications Standards Institute" },
        { acronym: "OASIS", fullForm: "Organization for the Advancement of Structured Information Standards" },
        { acronym: "ISOC", fullForm: "Internet Society" },
        // Additional Standards Organization Acronyms placeholders
        { acronym: "RFC", fullForm: "Request for Comments" },
        { acronym: "NIST", fullForm: "National Institute of Standards and Technology" },
        { acronym: "ITU-T", fullForm: "International Telecommunication Union - Telecommunication Standardization Sector" },
        { acronym: "ISO/IEC", fullForm: "International Organization for Standardization/International Electrotechnical Commission" },
        { acronym: "CCITT", fullForm: "International Telegraph and Telephone Consultative Committee" },
        { acronym: "ASTM", fullForm: "American Society for Testing and Materials" },
        { acronym: "IEEE-SA", fullForm: "IEEE Standards Association" },
        { acronym: "IETF", fullForm: "Internet Engineering Task Force" }
];

let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let attempt = 0;

function startQuiz() {
    questions = selectRandomAcronyms(acronyms, 10);
    currentQuestionIndex = 0;
    score = 0;
    attempt = 0;
    displayQuestion();
    document.getElementById("score").style.display = "none";
}

function selectRandomAcronyms(array, num) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
}

function displayQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById("question").textContent = `What does "${question.acronym}" stand for?`;
    document.getElementById("answer").value = "";
}

document.getElementById("submit").addEventListener("click", checkAnswer);
document.getElementById("answer").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        checkAnswer();
    }
});

function checkAnswer() {
    const userAnswer = document.getElementById("answer").value.trim();
    const correctAnswer = questions[currentQuestionIndex].fullForm;
    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
        score++;
        nextQuestion();
    } else {
        if (attempt < 1) {
            alert("Try again!");
            attempt++;
        } else {
            alert(`Correct answer: ${correctAnswer}`);
            nextQuestion();
        }
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
        attempt = 0;
    } else {
        endQuiz();
    }
}

function endQuiz() {
    document.getElementById("score").style.display = "block";
    document.getElementById("score").textContent = `Your score is ${score} out of 10.`;
}

document.getElementById("quit").addEventListener("click", function() {
    document.getElementById("quiz-container").style.display = "none";
});

document.getElementById("restart").addEventListener("click", startQuiz);

document.getElementById("show-acronyms").addEventListener("click", function() {
    const list = acronyms.map(a => `${a.acronym}: ${a.fullForm}`).join('<br>');
    document.getElementById("acronyms-list").innerHTML = list;
    document.getElementById("acronyms-list").style.display = "block";
});

document.getElementById("clear-acronyms").addEventListener("click", function() {
    document.getElementById("acronyms-list").style.display = "none";
});

startQuiz(); // Start the quiz when the page loads
