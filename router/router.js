const { application } = require("express");
const express = require("express");
const router = express.Router();
const session  = require('express-session');

const credential = {
    email: "admin@gmail.com",
    password:"admin123"
}

// Route for Login
router.post("/login", (req,res) => {
    if(req.body.email === credential.email && req.body.password === credential.password){
        req.session.user = req.body.email;
        res.redirect('/route/dashboard')
    }
    else {
        res.send("invalid Email")
    }
})

// route for dashboard
router.get("/dashboard", (req,res) => {
    if(req.session.user) {
        res.render("dashboard", { user : req.session.user})
    } 
    else {
        res.send("Unauthorized User")
    }
})

router.get("/logout", (req,res) => {
    req.session.destroy( err => {
        if(err){
            console.log("Logout Failed")
        }else{
            res.render("index", {logout:"Log Out successfully...."})
        }
    })
    
})
module.exports = router;