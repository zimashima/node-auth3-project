const bcrypt = require("bcryptjs")
const db = require("../data/dbConfig")


function getAllUsers(){
    return db("users").select("id", "username", "department")
}

function findUserById(id){
    return db("users").where("id", id).first("id","username")

}

function findBy(key) {
    return db("users").select("id", "username", "password").where(key);
}

async function addNewUser(user) {
    user.password = await bcrypt.hash(user.password, 10)
    const [ id ] = await db("users").insert(user)
    return await db("users").where("id", id).first("id","username")
}

module.exports = {
    getAllUsers,
    findUserById,
    addNewUser,
    findBy
}