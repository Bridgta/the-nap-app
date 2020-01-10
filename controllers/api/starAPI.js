const Like = require("../../models/location");

const likes = (req, res) => {
  Like.find({}, (err, likes) => {
    res.status(200).json(likes);
  });
};

module.exports = { likes };
