module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      username: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
      role_id: { type: DataTypes.INTEGER }
    }, {});
    User.associate = function(models) {
      User.belongsTo(models.Roles, { foreignKey: 'role_id' });
    };
    return User;
  };