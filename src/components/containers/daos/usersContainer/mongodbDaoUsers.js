import mongodbContainer from "../../mongodbContainer.js";
import { userModel } from "../../../../models/index.js";

export default class mongodbDaoUsers extends mongodbContainer {
  constructor(model) {
    super(model);
    this.model = userModel;
  }

  async getUser(email) {
    try {
      let user = await this.model.find({ email: email });
      return user;
    } catch (err) {
      console.log(err);
    }
  }
}
