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
let User = require('./models/user')(sequelize,require("sequelize"));
let Score = require('./models/scoreModel')(sequelize,require("sequelize"));
let UserInfo = require('./models/userInfoModel')(sequelize,require("sequelize"));

// User.hasMany(ScoreModel);
// ScoreModel.belongsTo(User);
//!
// User = sequelize.import('./models/user');
// Score = sequelize.import('./models/scoreModel');
// UserInfo = sequelize.import('./models/userInfoModel');

Score.belongsTo(User);
User.hasMany(Score);

User.hasOne(UserInfo);
UserInfo.belongsTo(User);




module.exports = sequelize;


