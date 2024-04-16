const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Load question-answer pairs from data.json
const data = JSON.parse(fs.readFileSync('data.json'));

app.use(bodyParser.json());
app.use(express.static('public'));

// Serve static files with correct MIME types
app.use(express.static('public', {
    setHeaders: (res, path) => {
        if (path.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        }
    }
}));

// Route handler for the root route ("/")
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/ask', (req, res) => {
    const { question } = req.body;
    const answer = data[question] || 'I do not understand your question.';
    res.json({ answer });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
