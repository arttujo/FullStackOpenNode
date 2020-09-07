const express = require("express");
const morgan = require("morgan")
const { response } = require("express");
const app = express();


morgan.token('req-headers', function(req,res){
    return JSON.stringify(req.headers)
   })
app.use(express.json());

morgan.token('body',(req,res)=>{return JSON.stringify(req.body)})
app.use(morgan((tokens,req,res)=>{
    return [
        tokens.method(req,res),
        tokens.url(req,res),
        tokens.status(req,res),
        tokens.req(req,res, 'content-length'), '-',
        tokens['response-time'](req,res),'ms',
        tokens['body'](req,res)
    ].join(' ')
}))



let data = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
];

app.get("/api/persons", (req, res) => {
  res.json(data);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = data.find((person) => person.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  data = data.filter((person) => person.id !== id);
  res.status(204).end();
});

const checkExisting = (newPerson) => {
  let exists = data.filter((person) => {
    return person.name == newPerson;
  });
  if (exists.length>0){
      console.log("person is already on the list")
      return true
  } else {
      console.log("person is not on the list")
      return false
  }
};

app.post("/api/persons", (req, res) => {
  const randId = Math.floor(Math.random() * Math.floor(99999));
  const body = req.body;
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "missing either name or number",
    });
  }
  if (!checkExisting(body.name)){
    const person = {
        name: body.name,
        number: body.number,
        id: randId,
      };
      data.push(person);
      res.json(person);
  } else {
    return res.status(403).json({error: "Person is already in the phonebook"})
  }
});

app.get("/info", (req, res) => {
  const phonebookLength = data.length;
  const string = `Phonebook has info for ${phonebookLength} people`;
  const time = new Date();
  res.send(string + "<br>" + "<br>" + time);
});

const PORT = 3001;

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  app.use(unknownEndpoint)



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
