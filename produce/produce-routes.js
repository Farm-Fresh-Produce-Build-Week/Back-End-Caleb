const express = require("express"),
  Produce = require("./produce-model"),
  restricted=require('../middleware/auth-middleware.js'),
  router = express.Router();

router.get("/", restricted, (req, res) => {
  Produce.find()
    .then(produce => {
      res.status(200).json(produce);
    })
    .catch(err => {
      res
        .status(500)
        .json({ errorMessage: "Unable to access produce database!" });
    });
});
router.get("/:id", restricted, (req, res) => {
  Produce.findById(req.params.id)
    .then(produce => {
      if (produce.length > 0) {
        res.status(200).json(produce);
      } else {
        res.status(201).json({ errorMessage: "That produce does not exist!" });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ errorMessage: "Unable to access produce database!" });
    });
});
module.exports = router;
