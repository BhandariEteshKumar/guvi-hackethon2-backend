import dotnev from "dotenv";
import express, { request, response } from "express";
import { MongoClient } from "mongodb";
import { checkBooking } from "./checkBooking.js";
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
} from "./helper.js";

dotnev.config();
// creating the express server
const app = express();
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

app.get("/", async (req, res) => {
  res.send(await getAllMovies());
});
app.get("/halls/customers", async (req, res) => {
  res.send(await getAllMovies());
});

app.get("/movies/totalbookings", async (req, res) => {
  res.send(await getBookings());
});
//using the express middleware for every request and converting the data to json
app.use(express.json());
app.use(cors());

//creating the hall
app.post("/movies/create", async (req, res) => {
  res.send(await insertData(req.body));
});
app.post("/movies/create/:id", async (req, res) => {
  res.send(await updateById(req.id, req.body));
});
app.post("/signup", async (req, res) => {
  res.send(await createUser(req.body));
});

app.delete("/halls", async (req, res) => {
  res.send(await deleteMovies());
});

app.post("/halls/bookroom", async (req, res) => {
  const { RoomID, date, StartTime, EndTime } = req.body;
  var start = new Date(date + " " + StartTime);
  var end = new Date(date + " " + EndTime);
  const data = await findById(RoomID);
  if (data.Booking) {
    let arr = data.Booking,
      flag = true;
    flag = checkBooking(arr, start, end, flag);
    if (flag === false) {
      res.send({ messege: "Already booked in the specificed time" });
      return;
    }
  }
  res.send(await update(RoomID, req.body));
});
