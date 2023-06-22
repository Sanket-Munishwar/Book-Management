const jwt = require('jsonwebtoken');



const isAuthentication = (req, res, next) => {
    try {
        const token  = req.headers['x-api-key'];
        if(!token) {
            return res.status(401).json({ status: false, message: 'Unauthorized' });
        }
        const decoded = jwt.verify(token,"Book-Management");
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
}

module.exports.isAuthentication=isAuthentication