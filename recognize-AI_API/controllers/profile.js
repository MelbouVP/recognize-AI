const getProfile = (req, res, db) => {
    const { id } = req.params;

    db.select('*').from('users').where({
        id: id
    })
    .then(user => {
        user.length === 1 ? res.json(user[0]) : res.status(400).json('Not found')
    })
    .catch(err => res.status(400).json('Not found'))
};


const deleteProfile = (req, res, db) => {
    const { id } = req.params;
    const { email } = req.body;

    // database transaction, which deletes user profile
    db.transaction(trx => {
        trx('login').where({email: email})
        .del()
        .returning('email')
        .then( loginemail => {
            return trx('users')
            .returning('*')
            .where({id: id})
            .del()
            .then(response =>{
                console.log(response)
                res.json('User deleted')
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.status(404).json('Unable to delete')); 


}


module.exports = {
    getProfile,
    deleteProfile
};