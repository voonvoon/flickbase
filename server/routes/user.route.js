const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();

//Middleware
const auth = require('../middleware/auth');

// bla.com/api/users/profile
router.route('/profile')
.get(auth('readOwn','profile'),userController.profile)
.patch(auth('updateOwn','profile'),userController.updateProfile)

router.patch('/email',auth('updateOwn','profile'),userController.updateUserEmail)
router.get('/verify', userController.verifyAccount)


module.exports = router;