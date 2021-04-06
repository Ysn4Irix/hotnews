/**
 * @author YsnIrix
 * @email ysn4irix@inilogic.com
 * @create date 30-03-2021
 * @modify date 31-03-2021
 * @desc Index Router
 */

const router = require('express').Router();
const User = require('../models/users');
const {
  check,
  validationResult,
  Result
} = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  IsLogged
} = require('../routes/auth');

/* GET home page. */
router.get('/', IsLogged, function (req, res, next) {
  res.render('index', {
    title: "HotNews - Login"
  });
});

router.post('/', [
  check("email", "A valid Email is required")
  .isEmail()
  .normalizeEmail()
  .trim()
  .escape(),
  check("password", "Password is required").notEmpty().trim().escape()
], async (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    // Checking the email is exist
    const user = await User.findOne({
      email: req.body.email
    });
    if (!user) {
      req.flash("error", "User not found");
      return res.redirect('/');
    }

    // Checking the password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {
      req.flash("error", "Email or Password is incorrect");
      return res.redirect('/');
    }

    // Create & asign a token to the user
    const token = jwt.sign({
      user: user,
      expireIn: '24h'
    }, process.env.JWT_SECRET);

    res.cookie("ysntoken", token, {
      expireIn: 3600000,
      httpOnly: true
    });
    return res.redirect("/news");
  } else {
    //return res.status(422).jsonp(errors.array())
    let error_msg = "";
    errors.array().forEach((error) => {
      error_msg += error.msg + "<br/>";
    });
    req.flash("error", error_msg);
    res.render("index", {
      title: "HotNews - Signin"
    });
  }
});

module.exports = router;