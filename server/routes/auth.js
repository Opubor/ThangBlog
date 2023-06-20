var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')
const createHttpError = require("http-errors");
const { User } = require('../models/users');

router.post('/users/login', async function(req,res,next){
    try {
        const {email, password} = req.body
        // ============================================
        const user = await User.findOne({email})
        if(!user || (user.password !== password)){
            return res.status(401).send("Invalid Credentials")
        }else{
            const{_id, username, email, password} = user
            jwt.sign({_id,username, email, password},process.env.JWT_SECRET, {
                expiresIn: '365d'
            }, function(err, token){
                if(err){
                    return res.status(403).send("Error decoding token")
                }else{
                    console.log(token)
                    return res.json(token)
                }
            })
        }
    } catch (error) {
       return res.status(401).send(error.message)
    }
})

module.exports = router