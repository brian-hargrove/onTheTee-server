const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
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


let User = sequelize.import('./models/user')
let UserInfo = sequelize.import('./models/userInfoModel')
let Score = sequelize.import('./models/scoreModel')
let CourseModel = sequelize.import('./models/courseModel')
let CardModel = sequelize.import('./models/cardModel')



User.hasOne(UserInfo);
UserInfo.belongsTo(User);

User.hasMany(CourseModel);
CourseModel.belongsTo(User);

User.hasMany(Score);
Score.belongsTo(User);

CardModel.hasMany(Score);
Score.belongsTo(CardModel);

CourseModel.hasMany(Score);
Score.belongsTo(CourseModel);



module.exports = sequelize;