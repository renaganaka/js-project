
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
    element.oninput = async () => {
        try {
            const response = await fetch('../data/converter.json');
            const data = await response.json();

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
        } catch (error) {
            console.error('Ошибка при конвертации:', error);
        }
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

async function fetchAndRenderCard(id) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
        const data = await response.json();
        const { id: cardId, title, completed } = data;

        cardBlock.innerHTML = `
            <p>${title}</p>
            <p style="color: ${completed ? 'green' : 'red'}">${completed}</p>
            <span>${cardId}</span>
        `;
    } catch (error) {
        console.error('Ошибка при загрузке карточки:', error);
        cardBlock.innerHTML = '<p>Произошла ошибка при загрузке данных</p>';
    }
}


btnNext.onclick = async () => {
    cardId = cardId >= maxCardId ? 1 : cardId + 1;
    await fetchAndRenderCard(cardId);
};

btnPrev.onclick = async () => {
    cardId = cardId <= 1 ? maxCardId : cardId - 1;
    await fetchAndRenderCard(cardId);
};


(async () => {
    try {
        await fetchAndRenderCard(cardId);

        const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
        const posts = await postsResponse.json();
        console.log('Posts:', posts);
    } catch (error) {
        console.error('Ошибка при инициализации:', error);
    }
})();

const searchInput = document.querySelector('.cityName');
const searchButton = document.querySelector('#search');
const city = document.querySelector('.city');
const temp = document.querySelector('.temp');

const BASE_API = 'http://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'e417df62e04d3b1b111abeab19cea714';

searchButton.onclick = async () => {
    try {
        if (searchInput.value.trim() !== '') {
            const response = await fetch(`${BASE_API}?q=${searchInput.value}&units=metric&lang=ru&appid=${API_KEY}`);

            if (!response.ok) {
                throw new Error('Город не найден');
            }

            const data = await response.json();
            city.innerHTML = data.name || 'Город не найден...';
            temp.innerHTML = `${Math.round(data.main.temp)}°C`;
            searchInput.value = '';
        } else {
            city.innerHTML = 'Введите название города';
            temp.innerHTML = '';
        }
    } catch (e) {
        console.error('Ошибка:', e);
        city.innerHTML = 'Произошла ошибка при поиске';
        temp.innerHTML = '';
    }
};





