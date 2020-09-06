import { validator, userSchema, groupSchema } from '../utils/validator';
import { checkHealth, userController, groupController } from '../controllers';

export const setupRoutes = (server) => {
  server.get('/', checkHealth);

  server.get('/users/:id', userController.getUser);

  server.get('/users', userController.getUsers);

  server.post('/users', validator.body(userSchema), userController.createUser);

  server.patch('/users/:id', validator.body(userSchema), userController.updateUser);

  server.delete('/users/:id', userController.deleteUser);

  server.get('/groups/:id', groupController.getGroup);

  server.get('/groups', groupController.getGroups);

  server.post('/groups/:id', groupController.addUsersToGroup);

  server.post('/groups', validator.body(groupSchema), groupController.createGroup);

  server.patch('/groups/:id', validator.body(groupSchema), groupController.updateGroup);

  server.delete('/groups/:id', groupController.deleteGroup);
};
