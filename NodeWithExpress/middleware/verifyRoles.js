const verifyRoles = (...allowedRoles) => { // using rest operator, let's us pass in as many parameter as we wish
    return (req, res, next) => {
        if (!req ?. roles) return res.sendStatus(401);
        /* `const rolesArray = [...allowedRoles];` is using the spread operator to create a new array
        `rolesArray` that contains all the elements of the `allowedRoles` array. This allows us to
        pass in multiple roles as arguments to the `verifyRoles` function and have them all included
        in the `rolesArray` variable. */
        const rolesArray = [...allowedRoles];
        console.log('roles array',rolesArray);
        console.log(req.roles);
        const result = req.roles.map (role => rolesArray.includes(role)).find((val) => val === true);

        if (!result) return res.sendStatus(401);
        next();
    }
}

module.exports = {verifyRoles};