const express = require("express"),
  Farmers = require("./farmer-model"),
  bcrypt = require("bcryptjs"),
  jwt = require("jsonwebtoken"),
  secrets = require("../config/secrets.js"),
  restricted = require("../middleware/auth-middleware.js"),
  router = express.Router();
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
router.post("/register", (req, res) => {
  const { username, password, profileImgURL, city, state, zipCode } = req.body;
  const user = { username, profileImgURL, city, state, zipCode };
  const hash = bcrypt.hashSync(password, 10);
  user.password = hash;
  Farmers.insert(user)
    .then(saved => {
      const token = genToken(saved);
      res.status(200).json({
        saved,
        token,
        message: `Welcome to the group ${saved.username}`
      });
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Unable to add user to database!" });
    });
});
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  Farmers.findByName(username)
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = genToken(user);
        const { id, username, city, state, zipCode, profileImgURL } = user;
        res.status(200).json({
          user: {
            id,
            username,
            city,
            state,
            zipCode,
            profileImgURL
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
          Farmers.findCommentsById(id).then(comments => {
            res.status(200).json({ user, reviews, comments });
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
module.exports = router;
function genToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };
  const options = { expiresIn: "7d" };
  const token = jwt.sign(payload, secrets.jwtSecret, options);
  return token;
}
