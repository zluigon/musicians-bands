const { Band } = require("./models/Band");
const { Musician } = require("./models/Musician");
const { Song } = require("./models/Song");
// Define associations here

Band.hasMany(Musician);
Musician.belongsTo(Band);

Band.belongsToMany(Song, { through: "band_songs" });
Song.belongsToMany(Band, { through: "band_songs" });

module.exports = {
  Band,
  Musician,
  Song,
};
