require('dotenv').config();
const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: process.env.CLARIFAI_KEY
});

// use Clarifai API face detection model to predict face location in provided image
const handleApiCall = (req, res) => {
    app.models
        .predict("a403429f2ddf4b49b307e318f00e528b", req.body.input)
        .then(data => {
            res.json(data)
        })
        .catch(err => res.status(400).json('Unable to work with API'))
}


const getEntries = (req,res, db) => {
    const { id } = req.body;

    db('users').where('id','=',id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0])
    })
    .catch(err => res.status(400).json('Unable to get entries'))



    // let found = false;
    // database.user.forEach( user => {
    //     if(user.id === id){
    //         found = true;
    //         user.entries++
    //         return res.json(user.entries);
    //     }
    // });
    // if(!found){
    //     res.status(400).json('User not found.')
    // }
};

module.exports = {
    getEntries,
    handleApiCall
};