module.exports = (sequelize, DataTypes) => {
    const CarType = sequelize.define("CarType", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      typeName: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      freezeTableName: true
    });
  
    CarType.associate = (models) => {
      CarType.hasMany(models.Car, {
        foreignKey: 'carTypeId',
        onDelete: 'SET NULL' // or CASCADE if you want car deletion too
      });
    };
  
    return CarType;
  };
  