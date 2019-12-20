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
  console.log(`Attempting to findByName of: ${filter}`);
  return db("users")
    .where({ username: filter })
    .first();
}

function findById(id) {
  // console.log(`Made it to the findById stage for ${id}`);
  return db("users")
    .where({ id: id })
    .first()
    .select("id", "username", "city", "state", "zipCode", "profileImgURL");
}

// async function insert(user) {
function insert(user) {
  console.log(user);
  // const [id] = await db("users").insert(user);
  // return findById(id);
  return db("users").insert(user);
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
