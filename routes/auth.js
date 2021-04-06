/**
 * @author YsnIrix
 * @email ysn4irix@inilogic.com
 * @create date 30-03-2021
 * @modify date 31-03-2021
 * @desc Authentication Middleware
 */
const jwt = require('jsonwebtoken');

// Authentication Middleware
function verifyLogin(req, res, next) {
    const token = req.cookies.ysntoken;
    /* return res.status(422).jsonp(token) */
    if (!token) {
        return res.redirect('/');
    } else {
        try {
            const verified = jwt.verify(token, process.env.JWT_SECRET);
            req.user = verified;
            next();
        } catch (err) {
            return res.status(400);
        }
    }

}

// IsLogged
function IsLogged(req, res, next) {
    const token = req.cookies.ysntoken;
    /* return res.status(422).jsonp(token) */
    if (token) {
        return res.redirect('/news');
    } else {
        next();
    }
}

module.exports = {
    verifyLogin,
    IsLogged
};