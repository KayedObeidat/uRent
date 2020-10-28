const request = require('supertest')
const app = require('../src/app')
const Boat = require('../src/models/boat')
const {
    userOneId,
     userOne,
      userTwo,
       jetSkiOne,
        jetSkiTwo,
         jetSkiThree,
          boatOne,
           boatTwo,
            boatThree,
             setupDatabase} = require('./fixtures/db') 

beforeEach(setupDatabase)

test('Should add new Boat', async() => {
    const response = await request(app)
        .post('/boat')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            specifications: '3000 cc ',
            pricePerHour: 35,
            model: 2019
        })
        .expect(201)

        const boat = await Boat.findById(response.body._id)
        expect(boat).not.toBeNull()
})
