/**
 * @author YsnIrix
 * @email ysn4irix@inilogic.com
 * @create date 30-03-2021
 * @modify date 31-03-2021
 * @desc Signup Router
 */

const router = require('express').Router();
const User = require('../models/users');
const {
    check,
    validationResult
} = require('express-validator');
const bcrypt = require('bcrypt');
const {
    IsLogged
} = require('../routes/auth');

/* GET Register Page. */
router.get('/', IsLogged, (req, res) => {
    res.render("signup", {
        title: "HotNews - Signup"
    })
});

router.post('/', [
    check("country", "Country is required").notEmpty().trim().escape(),
    check("interestedin", "Interesting is required").notEmpty().trim().escape(),
    check("email", "A valid Email is required")
    .isEmail()
    .normalizeEmail()
    .trim()
    .escape(),
    check("password", "Password is required").notEmpty().trim().escape(),
], async (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        const hashPassword = await bcrypt.hash(req.body.password, 10);

        // Checking the email is exist
        const emailExist = await User.findOne({
            email: req.body.email
        });
        if (emailExist) {
            req.flash("error", "Email already exists");
            return res.redirect("/signup");
        }

        const user = new User({
            email: req.body.email,
            password: hashPassword,
            country: req.body.country,
            interestedin: req.body.interestedin
        });

        user.save().then(() => {
            req.flash("success", "You have successfully signup! <a href='../'>Login Now</a>");
            return res.redirect("/signup");
        }).catch(() => {
            req.flash("error", "An Error Occured try again later");
            return res.redirect("/signup");
        });

    } else {
        //return res.status(422).jsonp(errors.array())
        let error_msg = "";
        errors.array().forEach((error) => {
            error_msg += error.msg + "<br/>";
        });
        req.flash("error", error_msg);
        res.render("signup", {
            title: "HotNews - Signup"
        });
    }
});

module.exports = router;