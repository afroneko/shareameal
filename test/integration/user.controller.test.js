const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../index')
let database = []

chai.should()
chai.use(chaiHttp)

describe('Manage users', () => {
  describe('UC-201 add user /api/user', () => {
    //maakt voor het testen de database leeg
    beforeEach((done) => {
      database = []
      done()
    })

    //done functie
    it('When a required input is missing, a valid error should be returned', (done) => {
      chai
        .request(server)
        .post('/api/user')
        .send({
          //title ontbreekt
          lastName: 'Tyem',
          emailAdress: 'lisatyem@gmail.com',
          password: 'jemoeder',
        })
        .end((err, res) => {
          res.should.be.an('object')
          let { status, result } = res.body
          status.should.equals(400)
          result.should.be
            .a('string')
            .that.equals('first name must be a string!')
          done()
        })
    })
  })
})
