const { DataTypes } = require('sequelize');

// module.exports = sequelize => {
//   sequelize.define('Character', {
    
//   })
// }

const Character = (database) => {
  database.define("Character", {
    code:{
      type: DataTypes.STRING,
    },
    name:{
      type: DataTypes.STRING,
      unique: true,
    },
    age:{
      type: DataTypes.INTEGER,
    },
    race:{
      type: DataTypes.STRING,
    },
    hp:{
      type: DataTypes.FLOAT,
    },
    mana:{
      type: DataTypes.FLOAT,
    },
    date_added:{

    }
  });
}

