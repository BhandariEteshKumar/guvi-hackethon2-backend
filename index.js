import dotnev from "dotenv";
import express, { request, response } from "express";
import { MongoClient } from "mongodb";
import cors from "cors";
import {
  insertData,
  findById,
  update,
  getAllMovies,
  deleteMovies,
  updateById,
  createUser,
  getBookings,
  getAllUsers,
  getUserByName,
  getUserById,
  getMovieById,
  getTheaters,
  getTheatersById,
  updateTheater,
  deleteById,
  deleteTheater,
} from "./helper.js";
import jwt from "jsonwebtoken";

dotnev.config();
// creating the express server
const app = express();
app.use(cors());
app.options("*", cors());
//this method is initiated when we are on home page to retire some values

// getting the mongodb connection url through env file and storing it
const MONGO_URL = process.env.MONGO_URL;

//create a connection between app and mongodb
async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Mongo Connected");
  return client;
}
// we store the client variable to use the mongodb
export const client = await createConnection();

// we are giving a port number for the app to listen
app.listen(process.env.PORT, () => {
  console.log("Server started at PORT ", process.env.PORT);
});

app.get("/home", async (req, res) => {
  res.send(await getAllMovies());
});
app.get("/movies/customers", async (req, res) => {
  res.send(await getAllMovies());
});

app.get("/movies/totalbookings", async (req, res) => {
  res.send(await getBookings());
});

app.get("/movies/:id", async (req, res) => {
  res.send(await getMovieById(req.params.id));
});

app.get("/theaters", async (req, res) => {
  res.send(await getTheaters());
});
app.get("/movies/theaters/:id", async (req, res) => {
  res.send(await getTheatersById(req.params.id));
});

app.delete("/movies", async (req, res) => {
  res.send(await deleteMovies());
});

app.delete("/movies/:id", async (req, res) => {
  res.send(deleteById(req.params.id));
});

app.delete("/theater/:id/:name", async (req, res) => {
  const id = +req.params.id;
  res.send(await deleteTheater(id, req.params.name));
});
//using the express middleware for every request and converting the data to json
app.use(express.json());

app.post("/login", async (req, res) => {
  const data = await getAllUsers();
  const { name, password } = req.body;
  const user = await getUserByName(name);

  if (!user) {
    res.status(400).send({ messege: "Invalid credentials" });
    return;
  }
  if (password !== user.password) {
    res.status(400).send({ messege: "Invalid credentials" });
    return;
  }

  const token = jwt.sign({ id: user._id }, process.env.SECERT_KEY);
  res.send({ messege: "login successful", token: token });
});
//creating the hall
app.post("/movies/create", async (req, res) => {
  res.send(await insertData(req.body));
});
app.post("/create/:id", async (req, res) => {
  try {
    res.send(await updateById(req.body));
  } catch {
    res.send({ messege: "Not Updated" });
  }
});
app.post("/theaters/:id/:name", async (req, res) => {
  console.log(req.params.id);
  res.send(await updateTheater(req.params.id, req.params.name, req.body));
});
app.post("/signup", async (req, res) => {
  res.send(await createUser(req.body));
});
