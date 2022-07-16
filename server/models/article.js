const mongoose = require('mongoose');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const Schema = mongoose.Schema;
require('dotenv').config();

const articleSchema = mongoose.Schema({
    title:{
        type:String,
        maxLength:100,
        //this is the mongo way to custom an errord!
        required:[true, 'You need to insert a title!']
    },
    content:{
        type:String,
        required:[true,'You need to insert some contents!']
    },
    excerpt:{
        type:String,
        required:[true,'You need to insert some excerpt!'],
        maxLength:500,
    },
    score:{
        type:Number,
        min:0,
        max:100,
        required:true
    },
    director:{
        type:String,
        required:true
    },
    actors:{
        //this is way to tell mongo we hv an array.
        type:[String],
        required:true,
        //this is build in validator, we create a custom validator, not using the npm library.
        validate:{
            validator: function(array){
                return array.length >= 2
            },
            message:"You must add at least 3!"
        }
    },
    status:{
        type:String,
        required:true,
        enum:['draft','public'],
        default:'draft',
        index:true
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
        default:'62cf96ea5a2138a76bb7430b'
    },
    date:{
        type: Date,
        default: Date.now
    }
});

articleSchema.plugin(aggregatePaginate)

const Article = mongoose.model('Article', articleSchema);
module.exports = { Article };