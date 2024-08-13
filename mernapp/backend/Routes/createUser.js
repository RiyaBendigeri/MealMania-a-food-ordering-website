const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs');
const Secret = "abcdefghijklmngsjhddbkdhb"

router.post('/createuser',
    body('email').isEmail(),
    body('name').isString(),
    body('password').isStrongPassword(),
    body('location').isString()


    , async (req, res) => {
        try {


            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            

            







            
            const salt=await bcrypt.genSalt(10);
            let secPassword=await bcrypt.hash(req.body.password,salt)

            console.log("Creating user with email:", req.body.email);
            console.log("Original Password:", req.body.password);
            console.log("Hashed Password:", secPassword);
            


            await User.create({
                /*name:"Shyam",
                password:"abc123",
                email:"email@mail.com",
                location:"byebye"*/
                
                name:req.body.name,
                password:secPassword,
                email:req.body.email,
                location:req.body.location


               // name,secPassword , email, location
                //or name:req.body.name//use same name,password etc
            })
            res.json({ success: true })
        } catch (error) {
            console.log(error)
            res.json({ success: false })
        }

    })








router.post('/loginuser',
    body('email').isString(),
    body('password').isStrongPassword(),
     async (req, res) => {
        const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
        try {
            const email=req.body.email;
            const password=req.body.password;
            console.log(email,password);



            let useremail = await User.findOne({email})
            if(!useremail)
                {
                    return res.status(400).json({errors:"invalid email"})

                }
                console.log("Stored hashed password:", useremail.password);
            console.log("Entered password:", password);
                

            const pwdCompare=await bcrypt.compare(password,useremail.password)
            console.log("Password comparison result:", pwdCompare);
            
            if (!pwdCompare) {
                console.log("Password comparison failed");
                return res.status(400).json({ errors: "Invalid password" });
            }
                const data={
                    user:{
                        id:useremail.id
                    }
                }


            
            const authToken=jwt.sign(data,Secret)
            return (res.json({ success: true,authToken:authToken}))
        } catch (error) {
            console.log(error)
            res.json({ success: false })
        }

    })
module.exports = router;