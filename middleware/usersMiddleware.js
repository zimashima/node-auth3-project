
const bcrypt = require("bcryptjs")
const Users = require("../routes/model.js")


function validateSession(req, res, next) {
    if (req.session && req.session.loggedIn) {
        next();
    } else {
        res.json({ you: "shall not pass!" });
    }
}

function validateToken(req,res,next) {
    const token = req.headers.authorization;

  if(token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if(err) {
        res.status(401).json({ you: "can't touch this!"})
      } else {
        req.user = { department: decodedToken.department };
        next();
      }
    })
  } else {
    res.status(401).json({ you: 'shall not pass!'})
  }
}

function validateLoginReq(req, res, next){
    if (!req.body){
        res.status(400).json({ message: `Please make sure the REQUEST BODY is not empty` })
      } else if (!req.body.username) {
        res.status(400).json({ message: `Please make sure that USERNAME field is not empty` })
      } else if (!req.body.password){
        res.status(400).json({ message: `Please make sure that PASSWORD field is not empty` })
      } else {
        next()
      }
}

function validateUserInput(req, res, next){
    console.log(req.body)
    if (!req.body){
        res.status(400).json({ message: `Please make sure the REQUEST BODY is not empty` })
      } else if (!req.body.username) {
        res.status(400).json({ message: `Please make sure that USERNAME field is not empty` })
      } else if (!req.body.password){
        res.status(400).json({ message: `Please make sure that PASSWORD field is not empty` })
      } else if (!req.body.department){
        res.status(400).json({ message: `Please make sure that DEPARTMENT field is not empty` })
      } else {
        next()
      }
}



module.exports = {
    validateSession,
    validateUserInput,
    validateLoginReq,
    validateToken
}
