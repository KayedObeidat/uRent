const request = require('supertest')
const app = require('../src/app')
const JetSki = require('../src/models/jetSki')
const {
    userOneId,
     userOne,
      userTwo,
       jetSkiOne,
        jetSkiTwo,
         jetSkiThree,
          setupDatabase} = require('./fixtures/db') 

beforeEach(setupDatabase)

test('Should add new JetSki', async() => {
    const response = await request(app)
        .post('/JetSki')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            specifications: '3000 cc ',
            pricePerHour: 35,
            model: 2019
        })
        .expect(201)

        const jetSki = await JetSki.findById(response.body._id)
        expect(jetSki).not.toBeNull()
})
