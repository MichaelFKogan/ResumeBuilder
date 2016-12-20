'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    email:{
      type: DataTypes.STRING,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull:false
    },
    lastName:{
      type: DataTypes.STRING,
      allowNull:false
    },
    zipCode:{
      type: DataTypes.STRING,
    },
    jobType: DataTypes.STRING,
    interests: DataTypes.STRING,
    password_hash: {
      type: DataTypes.STRING,
      allowNull:false
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};