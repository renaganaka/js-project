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

let position = 0;

function moveRight() {
    const maxRight = parent.clientWidth - child.clientWidth;

    if (position < maxRight) {
        position += 2;
        child.style.left = `${position}px`;

        requestAnimationFrame(moveRight);
    }
}

moveRight();
