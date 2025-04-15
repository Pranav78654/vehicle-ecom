module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define('Cart', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      carId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    }, {
      freezeTableName: true,
      indexes: [
        {
          unique: true,
          fields: ['userId', 'carId'], // ✅ prevent duplicates
        }
      ]
    });
  
    Cart.associate = (models) => {
      Cart.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      });
  
      Cart.belongsTo(models.Car, {
        foreignKey: 'carId',
        onDelete: 'CASCADE'
      });
    };
  
    return Cart;
  };
  