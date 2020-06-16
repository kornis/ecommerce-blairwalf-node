module.exports = (sequelize, DataTypes) =>{

    const user = sequelize.define('users',{
        name: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: DataTypes.STRING,
        emailVerifiedAt: DataTypes.DATE,
        password: DataTypes.STRING,
        dni: DataTypes.INTEGER(10),
        address: DataTypes.STRING,
        zipCode: DataTypes.STRING,
        province: DataTypes.STRING,
        country: DataTypes.STRING,            
    },
        {
            tableName:'users',
            paranoid:true,
        }   
    );
return user;
}