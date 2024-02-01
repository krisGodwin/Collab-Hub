const jwt = require("jsonwebtoken");

exports.generateToken = (res, userId) => {
    const token = jwt.sign({userId}, process.env.JWT_KEY, {
        expiresIn: '30d'
    })

    // Set jwt as HTTP only cookie
    res.cookie('jwt',token, {
        httpOnly: false,
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 1000,
        })
    return token;
}
