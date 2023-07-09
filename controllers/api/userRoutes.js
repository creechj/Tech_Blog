const router = require("express").Router();
const { User } = require("../../models");

// route for login button. checks entered username and password against database
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.body.username },
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Login information is incorrect. Please try again." });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Login information is incorrect. Please try again." });
      return;
    }

    // once valide login, session created
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "Login successful." });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// new user signup route. Ends any current sessions, creates new user, creates new session
router.put("/signup", async (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy();
  } else {
    try {
      const newUser = await User.create({
        username: req.body.username,
        password: req.body.password,
      });
      req.session.save(() => {
        req.session.user_id = newUser.id;
        req.session.logged_in = true;
      });
      res.redirect("/");
      // res.status(200).json({ message: "User created" });
    } catch (err) {
      res.status(400).json(err);
    }
  }
});

// route for logout button. ends current session
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
