const container = document.getElementById('cards-container');

async function fetchPosts() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
            throw new Error('Ошибка при получении данных');
        }
        const data = await response.json();
        renderCards(data.slice(0, 12)); // Покажем первые 12 карточек
    } catch (error) {
        container.innerHTML = `<p>Ошибка загрузки данных: ${error.message}</p>`;
    }
}

function renderCards(posts) {
    posts.forEach(post => {
        const card = document.createElement('div');
        card.className = 'card';

        card.innerHTML = `
      <img src="https://images.steamusercontent.com/ugc/1816647004877770055/2E0EE9FACE5FE03D192CC10A8505C6E8222BC197/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false" alt="Изображение">
      <div class="card-content">
        <h3>${post.title}</h3>
        <p>${post.body}</p>
      </div>
    `;

        container.appendChild(card);
    });
}

fetchPosts();
