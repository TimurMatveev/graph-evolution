var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

var index = require("./routes/index");
var machines = require("./routes/machines");

var app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("html", require('ejs').renderFile);

app.use(express.static(path.join(__dirname, "client")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", index);
app.use("/api/v1/", machines);

var livereload = require("livereload").createServer({
    exts: ['js', 'ts', 'css', 'html', 'ejs']
});
livereload.watch(path.join(__dirname, "views"));
livereload.watch(path.join(__dirname, "routes"));
livereload.watch(path.join(__dirname, "client"));

app.listen(3000, function () {
    console.log("server started on port 3000");
})