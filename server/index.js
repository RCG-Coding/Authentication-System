const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cookie = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cors({
    origin:['http://localhost:3000'],
    methods:['POST', 'GET'],
    credentials:true
}));
app.use(cookie());

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"signup"
});
    db.connect();

//register
app.post('/register', (req, res) => {
    const data = req.body;

    const sql = "INSERT INTO login (`name`, `email`, `password`) VALUES(?)";
    console.log(data.password)
    bcrypt.hash(data.password, 10, (err, hash) => {
        if (err) return res.json({ Error: 'Error in hashing password' });

        const values = [
            data.name,
            data.email,
            hash
        ];

        db.query(sql, [values], (queryError, result) => {
            if (queryError) return res.json({ Error: 'Inserting data error in server' });
            return res.json({ Status: 'Registered Successfully' });
        });
    });
});

//login
app.post('/signIn', (req, res) => {
    const sql = `SELECT * FROM login WHERE email= ?`;

    db.query(sql, [req.body.email], (err, data) => {
        console.log(data)
        if (err) {
            console.error('Login error:', err);
            return res.json({ Error: 'Login error' });
        }
       
        if (data.length > 0) {   
            bcrypt.compare(req.body.password, data[0].password, (err, response) => {
                if (err) {
                    console.error('Password compare error:', err);
                    return res.json({ Error: 'Password compare error' });
                }

                console.log('Password Comparison Result:', response);

                if (response) {
                    const name = data[0].name;
                    const token = jwt.sign({name}, 'jwt-secret-key', {expiresIn : '1d'});
                    res.cookie('token', token);
                    return res.json({ Status: 'Success' });    
                } else {
                    return res.json({ Error: 'Password is not matched' });
                }
            });
        } else {
            res.json({Error:'Invalied Email You Entered'});
        }
    });
});


app.listen(1000,()=>{
    console.log("app is connected");
});