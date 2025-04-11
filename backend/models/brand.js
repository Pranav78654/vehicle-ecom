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
