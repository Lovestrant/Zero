const express = require('express');
const mysql = require("mysql");
const cors = require("cors");



const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password:"",
    database: "zero"
});

app.post('/register', (req, res)=>{

    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const phonenumber = req.body.phonenumber;
    const password = req.body.password;
    const securitykey = req.body.securitykey;

    db.query(
        "INSERT INTO authenticationdb(firstname, lastname, phonenumber, password, securitykey) values ?,?,?,?,?",
        [firstname,lastname,phonenumber,password,securitykey],
        (error, result)=>{
            console.log(error);
            console.log(result);
        }
    );
});

app.listen(3003, ()=>{
   
    console.log('running seever');
});