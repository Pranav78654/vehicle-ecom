module.exports = (sequelize, DataTypes) => {
  const Roles = sequelize.define('Roles', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      role_name: { type: DataTypes.STRING, allowNull: false }
  }, {
      tableName: 'roles', 
      timestamps: false 
  });

  Roles.associate = function(models) {
      Roles.hasMany(models.User, { foreignKey: 'role_id' });
  };

  return Roles;
};
