/**
 * @author YsnIrix
 * @email ysn4irix@inilogic.com
 * @create date 30-03-2021
 * @modify date 31-03-2021
 * @desc News Router
 */

const router = require('express').Router();
const axios = require('axios');
const {
  verifyLogin
} = require('../routes/auth');

/* GET posts Page. */
router.get('/', verifyLogin, async function (req, res, next) {
  const InterestedIn = req.user.user.interestedin;
  const Country = req.user.user.country;
  const APIKEY = process.env.API_KEY;
  try {
    const newsAPI = await axios.get(`https://newsapi.org/v2/top-headlines?category=${InterestedIn}&country=${Country}&apiKey=${APIKEY}`);
    //return res.status(422).jsonp(newsAPI.data.articles[0].author);
    res.render('news', {
      title: "HotNews",
      userData: req.user.user,
      news: newsAPI.data.articles
    })
  } catch (error) {
    res.render('news', {
      title: "HotNews",
      news: null
    });
  }
});

module.exports = router;