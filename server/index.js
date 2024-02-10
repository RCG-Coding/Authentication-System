const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookie = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookie());

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"signup"
});



app.listen(1000,()=>{
    console.log("app is connected");
});