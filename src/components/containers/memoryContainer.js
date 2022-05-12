import moment from "moment";

export default class memoryContainer {
  constructor() {
    this.container = [];
  }

  getAll() {
    return this.container;
  }

  save(obj) {
    let id = 1;
    if (this.container.length > 0) {
      let ids = this.container.map((item) => item._id);
      id = Math.max.apply(null, ids) + 1;
    }
    let newObject = {
      _id: id,
      timestamp: moment().format("DD/MM/YYYY HH:MM:SS"),
      ...obj,
    };
    this.container.push(newObject);
    return id;
  }

  change(obj) {
    let objInContainer = this.container.find(
      (element) => element._id == obj._id
    );
    if (objInContainer) {
      let newObject = {
        timestamp: moment().format("DD/MM/YYYY HH:MM:SS"),
        ...obj,
      };
      this.container.splice(
        this.container.indexOf(objInContainer),
        1,
        newObject
      );
      return true;
    } else {
      return false;
    }
  }

  getById(id) {
    let element = this.container.find((obj) => obj._id == id);
    return element;
  }

  deleteById(id) {
    let obj = this.getById(id);
    if (obj) {
      this.container.splice(this.container.indexOf(obj), 1);
      return true;
    } else {
      return false;
    }
  }

  deleteAll() {
    this.container = [];
  }
}
