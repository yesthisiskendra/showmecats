const express = require('express');
const path = require('path');
const request = require('request');

const app = express();

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/kittens', (req, res) => {
	request.get("https://www.reddit.com/r/MildlyStartledCats.json", (error, response, body) => {
    if(error) {
        return console.dir(error);
    }
    const newBody = JSON.parse(body);
    res.json(newBody);
});
});

app.get('/api/dogs', (req, res) => {
	request.get("https://www.reddit.com/r/dogswearinghats.json", (error, response, body) => {
    if(error) {
        return console.dir(error);
    }
    const newBody = JSON.parse(body);
    res.json(newBody);
});
});

app.get('*', (res, req) => {
	res.sendFile(path.join(__dirname,+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);
console.log(`Password generator listening on ${port}`);

