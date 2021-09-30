//This is a middleware which will basically execute everytime any login required route hgets executed
const jwt = require("jsonwebtoken")
const JWT_TOKEN = "india@won%goldmedal#in&olympic(*^&^"


const fetchUser = (req, res, next) => {
    const token = req.header('auth-token')
    if (!token) {
        res.status(401).send({ error: "Please authenticate with right token!!" })
    }
    try {
        const data = jwt.verify(token, JWT_TOKEN)
        req.user = data.user;
        next()
    } 
    catch (error) {
        res.status(401).send({ error: "Please authenticate with right token!!" })
    }


}

module.exports = fetchUser