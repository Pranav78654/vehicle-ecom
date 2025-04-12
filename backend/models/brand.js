module.exports = (sequelize, DataTypes) => {
  const Brand = sequelize.define("Brand", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    brandName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    iconUrl: {
      type: DataTypes.STRING,
      allowNull: true  // Optional: allow null if icon is not mandatory
    }
  }, {
    freezeTableName: true
  });

  Brand.associate = (models) => {
    Brand.hasMany(models.Car, {
      foreignKey: 'brandId',
      onDelete: 'CASCADE'
    });
  };

  return Brand;
};
