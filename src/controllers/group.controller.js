import { GroupService } from '../services';
import { GroupRepository } from '../data-access';

const groupRepository = new GroupRepository();
const groupService = new GroupService(groupRepository);

export const groupController = {
  getGroup: async (req, res) => {
    const { id } = req.params;
    const group = await groupService.findById(id);
    return res.send(group);
  },

  getGroups: async (req, res) => {
    const groups = await groupService.findAll();
    res.send(groups);
  },

  createGroup: async (req, res) => {
    const { name, permission } = req.body;
    const group = await groupService.create({ name, permission });
    res.status(201).send(group);
  },

  updateGroup: async (req, res) => {
    const { id } = req.params;
    const { name, permission } = req.body;
    await groupService.update(id, { name, permission });
    res.send(`group ${id} is updated`);
  },

  deleteGroup: async (req, res) => {
    const { id } = req.params;
    await groupService.removeById(id);
    res.send(`group ${id} is deleted`);
  },

  addUsersToGroup: async (req, res) => {
    const { id } = req.params;
    const { userIds } = req.query;
    await groupService.addUsersToGroup(id, userIds);
    res.send(`users ${userIds} are added in ${id}`);
  }
};
