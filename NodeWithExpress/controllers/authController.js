const jwt = require('jsonwebtoken');
const fsPromises = require('fs').promises;
const path = require('path');

// const usersDB = {
//     users : require('../model/users.json'),
//     setUsers : function (data) {this.users = data}
// }

const User = require('../model/User');
const {writeToFile} = require('../util/util.js');

const bcrypt = require('bcrypt');

const handleLogin = async (req, res) => {
    const {username, password} = req.body;
    if (!username || !password) {
        return res.status(400).json({"message" : "Username And Password Are Required"})
    }
    const findUser = await User.findOne({username : username});
    console.log('login', findUser);
    // const findUser = usersDB.users.find((person) => person.username == username );

    if (!findUser) {
        return res.status(401).json({"message" : "User Doesn't Exists"})
    }

    const match = await bcrypt.compare(password, findUser.password);

    if (match) {
        // create JWTs
        // to create token we need a token and secret key
        const roles = await Object.values(findUser.roles);
        // const roles = await Object.values(findUser.roles);

        const accessToken = jwt.sign(
            {
                "UserInfo" : {
                    "username" : findUser.username,
                    "roles" : roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn : '60s'
            }
        );

        // we want the refresh token to expire
        const refreshToken = jwt.sign(
            {
                "username" : findUser.username
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn : '10s'
            }
        );

        const result = await User.findByIdAndUpdate(findUser._id, {
            refreshToken
        });

        // we want to save our refresh token in db for auto logout
        // const otherUsers = usersDB.users.filter((person) => person.username !== findUser.username);
        // const currentUser = {...findUser, refreshToken};
        // usersDB.setUsers([...otherUsers, currentUser]);

        // await writeToFile(path.join(__dirname, '..', 'model', 'users.json'), usersDB.users);

        res.cookie('jwt', refreshToken, {httpOnly : true, maxAge : 24 * 60 * 60 * 1000});
        // you want to store that accessToken in memory not in session storage
        return res.json({ accessToken });
    } else {
        return res.status(401).json({"message" : "Use Correct Password"});
    }
}

module.exports = {handleLogin};