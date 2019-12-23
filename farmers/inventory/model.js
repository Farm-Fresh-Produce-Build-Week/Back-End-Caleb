const db = require("../../database/db-config");

function find() {
  return db("farmers_produce");
}
function findByFarmer(id) {
  return db("farmers_produce")
    .where({ farmer_id: id })
    .orderBy("SKU");
}
function findByPLU(id, plu) {
  return db("farmers_produce")
    .where({ PLU: plu, farmer_id: id })
    .first();
}
function findBySKU(id, sku) {
  return db("farmers_produce")
    .where({ farmer_id: id, SKU: sku })
    .first();
}
// async function insert(user) {
function insert(item) {
  // const [id] = await db("farmers").insert(user);
  // return findById(id);
  // console.log({ message: "insert function started", item });
  return db("farmers_produce").insert(item);
}

// function update(plu, item) {
async function update(id, sku, item) {
  // console.log({ message: "update function started", plu, item });
  await db("farmers_produce")
    .where({ SKU: sku, farmer_id: id })
    .first()
    .update(item);
  return findBySKU(id, sku);
  // return db("farmers_produce")
}

function remove(id, sku) {
  return findBySKU(id, sku).del();
}

module.exports = {
  find,
  findByFarmer,
  findBySKU,
  findByPLU,
  insert,
  update,
  remove
};
