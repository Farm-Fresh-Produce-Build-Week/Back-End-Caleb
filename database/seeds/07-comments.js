exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("comments")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("comments").insert([
        {
          user_id: 4,
          review_id: 1,
          comment: "Yeah, I agree! This guy is a great farmer!"
        },
        {
          user_id: 2,
          review_id: 2,
          comment: "Yeah, I agree! This guy is a bad farmer!"
        },
        {
          user_id: 1,
          review_id: 3,
          comment: "Yeah, I agree! This guy is an okay farmer!"
        },
        {
          user_id: 3,
          review_id: 4,
          comment: "Yeah, I agree! This guy is a cool farmer!"
        },
        {
          user_id: 4,
          review_id: 5,
          comment: "Yeah, I agree! This guy is a great farmer!"
        },
        {
          user_id: 2,
          review_id: 6,
          comment: "Yeah, I agree! This guy is a bad farmer!"
        },
        {
          user_id: 1,
          review_id: 7,
          comment: "Yeah, I agree! This guy is an okay farmer!"
        },
        {
          user_id: 3,
          review_id: 8,
          comment: "Yeah, I agree! This guy is a cool farmer!"
        },
        {
          user_id: 4,
          review_id: 9,
          comment: "Yeah, I agree! This guy is a great farmer!"
        },
        {
          user_id: 2,
          review_id: 10,
          comment: "Yeah, I agree! This guy is a bad farmer!"
        },
        {
          user_id: 1,
          review_id: 11,
          comment: "Yeah, I agree! This guy is an okay farmer!"
        },
        {
          user_id: 3,
          review_id: 12,
          comment: "Yeah, I agree! This guy is a cool farmer!"
        },
        {
          user_id: 4,
          review_id: 13,
          comment: "Yeah, I agree! This guy is a great farmer!"
        },
        {
          user_id: 2,
          review_id: 14,
          comment: "Yeah, I agree! This guy is a bad farmer!"
        },
        {
          user_id: 1,
          review_id: 15,
          comment: "Yeah, I agree! This guy is an okay farmer!"
        },
        {
          user_id: 3,
          review_id: 16,
          comment: "Yeah, I agree! This guy is a cool farmer!"
        }
      ]);
    });
};
