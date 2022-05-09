const { DataTypes } = require('sequelize');

//solo le pongo nombre porque el ID lo genera automáticamente sequelize:

module.exports = (sequelize) => {
  sequelize.define('genre', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
  }, {
    timestamps: false,
  });
};