const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../env' });


const handleSignIn = (req, res, db, bcrypt) => {

        const { email, password } = req.body;
        const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
        if(regex.test(email) && password.length >= 8) {
            db.select('email', 'hash').from('login')
            .where('email', '=', email)
            .then(data => {
                const isValid = bcrypt.compareSync(password, data[0].hash);
                if(isValid){
                    return db.select('*').from('users')
                    .where('email', '=', email)
                    .then(user => {
                        res.json(user[0])
                    })
                    .catch(err => res.status(400).json('Unable to get user'))
                } else {
                    return res.status(400).json('Unable to get user');
                }
            })
            .catch(err => res.status(400).json('Unable to login'))
        } else {
            res.status(400).json('Unable to login');
        }



    // database.user.some(user => {
    //     if(req.body.email === user.email && req.body.password === user.password){
    //        return res.json(user);
    //     }
    // })

    // if(!res.headersSent) {
    //     return res.status(400).json('Error logging in');
    // }

    // return res.status(400).json('Error logging in');

    // if(req.body.email === database.user[0].email && req.body.password === database.user[0].password ){
    //     res.json('Success')
    // } else {
    //     res.status(400).json('Error logging in')
    // }
};

module.exports = {
    handleSignIn
}