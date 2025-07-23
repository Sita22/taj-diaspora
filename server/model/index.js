const mongoose = require('mongoose');

(async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
    console.log('Connected to DB');
  } catch (err) {
    console.log('Connection to DB did not work', err);
  }
})();

module.exports = mongoose;