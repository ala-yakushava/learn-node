import { v4 as uuidv4 } from 'uuid';

export default class User {
  constructor(login, password, age, isDeleted = false) {
    this.id = uuidv4();
    this.login = login;
    this.password = password;
    this.age = age;
    this.isDeleted = isDeleted;
  }
}
