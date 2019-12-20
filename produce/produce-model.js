const db = require("../database/db-config");

function find() {
  return db("produce");
}

function findBy(filter) {
  return db("produce")
    .where(filter)
    .first();
}
function findByName(filter) {
  console.log(`Find by name triggered with name:${filter}`);
  return db("produce")
    .where({ name: filter })
    .first();
}

function findById(id) {
  return db("produce")
    .where({ id })
    .first();
}
// function findVendors(id) {
//   return db("users_produce as u_p")
//     .join("users as u", "u.id", "u_p.user_id")
//     .select("u.username", "u.city", "u.state", "u.zipCode")
//     .join("p as produce", "p.id", "u_p.produce_id")
//     .select("p.name", "p.description")
//     .where("u_p.produce_id", id)
//     .where("u.farmer", 1);
// }

// async function insert(item) {
function insert(item) {
  console.log("insert function triggered");
  // const [id] = await db("produce").insert(item);
  // return findById(id);
  return db("produce").insert(item);
}

async function update(id, item) {
  await db("produce")
    .where({ id })
    .first()
    .update(item);
  return findById(id);
}

function remove(id) {
  return findById(id).del();
}

module.exports = { find, findBy, findByName, findById, insert, update, remove };
