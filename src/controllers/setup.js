import { UserService } from '../services';
import { UserRepository } from '../data-access';
import { GroupService } from '../services';
import { GroupRepository } from '../data-access';

const userRepository = new UserRepository();
export const userService = new UserService(userRepository);

const groupRepository = new GroupRepository();
export const groupService = new GroupService(groupRepository);
