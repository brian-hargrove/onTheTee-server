require('dotenv').config();

const express = require('express');
const app = express();

let sequelize = require('./db');
let user = require('./controllers/userController');
const { request } = require('express');


sequelize.sync();

app.use(express.json());
app.use(require('./middlewares/cors'));

app.use('/user',user);




app.listen(process.env.PORT, function(){
    console.log('App is listening on 3000.')
});

app.use('/api/test', function(request, response){
    response.send("This is data from the /api/test endpoint. It's from the server.");
});
