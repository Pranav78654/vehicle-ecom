module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true 
    },
    category_name: { 
      type: DataTypes.STRING, 
      allowNull: false 
    }
  }, {
    tableName: 'category',
    timestamps: false
  });

  return Category;
};
