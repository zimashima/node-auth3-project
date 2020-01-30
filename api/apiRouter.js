const express = require("express")
const router = express.Router()

const authRouter = require("../modelsAndRouters/auth/router.js")
const usersRouter = require("../modelsAndRouters/users/router.js")

router.use('/auth', authRouter)
router.use('/users', usersRouter)

router.get('/', (req, res) => {
    res.send(`<h1>API ROUTE ALIVE</h1>`);
  });

module.exports = router