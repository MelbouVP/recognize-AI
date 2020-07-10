const handleRegister = (req, res, db, bcrypt) => {
    const { name, email, password } = req.body;
    const hash = bcrypt.hashSync(password);
    
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
    if(name.length >= 4 && password.length >= 8 && regex.test(email)){
        db.transaction(trx => {
            trx.insert({
                hash: hash,
                email: email
            })
            .into('login')
            .returning('email')
            .then(loginemail =>{
                return trx('users')
                .returning('*')
                .insert({
                    name : name,
                    email: loginemail[0],
                    joined: new Date()
                })
                .then(user => {
                    res.json(user[0]);
                })
            })
            .then(trx.commit)
            .catch(trx.rollback)
        })
        .catch(err => res.status(404).json('Unable to register'));
    } else {
        res.status(400).json('Unable to register')
    }



    // database.user.push(
    //     {
    //         id: '125',
    //         name: name,
    //         email: email,
    //         password: password,
    //         entries: 0,
    //         joined: new Date()
    //     });
    // res.json(database.user[database.user.length-1]);
};

module.exports = {
    handleRegister
}