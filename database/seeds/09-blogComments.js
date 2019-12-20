exports.seed = function(knex, Promise) {
  // Inserts seed entries
  return knex("blog_comments").insert([
    {
      user_id: 4,
      blog_id: 1,
      comment: "Yeah, I agree! This guy is a great farmer!"
    },
    {
      user_id: 2,
      blog_id: 2,
      comment: "Yeah, I agree! This guy is a bad farmer!"
    },
    {
      user_id: 1,
      blog_id: 3,
      comment: "Yeah, I agree! This guy is an okay farmer!"
    },
    {
      user_id: 3,
      blog_id: 4,
      comment: "Yeah, I agree! This guy is a cool farmer!"
    },
    {
      user_id: 4,
      blog_id: 5,
      comment: "Yeah, I agree! This guy is a great farmer!"
    },
    {
      user_id: 2,
      blog_id: 6,
      comment: "Yeah, I agree! This guy is a bad farmer!"
    },
    {
      user_id: 1,
      blog_id: 7,
      comment: "Yeah, I agree! This guy is an okay farmer!"
    },
    {
      user_id: 3,
      blog_id: 8,
      comment: "Yeah, I agree! This guy is a cool farmer!"
    },
    {
      user_id: 4,
      blog_id: 9,
      comment: "Yeah, I agree! This guy is a great farmer!"
    },
    {
      user_id: 2,
      blog_id: 10,
      comment: "Yeah, I agree! This guy is a bad farmer!"
    },
    {
      user_id: 1,
      blog_id: 11,
      comment: "Yeah, I agree! This guy is an okay farmer!"
    },
    {
      user_id: 3,
      blog_id: 12,
      comment: "Yeah, I agree! This guy is a cool farmer!"
    },
    {
      user_id: 4,
      blog_id: 13,
      comment: "Yeah, I agree! This guy is a great farmer!"
    },
    {
      user_id: 2,
      blog_id: 14,
      comment: "Yeah, I agree! This guy is a bad farmer!"
    },
    {
      user_id: 1,
      blog_id: 15,
      comment: "Yeah, I agree! This guy is an okay farmer!"
    },
    {
      user_id: 3,
      blog_id: 16,
      comment: "Yeah, I agree! This guy is a cool farmer!"
    }
  ]);
};
