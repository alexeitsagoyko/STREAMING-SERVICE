const jwt = require('jsonwebtoken');
const { secret } = require('../configs/config');

module.exports = function (req, res, next) {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: "User is not authorized" });
        }
        const decodedData = jwt.verify(token, secret);
        req.user = decodedData;
        next();
    } catch (e) {
        console.log(e);
        return res.status(401).json({ message: "User is not authorized." });
    }
};