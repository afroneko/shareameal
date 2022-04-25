// const http = require('http')

// const hostname = '127.0.0.1'
// const port = 3000

// const server = http.createServer((req, res) => {
//   res.statusCode = 200
//   res.setHeader('Content-Type', 'text/plain')
//   res.end('Hello World\n')
// })

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`)
// })

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const bodyParser = require('body-parser')
app.use(bodyParser.json())

let database = []
let id = 0

app.all('*', (req, res, next) => {
  const method = req.method
  console.log(`Method ${method} is aangeroepen`)
  next()
})

app.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    result: 'Hello World',
  })
})

//#UC-201 Register as a new user
app.post('/api/user', (req, res) => {
  let user = req.body
  console.log(user)
  let email = user.emailAdress
  let userList = database.filter((item) => item.emailAdress == email)
  if (userList.length > 0) {
    res.status(401).json({
      status: 401,
      result: `Emailadress:  ${email} has already been used.`,
    })
  } else {
    user = {
      id,
      ...user,
    }
    id++
    database.push(user)
    console.log(database)
    res.status(201).json({
      status: 201,
      result: `User with email: ${email} is added.`,
    })
  }
})

//#UC-202 get all users
app.get('/api/user', (req, res, next) => {
  res.status(200).json({
    status: 200,
    result: database,
  })
})

//#UC-203 Request personal user profile
app.get('api/user/profile', (req, res, next) => {
  res.status(501).json({
    status: 501,
    result: 'This service is not yet available.',
  })
})

//#UC-204 get single user by ID
app.get('/api/user/:userId', (req, res, next) => {
  const userId = req.params.userId
  console.log(`User met ID ${userId} gezocht`)
  let user = database.filter((item) => item.id == userId)
  if (user.length > 0) {
    console.log(user)
    res.status(200).json({
      status: 200,
      result: user,
    })
  } else {
    res.status(404).json({
      status: 404,
      result: `User with ID ${userId} not found`,
    })
  }
})

//#UC-205 Update a single user
app.put('api/user/:userID', (req, res, next) => {
  const userID = req.params.userID
  let userList = database.filter((item) => item.id == userID)
  if (userList.length > 0) {
    console.log(userList)
    let user = req.body
    user = {
      id,
      ...user,
    }
    database[database.indexOf(userList[0])] = user
    res.status(201).json({
      status: 201,
      result: `User with ID ${userID} is updated`,
    })
  } else {
    res.status(401).json({
      status: 401,
      result: `You are not authorized`,
    })
  }
})

//#UC-206 Delete a user
app.delete('api/user/:userID', (req, res, next) => {
  const userID = req.params.userID
  let userList = database.filter((item) => item.id == userID)
  if (userList.length > 0) {
    console.log(userList)
    database.splice(database.indexOf(userList[0]), 1)
    res.status(201).json({
      status: 201,
      result: `User with ID ${userID} is deleted`,
    })
  } else {
    res.status(401).json({
      status: 401,
      result: `You are not authorized`,
    })
  }
})

app.all('*', (req, res) => {
  res.status(401).json({
    status: 401,
    result: 'End-point not found',
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
