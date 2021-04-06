/**
 * @author YsnIrix
 * @email ysn4irix@inilogic.com
 * @create date 31-03-2021
 * @modify date 31-03-2021
 * @desc Signout Router
 */
const router = require('express').Router();
const {
    verifyLogin
} = require('../routes/auth');

router.get('/', verifyLogin, function (req, res, next) {
    res.clearCookie("ysntoken").redirect("/");
});

module.exports = router;