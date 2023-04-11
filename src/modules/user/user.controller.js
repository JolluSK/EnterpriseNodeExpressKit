const userService = require('./user.service');

const createUser = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({
                message: 'User not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const user = await userService.updateUser(req.params.id, req.body);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({
                message: 'User not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        await userService.deleteUser(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    createUser,
    getUserById,
    updateUser,
    deleteUser
};