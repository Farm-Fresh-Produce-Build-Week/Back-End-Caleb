const express = require("express"),
  Blog = require("./model.js"),
  restricted = require("../../middleware/auth-middleware.js"),
  router = express.Router({ mergeParams: true });
router.get("/", (req, res) => {
  Blog.findByFarmer(req.params.id)
    .then(blogs => {
      res.status(200).json(blogs);
    })
    .catch(err => {
      res
        .status(500)
        .json({ errorMessage: "Unable to access blogs from database!" });
    });
});
router.post("/", restricted, roleCheck, idCheck, (req, res) => {
  const newBlog = req.body;
  newBlog.farmer_id = req.params.id;
  Blog.insert(newBlog)
    .then(saved => {
      if (saved) {
        Blog.findByFarmer(req.params.id, )
          .then(blogs => {
            res.status(200).json(blogs);
          })
          .catch(err => {
            res.status(500).json({
              errorMessage: "Unable to get blogs in the database!"
            });
          });
      } else {
        res.status(500).json({
          errorMessage: "Blog was not added to inventory."
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        // err,
        errorMessage:
          "Unable to add blog to inventory!"
      });
    });
});

router.get("/:blogId", (req, res) => {
  const { id, blogId } = req.params;
  Blog.findById(blogId)
    .then(blog => {
      if (blog) {
        res.status(200).json(blog);
      } else {
        res.status(201).json({ errorMessage: "That blog does not exist!" });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ errorMessage: "Unable to access farmer blog!" });
    });
});
router.put("/:blogId", restricted, roleCheck, idCheck, (req, res) => {
  const editBlog = req.body;
  const blogId = req.params.blogId;
  Blog.update(blogId, editBlog)
    .then(blog => {
      console.log({ message: "Return from update", blog });
      res.status(200).json({
        message: `Successfully updated ${blog.id} in the database`,
        blog
      });
    })
    .catch(() => {
      res.status(500).json({
        errorMessage: "Unable to update blog in the farmer's inventory!"
      });
    });
});
router.delete("/:blogId", restricted, roleCheck, idCheck, (req, res) => {
  const { id, blogId } = req.params;

  Blog.remove(blogId)
    .then(blog => {
      if (blog) {
        res.status(201).json({
          message: `Successfully removed blog #${blogId} from the farmer's blog.`
        });
      } else {
        res.status(500).json({
          errorMessage:
            "That blog can't be removed from the farmer's blog because it cannot be found."
        });
      }
    })
    .catch(() => {
      res.status(500).json({
        errorMessage: "Unable to remove that blog from the farmer's blog."
      });
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
        "You cannot update another Farmer's Blog, mind your own business!"
    });
  }
}
