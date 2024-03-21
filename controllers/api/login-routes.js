const router = require("express").Router();
const { User, Like } = require("../../models");

// sign up route working, TESTED
router.post("/signup", async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    const newUser = dbUserData.get({ plain: true });
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user_id = newUser.id;
      res.status(200).json(newUser);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login route working, TESTED
router.post("/login", async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user_id = dbUserData.id;
      console.log(
        "🚀 ~ file: user-routes.js ~ line 57 ~ req.session.save ~ req.session.cookie",
        req.session.cookie
      );

      res
        .status(200)
        .json({ user: dbUserData, message: "You are now logged in!" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// This is route that will be use to add like to post from homepage

router.post("/", async (req, res) => {
  try {
    if (req.session.loggedIn) {
      const newLike = await Like.create({
        user_id: req.session.user_id,
        resource_id: req.body.id,
      });

      const like = newLike.get({ plain: true });
      res.status(200).json(like);
    }
  } catch (err) {
    const ErrorMessage = err.parent.sqlMessage;
    if (
      ErrorMessage ===
      "Duplicate entry '3-5' for key 'like.like_user_id_resource_id'"
    ) {
      res.status(409).json("You already liked this resource");
    } else {
      res.status(500).json(err);
    }
  }
});

module.exports = router;
