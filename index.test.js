const { db } = require("./db");
const { Band, Musician, Song } = require("./index");

describe("Band, Musician, and Song Models", () => {
  /**
   * Runs the code prior to all tests
   */
  beforeAll(async () => {
    // the 'sync' method will create tables based on the model class
    // by setting 'force:true' the tables are recreated each time the
    // test suite is run
    await db.sync({ force: true });
  });

  test("can create a Band", async () => {
    // TODO - test creating a band
    const testBand = await Band.create({ name: "ADTR", genre: "Rock" });
    expect(testBand.name).toBe("ADTR");
    expect(testBand.genre).toBe("Rock");
  });

  test("can create a Musician", async () => {
    // TODO - test creating a musician
    const testMusician = await Musician.create({
      name: "Jeremey McKinnon",
      instrument: "Vocals",
    });
    expect(testMusician.name).toBe("Jeremey McKinnon");
    expect(testMusician.instrument).toBe("Vocals");
  });

  test("can update a Band", async () => {
    // TODO - test updating a band
    await Band.update(
      { name: "A Day To Remember" },
      { where: { name: "ADTR" } }
    );
    const updatedBand = await Band.findByPk(1);
    expect(updatedBand.name).toBe("A Day To Remember");
  });

  test("can update a Musician", async () => {
    // TODO - test updating a musician
    await Musician.update(
      { name: "Neil Westfall", instrument: "Guitar" },
      { where: { id: 1 } }
    );
    const updatedMusician = await Musician.findByPk(1);
    expect(updatedMusician.name).toBe("Neil Westfall");
    expect(updatedMusician.instrument).toBe("Guitar");
  });

  test("can delete a Band", async () => {
    // TODO - test deleting a band
    const band = await Band.findByPk(1);
    const deletedBand = await band.destroy();
    expect(deletedBand.name).toBe("A Day To Remember");
  });

  test("can delete a Musician", async () => {
    // TODO - test deleting a musician
    const musician = await Musician.findByPk(1);
    const deletedMusician = await musician.destroy();
    expect(deletedMusician.name).toBe("Neil Westfall");
  });

  test("assigns Musicians to a Band", async () => {
    const band1 = await Band.create({
      name: "A Day To Remember",
      genre: "Rock",
    });

    const member1 = await Musician.create({
      name: "Jeremey McKinnon",
      instrument: "Vocals",
    });

    const member2 = await Musician.create({
      name: "Neil Westfall",
      instrument: "Guitar",
    });

    const member3 = await Musician.create({
      name: "Alex Shelnutt",
      instrument: "Drums",
    });

    const member4 = await Musician.create({
      name: "Kevin Skaff",
      instrument: "Guitar",
    });

    await band1.addMusicians([member1, member2, member3, member4]);
    const bandMembers = await band1.getMusicians();
    // console.log(JSON.stringify(bandMembers, null, 2));
    expect(bandMembers.length).toBe(4);
    expect(bandMembers[0].name).toBe("Jeremey McKinnon");
  });

  test("can add songs to band", async () => {
    const bulkSongs = await Song.bulkCreate([
      {
        title: "NJ Legion Iced Tea",
        year: 2009,
        length: 2,
      },
      {
        title: "The Downfall of Us All",
        year: 2009,
        length: 3,
      },
      {
        title: "Have Faith in Me",
        year: 2010,
        length: 3,
      },
      {
        title: "All I Want",
        year: 2010,
        length: 3,
      },
      {
        title: "All Signs Point to Lauderdale",
        year: 2011,
        length: 3,
      },
    ]);

    const band = await Band.findByPk(2);
    await band.addSongs(bulkSongs)

    const bandSongs = await band.getSongs();

    expect(bandSongs.length).toBe(5);
  });
});
