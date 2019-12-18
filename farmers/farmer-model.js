const db = require("../database/db-config");

function find() {
  return db("farmers").select(
    "id",
    "username",
    "city",
    "state",
    "zipCode",
    "profileImgURL"
  );
}

function findByName(filter) {
  return db("farmers")
    .where({ username: filter })
    .first();
}

function findById(id) {
  return db("farmers")
    .where({ id })
    .first()
    .select("id", "username", "city", "state", "zipCode", "profileImgURL");
}

async function insert(user) {
  const [id] = await db("farmers").insert(user);
  return findById(id);
}

function update(id, user) {
  return db("farmers")
    .where({ id })
    .first()
    .update(user);
}

function remove(id) {
  return findById(id).del();
}

module.exports = { find, findByName, findById, insert, update, remove };
