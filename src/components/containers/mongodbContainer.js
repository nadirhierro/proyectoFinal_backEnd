export default class mongodbContainer {
  constructor(model) {
    this.model = model;
  }

  async getAll() {
    try {
      let all = await this.model.find({});
      return all;
    } catch (err) {
      console.log(err);
    }
  }

  async save(obj) {
    try {
      let objModel = new this.model(obj);
      let saveObj = await objModel.save();
      return saveObj;
    } catch (err) {
      console.log(err);
    }
  }

  async change(obj) {
    try {
      const res = await this.model.updateOne({ _id: obj.id }, obj);
      return res;
    } catch (err) {
      console.log(err);
    }
  }

  async getById(id) {
    try {
      let element = await this.model.find({ _id: id });
      return element[0];
    } catch (err) {
      console.log(err);
    }
  }

  async deleteById(id) {
    try {
      let deletedElement = await this.model.deleteOne({ _id: id });
      return deletedElement;
    } catch (err) {
      console.log(err);
    }
  }

  async deleteAll() {
    try {
      let deletedElement = await this.model.remove({});
      return deletedElement;
    } catch (err) {
      console.log(err);
    }
  }
}
