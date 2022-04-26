const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const userRouter = require('./src/routes/user.routes')

app.use(bodyParser.json())

app.all('*', (req, res, next) => {
  const method = req.method
  console.log(`Method ${method} is aangeroepen`)
  next()
})

//Router moet hier omdat als het pad niet gevonden kan worden,
//Hij door gaat naar de route hieronder "end-point not found"
app.use(userRouter)

app.all('*', (req, res) => {
  res.status(401).json({
    status: 401,
    result: 'End-point not found',
  })
})

//error handler
app.use((err, req, res, next) => {
  res.status(err.status).json(err)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
