import { ObjectId } from "bson";
import { client } from "./index.js";

export async function deleteMovies() {
  return await client.db("b29wd").collection("movies").deleteMany();
}

export async function insertData(data) {
  return await client.db("b29wd").collection("movies").insertMany(data);
}
export async function updateById(seats) {
  return await client.db("b29wd").collection("theaters").insertOne(seats);
}

export async function findById(RoomID) {
  return await client.db("b29wd").collection("halls").findOne({ id: RoomID });
}

export async function update(RoomID, data) {
  return await client
    .db("b29wd")
    .collection("movies")
    .updateOne({ id: RoomID }, { $set: { Booking: data } });
}

export async function getAllMovies() {
  return await client.db("b29wd").collection("movies").find().toArray();
}

export async function getTheaters() {
  return await client.db("b29wd").collection("theaters").find().toArray();
}

export async function createUser(data) {
  return await client.db("b29wd").collection("musers").insertOne(data);
}

export async function getAllUsers(data) {
  return await client.db("b29wd").collection("musers").find().toArray();
}

export async function getBookings() {
  return await client
    .db("b29wd")
    .collection("musers")
    .find({ booking: { $exists: true } })
    .project({ _id: 0, booking: 1 })
    .toArray();
}

export async function getUserByName(name) {
  return await client.db("b29wd").collection("musers").findOne({ name: name });
}

export async function getUserById(id) {
  return await client.db("b29wd").collection("musers").findOne({ id: id });
}

export async function getMovieById(id) {
  return await client.db("b29wd").collection("movies").findOne({ id: id });
}

export async function getTheatersById(id) {
  return await client.db("b29wd").collection("theaters").findOne({ id: id });
}

export async function updateTheater(id, name, seats) {
  return await client
    .db("b29wd")
    .collection("theaters")
    .updateOne({ name: name, movieId: +id }, { $set: { booked: seats } });
}

export async function deleteById(id) {
  return await client.db("b29wd").collection("movies").deleteOne({ id: id });
}

export async function deleteTheater(id, name) {
  return await client
    .db("b29wd")
    .collection("theaters")
    .deleteOne({ movieId: id, name: name });
}
