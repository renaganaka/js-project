const gmailInput = document.getElementById("gmail_input");
const gmailButton = document.getElementById("gmail_button");
const gmailResult = document.getElementById("gmail_result");

const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

gmailButton.addEventListener("click", () => {
    const email = gmailInput.value.trim();

    if (gmailRegex.test(email)) {
        gmailResult.textContent = "Почта валидна";
        gmailResult.style.color = "green";
    } else {
        gmailResult.textContent = "Невалидный Gmail (пример: example@gmail.com)";
        gmailResult.style.color = "red";
    }
});


const child = document.querySelector(".child_block");
const parent = document.querySelector(".parent_block");

let positionX = 0, positionY = 0;
let dir = "right";

const moveChild = () => {
    const maxRight = parent.clientWidth - child.clientWidth;
    const maxBottom = parent.clientHeight - child.clientHeight;

    requestAnimationFrame(moveChild);

    switch (dir)
    {
        case "right":
            positionX++;
            if (positionX >= maxRight) dir = "down";
            break;
        case "down":
            positionY++;
            if (positionY >= maxBottom) dir = "left";
            break;
        case "left":
            positionX--;
            if (positionX <= 0) dir = "up";
            break;
        case "up":
            positionY--;
            if (positionY <= 0) dir = "right";
            break;
    }

    child.style.left = `${positionX}px`;
    child.style.top = `${positionY}px`;
}

moveChild();


const secondsCount = document.getElementById("seconds");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");

let timerInterval;
let seconds = 0;
let isRunning = false;

const startTimer = () => {
    if (isRunning) return;
    isRunning = true;
    timerInterval = setInterval(() => {
        seconds++;
        secondsCount.textContent = seconds;
    }, 1000);
}

const stopTimer = () => {
    clearInterval(timerInterval);
    isRunning = false;
}

const resetTimer = () => {
    clearInterval(timerInterval);
    seconds = 0;
    secondsCount.textContent = seconds;
    isRunning = false;
}

startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimer);

const container = document.querySelector('.characters-list');


async function loadCharacters() {
    try {
        const response = await fetch('../data/characters.json');
        const characters = await response.json();


        container.innerHTML = '';

        characters.forEach(character => {
            const card = document.createElement('div');
            card.className = 'character-card';
            card.innerHTML = `
                <div class="character-photo">
                    <img src="${character.photo}" alt="${character.name}">
                </div>
                <h3>${character.name}</h3>
                <p>Age: ${character.age}</p>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Ошибка при загрузке персонажей:', error);
        container.innerHTML = '<p>Произошла ошибка при загрузке данных</p>';
    }
}


async function loadAnyJson() {
    try {
        const response = await fetch('../data/any.json', {
            headers: {
                'Accept': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Ошибка при загрузке JSON:', error);
    }
}


(async () => {
    await loadCharacters();
    await loadAnyJson();
})();
