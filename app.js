const express = require('express');
const app = express()
const errorMiddleware = require('./middleware/error')
const cookieParser = require('cookie-parser')
// var cors = require("cors");
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const path = require('path')

//Config 
if(process.env.NODE_ENV !== "PRODUCTION"){
    require('dotenv').config({path : "Backend/config/config.env"})
}

app.use(express.json({limit:'50mb', extended: true}))
// app.use(cors({
//     credentials : true,
//     origin : 'http://localhost:4000',
// }))
app.use(cookieParser())
app.use(bodyParser.urlencoded({limit:'50mb', extended : true}));
app.use(fileUpload())
//Route import
const product = require('./routes/productRoute');
const user = require('./routes/userRoute');
const order = require('./routes/orderRoute');
const payement = require('./routes/payementRoute');

app.use('/api/v1' , product);
app.use('/api/v1' , user);
app.use('/api/v1' , order);
app.use('/api/v1' , payement);

app.use(express.static(path.join(__dirname , '../homie-shop/build')))

app.get("*" , (req , res ) => {
    res.sendFile(path.resolve(__dirname , '../homie-shop/build/index.html'))
})
//Middle ware usage 

app.use(errorMiddleware)

module.exports = app;