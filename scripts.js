document.getElementById('post-article-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username === 'Atiq' && password === 'Abassin10') {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const date = document.getElementById('date').value;
    const content = document.getElementById('content').value;
    const image = document.getElementById('image').value;

    const article = {
      title,
      author,
      date,
      content,
      image
    };

    // Save the article (you can use localStorage or a backend service)
    localStorage.setItem(`article-${Date.now()}`, JSON.stringify(article));

    alert('Article posted successfully!');
    window.location.href = 'index.html';
  } else {
    alert('Invalid username or password');
  }
});

window.onload = function() {
  const articlesList = document.getElementById('articles-list');
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith('article-')) {
      const article = JSON.parse(localStorage.getItem(key));
      const articleElement = document.createElement('div');
      articleElement.innerHTML = `
        <h2>${article.title}</h2>
        <p>By ${article.author} on ${article.date}</p>
        <img src="${article.image}" alt="${article.title}">
        <p>${article.content.substring(0, 100)}...</p>
        <a href="article.html?id=${key}">Read more</a>
      `;
      articlesList.appendChild(articleElement);
    }
  }
};
