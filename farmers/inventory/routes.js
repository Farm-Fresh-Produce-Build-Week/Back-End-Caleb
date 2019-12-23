const express = require("express"),
  Inventory = require("./model.js"),
  restricted = require("../../middleware/auth-middleware.js"),
  router = express.Router({ mergeParams: true });
router.get("/", restricted, (req, res) => {
  Inventory.findByFarmer(req.params.id)
    .then(items => {
      res.status(200).json(items);
    })
    .catch(err => {
      res
        .status(500)
        .json({ errorMessage: "Unable to access inventory database!" });
    });
});
router.post("/", restricted, roleCheck, idCheck, (req, res) => {
  const newItem = req.body;
  newItem.farmer_id = req.params.id;
  Inventory.insert(newItem)
    .then(saved => {
      if (saved) {
        Inventory.findBySKU(req.params.id, newItem.SKU)
          .then(items => {
            res.status(200).json(items);
          })
          .catch(err => {
            res.status(500).json({
              errorMessage: "Unable to get inventory list in the database!"
            });
          });
      } else {
        res.status(500).json({
          errorMessage: "Item was not added to inventory."
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        // err,
        errorMessage:
          "Unable to add item to inventory! That item might already be registered."
      });
    });
});

router.get("/PLU/:plu", (req, res) => {
  const { id, plu } = req.params;
  Inventory.findByPLU(id, plu)
    .then(item => {
      if (item) {
        res.status(200).json(item);
      } else {
        res.status(201).json({ errorMessage: "That item does not exist!" });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ errorMessage: "Unable to access farmer inventory!" });
    });
});
router.put("/:sku", restricted, roleCheck, idCheck, (req, res) => {
  const editItem = req.body;
  const sku = req.params.sku;
  editItem.farmer_id = req.params.id;
  Inventory.update(editItem.farmer_id, sku, editItem)
    .then(item => {
      console.log({ message: "Return from update", item });
      res.status(200).json({
        message: `Successfully updated ${item.SKU} in the database`,
        item
      });
    })
    .catch(() => {
      res.status(500).json({
        errorMessage: "Unable to update item in the farmer's inventory!"
      });
    });
});
router.delete("/:sku", restricted, roleCheck, idCheck, (req, res) => {
  const {id, sku} = req.params;

  Inventory.remove(id, sku)
    .then(inventory => {
      if (inventory) {
        res.status(201).json({
          message: `Successfully removed item #${sku} from the farmer's inventory.`
        });
      } else {
        res.status(500).json({
          errorMessage:
            "That item can't be removed from the farmer's inventory because it cannot be found."
        });
      }
    })
    .catch(() => {
      res.status(500).json({
        errorMessage: "Unable to remove that item from the farmer's inventory."
      });
    });
});
router.get("/:sku", (req, res) => {
  const { id, sku } = req.params;
  Inventory.findBySKU(id, sku)
    .then(item => {
      if (item) {
        res.status(200).json(item);
      } else {
        res.status(201).json({ errorMessage: "That item does not exist!" });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ errorMessage: "Unable to access farmer inventory!" });
    });
});
module.exports = router;
function roleCheck(req, res, next) {
  const { role } = req.decodedJwt;
  if (role == "farmer") {
    next();
  } else {
    res.status(500).json({
      errorMessage: "You must be a Farmer to access that information!"
    });
  }
}
function idCheck(req, res, next) {
  const { id } = req.decodedJwt;
  if (id == req.params.id) {
    next();
  } else {
    res.status(500).json({
      errorMessage:
        "You cannot update another Farmer's information, mind your own business!"
    });
  }
}
