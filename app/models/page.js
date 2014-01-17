// load mongoose since we need it to define a model
var mongoose = require('mongoose');

module.exports = mongoose.model('Page', {
  pageName: String,
  contents: [{
    type  : String,
    value : String,
    width : Number,
    height: Number
  }]
});