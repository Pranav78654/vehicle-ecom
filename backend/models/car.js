module.exports = (sequelize, DataTypes) => {
    const Car = sequelize.define("Car", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      carName: DataTypes.STRING,
      registeredYear: DataTypes.INTEGER,
      manufacturingYear: DataTypes.INTEGER,
      fuel: DataTypes.STRING,
      kmsDriven: DataTypes.INTEGER,
      price: DataTypes.FLOAT,
      imageUrl: DataTypes.STRING,
      ownershipStatus: DataTypes.STRING,
      brandId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Brand',
          key: 'id'
        }
      },
      carTypeId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'CarType',
          key: 'id'
        }
      }
    }, {
      freezeTableName: true
    });
  
    Car.associate = (models) => {
      Car.belongsTo(models.Brand, { foreignKey: 'brandId' });
      Car.belongsTo(models.CarType, { foreignKey: 'carTypeId' });
      Car.hasMany(models.CarImages, {
        foreignKey: 'carId',
        onDelete: 'CASCADE'
      });
    };
  
    return Car;
  };
  