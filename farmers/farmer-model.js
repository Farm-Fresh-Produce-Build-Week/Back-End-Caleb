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
function findReviewsById(id) {
  return db("reviews as r")
    .join("comments as c", "c.review_id", "r.id")
    .select(
      "c.review_id",
      "r.created_at as originalPostDate",
      "r.review",
      "r.user_id as reviewerId"
    )
    .where({ "r.farmer_id": id })
    .groupBy("r.id");
}
function findCommentsById(id) {
  return db("reviews as r")
    .join("comments as c", "c.review_id", "r.id")
    .select(
      "r.id as reviewId",
      "c.created_at as commentedDate",
      "c.comment",
      "c.user_id as commenterId"
    )
    .where({ "r.farmer_id": id })
    .orderBy("r.id");
}

// async function insert(user) {
function insert(user) {
  // const [id] = await db("farmers").insert(user);
  // return findById(id);
  return db("farmers").insert(user);
}

async function update(id, user) {
  await db("farmers")
    .where({ id })
    .first()
    .update(user);
  return findById(id);
}

function remove(id) {
  return findById(id).del();
}

module.exports = {
  find,
  findByName,
  findReviewsById,
  findCommentsById,
  findById,
  insert,
  update,
  remove
};
