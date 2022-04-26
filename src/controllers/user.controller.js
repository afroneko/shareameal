let database = []
let id = 0

let controller = {
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

  getUserById: (req, res) => {
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
  },
}

module.exports = controller
