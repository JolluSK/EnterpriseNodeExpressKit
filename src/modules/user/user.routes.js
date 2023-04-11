const express = require('express');
const router = express.Router();
const {
    createUser,
    getUserById,
    updateUser,
    deleteUser
} = require('./user.controller');
const {
    validateUser
} = require('../common/validators/user.validator');
const {
    authMiddleware
} = require('../common/middlewares/auth.middleware');


router.post('/', validateUser('createUser'), authMiddleware, createUser);
router.get('/:id', getUserById);
router.patch('/:id', validateUser('updateUser'), authMiddleware, updateUser);
router.delete('/:id', deleteUser);

module.exports = router;