exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("farmers_produce")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("farmers_produce").insert([
        { farmer_id: 1, produce_id: 1, quantity: 10, price: 5 },
        { farmer_id: 2, produce_id: 2, quantity: 10, price: 5 },
        { farmer_id: 3, produce_id: 3, quantity: 10, price: 5 },
        { farmer_id: 4, produce_id: 4, quantity: 10, price: 5 }
      ]);
    });
};
