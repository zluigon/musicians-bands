const { db, Sequelize, DataTypes } = require("../db");

// TODO - define the Musician model
let Musician = db.define("Musician", {
  name: DataTypes.STRING,
  instrument: DataTypes.STRING,
});

module.exports = {
  Musician,
};
