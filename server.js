const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());

const users = [{ username: 'Atiq', password: bcrypt.hashSync('Atiq123', 8) }];
const articles = [];
const SECRET_KEY = 'your_secret_key';

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).send('Invalid credentials');
    }
});

app.post('/articles', (req, res) => {
    const { token, title, date, author, content } = req.body;
    try {
        jwt.verify(token, SECRET_KEY);
        articles.push({ title, date, author, content });
        res.status(201).send('Article posted');
    } catch (e) {
        res.status(401).send('Unauthorized');
    }
});

app.get('/articles', (req, res) => {
    res.json(articles);
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
