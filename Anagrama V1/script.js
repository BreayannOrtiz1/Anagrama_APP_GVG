document.addEventListener("DOMContentLoaded", function () {
    var wordList = [
        "apple", "orange", "banana", "grape", "kiwi", "lemon", "peach", "pear",
        "plum", "berry", "melon", "cherry", "mango", "papaya", "guava", "fig",
        "date", "apricot", "olive", "coconut", "lime", "peanut", "walnut",
        "almond", "cashew", "pecan", "hazelnut", "avocado", "durian", "persimmon",
        "nectarine", "rhubarb", "pomegranate", "tamarind", "loquat", "lychee",
        "quince", "passionfruit", "starfruit", "pineapple", "raspberry",
        "blueberry", "blackberry", "strawberry", "cranberry", "currant",
        "gooseberry", "elderberry", "mulberry", "boysenberry", "honeyberry"
    ];
    var state = {
        wordList: wordList,
        currentWord: "",
        score: 0,
        timeLeft: 50
    };
    var timerInterval;
    var playerName = "";
    var timerElement = document.getElementById("timer");
    var anagramContainer = document.getElementById("anagram-container");
    var inputElement = document.getElementById("guess-input");
    var submitButton = document.getElementById("submit-btn");
    var changeWordButton = document.getElementById("change-word");
    var newGameButton = document.getElementById("new-game");
    var scoreElement = document.getElementById("score");
    var startGameButton = document.getElementById("start-game-btn");
    var restartButton = document.getElementById("restart-btn");
    var startScreen = document.getElementById("start-screen");
    var gameScreen = document.getElementById("game-screen");
    var endScreen = document.getElementById("end-screen");
    var usernameInput = document.getElementById("username");
    var greeting = document.getElementById("greeting");
    var finalMessage = document.getElementById("final-message");
    var finalScore = document.getElementById("final-score");
    function shuffleWord(word) {
        var shuffledArray = word.split("").sort(function () { return 0.5 - Math.random(); });
        return shuffledArray.join("");
        //incorporar funcion para evitar que la palabra salga igual
    }
    function startGame() {
        state.score = 0;
        state.timeLeft = 50;
        state.currentWord = getNextWord();
        greeting.textContent = "Hola ".concat(playerName);
        timerElement.textContent = "50";
        displayWord();
        updateScore();
        startTimer();
        showScreen("game");
    }
    function getNextWord() {
        var randomIndex = Math.floor(Math.random() * state.wordList.length);
        return shuffleWord(state.wordList[randomIndex]);
    }
    function displayWord() {
        anagramContainer.textContent = state.currentWord;
    }
    function updateScore() {
        scoreElement.textContent = "Score: ".concat(state.score);
    }
    function startTimer() {
        if (timerInterval) {
            clearInterval(timerInterval);
        }
        timerInterval = setInterval(function () {
            state.timeLeft--;
            timerElement.textContent = state.timeLeft.toString();
            if (state.timeLeft <= 0) {
                clearInterval(timerInterval);
                endGame();
            }
        }, 1000);
    }
    // function checkAnswer(): void {
    //     const userGuess = inputElement.value.toLowerCase();
    //     if (wordList.includes(userGuess)) {
    //         state.score++;
    //         updateScore();
    //         inputElement.value = "";
    //         state.currentWord = getNextWord();
    //         displayWord();
    //     }
    // }
    function checkAnswer() {
        var userGuess = inputElement.value.toLowerCase();
        if (wordList.indexOf(userGuess) !== -1) { // Cambiar includes() por indexOf()
            state.score++;
            updateScore();
            inputElement.value = "";
            state.currentWord = getNextWord();
            displayWord();
        }
    }
    function endGame() {
        finalMessage.textContent = "\u00A1Buen trabajo, ".concat(playerName, "!");
        finalScore.textContent = "Tu puntaje final es: ".concat(state.score);
        showScreen("end");
        //alert(`Time's up! Your final score is ${state.score}`);
        //startGame();
    }
    function resetGame() {
        inputElement.value = "";
        usernameInput.value = "";
        timerElement.textContent = "50";
        showScreen("start");
    }
    function changeWordF() {
        inputElement.value = ""; // Limpiamos el input de texto
        state.currentWord = getNextWord();
        displayWord();
    }
    function showScreen(screen) {
        // startScreen.classList.add('hidden');
        // gameScreen.classList.add('hidden');
        // endScreen.classList.add('hidden');
        if (screen === 'start') {
            startScreen.classList.remove('hidden');
            startScreen.style.display = "block";
            usernameInput.focus();
            gameScreen.style.display = "none";
            endScreen.style.display = "none";
        }
        else if (screen === 'game') {
            gameScreen.classList.remove('hidden');
            startScreen.style.display = "none";
            gameScreen.style.display = "block";
            endScreen.style.display = "none";
        }
        else if (screen === 'end') {
            endScreen.classList.remove('hidden');
            startScreen.style.display = "none";
            gameScreen.style.display = "none";
            endScreen.style.display = "block";
        }
    }
    submitButton.addEventListener("click", checkAnswer);
    changeWordButton.addEventListener("click", changeWordF);
    newGameButton.addEventListener("click", resetGame);
    startGameButton.addEventListener("click", function () {
        playerName = usernameInput.value;
        if (playerName) {
            startGame();
            inputElement.focus();
        }
        else {
            alert("Por favor, ingresa tu nombre.");
        }
    });
    restartButton.addEventListener("click", resetGame);
});
