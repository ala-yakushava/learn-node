import { groupController } from '../src/controllers';
import { groupService } from '../src/controllers/setup';
import { group, otherGroup, groups, id, ids } from './mock-data';

jest.mock('../src/controllers/setup');

describe('Tests for groupController', () => {
  let res;

  beforeEach(() => {
    res = {
      status: jest.fn(),
      send: jest.fn()
    };
  });

  test('should find group by id', async () => {
    const req = {
      params: { id }
    };
    groupService.findById.mockImplementationOnce(() => Promise.resolve(group));
    await groupController.getGroup(req, res);

    expect(groupService.findById).toHaveBeenCalledWith(id);
    expect(res.send).toHaveBeenCalledWith(group);
  });

  test('should find all groups', async () => {
    const req = {};
    groupService.findAll.mockImplementationOnce(() => Promise.resolve(groups));
    await groupController.getGroups(req, res);

    expect(groupService.findAll).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledWith(groups);
  });

  test('should create group', async () => {
    const { name, permission } = group;
    const req = {
      body: { name, permission }
    };
    groupService.create.mockImplementationOnce(() => Promise.resolve(group));
    await groupController.createGroup(req, res);

    expect(groupService.create).toHaveBeenCalledWith({ name, permission });
    expect(res.send).toHaveBeenCalledWith(group);
  });

  test('should update group by id', async () => {
    const { name, permission } = otherGroup;
    const req = {
      params: { id },
      body: { name, permission }
    };
    groupService.updateById.mockImplementationOnce(() => Promise.resolve(true));
    await groupController.updateGroup(req, res);

    expect(groupService.updateById).toHaveBeenCalledWith(id, { name, permission });
    expect(res.send).toHaveBeenCalledWith(`group ${id} is updated`);
  });

  test('should delete group by id', async () => {
    const req = {
      params: { id }
    };
    groupService.removeById.mockImplementationOnce(() => Promise.resolve(true));
    await groupController.deleteGroup(req, res);

    expect(groupService.removeById).toHaveBeenCalledWith(id);
    expect(res.send).toHaveBeenCalledWith(`group ${id} is deleted`);
  });

  test('should users added to group', async () => {
    const req = {
      body: { groupId: id, userIds: ids }
    };
    groupService.addUsersToGroup.mockImplementationOnce(() => Promise.resolve(true));
    await groupController.addUsersToGroup(req, res);

    expect(groupService.addUsersToGroup).toHaveBeenCalledWith(id, ids);
    expect(res.send).toHaveBeenCalledWith(`users ${ids} are added to group ${id}`);
  });
});
