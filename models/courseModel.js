module.exports = function (sequelize, DataTypes){
    return sequelize.define('course', {
       location: DataTypes.STRING,
       golf_course:DataTypes.STRING,
       rating: DataTypes.INTEGER,
       notes: DataTypes.STRING,
       user_id: DataTypes.INTEGER
    });
};