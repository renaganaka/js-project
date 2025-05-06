
const modal = document.querySelector('.modal');
const closeModalBtn = document.querySelector('.modal_close');
const btnGet = document.getElementById('btn-get');
let autoModalShown = false; // Только для таймера и скролла

function openModal() {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

btnGet.addEventListener('click', openModal);

closeModalBtn.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

const modalTimerId = setTimeout(() => {
    if (!autoModalShown) {
        openModal();
        autoModalShown = true;
    }
}, 10000);

function showModalByScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 1) {
        if (!autoModalShown) {
            openModal();
            autoModalShown = true;
        }
        window.removeEventListener('scroll', showModalByScroll);
    }
}

window.addEventListener('scroll', showModalByScroll);


