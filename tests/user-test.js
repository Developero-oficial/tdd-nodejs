import request from 'supertest'
import sinon from 'sinon'
import proxyquire from 'proxyquire'
import test from 'ava'

const version = '/v1'

const sandbox = sinon.createSandbox()

let app = null
let userStub = null

test.before((t) => {
  userStub = {
    save () {}
  }
  userStub['@global'] = true

  sandbox.stub(userStub, 'save')
  userStub.save.withArgs({}).returns(true)

  app = proxyquire('../app', {
    './models/userModel': userStub
  })
})

test.after(() => {
  sandbox.restore()
})

/*
  Save user data:

  Given a user with his name and valid email
  When the user send his data to the system
  Then the system must save the user data
*/
test.serial.cb('save valid user data', (t) => {
  // Given a user with his name and valid email
  const user = { name: 'john', email: 'john.doe@mail.com' }

  // When the user send his data to the system
  request(app)
    .post(`${version}/users`)
    .send(user)
    .expect('Content-Type', /json/)
    .expect(201)
    .end((err, res) => {
      t.falsy(err, 'should not error')
      t.end()

      // Then the system must save the user data
      sandbox.assert.calledOnce(userStub.save)
      sandbox.assert.calledWith(userStub.save, user)
    })
})

/*
  Save user data: validate user data:

  Given a user data with his name and invalid email
  When the user send his data to the system
  Then the system must return error validation message as
  "the email must be like 'john.doe@mail.com'"
*/
test.serial.cb('Validate user data', (t) => {
  // Given a user data with his name and invalid email
  const user = { name: 'john', email: 'john.doemail.com' }

  // When the user send his data to the system
  request(app)
    .post(`${version}/users`)
    .send(user)
    .expect('Content-Type', /json/)
    .expect(400)
    .end((err, res) => {
      t.falsy(err, 'should not error')
      // Then the system must return error validation message as
      // "the email must be like 'john.doe@mail.com'"
      t.deepEqual(res.body, {
        errors: {
          email: 'the email must be like "john.doe@mail.com"'
        }
      })

      t.end()
    })
})
