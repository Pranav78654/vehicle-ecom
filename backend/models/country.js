module.exports = (sequelize, DataTypes) => {
  const Country = sequelize.define('Country', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false }
  }, {
    tableName: 'country',
    timestamps: false
  });

  Country.associate = function(models) {
    Country.hasMany(models.State, { foreignKey: 'country_id' });
  };

  return Country;
};