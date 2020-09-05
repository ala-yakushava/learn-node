import { validator, userSchema } from '../utils/validator';
import { checkHealth, userController } from '../controllers';

export const setupRoutes = (server) => {
  server.get('/', checkHealth);

  server.get('/users/:id', userController.getUser);

  server.get('/users', userController.getUsers);

  server.post('/users', validator.body(userSchema), userController.createUser);

  server.patch('/users/:id', validator.body(userSchema), userController.updateUser);

  server.delete('/users/:id', userController.deleteUser);
};
