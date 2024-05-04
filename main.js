const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.get('/api/data', (req, res) => {
    fs.readFile("mess.json", "utf8", (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
            return;
        }

        const jsonData = JSON.parse(data);
        res.json(jsonData);
    });
});

app.listen(PORT, () => {
    console.log("Server is running on port 3000");
})