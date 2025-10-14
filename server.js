const express = require('express'); 
app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const corsOptions = require('./config/corsOptions')
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const credentials= require('./middleware/credentials');
const cloudinary = require('cloudinary')
const multer = require('multer')
PORT = 3500;
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')
// connecting to mongo db
 connectDB()
 app.use(credentials);
//middleware
app.use(cors(corsOptions));

app.use(cookieParser());

app.use(express.json());

app.use(express.urlencoded({extended : false}));

app.use(express.static(path.join(__dirname, '/public')));

//refresh token route
app.use('/refresh', require("./router/refresh"));

//admin routes , on admin roles can access this routes
app.use('/admin',require("./router/admin"))

//login verification route
app.use('/verify', require("./router/verifyAuth"));

//logout route
app.use('/logout', require("./router/logout"));

//cart routes
app.use('/cart', require("./router/cart"));

//checkout routes ( basically payment integration route and webhook with stripe)
app.use('/checkout', require('./router/checkout'));

//order routes
app.use('/orders', require("./router/order"));

//shop routes
app.use('/shop', require('./router/shop_routes'));

//register route
app.use('/register', require('./router/register'));

//login route
app.use('/login', require("./router/auth"));

// Swagger route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


mongoose.connection.once('open',()=>{ 
    console.log('mongoose successfully connected')
    app.listen(PORT,()=>{console.log(`server running on port${PORT}`)});
})

