const http = require('http')
let express = require("express");
const app = express();
const copDb = require('./copDb')
const mongoose = require('mongoose')
const User = require('./models/userModel')

// creation du serveur
const port = http.createServer(app).listen(8080)

// connection à la database
const uri = copDb.copDbUri
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,   
}).then(() => {
    console.log("----------------------------")
    console.log(" *** Database connected *** ")
    console.log("----------------------------")
}).catch(err => console.log(err));

// retour des données json
app.use(express.json())

app.post('/createCollec', async (req, res) => {

    try {
        await User.createCollection().then(() => {
            console.log(' *** Collection is created! ***')
        })
        res.status(200).json(" success ")
    } catch (err) {
        console.log(" xxx failed xxx ")
        res.status(400).json(err)
    }
})

app.post('/signUp', async (req, res) => {
    //les variables font office d'objet user
    let {firstName, lastName, email, token} = req.body
    
    try {
        const newUser = await User.create({ 
            firstName, 
            lastName, 
            email, 
            token
        })
        res.status(200).json(newUser)
    } catch (err) {
        console.log(" xxx failed xxx ")
        res.status(400).json(err)
    }
})

app.get('/allUsers', async (req, res) => {
    
    try {
        const users = await User.find({})
        console.log(' *** user finded *** ')
        res.status(400).json(users)
    } catch (err) {
        console.log(err)
    }
})

console.log("----------------------------------------------")
console.log(" Listen to port => " + port._connectionKey)