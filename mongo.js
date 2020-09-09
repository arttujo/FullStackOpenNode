const mongoose = require('mongoose')

require('dotenv').config()

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://fullstack:${password}@cluster0.1epwe.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const puhelinSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', puhelinSchema)
const person = new Person({
  name: name,
  number: number,
})


if (!name && !number) {
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person)
    })
    mongoose.connection.close()
  })
} else if (name && number !== null) {
  person.save().then((response) => {
    console.log(
      `added ${response.name} with number ${response.number} to phonebook`
    )
    mongoose.connection.close()
  })
} else {
  console.log('no arguments given')
  process.exit(1)
}
