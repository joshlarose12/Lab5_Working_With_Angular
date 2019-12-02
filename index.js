const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose')

//import routes
const authRoute = require('./routes/open');
const postsRoute = require('./routes/posts');

dotenv.config();

//connect to DB
mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('connected to db!')
); 

//Middleware
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header("Access-Control-Allow-Methods", "POST,GET,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,Accept");
    next();
});

app.use(express.json());


//Route Middlewares
app.use('/api/open',authRoute);
app.use('/api/admin',postsRoute);
app.use('/api/secure',postsRoute);

app.listen(3000, () => console.log('Server up and running'));
