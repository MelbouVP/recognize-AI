const express = require('express');
const bcrypt = require('bcrypt-nodejs')
require('dotenv').config();
const cors = require('cors');
const pg = require('pg');
const knex = require('knex');
const cookieParser = require('cookie-parser')

const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


// Disable automatic date parsing (no T and Z letters)
pg.types.setTypeParser(1114, str => str);

// connect knex query builder to database
const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : process.env.DB_KEY,
      database : 'recognizeai'
    }
});


//MIDDLEWARES
const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

// const database = {
//     user: [
//         {
//             id: '123',
//             name: 'John',
//             email: 'john@gmail.com',
//             password: 'johny',
//             entries: 0,
//             joined: new Date()
//         },
//         {
//             id: '124',
//             name: 'Sally',
//             email: 'sally@gmail.com',
//             password: 'sally',
//             entries: 0,
//             joined: new Date()
//         }
//     ]
// }

// Home route
app.get('/', (req, res) => {
    console.log(req.headers)
    res.send('Online')
});

// Signin route, pass the required arguments for handleSignIn method
app.post('/signin', (req, res) => { signin.handleSignIn(req, res, db, bcrypt) });

// Register route
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt)});

// User profile route
app.get('/profile/:id', (req,res) => { profile.getProfile(req, res, db)});

// Delete user profile route
app.delete('/profile/:id', (req,res) => { profile.deleteProfile(req, res, db)});

// Display image entries route
app.put('/image', (req, res) => { image.getEntries(req, res, db)});

// Proccess API call route
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})


app.listen(3000, () => {
    console.log('App is running on port 3000')
})

/*

/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT = user


*/