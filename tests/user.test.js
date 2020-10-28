const { response } = require('express')
const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const {userOneId, userOne, setupDatabase} = require('./fixtures/db') 

beforeEach(setupDatabase)

test('Should sign up a new user', async () => {
    const response = await request(app).post('/users/signup').send({
        username: 'KayedObeidat4040',
        email: 'kayed_obeidat@yahoo.com',
        password: 'Kayed12345',
        age: 20
    }).expect(201)
})

test('Should login user', async() => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
})

test('Should get profile for user', async() => {
    await request(app)
    .get('/users/me')
    .send()
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .expect(200)
})

test('Should delete user account', async() => {
    await request(app)
        .delete('/users/delete/me')
        .send()
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .expect(200)
})

test('Should update valid user fields', async () => {
    await request(app) 
        .patch('/users/update/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            username:'KayedObeidat'
        })
        .expect(200)
       const user = await User.findById(userOneId)
       expect(user.username).toEqual('KayedObeidat')
})