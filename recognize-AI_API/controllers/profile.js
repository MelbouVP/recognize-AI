const getProfile = (req, res, db) => {
    const { id } = req.params;

    db.select('*').from('users').where({
        id: id
    })
    .then(user => {
        user.length === 1 ? res.json(user[0]) : res.status(400).json('Not found')
    })
    .catch(err => res.status(400).json('Not found'))
    // let found = false;
    // database.user.forEach( user => {
    //     if(user.id === id){
    //         found = true;
    //         return res.json(user);
    //     }
    // });
    // !found && res.status(400).json('user not found.')
};


const deleteProfile = (req, res, db) => {
    const { id } = req.params;
    const { email } = req.body;

    // db('users').where({
    //     id: id
    // }).del()
    // .then(response => {
    //     if(response === 1){
    //         res.json('User deleted')
    //     } else {
    //         res.status(400).json('No such user')
    //     }
    // })

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


//     db.transaction(trx => {
//         trx.insert({
//             hash: hash,
//             email: email
//         })
//         .into('login')
//         .returning('email')
//         .then(loginemail =>{
//             return trx('users')
//             .returning('*')
//             .insert({
//                 name : name,
//                 email: loginemail[0],
//                 joined: new Date()
//             })
//             .then(user => {
//                 res.json(user[0]);
//             })
//         })
//         .then(trx.commit)
//         .catch(trx.rollback)
//     })
//     .catch(err => res.status(404).json('Unable to register'));
// } else {
//     res.status(400).json('Unable to register')
// }



}


module.exports = {
    getProfile,
    deleteProfile
};