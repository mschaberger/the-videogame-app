const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    released: {
        type: DataTypes.STRING,
    },
    image: {
        type: DataTypes.STRING,
    },
    rating: {
        type: DataTypes.INTEGER,
    },
    fromDb: {
        //los VG que guarde en DB van a tener esta propiedad para que sea mas facil filtrarlos
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    platforms: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: false,
    }
  }, {
    timestamps: false, //es para que no se creen las columnas de las fechas(creacion y de modificación);
  });
};
