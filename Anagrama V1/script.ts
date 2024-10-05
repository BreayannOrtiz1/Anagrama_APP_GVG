
document.addEventListener("DOMContentLoaded", () => {

    type GameState = {
        wordList: string[];
        currentWord: string;
        score: number;
        timeLeft: number;
    };

    const wordList: string[] = [
        "apple", "orange", "banana", "grape", "kiwi", "lemon", "peach", "pear", 
        "plum", "berry", "melon", "cherry", "mango", "papaya", "guava", "fig", 
        "date", "apricot", "olive", "coconut", "lime", "peanut", "walnut", 
        "almond", "cashew", "pecan", "hazelnut", "avocado", "durian", "persimmon", 
        "nectarine", "rhubarb", "pomegranate", "tamarind", "loquat", "lychee", 
        "quince", "passionfruit", "starfruit", "pineapple", "raspberry", 
        "blueberry", "blackberry", "strawberry", "cranberry", "currant", 
        "gooseberry", "elderberry", "mulberry", "boysenberry", "honeyberry"
    ];

    let state: GameState = {
        wordList: wordList,
        currentWord: "",
        score: 0,
        timeLeft: 50
    };

    let timerInterval: number | undefined;
    let playerName: string = "";

    const timerElement = document.getElementById("timer") as HTMLElement;
    const anagramContainer = document.getElementById("anagram-container") as HTMLElement;
    const inputElement = document.getElementById("guess-input") as HTMLInputElement;
    const submitButton = document.getElementById("submit-btn") as HTMLButtonElement;
    const changeWordButton = document.getElementById("change-word") as HTMLButtonElement;
    const newGameButton = document.getElementById("new-game") as HTMLButtonElement;
    const scoreElement = document.getElementById("score") as HTMLElement;
    const startGameButton = document.getElementById("start-game-btn") as HTMLButtonElement;
    const restartButton = document.getElementById("restart-btn") as HTMLButtonElement;

    const startScreen = document.getElementById("start-screen") as HTMLElement;
    const gameScreen = document.getElementById("game-screen") as HTMLElement;
    const endScreen = document.getElementById("end-screen") as HTMLElement;

    const usernameInput = document.getElementById("username") as HTMLInputElement;
    const greeting = document.getElementById("greeting") as HTMLElement;
    const finalMessage = document.getElementById("final-message") as HTMLElement;
    const finalScore = document.getElementById("final-score") as HTMLElement;

    function shuffleWord(word: string): string {
        const shuffledArray = word.split("").sort(() => 0.5 - Math.random());
        return shuffledArray.join("");
        //incorporar funcion para evitar que la palabra salga igual
    }

    function startGame(): void {
        state.score = 0;
        state.timeLeft = 50;
        state.currentWord = getNextWord();
        greeting.textContent = `Hola ${playerName}`;
        timerElement.textContent = "50";
        displayWord();
        updateScore();
        startTimer();
        showScreen("game");
    }

    function getNextWord(): string {
        const randomIndex = Math.floor(Math.random() * state.wordList.length);
        return shuffleWord(state.wordList[randomIndex]);
    }

    function displayWord(): void {
        anagramContainer.textContent = state.currentWord;
    }

    function updateScore(): void {
        scoreElement.textContent = `Score: ${state.score}`;
    }

    function startTimer(): void {
        if(timerInterval){
            clearInterval(timerInterval);
        }
        timerInterval = setInterval(() => {
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
    function checkAnswer(): void {
        const userGuess = inputElement.value.toLowerCase();
        if (wordList.indexOf(userGuess) !== -1) { // Cambiar includes() por indexOf()
            state.score++;
            updateScore();
            inputElement.value = "";
            state.currentWord = getNextWord();
            displayWord();
        }
    }

    function endGame(): void {
        finalMessage.textContent = `¡Buen trabajo, ${playerName}!`;
        finalScore.textContent = `Tu puntaje final es: ${state.score}`;
        showScreen("end");
        //alert(`Time's up! Your final score is ${state.score}`);
        //startGame();
    }

    function resetGame(): void{
        inputElement.value = "";
        usernameInput.value = "";
        timerElement.textContent = "50";

        showScreen("start")
    }

    function changeWordF(): void{
        inputElement.value = "";      // Limpiamos el input de texto
        state.currentWord = getNextWord();
        displayWord();
    }

    function showScreen(screen:string): void{
        // startScreen.classList.add('hidden');
        // gameScreen.classList.add('hidden');
        // endScreen.classList.add('hidden');
        if (screen === 'start') {
            startScreen.classList.remove('hidden');
            startScreen.style.display ="block";
            usernameInput.focus();
            gameScreen.style.display ="none";
            endScreen.style.display ="none";
        } else if (screen === 'game') {
            gameScreen.classList.remove('hidden');
            startScreen.style.display ="none";
            gameScreen.style.display ="block";
            endScreen.style.display ="none";
        } else if (screen === 'end') {
            endScreen.classList.remove('hidden');
            startScreen.style.display ="none";
            gameScreen.style.display ="none";
            endScreen.style.display ="block";
        }
    }

    submitButton.addEventListener("click", checkAnswer);
    changeWordButton.addEventListener("click", changeWordF);
    newGameButton.addEventListener("click", resetGame);
    startGameButton.addEventListener("click", () => {
        playerName = usernameInput.value;
        if (playerName) {
            startGame();
            inputElement.focus();
        } else {
            alert("Por favor, ingresa tu nombre.");
        }
    });
    restartButton.addEventListener("click", resetGame);
});