module.exports = (sequelize, DataTypes) => {
  const PermissionMaster = sequelize.define(
    "PermissionMaster",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      permission_name: { type: DataTypes.STRING, allowNull: false },
    },
    {
      tableName: "permission_master", 
      timestamps: false, 
    }
  );
  return PermissionMaster;
};
