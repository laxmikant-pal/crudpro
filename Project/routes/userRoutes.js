import express from 'express';
import { createUser, getUserById } from './controllers/userController';

const router = express.Router();

router.post('/', createUser);
router.get('/:userId', getUserById);
router.put('/:userId', updateUser);
router.delete('/:userId', deleteUser);
router.get('/', getAllUsers);

export default router;
