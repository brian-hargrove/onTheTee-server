require('dotenv').config();

const express = require('express');
const app = express();

let sequelize = require('./db');
let user = require('./controllers/userController');
let course = require('./controllers/courseController');
let score = require('./controllers/scoreController');

sequelize.authenticate().then(async()=>{
    console.log('Database is connected');
    sequelize.sync();
})
.catch((e)=>{
    console.log(e);
    console.log('Database NOT connected')
})

// const cors = require("cors");
// app.use(cors());

app.use(express.json());
app.use(require('./middlewares/cors'));

app.use('/user',user);
app.use('/course',course);
app.use('/score',score)


app.listen(process.env.PORT, function(){
    console.log('App is listening on 3000.')
});