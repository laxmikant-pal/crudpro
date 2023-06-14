import User from '../models/userModel';

const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
    try {
      const { userId } = req.params;
      const { name, email, password } = req.body;
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { name, email, password },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(updatedUser);
    } catch (err) {
      next(err);
    }
  };
  
  const deleteUser = async (req, res, next) => {
    try {
      const { userId } = req.params;
      const deletedUser = await User.findByIdAndDelete(userId);
      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  };
  
  const getAllUsers = async (req, res, next) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      next(err);
    }
  };
  export { createUser, getUserById, updateUser, deleteUser, getAllUsers };
