const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const express = require("express")
const router = express.Router()

const usersDB = require("../model.js")
const { jwtSecret } = require("../../data/config/secrets")

const { validateUserInput, validateLoginReq } = require("../../middleware/usersMiddleware")


router.post("/register", validateUserInput, async (req, res) => {

    
    try {
        res.status(201).json( await usersDB.addNewUser(req.body))
    }
    
    catch(err){
        res.status(500).json({message: `ERROR 500`})
    }
})


router.post("/login", validateLoginReq, async (req, res) => {

    try {

        const  { username, password } = req.body;
        const user = await usersDB.findBy({ username }).first()
        const passwordValid = await bcrypt.compareSync(password, user.password)

        if (user && passwordValid){
            const token = signToken(user)
            req.session.user = user
            req.session.loggedIn = true
            res.status(200).json({ token, message: `Welcome ${user.username}` })
        } else {
            res.status(401).json({ message: "Invalid Credentials" });
        }
    }
    
    catch(err){
        res.status(500).json({ message: `ERROR ${err}` })
    }
})


router.get("/protected", async(req,res,next)=> {
    
    try {

        if (!req.headers.authorization || !req.session) {
            return res.status(403).json({ message: `YOU SHALL NOT PASS` })
        }
        res.status(200).json({ message: "YOU MAY PROCEED"})
    }
    catch(err){
        next(err)
    }

})


router.get("/logout", (req,res,next)=>{
    req.session.destroy((err)=> {
        if (err) {
            next(err)
        } else {
            res.json({
                message: `BYE!! DON'T COME BACK`
            })
        }
    })
    req.headers.authorization = ""
})



function signToken(user) {
    const payload = {
        department: user.department
    }
    const options = {
        expiresIn: '1d'
    }

    return jwt.sign(payload, jwtSecret, options);
  }
  

module.exports = router