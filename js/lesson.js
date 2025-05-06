
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


