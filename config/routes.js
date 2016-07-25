var express = require('express');
var router  = express.Router();

var usersController = require('../controllers/usersController');
var topicsController = require('../controllers/videosController');
var authenticationsController = require('../controllers/authenticationsController');

router.post('/login', authenticationsController.login);
router.post('/register', authenticationsController.register);

router.route('/')
  .get(usersController.usersIndex);

router.route('/users')
  .get(usersController.usersIndex);

router.route('/users/:id')
  .get(usersController.usersShow)
  .patch(usersController.usersUpdate)
  .delete(usersController.usersDelete);

// router.route('/videos')
//   .get(videosController.topicsIndex)
//   .post(videosController.topicCreate);

// router.route('/videos/:id')
//   .get(videosController.topicsShow)
//   .patch(videosController.topicsUpdate);
  
// router.route('/users/:id/topics')
//   .get(topicsController.topicsIndex)
//   .post(topicsController.topicCreate);

module.exports = router;
