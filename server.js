const app = require('./app')
const connectToMongo = require('./config/db')
const cloudinary = require('cloudinary')


//Handling uncaught error 

process.on("uncaughtException", err => {
    console.log(`"Error" : ${err.message}`);
    console.log('Shutting donw the server due to uncaught error ')
        process.exit();
    
}) 

//Config  
if(process.env.NODE_ENV !== "PRODUCTION"){
    require('dotenv').config({path : "Backend/config/config.env"})
}
const port = process.env.PORT ;

//Connnecting to mongoDb and call it after this dotenv so, mongo can get MongoUri
connectToMongo();

//Cloudinary working 

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_NAME,
    api_key : process.env.CLOUDINARY_KEY,
    api_secret : process.env.CLOUDINARY_SECRET,
})

const server = app.listen(port , () => {
    console.log(`This site is running on port http://localhost:${port}`)
})

//Unhandled Promise rejection 

process.on("unhandledRejection", err => {
    console.log(`"Error" : ${err.message}`);
    console.log('Shutting down the server due to undandled promise rejection')

    server.close(()=> {
        process.exit();
    })
})

//Video watched till 1:34hr