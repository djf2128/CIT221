document.addEventListener('DOMContentLoaded', () => {
    const networkingAcronyms = [
        { acronym: 'TCP', fullForm: 'Transmission Control Protocol' },
        { acronym: 'IP', fullForm: 'Internet Protocol' },
        // Add more networking acronyms here
    ];
    const standardsOrganizations = [
        { acronym: 'IEEE', fullForm: 'Institute of Electrical and Electronics Engineers' },
        { acronym: 'IETF', fullForm: 'Internet Engineering Task Force' },
        // Add more standards organizations here
    ];

    const allAcronyms = networkingAcronyms.concat(standardsOrganizations);
    let quizAcronyms = [];
    let currentQuestionIndex = 0;
    let score = 0;
    let chances = 2;
    let userName = '';

    const welcomeScreen = document.getElementById('welcomeScreen');
    const quizContainer = document.getElementById('quizContainer');
    const controls = document.getElementById('controls');
    const acronymsList = document.getElementById('acronymsList');
    const questionElement = document.getElementById('question');
    const answerElement = document.getElementById('answer');
    const feedbackElement = document.getElementById('feedback');
    const quizEnd = document.getElementById('quizEnd');
    const startQuizButton = document.getElementById('startQuiz');
    const submitAnswerButton = document.getElementById('submitAnswer');
    const nextQuestionButton = document.getElementById('nextQuestion');
    const showAcronymsButton = document.getElementById('showAcronyms');
    const clearAcronymsButton = document.getElementById('clearAcronyms');
    const restartQuizButton = document.getElementById('restartQuiz');
    const quitQuizButton = document.getElementById('quitQuiz');

    startQuizButton.addEventListener('click', startQuiz);
    submitAnswerButton.addEventListener('click', checkAnswer);
    nextQuestionButton.addEventListener('click', nextQuestion);
    showAcronymsButton.addEventListener('click', displayAcronyms);
    clearAcronymsButton.addEventListener('click', () => {
        acronymsList.style.display = 'none';
        clearAcronymsButton.style.display = 'none';
    });
    restartQuizButton.addEventListener('click', startQuiz);
    quitQuizButton.addEventListener('click', quitQuiz);

    function startQuiz() {
        userName = document.getElementById('userName').value;
        if (userName.trim() === '') {
            alert('Please enter your name to start the quiz.');
            return;
        }
        quizAcronyms = shuffleArray(allAcronyms).slice(0, 10);
        currentQuestionIndex = 0;
        score = 0;
        chances = 2;
        welcomeScreen.style.display = 'none';
        quizContainer.style.display = 'block';
        controls.style.display = 'block';
        nextQuestionButton.style.display = 'none';
        feedbackElement.textContent = '';
        answerElement.value = '';
        displayQuestion();
    }

    function displayQuestion() {
        if (currentQuestionIndex < quizAcronyms.length) {
            questionElement.textContent = `What does ${quizAcronyms[currentQuestionIndex].acronym} stand for?`;
            answerElement.value = '';
            feedbackElement.textContent = '';
            answerElement.focus();
        } else {
            finishQuiz();
        }
    }

    function checkAnswer() {
        const userAnswer = answerElement.value.trim().toLowerCase();
        const correctAnswer = quizAcronyms[currentQuestionIndex].fullForm.toLowerCase();
        if (userAnswer === correctAnswer) {
            score++;
            feedbackElement.textContent = 'Correct!';
            nextQuestion();
        } else if (chances > 1) {
            chances--;
            feedbackElement.textContent = 'Wrong answer. Try again!';
        } else {
            feedbackElement.textContent = `Sorry, the correct answer is: ${quizAcronyms[currentQuestionIndex].fullForm}`;
            nextQuestionButton.style.display = 'block';
        }
    }

    function nextQuestion() {
        currentQuestionIndex++;
        chances = 2;
        displayQuestion();
        nextQuestionButton.style.display = 'none';
    }

    function displayAcronyms() {
        acronymsList.innerHTML = allAcronyms.map(a => `<p>${a.acronym}: ${a.fullForm}</p>`).join('');
        acronymsList.style.display = 'block';
        clearAcronymsButton.style.display = 'block';
    }

    function finishQuiz() {
        quizContainer.style.display = 'none';
        controls.style.display = 'none';
        quizEnd.style.display = 'block';
        quizEnd.innerHTML = `<h2>Quiz Completed</h2><p>${userName}, your score is ${score} out of 10.</p>`;
    }

    function quitQuiz() {
        quizContainer.style.display = 'none';
        controls.style.display = 'none';
        welcomeScreen.style.display = 'block';
        quizEnd.style.display = 'none';
        userName.value = '';
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // swap elements
        }
        return array;
    }
});
