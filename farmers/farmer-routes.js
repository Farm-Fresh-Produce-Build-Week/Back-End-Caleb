const express = require("express"),
  Farmers = require("./farmer-model"),
  bcrypt = require("bcryptjs"),
  jwt = require("jsonwebtoken"),
  secrets = require("../config/secrets.js"),
  restricted = require("../middleware/auth-middleware.js"),
  router = express.Router(),
  inventory = require("./inventory/routes.js");

router.get("/", restricted, (req, res) => {
  Farmers.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res
        .status(500)
        .json({ errorMessage: "Unable to access users database!" });
    });
});
router.post("/register", registerCheck, (req, res) => {
  const {
    username,
    password,
    profileImgURL,
    farmImgURL,
    city,
    state,
    zipCode
  } = req.body;
  const user = { username, profileImgURL, farmImgURL, city, state, zipCode };
  const hash = bcrypt.hashSync(password, 10);
  user.password = hash;
  Farmers.insert(user)
    .then(saved => {
      Farmers.findByName(user.username)
        .then(newFarmer => {
          const token = genToken(newFarmer);
          res.status(200).json({
            newFarmer,
            token,
            message: `Welcome to the group ${newFarmer.username}`
          });
        })
        .catch(err => {
          res.status(500).json({
            errorMessage:
              "Unable to find new farmer by their username in the database!"
          });
        });
    })
    .catch(err => {
      res.status(500).json({
        errorMessage:
          "Unable to add user to database! That username might already be taken."
      });
    });
});
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  Farmers.findByName(username)
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = genToken(user);
        const {
          id,
          username,
          city,
          state,
          zipCode,
          profileImgURL,
          farmImgURL
        } = user;
        res.status(200).json({
          user: {
            id,
            username,
            city,
            state,
            zipCode,
            profileImgURL,
            farmImgURL
          },
          token,
          message: `Welcome back ${user.username}`
        });
      } else {
        res.status(500).json({
          errorMessage: "Unable to find user with those credentials!"
        });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ errorMessage: "Unable to find user in database!" });
    });
});
router.get("/:id", restricted, (req, res) => {
  const { id } = req.params;
  Farmers.findById(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(201).json({ errorMessage: "That farmer does not exist!" });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ errorMessage: "Unable to access farmer database!" });
    });
});
router.get("/:id/reviews", restricted, (req, res) => {
  const { id } = req.params;
  Farmers.findById(id)
    .then(user => {
      Farmers.findReviewsById(id)
        .then(reviews => {
          if (reviews) {
            user.reviews = reviews;
            Farmers.findCommentsById(id).then(comments => {
              if (comments) {
                user.comments = comments;
              }
              res.status(200).json({ user });
            });
          } else {
            res
              .status(201)
              .json({ errorMessage: "That farmer does not have any reviews!" });
          }
        })
        .catch(err => {
          res.status(500).json({
            errorMessage: "Unable to access farmers reviews in the database!"
          });
        });
    })
    .catch(err => {
      res.status(500).send("It's just not going to work out, sorry.");
    });
});
router.use("/:id/inventory", inventory);
router.put("/:id", restricted, roleCheck, idCheck, (req, res) => {
  const editFarmer = req.body;
  const id = req.params.id;
  if (editFarmer.password) {
    const hash = bcrypt.hashSync(editFarmer.password, 10);
    editFarmer.password = hash;
  }
  Farmers.update(id, editFarmer)
    .then(farmer => {
      res.status(200).json({
        message: `Successfully updated ${farmer.username} in the database`,
        farmer
      });
    })
    .catch(() => {
      res
        .status(500)
        .json({ errorMessage: "Unable to update farmer in the database!" });
    });
});
router.delete("/:id", restricted, idCheck, (req, res) => {
  const id = req.params.id;

  Farmers.remove(id)
    .then(farmer => {
      if (farmer) {
        res.status(201).json({
          message: `Successfully removed farmer #${id} from the database.`
        });
      } else {
        res.status(500).json({
          errorMessage:
            "That farmer can't be removed from the database because they cannot be found."
        });
      }
    })
    .catch(() => {
      res.status(500).json({
        errorMessage: "Unable to remove that farmer from the database."
      });
    });
});

module.exports = router;
function genToken(user) {
  const payload = {
    id: user.id,
    username: user.username,
    role: "farmer"
  };
  const options = { expiresIn: "7d" };
  const token = jwt.sign(payload, secrets.jwtSecret, options);
  return token;
}
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
function registerCheck(req, res, next) {
  const { username, password, city, state, zipCode } = req.body;
  if (username && password && city && state && zipCode) {
    next();
  } else if (!username) {
    res
      .status(500)
      .json({
        errorMessage: "A username is required to register a new farmer"
      });
  } else if (!password) {
    res
      .status(500)
      .json({
        errorMessage: "A password is required to register a new farmer"
      });
  } else if (!city) {
    res
      .status(500)
      .json({ errorMessage: "A city is required to register a new farmer" });
  } else if (!state) {
    res
      .status(500)
      .json({ errorMessage: "A state is required to register a new farmer" });
  } else if (!zipCode) {
    res
      .status(500)
      .json({ errorMessage: "A zipCode is required to register a new farmer" });
  }
}
