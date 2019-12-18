exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("users_produce")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("users_produce").insert([
        { user_id: 1, produce_id: 1, quantity: 10, price: 5 },
        { user_id: 2, produce_id: 2, quantity: 10, price: 5 },
        { user_id: 3, produce_id: 3, quantity: 10, price: 5 },
        { user_id: 4, produce_id: 4, quantity: 10, price: 5 }
      ]);
    });
};
