// const usersDB = {
//     users : require('../model/users.json'),
//     setUsers : function (data) {this.users = data}
// }

const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleRefreshTokenn = async (req, res) => {
    const cookies = req.cookies;
    console.log('here');
    console.log(cookies);
    if (!cookies ?.jwt) return res.sendStatus(401);
    console.log('here');
    console.log(cookies.jwt);

    const refreshToken = cookies.jwt;
    const foundUser = await User.findOne({refreshToken : refreshToken}).exec();
    if (!foundUser) return res.sendStatus(403);
    const roles = await Object.values(foundUser.username);
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
            const accessToken = jwt.sign(
                {
                    "UserInfo" : 
                    {
                        "username" : foundUser.username,
                        "roles" : roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn : '30s'}
            );
            console.log('created accesstoken');
            res.json({ accessToken })
        }
    )
}

module.exports = {
    handleRefreshTokenn
}