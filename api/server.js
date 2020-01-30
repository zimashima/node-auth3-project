const express = require("express")
const server = express()

const session = require("express-session")
const dbConnection = require("../data/dbConfig")
const configMiddleware = require("../middleware/configMiddleware.js")

const apiRouter = require("./apiRouter")

server.use(session({
    name: `snickerdoodle`,
    resave: false,
    saveUninitialized: false,
    secret: "can you keep a secret?",
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 *20,
        secure: false
    },
    store: new KnexSessionStore({
        knex: dbConnection,
        tablename: "session",
        sidfieldname:"sid",
        createtable: true,
        clearInterval: 60000,
    })
    
}))

server.get("/", (req,res)=> {
    res.send(`Server is running`)
})

server.use("/api", apiRouter)

configMiddleware(server)

module.exports = server