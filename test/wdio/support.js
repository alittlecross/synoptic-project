module.exports.restrictedLogIn = _ => {
  browser.url('/')
  const username = $('input[name="username"]')
  username.setValue('restricted@email.com')
  const password = $('input[name="password"]')
  password.setValue('password')
  const submit = $('button[type="submit"]')
  submit.click()
}

module.exports.viewLogIn = _ => {
  browser.url('/')
  const username = $('input[name="username"]')
  username.setValue('view@email.com')
  const password = $('input[name="password"]')
  password.setValue('password')
  const submit = $('button[type="submit"]')
  submit.click()
}

module.exports.editLogIn = _ => {
  browser.url('/')
  const username = $('input[name="username"]')
  username.setValue('edit@email.com')
  const password = $('input[name="password"]')
  password.setValue('password')
  const submit = $('button[type="submit"]')
  submit.click()
}

module.exports.restrictedQuiz = _ => {
  this.restrictedLogIn()
  const link = $('a[href="/quiz-1"]')
  link.click()
}

module.exports.viewQuiz = _ => {
  this.viewLogIn()
  const link = $('a[href="/quiz-1"]')
  link.click()
}

module.exports.editQuiz = _ => {
  this.editLogIn()
  const link = $('a[href="/quiz-1"]')
  link.click()
}

module.exports.editEditId = _ => {
  this.editLogIn()
  const quiz = $('a=English')
  quiz.click()
  const edit = $('a[href^="/edit"]')
  edit.click()
}

module.exports.editAdd = _ => {
  this.editLogIn()
  const quiz = $('a[href="/add"]')
  quiz.click()
}
