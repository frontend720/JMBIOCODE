const accountRouter = require("express").Router();
const { v4: uuid } = require("uuid");
const moment = require("moment");
const { db } = require("./config");
const { response } = require("express");

accountRouter.post("/", (req, res) => {
  const data = {
    username: req.body.username,
    bio: req.body.bio,
    location: req.body.location,
    accountId: uuid(),
    createdAt: moment().format("llll"),
  };
  const collectionRef = db
    .collection("users")
    .doc(req.body.email)
    .set(data, { ignoreUndefinedProperties: true });
  collectionRef
    .then((user) => {
      if (!user) {
        res
          .status(400)
          .send({ message: "Error creating account. Try again later" });
      } else {
        res.status(200).send(user);
      }
    })
    .catch((err) => {
      res.status(500).send(err.code);
    });
});

accountRouter.put("/:id", (req, res) => {
  const id = req.params.id;
  const data = {
    username: req.body.username,
    bio: req.body.bio,
    location: req.body.location,
  };
  const collectionRef = db
    .collection("users")
    .doc(id)
    .set(data, { merge: true });
  collectionRef
    .then((user) => {
      if (!user) {
        res
          .status(400)
          .send({
            message: "Unable to update account. Contact system administrator.",
          });
      } else {
        res.status(200).send(user);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.code });
    });
});

module.exports = accountRouter;
