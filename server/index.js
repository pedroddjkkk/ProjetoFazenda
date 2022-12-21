const express = require("express");
const path = require("path");
var dbUtils = require("./utils/dbUtils");

const PORT = process.env.PORT || 3001;

const app = express();

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.use(express.static(path.join(__dirname, "client", "build")));

app.get("/teste", (req, res) => {
    dbUtils.query("SELECT * FROM users", function(err, rows) {
        if (err) {
            console.log(err);
        } else {
            console.log(rows);
            res.send(rows);
        }
    });
});
