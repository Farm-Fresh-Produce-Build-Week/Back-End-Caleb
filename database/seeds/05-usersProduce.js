exports.seed = function(knex, Promise) {
  // Inserts seed entries
  return knex("users_produce").insert([
    { user_id: 1, produce_id: 1, farmer_id: 1, quantity: 10 },
    { user_id: 2, produce_id: 2, farmer_id: 2, quantity: 10 },
    { user_id: 3, produce_id: 3, farmer_id: 3, quantity: 10 },
    { user_id: 4, produce_id: 4, farmer_id: 4, quantity: 10 }
  ]);
};
