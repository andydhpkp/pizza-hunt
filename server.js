const express = require('express');
const mongoose = require('mongoose')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(require('./routes'));

//tells mongoose which database we want to connect to, if the env variable MONGODB_URI exists, use that. Otherwise, it will short-circuit to the local MongoDB server's database at mongodb://localhost/pizza-hunt. The second argument is a set of configuration options Mongoose asks for more info about
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/pizza-hunt', {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//Use this to log mongo queries being executed
mongoose.set('debug', true)


app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
