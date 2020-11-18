const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function(){
        console.log('Connected to onTheTee postrgres database');
    },
    function(err){
        console.log(err);
    }
);

//! NEW
User = sequelize.import('./models/user');
ScoreModel = sequelize.import('./models/scoreModel');

User.hasOne(ScoreModel);
ScoreModel.belongsTo(User);
//!


module.exports = sequelize;