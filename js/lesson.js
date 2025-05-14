
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




