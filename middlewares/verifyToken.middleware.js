const jwt = require("jsonwebtoken");

exports.verifyToken = (req,res,next)=>{
    try {
        let token = req.headers.authorization;
        if(!token)
        {
            return res.status(401).json({Message:"Token is not provided"});
        }

        if (token.startsWith("Bearer ")) {
            token = token.split(" ")[1]; 
        }

        const decode= jwt.verify(token,process.env.JWT_SECRET);
        if(!decode)
        {
            return res.status(400).json({Message:"invalid Token"});
        }
        req.userInfo = decode; 
        next();
    } catch (error) {
        next(error);
    }
}