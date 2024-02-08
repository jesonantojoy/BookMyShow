const jwt = require("jsonwebtoken")

module.exports= function (req, res, next){
        
        const token = req.headers.authorization.split(" ")[1]
        const decrypt = jwt.verify(token, process.env.jwt_Secretkey)
        req.body.userid=decrypt.userid
        next()
    
}