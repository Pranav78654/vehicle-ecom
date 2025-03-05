module.exports = (sequelize, DataTypes) => {
  const State = sequelize.define('State', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    country_id: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: 'state',
    timestamps: false
  });

  State.associate = function(models) {
    State.belongsTo(models.Country, { foreignKey: 'country_id' });
    State.hasMany(models.Region, { foreignKey: 'state_id' });
  };

  return State;
};
