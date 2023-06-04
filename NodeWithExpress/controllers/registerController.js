// const usersDB = {
//     users : require('../model/users.json'),
//     setUsers : function (data) {this.users = data}
// }
const User = require('../model/User');

const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const {name, password} = req.body;
    if (!name || !password) {
        return res.status(400).json({"message" : "Username And Password Are Required"})
    }
    // const dupValue = usersDB.users.find((person) => person.username === name);
    // this will return any user thatm matrches
    // check why we use exec()
    const dupValue = await User.findOne({username : name}).exec();

    if (dupValue) {
        return res.status(409).json({"message" : "username exists"})
    }

    try {
        // encrypt the password
        const hashedPwd = await bcrypt.hash(password, 10);

        // store the new user
        // const newUser = {
        //     "username" : name,
        //     "roles" : {
        //         "User" : 2001
        //     },
        //     "password" : hashedPwd};
        // usersDB.setUsers([...usersDB.users, newUser]);

        /**
         * cosnt newUser - new User();
         * const result = await newUser();
        */
        // create and store the new user using mongoos
        const result = await User.create({
            "username" : name,
            "password" : hashedPwd
        });

        console.log(result);
        // await fsPromises.writeFile(
        //     path.join(__dirname, '..', 'model', 'users.json'),
        //     JSON.stringify(usersDB.users)
        // )

        res.status(201).json({'success ' : `New user ${name} created`});
    } catch (error) {
        res.status(500).json({"message" : error.message})
    }
}

module.exports = {handleNewUser}