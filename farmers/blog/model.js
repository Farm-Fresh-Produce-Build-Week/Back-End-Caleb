const db = require("../../database/db-config");

function findByFarmer(id) {
  return db("blogs as b")
    .where({ 'b.farmer_id': id })
    .orderBy("b.created_at");
}
function findById(blogId) {
  return db("blogs")
   .where({id:blogId })
    .first();
}

// async function insert(user) {
function insert(blog) {
  // const [id] = await db("farmers").insert(user);
  // return findById(id);
  // console.log({ message: "insert function started", item });
  return db("blogs").insert(blog);
}

// function update(plu, item) {
async function update(blogId, blog) {
  // console.log({ message: "update function started", plu, item });
  await db("blogs")
    .where({ id: blogId })
    .first()
    .update(blog);
  return findById(blogId);
  // return db("farmers_produce")
}

function remove(blogId) {
  return findById(blogId).del();
}

module.exports = {
  findByFarmer,
  findById,
  insert,
  update,
  remove
};
