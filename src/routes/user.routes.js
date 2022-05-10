const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')

router.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    result: 'Hello World',
  })
})

//#UC-201 Register as a new user
router.post('/api/user', userController.validateUser, userController.addUser)

//#UC-202 get all users
router.get('/api/user', userController.getAllUsers)

//#UC-203 Request personal user profile
router.get('api/user/profile', (req, res, next) => {
  res.status(501).json({
    status: 501,
    result: 'This service is not yet available.',
  })
})

//#UC-204 get single user by ID
router.get('/api/user/:userId', userController.getUserById)

//#UC-205 Update a single user
router.put('api/user/:userID', userController.updateSingleUser)

//#UC-206 Delete a user
router.delete('api/user/:userID', (req, res, next) => {
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

//Hiermee stel je de router beschikbaar voor alle andere bestanden
module.exports = router
