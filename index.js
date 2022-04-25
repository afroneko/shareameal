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

//UC-201 Register as a new user
app.post('/api/movie', (req, res) => {
  let movie = req.body
  id++
  movie = {
    id,
    ...movie,
  }
  console.log(movie)
  database.push(movie)
  res.status(201).json({
    status: 201,
    result: database,
  })
})

//#UC-204 get single user by ID
app.get('/api/movie/:movieId', (req, res, next) => {
  const movieId = req.params.movieId
  console.log(`Movie met ID ${movieId} gezocht`)
  let movie = database.filter((item) => item.id == movieId)
  if (movie.length > 0) {
    console.log(movie)
    res.status(200).json({
      status: 200,
      result: movie,
    })
  } else {
    res.status(401).json({
      status: 401,
      result: `Movie with ID ${movieId} not found`,
    })
  }
})

//UC-202 get all users
app.get('/api/movie', (req, res, next) => {
  res.status(200).json({
    status: 200,
    result: database,
  })
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
