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

        let jsonData = JSON.parse(data);
        const { type, week, day, meal } = req.query;

         if (type) {
            jsonData = jsonData[type];
            if (week) {
                jsonData = jsonData?.[week];
                if (day) {
                    jsonData = jsonData?.[day];
                    if (meal) {
                        jsonData = jsonData?.[meal];
                    }
                }
            }
        }

        res.json(jsonData || {});
    });
});

app.listen(PORT, () => {
    console.log("Server is running on port 3000");
})

// http://localhost:3000/api/data?type=South%20Veg&week=odd&day=Sunday&meal=Breakfast
