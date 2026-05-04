exports.verifyAdmin = async(req,res,next)=>{
    try {
        
        const userRole = req.userInfo.role;
        if(userRole !=="admin")
        {
            return res.status(403).json({Message:"Access denied. Admins only"});
        }
        next();
        
    } catch (error) {
        next(error);
    }
}