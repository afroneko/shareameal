const assert = require('assert')
const database = require('../../database/inmemdb')
const dbconnection = require('../../database/dbconnection')

let controller = {
  /**
   * We exporteren hier een object. Dat object heeft attributen met een waarde.
   * Die waarde kan een string, number, boolean, array, maar ook een functie zijn.
   * In dit geval zijn de attributen functies.
   */
  // createMovie is een attribuut dat als waarde een functie heeft.
  createMovie: (req, res, next) => {
    // Hier gebruiken we nu de inmem database module om een movie toe te voegen.
    // Optie: check vooraf of req.body wel de juiste properties/attribute bevat - gaan we later doen

    // We geven in de createMovie functie de callbackfunctie mee. Die kan een error of een result teruggeven.
    database.createMovie(req.body, (error, result) => {
      if (error) {
        console.log(`index.js : ${error}`)
        res.status(401).json({
          statusCode: 401,
          error, // als de key en de value hetzelfde zijn kun je die zo vermelden. Hier staat eigenlijk: error: error
        })
      }
      if (result) {
        console.log(`index.js: movie successfully added!`)
        res.status(200).json({
          statusCode: 200,
          result,
        })
      }
    })
  },

  addUser: (req, res) => {
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
  },

  getAllUsers: (req, res) => {
    res.status(200).json({
      status: 200,
      result: database,
    })
  },

  getUserById: (req, res, next) => {
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
      const error = {
        status: 404,
        result: `User with ID ${userId} not found`,
      }
      next(error)
    }
  },

  updateSingleUser: (req, res, next) => {
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
  },

  validateUser: (req, res, next) => {
    let user = req.body
    let { firstName, lastName, emailAdress, password } = user
    try {
      assert(typeof firstName === 'string', 'first name must be a string!')
      assert(typeof lastName === 'string', 'last name must be a string')
      assert(typeof emailAdress === 'string', 'email must be a string')
      next()
    } catch (err) {
      const error = {
        status: 400,
        result: err.message,
      }
      next(error)
    }
  },
}

module.exports = controller
