const express = require("express");
const noteRouter = express.Router();
const { db } = require("./config");
const { v4: uuid } = require("uuid");
const moment = require("moment");

noteRouter.post("/", (req, res) => {
  const noteId = uuid();
  const data = {
    id: noteId,
    note: req.body.note,
    timestamp: moment().format("llll"),
    title: req.body.title,
  };
  const colletionRef = db
    .collection("users")
    .doc(req.body.user)
    .collection("notes")
    .doc(noteId)
    .set(data);
  colletionRef
    .then((note) => {
      if (!note) {
        res.status(400).send({ message: "Can't send note. Try again later." });
      } else {
        res.status(200).send(note);
      }
    })
    .catch((err) => {
      res.status(500).send(err.code);
    });
});

noteRouter.put("/:id", (req, res) => {
  const noteId = req.params.id;
  const collectionRef = db
    .collection("users")
    .doc(req.body.user)
    .collection("notes")
    .doc(noteId)
    .set(
      {
        note: req.body.note,
        title: req.body.title,
        editedTimestamp: moment().format("llll"),
        edited: true,
      },
      { merge: true }
    );
  collectionRef
    .then((note) => {
      if (!note) {
        res.status(400).send({ message: "Can't update note. Try again later." });
      } else {
        res.status(200).send(note);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.code });
    });
});

noteRouter.delete("/:id", (req, res) => {
  const noteId = req.params.id;

  const collectionRef = db
    .collection("users")
    .doc(req.body.user)
    .collection("notes")
    .doc(noteId)
    .delete();
  collectionRef
    .then((note) => {
      if (!note) {
        res.status(400).send({ message: "Can't delete note. Try again later." });
      } else {
        res.status(200).send(note);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.code });
    });
});

module.exports = noteRouter;
