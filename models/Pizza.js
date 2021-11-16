//we could import the entire mongoose library, but for now we just need Schema constructor and model function
const { Schema, model } = require('mongoose')
const dateFormat = require('../utils/dateFormat')

const PizzaSchema = new Schema({
    pizzaName: {
        type: String
    },
    createdBy: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    size: {
        type: String,
        default: 'Large'
    },
    toppings: [],
    comments: [
        {
            //Tell Mongoose to expect an ObjectId and to tell it that its data comes from the Comment model
            type: Schema.Types.ObjectId,
            //This tells the Pizza model to search to find the right comments
            ref: 'Comment'
        }
    ]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    //we set id to false because this is a virtual that Mongoose returns, and we don't need it
    id: false
})

//Virtuals allow you to add virtual properties to a document that aren't stored in the database. They allow us to add more information to a database response so that we don't have to add in the information manually with a helper before responding to the API request
//get total count of comments and replies on retrieval 
//dont forget to tell the schema that it can use virtuals (toJSON)
PizzaSchema.virtual('commentCount').get(function(){
    return this.comments.length
})

//create the Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

//export the Pizza model
module.exports = Pizza