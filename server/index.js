const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookie = require('cookie-parser');
const salt = 10;

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookie());

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"signup"
    //port:3306
});
    db.connect();

app.post('/register',(req, res)=>{
    const data = req.body;
    //console.log(data)
    const sql = "INSERT INTO login (`name`, `email`, `password`) VALUES(?)";
    bcrypt.hash(data.password.toString(), salt, (err, hash) => {
        if(err) return res.json({Error:'error in hashing password'})
        const values = [
            data.name,
            data.email,
            hash
        ]
       // console.log(db)
        db.query(sql, [values], (err, result) => {
            if(err) return res.json({Error: 'Inserting data error in server'});
            return res.json({Status:'Registered Successfully'});
        })
    })    
})

app.listen(1000,()=>{
    console.log("app is connected");
});