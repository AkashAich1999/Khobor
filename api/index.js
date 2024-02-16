const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const salt = bcrypt.genSaltSync(10);
const secret = "asdfe45we45w345wegw345werjktjwertkj";

app.use(cors({credentials:true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());

mongoose.connect("mongodb+srv://akashaichofficial:10X9zRelSCsVgnce@cluster0.1cucghg.mongodb.net/?retryWrites=true&w=majority");

app.post('/register', async (req, res) => {
    const {username, password} = req.body;
    try{
        const UserDoc = await User.create({
            username, 
            password: bcrypt.hashSync(password, salt)
        });
        res.json({requestData: {username, password}});
    } catch(e) {
        console.log(e);
        res.status(400).json(e);
    }  
});

app.post('/login', async (req, res) => {
    const {username, password} = req.body;
    const userDoc = await User.findOne({username});
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if(passOk){
        // User Logged In 
        jwt.sign({username, id: userDoc._id}, secret, {}, (err, token) => {
            if(err) throw err;
            res.cookie('token', token).json('Ok');
        });
    } else {
        // Not Logged In
        res.status(400).json("Wrong Credentials !");
    }
});

app.get("/profile", (req, res) => {
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
        if(err) throw err;
        res.json(info);
    });
})

app.listen(7000);

// mongodb+srv://akashaichofficial:10X9zRelSCsVgnce@cluster0.1cucghg.mongodb.net/?retryWrites=true&w=majority