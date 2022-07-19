const express = require("express")
const app = express();
const bodyParser = require("body-parser");
const ejs = require("ejs");
const router = require("./router/router")
const session = require("express-session");
const {v4:uuid} = require("uuid")

//bodyParser
app.use(bodyParser.urlencoded({extended: true}));

//init ejs
app.set("view engine", "ejs");

// Session
app.use(session({
    secret : uuid(),
    resave: false,
    saveUninitialized: true
}));


// router
app.use("/route" , router);



// static folder
app.use("/static",express.static("public"));

app.get("/" , (req,res) => {
    res.render("index")
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>  {
    console.log("Server has started in http://localhost:3000")
})
