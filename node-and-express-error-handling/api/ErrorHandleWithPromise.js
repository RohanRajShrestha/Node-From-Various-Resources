const express = require('express');
const api = express.Router();

const use = (fn) => (req, res, next) => 
    Promise.resolve(fn(req, res, next).catch(next));

api.get('api', () => {
    res.status(200).send("Hello");
})

api.post('api/user/auth', use(
    async (req,res) => {
        throw new Error(`User Not Found`);
    }
))

module.exports = {api};