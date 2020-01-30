const express = require("express")
const router = express.Router()

const authRouter = require("../routes/auth/router")
const usersRouter = require("../routes/auth/router")

router.use('/auth', authRouter)
router.use('/users', usersRouter)

router.get('/', (req, res) => {
    res.send(`<h1>API ROUTE ALIVE</h1>`);
  });

module.exports = router