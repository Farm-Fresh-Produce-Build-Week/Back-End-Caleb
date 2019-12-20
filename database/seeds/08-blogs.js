exports.seed = function(knex, Promise) {
  // Inserts seed entries
  return knex("blogs").insert([
    {
      farmer_id: 1,
      blogPostImgUrl:
        "https://images.unsplash.com/photo-1572731410363-1e08a28c8114?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9",
      post: "This guy is a great farmer!"
    },
    {
      farmer_id: 1,
      blogPostImgUrl:
        "https://images.unsplash.com/photo-1572731410363-1e08a28c8114?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9",
      post: "This guy is a bad farmer!"
    },
    {
      farmer_id: 1,
      blogPostImgUrl:
        "https://images.unsplash.com/photo-1572731410363-1e08a28c8114?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9",
      post: "This guy is an okay farmer!"
    },
    {
      farmer_id: 1,
      blogPostImgUrl:
        "https://images.unsplash.com/photo-1572731410363-1e08a28c8114?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9",
      post: "This guy is a great farmer!"
    },
    {
      farmer_id: 2,
      blogPostImgUrl:
        "https://images.unsplash.com/photo-1572731410363-1e08a28c8114?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9",
      post: "This dog is a bad farmer!"
    },
    {
      farmer_id: 2,
      blogPostImgUrl:
        "https://images.unsplash.com/photo-1572731410363-1e08a28c8114?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9",
      post: "This dog is an okay farmer!"
    },
    {
      farmer_id: 2,
      blogPostImgUrl:
        "https://images.unsplash.com/photo-1572731410363-1e08a28c8114?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9",
      post: "This dog is a great farmer!"
    },
    {
      farmer_id: 2,
      blogPostImgUrl:
        "https://images.unsplash.com/photo-1572731410363-1e08a28c8114?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9",
      post: "This dog is a bad farmer!"
    },
    {
      farmer_id: 3,
      blogPostImgUrl:
        "https://images.unsplash.com/photo-1572731410363-1e08a28c8114?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9",
      post: "This lady is an okay farmer!"
    },
    {
      farmer_id: 3,
      blogPostImgUrl:
        "https://images.unsplash.com/photo-1572731410363-1e08a28c8114?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9",
      post: "This lady is a great farmer!"
    },
    {
      farmer_id: 3,
      blogPostImgUrl:
        "https://images.unsplash.com/photo-1572731410363-1e08a28c8114?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9",
      post: "This lady is a bad farmer!"
    },
    {
      farmer_id: 3,
      blogPostImgUrl:
        "https://images.unsplash.com/photo-1572731410363-1e08a28c8114?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9",
      post: "This lady is an okay farmer!"
    },
    {
      farmer_id: 4,
      blogPostImgUrl:
        "https://images.unsplash.com/photo-1572731410363-1e08a28c8114?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9",
      post: "This snake is a great farmer!"
    },
    {
      farmer_id: 4,
      blogPostImgUrl:
        "https://images.unsplash.com/photo-1572731410363-1e08a28c8114?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9",
      post: "This snake is a bad farmer!"
    },
    {
      farmer_id: 4,
      blogPostImgUrl:
        "https://images.unsplash.com/photo-1572731410363-1e08a28c8114?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9",
      post: "This snake is an okay farmer!"
    },
    {
      farmer_id: 4,
      blogPostImgUrl:
        "https://images.unsplash.com/photo-1572731410363-1e08a28c8114?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9",
      post: "This snake is a cool farmer!"
    }
  ]);
};
