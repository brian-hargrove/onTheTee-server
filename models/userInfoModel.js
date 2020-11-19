module.exports = function(sequelize,DataTypes) {
    return sequelize.define('userinfo', {
        dateOfBirth: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                isBefore: "2002-01-01"
            }
        },
        hand: {
            type: DataTypes.STRING,
            allowNull: true
        },
        favCourse: {
            type: DataTypes.STRING,
            allowNull: true
        },
        favGolfer: {
            type: DataTypes.STRING,
            allowNull: true
        }
    })
}