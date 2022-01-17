import { client } from "./index.js";

export async function deleteMovies() {
  return await client.db("b29wd").collection("movies").deleteMany();
}

export async function insertData(data) {
  return await client.db("b29wd").collection("movies").insertMany(data);
}
export async function updateById(id, data) {
  return await client
    .db("b29wd")
    .collection("movies")
    .updateOne({ id: id }, { $set: { booked: data } });
}

export async function findById(RoomID) {
  return await client.db("b29wd").collection("halls").findOne({ id: RoomID });
}

export async function update(RoomID, data) {
  return await client
    .db("b29wd")
    .collection("halls")
    .updateOne({ id: RoomID }, { $push: { Booking: data } });
}

export async function getAllMovies() {
  return await client.db("b29wd").collection("halls").find().toArray();
}

export async function createUser(data) {
  return await client.db("b29wd").collection("musers").insertOne(data);
}

export async function getBookings() {
  return await client
    .db("b29wd")
    .collection("musers")
    .find({ booking: { $exists: true } })
    .project({ _id: 0, booking: 1 })
    .toArray();
}
