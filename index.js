const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT;
const app = express();
app.use(express.static("build"));
const Person = require("./models/person");

morgan.token("req-headers", function (req, res) {
  return JSON.stringify(req.headers);
});
app.use(express.json());
app.use(cors());
morgan.token("body", (req, res) => {
  return JSON.stringify(req.body);
});
app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.req(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      tokens["body"](req, res),
    ].join(" ");
  })
);

const errorHandler = (error, req, res, next) => {
  console.log(error.message);
  console.log(error.name);
  if (error.name === "CastError") {
    return res.status(400).send({ error: "Malformatted ID" });
  }
  if (error.name === "DoesntExist") {
    return res.status(404).json({ error: error.message });
  }

  if (error.name === "ContentMissing") {
    return res.status(400).json({ error: error.message });
  }

  if (error.name === "AlreadyExists") {
    return res.status(403).json({ error: error.message });
  }

  if (error.name === "UpdateFailure") {
    return res.status(500).json({ error: error.message });
  }
  if(error.name === "ValidatorError"){
    return res.status(403).json({error:error.message})
  }
  if(error.name === "ValidationError"){
    return res.status(403).json({error:error.message})
  }
  next(error);
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "Unknown Endpoint" });
};

app.get("/api/persons", (req, res) => {
  Person.find({}).then((result) => {
    res.json(result);
  });
});

app.get("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Person.findById(id)
    .then((person) => {
      if (person) {
        res.json(person);
      }
    })
    .catch((error) => {
      next(error);
    });
});

app.delete("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Person.findByIdAndDelete(id)
    .then((result) => {
      console.log("delete res:", result);
      if (result) {
        res.status(204).end();
      } else {
        throw { name: "DoesntExist", message: "Person doesn't exist anymore" };
      }
    })
    .catch((error) => {
      next(error);
    });
});

app.post("/api/persons", (req, res, next) => {
  const body = req.body;
  try {
    if (!body.name || !body.number) {
      throw {
        name: "ContentMissing",
        message: "Missing either number or name",
      };
    }
      const person = new Person({
        name: body.name,
        number: body.number,
      });
      person.save().then((savedPerson) => {
        res.json(savedPerson);
      }).catch(error=>{
        next(error)
      })
  } catch (error) {
    next(error);
  }
});

app.put("/api/persons/:id", (req, res, next) => {
  const body = req.body;
  const id = req.params.id;
  const person = {
    name: body.name,
    number: body.number,
  };
  Person.findByIdAndUpdate(id, person, { new: true })
    .then((updatedPerson) => {
      console.log("updatedPerson", updatedPerson);
      if (updatedPerson) {
        res.json(updatedPerson);
      } else {
        throw {
          name: "UpdateFailure",
          message: "Update failed. Person doesn't exist",
        };
      }
    })
    .catch((error) => {
      next(error);
    });
});

app.get("/info", (req, res) => {
  Person.find({}).then(result=>{
    const phonebookLength = result.length;
    const string = `Phonebook has info for ${phonebookLength} people`;
    const time = new Date();
    res.send(string + "<br>" + "<br>" + time);
  })
});

app.use(unknownEndpoint);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port:${PORT}`);
});
