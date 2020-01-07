const express = require("express"),
  ShoppingCart = require("./model.js"),
  // restricted = require("../../middleware/auth-middleware.js"),
  router = express.Router({ mergeParams: true });
router.get("/", roleCheck, idCheck, (req, res) => {
  ShoppingCart.findByUser(req.params.id)
    .then(items => {
      res.status(200).json(items);
    })
    .catch(err => {
      res
        .status(500)
        .json({ errorMessage: "Unable to access Shopping Cart database!" });
    });
});
router.post("/", roleCheck, idCheck, (req, res) => {
  const newItem = req.body;
  newItem.user_id = req.params.id;
  ShoppingCart.insert(newItem)
    .then(saved => {
      if (saved) {
        ShoppingCart.findBySKU(req.params.id, newItem.SKU)
          .then(items => {
            res.status(200).json(items);
          })
          .catch(err => {
            res.status(500).json({
              errorMessage: "Unable to get Shopping Cart list in the database!"
            });
          });
      } else {
        res.status(500).json({
          errorMessage: "Item was not added to Shopping Cart."
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        // err,
        errorMessage:
          "Unable to add item to Shopping Cart! That item might already be in the cart."
      });
    });
});

router.put("/", roleCheck, idCheck, (req, res) => {
  const editItem = req.body;
  editItem.user_id = req.params.id;
  ShoppingCart.update(editItem.user_id, editItem.SKU, editItem)
    .then(item => {
      if (item) {
        res.status(200).json({
          message: `Successfully updated Item #${editItem.SKU} in the database`,
          item
        });
      } else {
        res.status(500).json({
          errorMessage: "Item was not updated in your Shopping Cart!"
        });
      }
    })
    .catch(() => {
      res.status(500).json({
        errorMessage: "Unable to update item in your Shopping Cart!"
      });
    });
});
router.delete("/", roleCheck, idCheck, (req, res) => {
  const sku = req.body.SKU;

  ShoppingCart.remove(req.params.id, sku)
    .then(ShoppingCart => {
      if (ShoppingCart) {
        res.status(201).json({
          message: `Successfully removed item #${sku} from your Shopping Cart.`
        });
      } else {
        res.status(500).json({
          errorMessage:
            "That item can't be removed from your Shopping Cart because it cannot be found."
        });
      }
    })
    .catch(() => {
      res.status(500).json({
        errorMessage: "Unable to remove that item from the Shopping Cart."
      });
    });
});
router.get("/:sku", roleCheck, idCheck, (req, res) => {
  const { id, sku } = req.params;
  ShoppingCart.findBySKU(id, sku)
    .then(item => {
      if (item) {
        res.status(200).json(item);
      } else {
        res.status(201).json({
          errorMessage: "That item does not exist in your Shopping Cart!"
        });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ errorMessage: "Unable to access your Shopping Cart!" });
    });
});
module.exports = router;
function roleCheck(req, res, next) {
  const { role } = req.decodedJwt;
  if (role == "user") {
    next();
  } else {
    res.status(500).json({
      errorMessage: "You must be a User to access that information!"
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
        "You cannot update another User's information, buy your own stuff!"
    });
  }
}
