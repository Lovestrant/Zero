const mysql = require('mysql')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const saltRounds = 10
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
//const signupTemplateCopy = require('../models/Signupmodels')
//const { db } = require('../models/Signupmodels')




 sqldb = mysql.createConnection(
    {
        user: "root",
        host: "localhost",
        password: "",
        database: "zero",
    }
)

// signup route
router.post('/signupsql', (req, res) =>{
    let Firstname = req.body.firstName
    let Lastname = req.body.lastName
    let Password = req.body.password
    let securityKey = req.body.securityKey
    let Phonenumber = req.body.phoneNumber
    let Id = ""

    //Checking wether a user with that same phonenumber is already registered
    sqldb.query("SELECT * FROM authentication where Phonenumber = ? LIMIT 1;",
       Phonenumber, (error, result) => {
           if(error){
               console.log(error)

           }
           if(result.length > 0) {
                res.send({message: "A user with same phonenumber already exists."})
             
                
           }else{
             

                //hashing the password
                bcrypt.hash(Password,saltRounds, (err, hash) => {
                    if(err) {
                        console.log(err)
                        
                    }
                            //hashing the security key code
                            bcrypt.hash(securityKey,saltRounds, (err, hash2) => {
                                if(err) {
                                    console.log(err)
                                    
                                }

                            sqldb.query("INSERT INTO authentication values(?,?,?,?,?,?)",
                            [Id, Firstname, Lastname, hash, hash2, Phonenumber], 
                            (err, result) =>{
                                console.log(result);
                                console.log(err);
                                
                            }) 
                        if(query){
                                    res.send('Everything okay.')
                                }
                            })
                    })


           }
         
       })
        
    
})

//Login route
router.post('/Login', (req, res) => {
    let Phonenumber = req.body.phonenumber
    let Password = req.body.password

    sqldb.query("SELECT * FROM authentication where Phonenumber = ? LIMIT 1;",
    Phonenumber, (error, result) => {
        if(error){
            console.log(error)
           
        }
        if(result.length > 0) {
            bcrypt.compare(Password, result[0].Password, (error, response) => {
              
               
                if(response){
                 console.log(result)
               //initializing session
              // req.session.user = result
                  // console.log(req.session.user)
               //sending response to the client side
               res.send({success: " Login success."})
                }else{
                    res.send({message: "wrong phonenumber/password combination!"})
                }
         })
           
              
        }else{
            res.send({message: "No such user in the system."})
            //tell user to register first
        }
    })

})

//Reset Route
router.post('/Reset', (req, res) =>{
    let Phonenumber = req.body.Phonenumber
    let Password = req.body.Password
    let securitykey = req.body.securityKey

    sqldb.query("SELECT * FROM authentication where Phonenumber = ?",
    Phonenumber, (error, result) => {
        if(error){
            console.log(error)
            res.send(error)
        }

        if(result.length >0){
            bcrypt.compare(securitykey, result[0].securitykey, (error, response) => {
              if(error){
                  console.log(error)
              }
               
                if(response){
                 console.log(result)
                //hashing the password
                bcrypt.hash(Password,saltRounds, (err, hash) => {
                   
                    sqldb.query("UPDATE authentication set Password = ? where Phonenumber= ?;",
                    [hash,Phonenumber], 
                    (error, ResResult) =>{
                        if(error){
                        console.log(err);
                         }
                        
                        if(ResResult){
                            res.send({success: "Reset success."})
                        }
                        
                    }) 
            
             })
              
              
         }else{
                    res.send({message: "wrong Security key."})
                }
            })

        }else{
            res.send({message: "No such user in the system."})
        }
    })

})



//session route
/*
router.get('/Login', (req, res) => {
    if(req.session.user) {
        res.send({loggedIn: true, user: req.session.user})
    }else{
        res.send({loggedIn: false})
    }
})

*/

/*
router.post('/signup', (request, response) =>{
    
    const signedupUser = new signupTemplateCopy({
        firstName:request.body.firstName,
        lastName: request.body.lastName,
        phoneNumber: request.body.phoneNumber, 
        password: request.body.password,
        securityKey: request.body.securityKey

    })
    signedupUser.save().then((data) =>{response.json(data)})
    .catch((error) => {response.json(error)})
    

})*/

module.exports = router