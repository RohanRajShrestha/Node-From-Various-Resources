/**
 * Here we will have codes for routes
*/

const express = require('express');

// initailaizng router
const router = express.Router();

// handles all type of request
router.all('/:apiName', (req, res) => {
    console.log(req.params.apiName);
    console.log('We have reaced');
    res.send(req.params.apiName);
})
module.exports = router;
