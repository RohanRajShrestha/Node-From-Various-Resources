// const usersDB = {
//     users : require('../model/users.json'),
//     setUsers : function (data) {this.users = data}
// }
const User = require('../model/User');

const fsPromises = require('fs').promises;
const path = require('path');

const handleLogout = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies ?. jwt) return res.sendStatus(204);

    const refreshToken = cookies.jwt;
    // const findUser = usersDB.users.find((person) => person.refreshToken === refreshToken);
    const findUser = await User.findOne({refreshToken : refreshToken});
    console.log('findUser with token', findUser);

    if (!findUser) {
        res.clearCookie('jwt', {httpOnly : true});
        return res.sendStatus(403);
    }

    // using database
    const result =  await User.findByIdAndUpdate(findUser._id, {
        refreshToken : ""
    });
    console.log('result', result);
    // user with the token found 
    // const otherUsers = usersDB.users.filter((person) => person.refreshToken !== findUser.refreshToken);
    // const currentUser = {...findUser, refreshToken : ""}

    // usersDB.setUsers([...otherUsers, currentUser]);
    // await fsPromises.writeFile(
    //     path.join(__dirname, '..', 'model', 'users.json'),
    //     JSON.stringify(usersDB.users)
    // );

    res.clearCookie('jwt', {httpOnly : true}); // secure : true = only serves on https
    res.sendStatus(204);
}

module.exports = {handleLogout}