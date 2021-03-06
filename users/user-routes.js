const express = require("express"),
  Users = require("./user-model"),
  bcrypt = require("bcryptjs"),
  jwt = require("jsonwebtoken"),
  secrets = require("../config/secrets.js"),
  restricted = require("../middleware/auth-middleware.js"),
  shoppingCart = require("./shoppingCart/routes.js");
router = express.Router();
router.get("/", restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res
        .status(500)
        .json({ errorMessage: "Unable to access users database!" });
    });
});
router.get("/names", (req, res) => {
  Users.findNames().then(users => {
    let userList=[];
    users.map(user=>userList.push(user.username));
    res.status(200).json({ users: userList });
  });
});
router.use("/:id/cart", restricted, shoppingCart);
router.post("/register", registerCheck, (req, res) => {
  const { username, password, profileImgURL, city, state, zipCode } = req.body;
  const user = { username, profileImgURL, city, state, zipCode };
  const hash = bcrypt.hashSync(password, 10);
  // console.log({ password, hash });
  user.password = hash;
  // console.log({ userPassword: user.password });
  Users.insert(user)
    .then(saved => {
      // console.log(saved);
      // console.log(saved[0]);
      Users.findByName(user.username)
        .then(newUser => {
          // console.log({ newUser });
          const token = genToken(newUser);
          // console.log({ token });
          res.status(200).json({
            newUser,
            token,
            message: `Welcome to the group ${newUser.username}`
          });
        })
        .catch(err => {
          res.status(500).json({
            errorMessage:
              "Unable to find new user by their username in the database!"
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
  Users.findByName(username)
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = genToken(user);
        const { id, username, city, state, zipCode, profileImgURL } = user;
        res.status(200).json({
          user: { id, username, city, state, zipCode, profileImgURL },
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
  console.log(req.decodedJwt);
  const { id } = req.params;
  Users.findById(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(201).json({ errorMessage: "That user does not exist!" });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ errorMessage: "Unable to access users database!" });
    });
});
router.put("/:id", restricted, roleCheck, idCheck, (req, res) => {
  const editUser = req.body;
  const id = req.params.id;
  if (editUser.password) {
    const hash = bcrypt.hashSync(editUser.password, 10);
    editUser.password = hash;
  }
  Users.update(id, editUser)
    .then(user => {
      res.status(200).json({
        message: `Successfully updated ${user.username} in the database`,
        user
      });
    })
    .catch(() => {
      res
        .status(500)
        .json({ errorMessage: "Unable to update user in the database!" });
    });
});
router.delete("/:id", restricted, roleCheck, idCheck, (req, res) => {
  const id = req.params.id;

  Users.remove(id)
    .then(user => {
      if (user) {
        res.status(201).json({
          message: `Successfully removed user #${id} from the database.`
        });
      } else {
        res.status(500).json({
          errorMessage:
            "That user can't be removed from the database because they cannot be found."
        });
      }
    })
    .catch(() => {
      res.status(500).json({
        errorMessage: "Unable to remove that user from the database."
      });
    });
});

module.exports = router;
function genToken(user) {
  const payload = {
    id: user.id,
    username: user.username,
    role: "user"
  };
  const options = { expiresIn: "7d" };
  const token = jwt.sign(payload, secrets.jwtSecret, options);
  return token;
}
function roleCheck(req, res, next) {
  const { role } = req.decodedJwt;
  if (role == "user") {
    next();
  } else {
    res.status(500).json({
      errorMessage:
        "You must be a User to access that information, no Farmer's allowed! Don't make me call the Vegans!"
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
        "You cannot update another User's information, mind your own business!"
    });
  }
}
function registerCheck(req, res, next) {
  const { username, password, city, state, zipCode } = req.body;
  if (username && password && city && state && zipCode) {
    next();
  } else if (!username) {
    res.status(500).json({
      errorMessage: "A username is required to register a new user"
    });
  } else if (!password) {
    res.status(500).json({
      errorMessage: "A password is required to register a new user"
    });
  } else if (!city) {
    res
      .status(500)
      .json({ errorMessage: "A city is required to register a new user" });
  } else if (!state) {
    res
      .status(500)
      .json({ errorMessage: "A state is required to register a new user" });
  } else if (!zipCode) {
    res
      .status(500)
      .json({ errorMessage: "A zipCode is required to register a new user" });
  }
}
