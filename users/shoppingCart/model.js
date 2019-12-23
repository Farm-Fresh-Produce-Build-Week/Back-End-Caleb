const db = require("../../database/db-config");

function findByUser(id) {
  return db("users_produce")
    .where({ user_id: id })
    .orderBy("SKU");
}

function findBySKU(id, sku) {
  return db("users_produce")
    .where({ SKU: sku, user_id: id })
    .first();
}
// async function insert(user) {
function insert(item) {
  // const [id] = await db("farmers").insert(user);
  // return findById(id);
  // console.log({ message: "insert function started", item });
  return db("users_produce").insert(item);
}

// function update(plu, item) {
async function update(id, sku, item) {
  // console.log({ message: "update function started", plu, item });
  await db("users_produce")
    .where({ SKU: sku, user_id: id })
    .first()
    .update(item);
  return findBySKU(id, sku);
  // return db("users_produce")
}

function remove(id, sku) {
  return findBySKU(id, sku).del();
}

module.exports = {
  findByUser,
  findBySKU,
  insert,
  update,
  remove
};
