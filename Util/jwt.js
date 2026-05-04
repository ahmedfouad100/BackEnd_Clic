const jwt = require("jsonwebtoken");

exports.generateToken = (userId, userRole) => {
    const token = jwt.sign(
        { id: userId, role: userRole },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    )

    return token;

}
