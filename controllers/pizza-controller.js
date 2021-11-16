const { Pizza } = require('../models');

const pizzaController = {
    //the functions go here as methods
    //get all pizzas serves as the callback function for the GET /api/pizzas route
    getAllPizza(req, res) {
        Pizza.find({})
        //populate a field like joining two tables
        // the minus sign in front of __v indicates that we don't want it to be returned
            .populate({
                path: 'comments',
                select: '-__v'
            })
            .select('-__v')
            //sort() to return the newest data first
            .sort({ _id: -1 })
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => {
                console.log(err)
                res.status(400).json(err)
            })
    },

    //get one pizza by id
    //we destructured params out of the req because that's the only data we need for this request to be fulfilled
    getPizzaById({ params }, res) {
        Pizza.findOne({ _id: params.id })
            .populate({
                path: 'comments',
                select: '-__v'
            })
            .select('-__v')
            .then(dbPizzaData => {
                //If no pizza is found, send 404
                if(!dbPizzaData) {
                    res.status(404).json({ message: 'No pizza found with this id!' })
                    return
                }
                res.json(dbPizzaData)
            })
            .catch(err => {
                console.log(err)
                res.status(404).json(err)
            })
    },

    //method for handling POST /api/pizzas
    //we destructured the body out of the request because we don't need to interface with any of the other data it provides
    createPizza({ body }, res) {
        Pizza.create(body)
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => res.status(400).json(err))
    },

    //method for handling PUT /api/pizzas/:id
    updatePizza({ params, body }, res) {
        //if we dont send new: true, it will return the original document
        Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No pizza found with this id!' })
                    return
                }
                res.json(dbPizzaData)
            })
            .catch(err => res.status(404).json(err))
    },

    //method for handling DELETE /api/pizzas/:id
    deletePizza({ params }, res) {
        Pizza.findOneAndDelete({ _id: params.id })
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No pizza found with this id!' })
                    return
                }
                res.json(dbPizzaData)
            })
            .catch(err => res.status(400).json(err))
    }
}

module.exports = pizzaController