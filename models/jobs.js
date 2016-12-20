'use strict';
module.exports = function(sequelize, DataTypes) {
  var Jobs = sequelize.define('Jobs', {
    title: DataTypes.STRING,
    desc: DataTypes.TEXT,
    time: DataTypes.STRING,
    jobZipCode: DataTypes.STRING,
    hours: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
       Jobs.belongsTo(models.Organization, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        })
      } //associate
    }
  });
  return Jobs;
};