const express = require("express");
const studyRouter = express.Router();
const { openai, db } = require("./config");
const { v4: uuid } = require("uuid");
const moment = require("moment");

// Required data in request body: user ie. question, email | id

studyRouter.post(`/question/:user`, (req, res) => {
    const id = req.params.user
  let conversationData;
  let conversationQuestion;
 


  const data = {
    messages: [
      {
        role: "system",
        content: `You are an educational tutor named ${req.body.tutor}, your job is to, in a casual, instructional format explain a given subject at an ${req.body.educational} level to ${req.body.username} in about 1400 tokens or less. When possible use data from Wikipedia.com, Dictionary.com and Google Scholar`,
      },
      { role: "user", content: req.body.question },
    ],
    model: "gpt-3.5-turbo",
    temperature: 0.4,
    max_tokens: 1400,
    user: id
  };
  const chatCompletion = openai.chat.completions.create(data);

  chatCompletion
    .then((completion) => {
      if (!completion.choices) {
        res
          .status(404)
          .send({ message: "Error finding answer. Try again later." });
      } else {
          conversationData = completion.choices[0].message.content;
          conversationQuestion = req.body.question;
          res.status(200).send(conversationData)
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.code });
    });
});



// Required data in request body:  question | user ie. email | id

studyRouter.put("/", (req, res) => {
  const id = req.params.id;
  const data = {
    question: req.body.question,
    editedTimestamp: moment().format("llll"),
    edited: true,
  };
  const collectionRef = db
    .collection("users")
    .doc(req.body.user)
    .collection("question")
    .doc(req.body.id)
    .set(data, { merge: true });
  collectionRef
    .then((question) => {
      if (!question) {
        res
          .status(400)
          .send({ message: "Error editing question. Try again later." });
      } else {
        res.status(200).send(question);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.code });
    });
});

// Requires username in request body for a successful request || study that further if needed.

studyRouter.delete("/", (req, res) => {
  const collectionRef = db
    .collection("users")
    .doc(req.body.user)
    .collection("question")
    .doc(req.body.id)
    .delete();
  collectionRef
    .then((question) => {
      if (!question) {
        res
          .status(400)
          .send({ message: "Error deleting question. Try again later." });
      } else {
        res.status(200).send(question);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.code });
    });
});

module.exports = studyRouter;
