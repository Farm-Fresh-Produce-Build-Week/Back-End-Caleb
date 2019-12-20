exports.seed = function(knex, Promise) {
  // Inserts seed entries
  return knex("farmers_produce").insert([
    {
      farmer_id: 1,
      PLU: 1,
      increment: "lb",
      SKU: 100,
      quantity: 30,
      price: 5
    },
    {
      farmer_id: 1,
      PLU: 4,
      increment: "dozen",
      SKU: 101,
      quantity: 30,
      price: 20
    },
    {
      farmer_id: 2,
      PLU: 2,
      increment: "bushel",
      SKU: 102,
      quantity: 30,
      price: 10
    },
    {
      farmer_id: 2,
      PLU: 3,
      increment: "oz",
      SKU: 103,
      quantity: 30,
      price: 15
    },
    {
      farmer_id: 3,
      PLU: 2,
      increment: "each",
      SKU: 104,
      quantity: 30,
      price: 10
    },
    {
      farmer_id: 3,
      PLU: 3,
      increment: "handful",
      SKU: 105,
      quantity: 30,
      price: 15
    },
    {
      farmer_id: 4,
      PLU: 1,
      increment: "lb",
      SKU: 106,
      quantity: 30,
      price: 5
    },
    {
      farmer_id: 4,
      PLU: 4,
      increment: "sack",
      SKU: 107,
      quantity: 30,
      price: 20
    }
  ]);
};
