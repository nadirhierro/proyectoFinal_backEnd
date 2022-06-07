import { userDatabase } from "../components/containers/daos/index.js";
import mailService from "../../../services/mailer.js";

export default class userService {
  constructor() {
    this.users = new userDatabase();
    this.mailService = new mailService();
  }

  async getUser(username) {
    let userArray = await this.users.getUser(username);
    return userArray[0];
  }

  async newUser(userData) {
    let newUser = await this.users.save(userData);
    await this.mailService.newUser(newUser);
    return newUser;
  }
}
