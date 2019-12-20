exports.seed = function(knex, Promise) {
  // Inserts seed entries
  return knex("users_produce").insert([
    { user_id: 1, SKU: 101, quantity: 10 },
    { user_id: 2, SKU: 102, quantity: 10 },
    { user_id: 3, SKU: 103, quantity: 10 },
    { user_id: 4, SKU: 104, quantity: 10 }
  ]);
};
