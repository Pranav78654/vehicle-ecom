module.exports = (sequelize, DataTypes) => {
    const CarInfo = sequelize.define('CarInfo', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      carId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
      },
      exteriorColor: DataTypes.STRING,
      topSpeed: DataTypes.STRING,
      groundClearance: DataTypes.STRING,
      bootSpace: DataTypes.STRING,
      torque: DataTypes.STRING,
      power: DataTypes.STRING,
      engine: DataTypes.STRING
    }, {
      freezeTableName: true
    });
  
    CarInfo.associate = (models) => {
      CarInfo.belongsTo(models.Car, { foreignKey: 'carId', onDelete: 'CASCADE' });
    };
  
    return CarInfo;
  };
  