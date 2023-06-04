import test from 'node:test';
import assert from 'node:assert';

const callTracker = new assert.CallTracker();
process.on('exit', () => callTracker.verify())
import {
    routes
} from '../../../src/routes/heroRoute.js'

import { DEFAULT_HEADER } from '../../../src/util/util.js';

test('Hero Routes - endpoints test suite', async (t) => {
    // we are calling the routes
    // goal is to call get and post routes of our heroes
    await t.test('It Should call / Heroes : get route', async() => {
        // here we are just mocking the process
        // we are testing the routes
        const databaseMock = [
            {"id":10,"name":"Batman","age":50,"power":"rich"}
        ]

        const heroServiceMock = {
            find : async () => databaseMock
        }

        const endpoints = routes({
            heroService : heroServiceMock
        })

        // routes we are trying to acces
        const endpoint = '/heroes : get'
        const req = {};
        const res = {
            write : callTracker.calls(item => {
                const expected = JSON.stringify(
                    [...databaseMock]
                )
                assert.strictEqual(item, expected, 'write should be called with the correct payload');
            }),
            end : callTracker.calls(item => {
                assert.strictEqual(
                    item,
                    undefined,
                    'end should be called without params'
                )
            })
        }
        const route = endpoints[endpoint];
        await route(req, res);
    })
})