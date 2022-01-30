const express = require('express');
const { logout } = require('../controllers/UserController');
const router = express.Router();
const UserController = require('../controllers/UserController');
const {authentication} = require('../middleware/authentication');

router.post('/',UserController.create);
router.get('/', authentication, UserController.getAll);
router.put('/login',UserController.login);
router.delete('/:id/id',authentication, UserController.delete);
router.get('/getcurrentuser/:id',authentication, UserController.getUserLogged);
router.get('/confirm/emailtoken',UserController.confirm);
router.delete('/logout', authentication.UserController.logout);


module.exports = router; 