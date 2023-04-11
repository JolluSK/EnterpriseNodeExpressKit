const User = require('./user.model');

const createUser = async (userData) => {
    const user = new User(userData);
    await user.save();
    return user;
};

const getUserById = async (id) => {
    return await User.findById(id);
};

const updateUser = async (id, updateData) => {
    return await User.findByIdAndUpdate(id, updateData, {
        new: true
    });
};

const deleteUser = async (id) => {
    return await User.findByIdAndRemove(id);
};

module.exports = {
    createUser,
    getUserById,
    updateUser,
    deleteUser
};