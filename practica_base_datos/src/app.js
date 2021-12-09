const express = require("express");
const path = require("path");
const inscripcion = require("./routes/inscripcion");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('views', path.join(__dirname, '/views'));

app.set('view engine', 'html');

app.engine('html', require('ejs').renderFile);

app.use("/inscripcion", inscripcion);

app.get("/", function(req, res){
    res.render("index.html");
});


app.listen(3000);
