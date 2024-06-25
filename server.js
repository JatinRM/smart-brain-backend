const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
// require('dotenv').config();

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

// const { HOST, PORT, USER, PASSWORD, DATABASE } = process.env;
const db = knex({
    client: 'pg',
    connection: {
      host: 'ep-wild-dew-a1t9r2cm.ap-southeast-1.aws.neon.tech',
      port: 5432,
      user: 'smartbrain_owner',
      password: 'F0OofX9beMHT',
      database: 'smartbrain',
      ssl: { rejectUnauthorized: false },
    },
});


const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req,res) => {
    res.send('Success');
})

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })

app.put('/image', (req, res) => { image.handleImage(req, res, db) })

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

app.listen(3000, () => {
    console.log('app is running on port 3000');
})