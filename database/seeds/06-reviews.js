exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("reviews")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("reviews").insert([
        { user_id: 1, farmer_id: 1, review: "This guy is a great farmer!" },
        { user_id: 2, farmer_id: 1, review: "This guy is a bad farmer!" },
        { user_id: 3, farmer_id: 1, review: "This guy is an okay farmer!" },
        { user_id: 4, farmer_id: 1, review: "This guy is a great farmer!" },
        { user_id: 1, farmer_id: 2, review: "This dog is a bad farmer!" },
        { user_id: 2, farmer_id: 2, review: "This dog is an okay farmer!" },
        { user_id: 3, farmer_id: 2, review: "This dog is a great farmer!" },
        { user_id: 4, farmer_id: 2, review: "This dog is a bad farmer!" },
        { user_id: 1, farmer_id: 3, review: "This lady is an okay farmer!" },
        { user_id: 2, farmer_id: 3, review: "This lady is a great farmer!" },
        { user_id: 3, farmer_id: 3, review: "This lady is a bad farmer!" },
        { user_id: 4, farmer_id: 3, review: "This lady is an okay farmer!" },
        { user_id: 1, farmer_id: 4, review: "This snake is a great farmer!" },
        { user_id: 2, farmer_id: 4, review: "This snake is a bad farmer!" },
        { user_id: 3, farmer_id: 4, review: "This snake is an okay farmer!" },
        { user_id: 4, farmer_id: 4, review: "This snake is a cool farmer!" }
      ]);
    });
};
