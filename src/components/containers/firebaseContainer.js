import db from "../../utils/firebase/index.js";

export default class firebaseContainer {
  constructor(collectionName) {
    this.collectionName = collectionName;
  }

  async getAll() {
    try {
      let q = db.collection(this.collectionName);
      let array = [];
      let querySnapshot = await q.get();
      let res = querySnapshot.docs;
      res.forEach((element) => {
        array.push({ _id: element.id, ...element.data() });
      });
      return array;
    } catch (err) {
      console.log(err);
    }
  }

  async save(obj) {
    try {
      let q = db.collection(this.collectionName);
      let saveObj = await q.doc().set(obj);
      return saveObj;
    } catch (err) {
      console.log(err);
    }
  }

  async change(obj) {
    try {
      let objWithoutId = obj;
      let q = db.collection(this.collectionName);
      let doc = q.doc(`${obj.id}`);
      delete objWithoutId.id;
      let item = await doc.update(objWithoutId);
      return item.id;
    } catch (err) {
      console.log(err);
    }
  }

  async getById(id) {
    try {
      let q = db.collection(this.collectionName);
      let doc = q.doc(`${id}`);
      let item = await doc.get();
      let response = item.data();
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  async deleteById(id) {
    try {
      let q = db.collection(this.collectionName);
      let doc = q.doc(`${id}`);
      let item = await doc.delete();
      return item;
    } catch (err) {
      console.log(err);
    }
  }

  async deleteAll() {
    try {
      let allDocs = await this.getAll();
      allDocs.forEach((doc) => {
        this.deleteById(doc.id);
      });
    } catch (err) {
      console.log(err);
    }
  }
}
