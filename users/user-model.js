const db = require("../database/db-config");

function find() {
  return db("users").select(
    "id",
    "username",
    "city",
    "state",
    "zipCode",
    "profileImgURL"
  );
}

function findByName(filter) {
  return db("users")
    .where({ username: filter })
    .first();
}

function findById(id) {
  return db("users")
    .where({ id })
    .first()
    .select("id", "username", "city", "state", "zipCode", "profileImgURL");
}

async function insert(user) {
  const [id] = await db("users").insert(user);
  return findById(id);
}

async function update(id, user) {
  await db("users")
    .where({ id })
    .first()
    .update(user);
  return findById(id);
}

function remove(id) {
  return findById(id).del();
}

module.exports = { find, findByName, findById, insert, update, remove };
