var express = require('express');
var router = express.Router();
const { Articles } = require('../models/articles');
const { User } = require('../models/users');

/* POST users. */
router.post('/users',async function(req, res, next) {
  try {
    const {username, email, password} = req.body
    console.log(`username is ${username}`)
    await User.create({username, email, password});
    return res.status(200).send('Registration successful')
  } catch (error) {
    return res.status(401).send(error.message)
  }
});
/* GET users. */
router.get('/user',async function(req, res, next) {
  try {
    const {edit,q} = req.query
    if(edit){
        let user = await User.findById(edit)
        return res.json(user)
    }

    if(q){
        var regex = new RegExp(q, "i")
        let user = await User.find({post:regex}).sort({_id : 'descending'})
        return res.json(user)
    }else{
        let user = await User.find().sort({_id : 'descending'})
        return res.json(user)
    }
} catch (error) {
    return res.status(401).send(error.message)
}
});
/* UPDATE users. */
router.put('/user/:id',async function(req, res, next) {
  try {
    const {username, email, password} = req.body
    const id = req.params.id
    await User.findByIdAndUpdate(id,{username, email, password});
    return res.status(200).send('Profile update successful')
  } catch (error) {
    return res.status(401).send(error.message)
  }
});
/* DELETE articles. */
router.put('/user/:id',async function(req, res, next) {
  try {
    const id = req.params.id
    await User.findByIdAndDelete(id)
    return res.status(200).send('Deleted Successfully')
  } catch (error) {
    return res.status(401).send(error.message)
  }
});

/* POST articles. */
router.post('/article',async function(req, res, next) {
  try {
    const {user, post, likes, comments} = req.body
    await Articles.create({user, post, likes, comments});
    return res.status(200).send('Post created')
  } catch (error) {
    return res.status(401).send(error.message)
  }
});
/* GET articles. */
router.get('/articles',async function(req, res, next) {
  try {
    const {edit,q} = req.query
    if(edit){
        let article = await Articles.findById(edit)
        return res.json(article)
    }

    if(q){
        var regex = new RegExp(q, "i")
        let articles = await Articles.find({post:regex}).sort({_id : 'descending'})
        return res.json(articles)
    }else{
        let articles = await Articles.find().sort({_id : 'descending'})
        return res.json(articles)
    }
} catch (error) {
    return res.status(401).send(error.message)
}
});
/* UPDATE articles. */
router.put('/article/:id',async function(req, res, next) {
  try {
    const {user, post, likes, comments} = req.body
    const id = req.params.id
    await Articles.findByIdAndUpdate(id,{user, post, likes, comments});
    return res.status(200).send('Post updated')
  } catch (error) {
    return res.status(401).send(error.message)
  }
});
/* DELETE articles. */
router.put('/article/:id',async function(req, res, next) {
  try {
    const id = req.params.id
    await Articles.findByIdAndDelete(id)
    return res.status(200).send('Deleted Successfully')
  } catch (error) {
    return res.status(401).send(error.message)
  }
});

module.exports = router;
