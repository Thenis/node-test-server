const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

let app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

/*app.use((req, res, next) => {
	res.render("maintenance.hbs")
});*/

app.use(express.static(__dirname + "/public"));

app.use((req, res, next) => {
	let now = new Date().toString();
	let log = `${now}: ${req.method} ${req.url}`;

	fs.appendFile("server.log", log + "\n", (error) => {
		if (error) {
			console.log("Unable to append to server.log");
		}
	});
	next();
});

hbs.registerHelper("getCurrentYear", () => {
	return new Date().getFullYear();
});

hbs.registerHelper("screamIt", (text) => {
	return text.toUpperCase();
});

app.get("/", (req, res) => {
	res.render("home.hbs", {
		pageTitle: "Welcome page",
		welcomeMsg: "Welcome to my website"
	});
});

app.get("/about", (req, res) => {
	res.render("about.hbs", {
		pageTitle: "About page",
	});
});

app.get("/bad", (req, res) => {
	res.send({
		errorMessage: "Unable to fulfill request."
	});
});

app.listen(3000, () => {
	console.log("Server is up on port 3000");
});