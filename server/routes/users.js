var express = require('express');
var router = express.Router();

// GET users listing.
router.get('/users', function (req, res, next) {
  const users = [];

  for (let i = 0; i < 10; i++) {
    users.push({
      id: i + 1,
      name: `user_${i + 1}`
    })
  }

  res.send(users);
});

// Get user.
router.get('/users/:userId', function (req, res, next) {
  const user = {
    id: req.params.userId,
    name: `user_${req.params.userId}`
  }

  res.send(user);
});


module.exports = router;
