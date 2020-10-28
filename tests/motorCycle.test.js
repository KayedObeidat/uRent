const request = require('supertest')
const app = require('../src/app')
const MotorCycle = require('../src/models/motorcycle')
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

test('Should add new MotorCycle', async() => {
    const response = await request(app)
        .post('/car')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            specifications: '3500 cc ',
            pricePerHour: 90,
            isHelmetIncluded: true,
            model: 2019,
})
        .expect(201)
})
