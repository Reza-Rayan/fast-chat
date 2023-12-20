const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(`mongodb://127.0.0.1:27017/fast-chat`, ()=> {
  console.log('connected to mongodb')
})
