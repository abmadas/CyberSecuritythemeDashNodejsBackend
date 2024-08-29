import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationerror.js";

class UserRepository {
  constructor() {
    this.collection = "Signindata";
  }

  async signup(newUser) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      await collection.insertOne(newUser);
      console.log(newUser);
      return newUser;
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong", 500);
    }
  }

  async findByemail(email) {
    try {
      //1. GEt the database
      const db = getDB();
      //2. Get the collection
      const collection = db.collection(this.collection);

      //3. find The document;
      return await collection.findOne({ email });
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong", 500);
    }
  }
}

export default UserRepository;