const {Schema, default:mongoose} = require('mongoose')

const ArticleSchema = new Schema({
    user: String,
    post: String,
    likes: String,
    comments: String,
})

const Article = mongoose.model('Article', ArticleSchema)
module.exports = {Article}