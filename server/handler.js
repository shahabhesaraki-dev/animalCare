const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const bcrypt = require("bcrypt");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const addUser = async (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("animalCare");

    const checkEmail = await db.collection("users").findOne({ email: email });

    if (!checkEmail) {
      const result = await db
        .collection("users")
        .insertOne({ firstName, lastName, email, password: hashedPassword });

      client.close();

      res.status(200).json({
        status: 200,
        id: result.insertedId,
        message: `User successfully added!`,
      });
    } else {
      res.status(409).json({
        status: 409,
        message: "This email address already exixsts!",
      });
    }
  } catch (err) {
    console.log("Error: ", err);
  }
};

const signIn = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("animalCare");
    const result = await db.collection("users").findOne({ email: email });

    if (result) {
      const match = await bcrypt.compare(password, result.password);
      if (match) {
        res.status(200).json({
          status: 200,
          id: result._id,
        });
      } else {
        res.status(404).json({
          status: 404,
          message: "Password is incorrect!",
        });
      }
    } else {
      res.status(404).json({
        status: 404,
        message: "We cannot find an account with that e-mail address!",
      });
    }
  } catch (err) {
    console.log("Error: ", err);
  }
};

const getUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { id } = req.params;

  try {
    await client.connect();
    const db = client.db("animalCare");
    const result = await db.collection("users").findOne({ _id: ObjectId(id) });
    if (result) {
      res.status(200).json({
        status: 200,
        message: "User found!",
        data: result,
      });
    }
  } catch (err) {
    console.log("Error :", err);
  }
};

module.exports = { addUser, signIn, getUser };
