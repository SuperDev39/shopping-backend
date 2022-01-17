const mongoose = require('mongoose')
const Schema = mongoose.Schema
const productSchema = new Schema ({
  id: {
    type: Number,
    default: 0
  },
  image_url: {
    type: String,
    default: ''
  }
})

module.exports = Product = mongoose.model("products", productSchema)