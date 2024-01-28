const mongoose = require('mongoose');

const clickCountSchema = new mongoose.Schema({
  Hirer : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "Hiring"
  },
  count : {
    type : Number,
    required : true,
  }
});

const ClickCount = mongoose.model('ClickCount', clickCountSchema);

module.exports = ClickCount;
