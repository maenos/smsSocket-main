
module.exports = (sequelize, DataTypes) => {


    const user = sequelize.define('user', {


        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        uuid: {
            type: DataTypes.STRING,
            allowNull: false
        },
        online: {

            type: DataTypes.BOOLEAN,
            allowNull:false
        }




    }, {
        timestamps: true,
        createdAt: false,
        updatedAt: false
    })

   
    return user;
}
