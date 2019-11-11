const Quiz = require('../lib/quiz')

module.exports = async (req, res) => {
  if (req.session.user) {
    const quizes = await Quiz.list()

    res.render('list.ejs', {
      quizes: quizes
    })
  } else {
    res.redirect('/')
  }
}
