var mongoose = require("mongoose");
var Location = require("./models/location");
var Comment = require("./models/comment");

var data = [
  {
    name: "The Refrence Lib",
    image:
      "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Ftorontostoreys.com%2Fwp-content%2Fuploads%2F2018%2F02%2FToronto-Reference-Library-Toronto-Public-Library-copy.jpg&f=1&nofb=1",
    description: "A student lib, host to many in need of a snooze"
  },
  {
    name: "Philosphers Walk",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia-cdn.tripadvisor.com%2Fmedia%2Fphoto-s%2F06%2F28%2F10%2Fcf%2Fphilosopher-s-walk.jpg&f=1&nofb=1",
    description: "A beautful but weather dependent opportunity"
  },
  {
    name: "Union Station",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fb%2Fb4%2FThe_Great_Hall_of_Union_Station_in_Toronto.jpg&f=1&nofb=1",
    description: "You will look sketchy"
  }
];

async function seedDB() {
  try {
    await Comment.remove({});
    await Location.remove({});
    for (const data of data) {
      let location = await Location.create(data);
      let comment = await Comment.create({
        text: "This place is great, but I wish there were pillows",
        creator: "snoozeMcginity"
      });
      location.comments.push(comment);
      location.save();
    }
  } catch (err) {}
}

module.exports = seedDB;
