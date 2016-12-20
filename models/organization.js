'use strict';
module.exports = function(sequelize, DataTypes) {
  var Organization = sequelize.define('Organization', {
    OrganizationName: {
      type:DataTypes.STRING,
      allowNull:false
    },
    pocName: {
      type:DataTypes.STRING,
      allowNull:false
    },
    pocPosition: DataTypes.STRING,
    phoneNumber:{
      type: DataTypes.STRING,
      allowNull:false
    }, 
    eMail: DataTypes.STRING,
    webSite: DataTypes.STRING,
    zipCode: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Organization.hasMany(models.Jobs, {
          onDelete: "CASCADE",
          hooks: true,
          foreignKey: {
            allowNull: false
          }
        })
      }
    }
  });
  return Organization;
};