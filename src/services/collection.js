import firebase from "../firebase";

const db = firebase.collection("/team");

class CollectionDataService {
  getAll() {
    return db;
  }

  create(teammember) {
    return db.add(teammember);
  }

  update(id, value) {
    return db.doc(id).update(value);
  }

  delete(id) {
    return db.doc(id).delete();
  }
}

export default new CollectionDataService();