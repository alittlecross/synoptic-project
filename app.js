const express = require('express')
const app = express()

const port = process.env.APORT || 3000

app.set('views', './server/views')
app.use(express.static('./server/public'))

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

const session = require('express-session')
app.use(session(require('./server/plug-ins/session')))

const flash = require('./server/plug-ins/flash')
app.use(flash)

app.get('/', require('./server/routes/index'))

app.post('/log-in', require('./server/routes/log-in'))

app.get('/list', require('./server/routes/list'))

app.get('/log-out', require('./server/routes/log-out'))

app.get('/quiz-:id', require('./server/routes/quiz'))

app.get('/add', require('./server/routes/add').get)

app.post('/add', require('./server/routes/add').post)

app.listen(port)
