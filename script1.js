document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    if (response.ok) {
        localStorage.setItem('token', data.token);
        alert('Logged in successfully!');
    } else {
        alert('Invalid credentials');
    }
});

document.getElementById('postForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    const title = event.target.title.value;
    const date = event.target.date.value;
    const author = event.target.author.value;
    const content = event.target.content.value;
    const response = await fetch('/articles', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token, title, date, author, content })
    });
    if (response.ok) {
        alert('Article posted successfully!');
        loadArticles();
    } else {
        alert('Failed to post article');
    }
});

async function loadArticles() {
    const response = await fetch('/articles');
    const articles = await response.json();
    const articlesDiv = document.getElementById('articles');
    articlesDiv.innerHTML = articles.map(article => `
        <div>
            <h3>${article.title}</h3>
            <p>${article.date}</p>
            <p>${article.author}</p>
            <p>${article.content}</p>
        </div>
    `).join('');
}

window.onload = loadArticles;
