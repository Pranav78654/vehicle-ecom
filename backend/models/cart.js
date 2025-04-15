// models/cart.js
module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define("Cart", {
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
      quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
    }, {
      freezeTableName: true,
    });
  
    Cart.associate = (models) => {
      Cart.belongsTo(models.User, { foreignKey: "userId" });
      Cart.belongsTo(models.Car, { foreignKey: "carId" });
    };
  
    return Cart;
  };
  