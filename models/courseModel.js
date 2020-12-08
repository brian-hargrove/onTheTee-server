module.exports = function (sequelize, DataTypes){
    return sequelize.define('course', {
       location: DataTypes.STRING,
       golfcourse:DataTypes.STRING,
       rating: DataTypes.INTEGER,
       notes: DataTypes.TEXT,
       
    });
};
