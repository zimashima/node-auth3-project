const express = require("express")
const bcrypt = require("bcryptjs")
const router = express.Router()

const usersDB = require("../users/model.js")


router.post("/register", async (req, res) => {
   
    console.log(req.body)
    
    try {
        res.status(201).json( await usersDB.addNewUser(req.body))
    }
    
    catch(err){
        res.status(500).json({message: `ERROR 500`})
    }
})


router.post("/login", async (req, res) => {

    try {
        const  { username, password } = req.body;
        const user = await usersDB.findBy({ username }).first()
        const passwordValid = await bcrypt.compareSync(password, user.password)

        if (user && passwordValid){

            req.session.user = user
            req.session.loggedIn = true

            res.status(200).json({ 
                message: `Welcome ${user.username}`})

        } else {
            res.status(401).json({ message: "Invalid Credentials" });
        }
    }
    
    catch(err){
        res.status(500).json({message: `ERROR ${err}`})
    }
})


router.get("/protected", async(req,res,next)=> {
    
    try {

        if (!req.session || !req.session.user) {
            return res.status(403).json({
                message: `YOU SHALL NOT PASS`
            })
        }
       
        res.json({
            message: "YOU MAY PROCEED"
        })

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
})


module.exports = router