
const contentBlocks = document.querySelectorAll(".tab_content_block");
const tabItems = document.querySelectorAll(".tab_content_item");
let currentIndex = 0;
let intervalId;

function showTab(index) {
    contentBlocks.forEach((block, i) => {
        block.style.display = i === index ? "block" : "none";
    });

    tabItems.forEach((item, i) => {
        item.classList.toggle("tab_content_item_active", i === index);
    });

    currentIndex = index;
}

showTab(currentIndex);

function startSlider() {
    intervalId = setInterval(() => {
        currentIndex = (currentIndex + 1) % contentBlocks.length;
        showTab(currentIndex);
    }, 3000);
}

startSlider();

tabItems.forEach((item, index) => {
    item.addEventListener("click", () => {
        showTab(index);
        clearInterval(intervalId); 
        startSlider(); 
    });
});


const somInput = document.querySelector('#som');
const usdInput = document.querySelector('#usd');
const euroInput = document.querySelector('#euro');

const converter = (element) => {
    element.oninput = () => {
        const request = new XMLHttpRequest();
        request.open('GET', '../data/converter.json');
        request.setRequestHeader('Content-type', 'application/json');
        request.send();

        request.onload = () => {
            const data = JSON.parse(request.response);

            if (element.value === '') {
                somInput.value = '';
                usdInput.value = '';
                euroInput.value = '';
                return;
            }

            if (element.id === 'som') {
                usdInput.value = (element.value / data.usd).toFixed(2);
                euroInput.value = (element.value / data.euro).toFixed(2);
            }

            if (element.id === 'usd') {
                somInput.value = (element.value * data.usd).toFixed(2);
                euroInput.value = ((element.value * data.usd) / data.euro).toFixed(2);
            }

            if (element.id === 'euro') {
                somInput.value = (element.value * data.euro).toFixed(2);
                usdInput.value = ((element.value * data.euro) / data.usd).toFixed(2);
            }
        };
    };
};

converter(somInput);
converter(usdInput);
converter(euroInput);

const cardBlock = document.querySelector('.card');
const btnNext = document.querySelector('#btn-next');
const btnPrev = document.querySelector('#btn-prev');

let cardId = 1;
const maxCardId = 200;


function fetchAndRenderCard(id) {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
        .then(response => response.json())
        .then(data => {
            const { id, title, completed } = data;
            cardBlock.innerHTML = `
        <p>${title}</p>
        <p style="color: ${completed ? 'green' : 'red'}">${completed}</p>
        <span>${id}</span>
      `;
        });
}

// Обработчики кнопок
btnNext.onclick = () => {
    cardId = cardId >= maxCardId ? 1 : cardId + 1;
    fetchAndRenderCard(cardId);
};

btnPrev.onclick = () => {
    cardId = cardId <= 1 ? maxCardId : cardId - 1;
    fetchAndRenderCard(cardId);
};


fetchAndRenderCard(cardId);

fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(posts => {
        console.log('Posts:', posts);
    });






