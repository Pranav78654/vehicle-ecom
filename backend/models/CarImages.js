// models/CarImages.js
module.exports = (sequelize, DataTypes) => {
  const CarImages = sequelize.define('CarImages', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    carId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  CarImages.associate = (models) => {
    CarImages.belongsTo(models.Car, {
      foreignKey: 'carId',
      onDelete: 'CASCADE'
    });
  };

  return CarImages;
};
