const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const MONGODB_URI = process.env.MONGODB_URI

console.log('Connecting to', MONGODB_URI)
mongoose.set('useFindAndModify',false)
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log(result)
    console.log('Connected to MongoDB')
  })
  .catch((e) => {
    console.log('Error connecting to MongoDB', e.message)
  })

const puhelinSchema = new mongoose.Schema({
  name: { type: String,required:true,unique:true,minlength:3 },
  number: { type:String,required:true,minlength:8 },
})


puhelinSchema.set('toJSON',{ transform:(document,returnedObject) => {
  returnedObject.id = returnedObject._id.toString()
  delete returnedObject._id
  delete returnedObject.__v
} })
puhelinSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Person',puhelinSchema)