
const bcrypt = require("bcryptjs")
const Users = require("../modelsAndRouters/users/model.js")


function restricted(req, res, next) {
    if (req.session && req.session.loggedIn) {
        next();
    } else {
        res.json({ you: "shall not pass!" });
    }
}


module.exports = {
    restricted
}