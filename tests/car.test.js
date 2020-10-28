const request = require('supertest')
const app = require('../src/app')
const Car = require('../src/models/car')
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
             carOne,
              carTwo,
               carThree,
                motorCycleOne,
                 motorCycleTwo,
                  motorCycleThree,
                   setupDatabase} = require('./fixtures/db') 

beforeEach(setupDatabase)

test('Should add new Car', async() => {
    const response = await request(app)
        .post('/car')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            specifications: '3500 cc ',
            pricePerHour: 35,
            model: 2019
        })
        .expect(201)

        const car = await Car.findById(response.body._id)
        expect(car).not.toBeNull()
})
