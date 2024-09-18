const { db, Sequelize, DataTypes } = require("../db");

// TODO - define the Song model
let Song = db.define("Song", {
  title: DataTypes.STRING,
  year: DataTypes.INTEGER,
  length: DataTypes.INTEGER,
});

module.exports = {
  Song,
};
