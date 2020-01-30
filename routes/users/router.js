const express = require("express")
const db = require("../model")
const { validateSession, validateToken }= require("../../middleware/usersMiddleware.js")

const router = express.Router()




router.get('/', validateSession, async (req, res) => {
    try{
        res.status(200).json(await db.getAllUsers())
    }

    catch (err){
        res.status(500).json({ message: `500 Error`})
    }

  });


module.exports = router