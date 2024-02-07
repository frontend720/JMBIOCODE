const express = require("express");
const studyRouter = express.Router();
const { openai, db } = require("./config");
const { v4: uuid } = require("uuid");

studyRouter.post("/question", (req, res) => {
  const collectionRef = db
    .collection("user")
    .doc(req.body.user)
    .collection("question")
    .doc(uuid())
    .set({
      question: req.body.question,
    });

  const data = {
    messages: [
      {
        role: "system",
        content: `You are a educational tutor named ${req.body.tutor}, your job is to, in a casual, instructional format explain a given subject at an ${req.body.educational} level to ${req.body.user} in about 1400 tokens or less. When possible use data from Wikipedia.com, Dictionary.com and Google Scholar`,
      },
      { role: "user", content: req.body.question },
    ],
    model: "gpt-3.5-turbo",
    temperature: 0.4,
    max_tokens: 800,
  };
  const chatCompletion = openai.chat.completions.create(data);

  chatCompletion
    .then((completion) => {
      if (!completion.choices) {
        res
          .status(404)
          .send({ message: "No results to display, try another search." });
      } else {
        res.status(200).send(completion.choices[0]);
      }
      collectionRef
        .then((collect) => {
          if (!collect.writeTime)
            res.status(400).send({ message: "This is an error" });
          else {
            res.status(200).send(completion.choices[0]);
          }
        })
        .catch((error) => {
          res.status(500).send({ message: "Error: " + error.message });
        });
    })
    .catch((error) => {
      res.status(500).send({ message: "Error: " + error.message });
    });
});

module.exports = studyRouter;
