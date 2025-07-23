const User = require("../model/users");

exports.getUsers = async (req, res) => {
  try {
    const result = await User.find({});
    res.send(result);
    res.status(200);
  } catch (err) {
    res.status(404);
    console.log(err);
    res.send(err);
  }
}


exports.createUser = async (req, res) => {
  try {
    const { email, username, name, city, country } = req.body;
    if (!email || !username || !city || !country) {
      res.send("Data is missing: either email, username, city or country");
      res.status(400);
    }
    const user = await User.insertOne(req.body);
    res.send(user);
    res.status(201);
  } catch (err) {
    res.status(404);
    console.log(err);
    res.send(err);
  }
}