import express from 'express';

import { validator, userSchema, groupSchema } from '../utils/validator';
import { checkHealth, userController, groupController } from '../controllers';

const router = express.Router();

router
  .get('/', checkHealth);

router
  .get('/users/:id', userController.getUser)
  .get('/users', userController.getUsers)
  .post('/users', validator.body(userSchema), userController.createUser)
  .patch('/users/:id', validator.body(userSchema), userController.updateUser)
  .delete('/users/:id', userController.deleteUser);

router
  .get('/groups/:id', groupController.getGroup)
  .get('/groups', groupController.getGroups)
  .post('/groups/add-users', groupController.addUsersToGroup)
  .post('/groups', validator.body(groupSchema), groupController.createGroup)
  .patch('/groups/:id', validator.body(groupSchema), groupController.updateGroup)
  .delete('/groups/:id', groupController.deleteGroup);

export default router;
