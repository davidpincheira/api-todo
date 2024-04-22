const express = require('express')
const app = express()
const router = express.Router();
const cors = require('cors')

const { sequelize } = require('./models/index')

//settings
const PORT = process.env.PORT || 3000

//middlewares
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
//routes
const routes = require('./routes/routes')
app.use(routes)

app.listen(PORT, function (){
    console.log('server running')
    sequelize.authenticate().then(()=>{
        console.log('conectado a la base de datos')
    })

    //sequelize.sync({force: true})
    
})
