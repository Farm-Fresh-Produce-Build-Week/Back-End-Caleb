const express = require("express"),
  Produce = require("./produce-model"),
  restricted = require("../middleware/auth-middleware.js"),
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
      if (produce) {
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
router.post("/", (req, res) => {
  const newItem = req.body;
  Produce.insert(newItem)
    .then(item => {
      res.status(200).json({
        message: `Successfully added ${item.name} to the database`,
        item
      });
    })
    .catch(() => {
      res
        .status(500)
        .json({
          errorMessage:
            "Unable to add produce to the database! Make sure that item doesn't already exist by checking the name"
        });
    });
});
router.put("/:id", (req, res) => {
  const editItem = req.body;
  const id = req.params.id;

  Produce.update(id, editItem)
    .then(item => {
      res.status(200).json({
        message: `Successfully updated ${item.name} in the database`,
        item
      });
    })
    .catch(() => {
      res
        .status(500)
        .json({ errorMessage: "Unable to update produce in the database!" });
    });
});
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  Produce.remove(id)
    .then(item => {
      if (item) {
        res.status(201).json({
          message: `Successfully removed item #${id} from the database.`
        });
      } else {
        res.status(500).json({
          errorMessage:
            "That item can't be removed from the database because it cannot be found."
        });
      }
    })
    .catch(() => {
      res.status(500).json({
        errorMessage: "Unable to remove that item from the database."
      });
    });
});
module.exports = router;
