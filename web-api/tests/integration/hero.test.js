import test from 'node:test';
import assert from 'node:assert';
import { promisify } from 'node:util';

test('hero Integration Test Suite', async (t) => {
    const testPort = 9000;

    // this should not be done in any code bad practice
    process.env.PORT = testPort;
    const {server} = await import('../../src/index.js');

    const testServerAddress = `http://localhost:${testPort}/heroes`;
    await t.test('This Should Create A hero', async (t) => {
        const data = {
            "name" : "Batman",
            "age" : 50,
            "power" : "rich"
        }

        // using fetch api to call our server
        const request = await fetch(testServerAddress, {
            method : 'POST',
            body : JSON.stringify(data)
        })

        assert.deepStrictEqual(
            request.headers.get('content-type'),'application/json'
        );

        assert.strictEqual(request.status, 201);

        const result = await request.json();
        assert.deepStrictEqual(
            result.success,
            'User Created Successfully',
            'It should return a valid text message'
        )

        assert.ok(
            result.id.length > 30,
            'ID should be a valid UUID'
        )
    })
    /** 
     * server we have close
     * server.close() // this receives a call back
     * so alternative is promisify for usin await
    */
    await promisify(server.close.bind(server))()
})

// import test from 'node:test'
// import assert from 'node:assert'
// import { promisify } from 'node:util'
// test('Hero Integration Test Suite', async (t) => {
//   const testPort = 9009

//   // that's bad practice because it mutates the environment
//   process.env.PORT = testPort
//   const { server } = await import('../../src/index.js')
  
//   const testServerAddress = `http://localhost:${testPort}/heroes`

//   await t.test('it should create a hero', async (t) => {
//     const data = {
//       name: "Batman",
//       age: 50,
//       power: "rich"
//     }

//     const request = await fetch(testServerAddress, {
//       method: 'POST',
//       body: JSON.stringify(data)
//     })

//     assert.deepStrictEqual(
//       request.headers.get('content-type'),
//       'application/json'
//     )

//     assert.strictEqual(request.status, 201)

//     const result = await request.json()
//     assert.deepStrictEqual(
//       result.success,
//       'User created with success!!',
//       'it should return a valid text message'
//     )
      
//     assert.ok(
//       result.id.length > 30,
//       'id should be a valid uuid'
//     )


//   })

//   await promisify(server.close.bind(server))()

// })