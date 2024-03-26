import express from "express";
import MySQL from 'mysql';
import cors from 'cors';

const app = express();
const port = 3010;

app.get("/", (req, res) => {
    res.send("Welcome To My Server")
});

app.use(cors());

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Create MySQL Connection to My DB
var con = MySQL.createConnection({
    host: "localhost",
    user: "root",
    password: "Sandbach1",
    database: "shoppingProject"
});


con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

// Close MySQL connection when the Node.js process exits
process.on('SIGINT', function () {
    console.log("Closing MySQL connection...");
    con.end(function (err) {
        if (err) {
            console.error("Error closing MySQL connection:", err);
        } else {
            console.log("MySQL connection closed.");
        }
        process.exit();
    });
});

app.get('/whatsnew', (req, res) => {
    const query = "select * from whatsnew";
    con.query(query, (error, success) => {
        if (error) {
            console.log("Error Quering Whatsnew table");
            res.status(500).json({ error: "Error Quering Database whatsnew:" });
        }
        else {
            res.json(success);
        }
    })
});